import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { deferred, mediaEnvironment } from "./media-environment";

let env: ReturnType<typeof mediaEnvironment>;
beforeEach(() => {
  env = mediaEnvironment();
});
afterEach(async () => {
  env.dispose();
  await env.flush();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Autoplay eligibility and ownership", () => {
  it("sets both rates on connection without starting or muting a manual video", async () => {
    const { video, observer } = env.connect();
    await env.flush();
    expect([video.defaultPlaybackRate, video.playbackRate]).toEqual([2, 2]);
    expect(video.muted).toBe(false);
    expect(video.play).not.toHaveBeenCalled();
    expect(observer.observe).toHaveBeenCalledWith(video.asElement());
    expect(observer.options?.threshold).toEqual([0, 0.25]);
    expect(env.matchMedia).toHaveBeenCalledWith(
      "(prefers-reduced-motion: reduce)",
    );
  });

  it.each([0, 0.1, 0.249])("does not start at visibility %s", async (ratio) => {
    const { video } = env.connect();
    env.visible(ratio);
    await env.flush();
    expect(video.play).not.toHaveBeenCalled();
  });
  it.each([0.25, 0.251, 1])("starts at visibility %s", async (ratio) => {
    const { video } = env.connect();
    video.resetRates();
    env.visible(ratio);
    await env.flush();
    // Inspect what play() actually observed, outside the promise the controller catches.
    expect(video.starts).toEqual([{ current: 2, default: 2, muted: true }]);
    expect(video.paused).toBe(false);
  });
  it("does not trust a positive ratio when isIntersecting is false", async () => {
    const { video } = env.connect();
    env.visible(1, 0, false);
    await env.flush();
    expect(video.play).not.toHaveBeenCalled();
  });
  it("does not issue concurrent play requests for repeated observer notifications", async () => {
    const { video } = env.connect();
    for (let n = 0; n < 10; n++) env.visible(1);
    await env.flush();
    expect(video.play).toHaveBeenCalledTimes(1);
  });
  it("pauses automatic playback below the threshold and resumes at 2x", async () => {
    const { video } = env.connect();
    env.visible(1);
    await env.flush();
    env.visible(0.249);
    await env.flush();
    expect(video.paused).toBe(true);
    video.resetRates();
    env.visible(0.25);
    await env.flush();
    expect(video.play).toHaveBeenCalledTimes(2);
    expect(video.starts[1]).toEqual({ current: 2, default: 2, muted: true });
  });
  it("preserves a deliberate pause across scrolling and preference changes", async () => {
    const { video } = env.connect();
    env.visible(1);
    await env.flush();
    video.pause();
    await env.flush();
    env.visible(0);
    env.visible(1);
    env.preference("motion", true);
    env.preference("motion", false);
    await env.flush();
    expect(video.play).toHaveBeenCalledTimes(1);
    expect(video.paused).toBe(true);
  });
  it("does not seize ownership of a video already playing when connected", async () => {
    const video = env.createVideo();
    video.paused = false;
    env.connect(video);
    env.visible(1);
    env.visible(0);
    env.preference("hidden", true);
    await env.flush();
    expect(video.pause).not.toHaveBeenCalled();
    expect(video.muted).toBe(false);
    expect(video.playbackRate).toBe(2);
  });
  it("does not restart a completed non-looping video", async () => {
    const { video } = env.connect();
    env.visible(1);
    await env.flush();
    video.ended = true;
    video.paused = true;
    video.emitLater("ended");
    await env.flush();
    env.visible(0);
    env.visible(1);
    await env.flush();
    expect(video.play).toHaveBeenCalledTimes(1);
  });
});

describe("Motion, data and page visibility", () => {
  it.each(["motion", "data", "hidden"] as const)(
    "suppresses autoplay under %s",
    async (name) => {
      const { video } = env.connect();
      env.preference(name, true);
      env.visible(1);
      await env.flush();
      expect(video.play).not.toHaveBeenCalled();
      expect(video.playbackRate).toBe(2);
    },
  );
  it.each(["motion", "data", "hidden"] as const)(
    "pauses and resumes automatic playback when %s changes",
    async (name) => {
      const { video } = env.connect();
      env.visible(1);
      await env.flush();
      env.preference(name, true);
      await env.flush();
      expect(video.paused).toBe(true);
      env.preference(name, false);
      await env.flush();
      expect(video.play).toHaveBeenCalledTimes(2);
      expect(video.paused).toBe(false);
    },
  );
  it.each(["motion", "data"] as const)(
    "allows manual 2x playback under %s without later pausing it",
    async (name) => {
      const { video } = env.connect();
      env.preference(name, true);
      env.visible(1);
      await env.flush();
      video.play();
      await env.flush();
      env.visible(0);
      env.preference("hidden", true);
      await env.flush();
      expect(video.play).toHaveBeenCalledTimes(1);
      expect(video.pause).not.toHaveBeenCalled();
      expect(video.playbackRate).toBe(2);
    },
  );
  it("works when navigator.connection is absent", async () => {
    env.dispose();
    env = mediaEnvironment({ connection: false });
    const { video } = env.connect();
    env.visible(1);
    await env.flush();
    expect(video.paused).toBe(false);
  });
});

describe("Rate enforcement and cleanup", () => {
  it.each([
    "loadstart",
    "emptied",
    "loadedmetadata",
    "play",
    "playing",
    "ratechange",
  ])("recovers from a reset on %s with queued events", async (event) => {
    const { video } = env.connect();
    await env.flush();
    video.resetRates();
    video.emitLater(event);
    await env.flush();
    expect([video.defaultPlaybackRate, video.playbackRate]).toEqual([2, 2]);
  });
  it("settles ratechange events without repeatedly rewriting properties", async () => {
    const { video } = env.connect();
    await env.flush();
    expect(video.writes).toEqual({ current: 1, default: 1 });
    video.playbackRate = 1;
    await env.flush();
    expect(video.writes).toEqual({ current: 3, default: 1 });
    await env.flush();
    expect(video.writes).toEqual({ current: 3, default: 1 });
  });
  it("removes every event listener and ignores stale observer callbacks", async () => {
    const { video, disconnect, observer } = env.connect();
    await env.flush();
    disconnect();
    await env.flush();
    expect(observer.disconnect).toHaveBeenCalledTimes(1);
    video.resetRates();
    for (const event of [
      "loadstart",
      "emptied",
      "loadedmetadata",
      "play",
      "playing",
      "ratechange",
      "pause",
      "ended",
    ])
      video.emitLater(event);
    env.visible(1);
    env.preference("motion", true);
    env.preference("motion", false);
    env.preference("data", true);
    env.preference("data", false);
    env.preference("hidden", true);
    env.preference("hidden", false);
    await env.flush();
    expect(video.play).not.toHaveBeenCalled();
    expect([video.defaultPlaybackRate, video.playbackRate]).toEqual([1, 1]);
  });
  it("pauses only automatically owned playback on disconnect", async () => {
    const { video, disconnect } = env.connect();
    env.visible(1);
    await env.flush();
    disconnect();
    await env.flush();
    expect(video.paused).toBe(true);
    expect(video.pause).toHaveBeenCalledTimes(1);
  });
  it("leaves deliberate playback running on disconnect", async () => {
    const { video, disconnect } = env.connect();
    video.play();
    await env.flush();
    disconnect();
    await env.flush();
    expect(video.pause).not.toHaveBeenCalled();
    expect(video.paused).toBe(false);
  });
  it("keeps two players' visibility, ownership and cleanup independent", async () => {
    const first = env.connect();
    const second = env.connect();
    env.visible(1, 0);
    await env.flush();
    expect(second.video.play).not.toHaveBeenCalled();
    env.visible(1, 1);
    await env.flush();
    first.video.pause();
    await env.flush();
    env.visible(0, 1);
    await env.flush();
    env.visible(1, 1);
    await env.flush();
    first.disconnect();
    expect(first.video.play).toHaveBeenCalledTimes(1);
    expect(second.video.play).toHaveBeenCalledTimes(2);
    expect(second.video.paused).toBe(false);
  });
});

describe("Pending, rejected and interrupted play requests", () => {
  it("does not automatically retry a rejected request on every scroll", async () => {
    const { video } = env.connect();
    video.play.mockRejectedValueOnce(
      new DOMException("Blocked", "NotAllowedError"),
    );
    env.visible(1);
    await env.flush();
    for (let n = 0; n < 5; n++) {
      env.visible(0);
      env.visible(1);
    }
    await env.flush();
    expect(video.play).toHaveBeenCalledTimes(1);
    video.play();
    await env.flush();
    env.visible(0);
    await env.flush();
    expect(video.pause).not.toHaveBeenCalled();
    expect(video.paused).toBe(false);
  });
  it("restores rates and mute after resource initialization changes them", async () => {
    const { video } = env.connect();
    const pending = deferred();
    video.play.mockImplementationOnce(() => {
      video.paused = false;
      video.emitLater("play");
      return pending.promise;
    });
    env.visible(1);
    await env.flush();
    video.resetRates();
    video.muted = false;
    pending.resolve();
    await env.flush();
    expect([
      video.defaultPlaybackRate,
      video.playbackRate,
      video.muted,
    ]).toEqual([2, 2, true]);
  });
  it.each(["motion", "data", "hidden"] as const)(
    "retries after an internally aborted pending request under %s",
    async (name) => {
      const { video } = env.connect();
      const pending = deferred();
      video.play.mockImplementationOnce(() => {
        video.paused = false;
        video.emitLater("play");
        return pending.promise;
      });
      env.visible(1);
      await env.flush();
      env.preference(name, true);
      await env.flush();
      env.preference(name, false);
      pending.reject(new DOMException("Interrupted", "AbortError"));
      await env.flush();
      expect(video.play).toHaveBeenCalledTimes(2);
      expect(video.paused).toBe(false);
      expect(video.playbackRate).toBe(2);
    },
  );
  it("does not resume when the viewer pauses before a pending play resolves", async () => {
    const { video } = env.connect();
    const pending = deferred();
    video.play.mockImplementationOnce(() => {
      video.paused = false;
      video.emitLater("play");
      return pending.promise;
    });
    env.visible(1);
    await env.flush();
    video.pause();
    await env.flush();
    pending.resolve();
    await env.flush();
    env.visible(0);
    env.visible(1);
    await env.flush();
    expect(video.play).toHaveBeenCalledTimes(1);
    expect(video.paused).toBe(true);
  });
  it.each(["resolve", "reject"] as const)(
    "does not revive a disposed pending request that later %ss",
    async (outcome) => {
      const { video, disconnect } = env.connect();
      const pending = deferred();
      video.play.mockImplementationOnce(() => {
        video.paused = false;
        video.emitLater("play");
        return pending.promise;
      });
      env.visible(1);
      await env.flush();
      disconnect();
      await env.flush();
      video.resetRates();
      video.muted = false;
      if (outcome === "resolve") pending.resolve();
      else pending.reject(new DOMException("Interrupted", "AbortError"));
      await env.flush();
      env.visible(1);
      await env.flush();
      expect(video.play).toHaveBeenCalledTimes(1);
      expect([
        video.defaultPlaybackRate,
        video.playbackRate,
        video.muted,
      ]).toEqual([1, 1, false]);
      expect(video.paused).toBe(true);
    },
  );
});
