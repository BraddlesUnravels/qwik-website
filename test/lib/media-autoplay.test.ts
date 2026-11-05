import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { connectMediaAutoplay } from "~/lib/media-autoplay";

class FakeVideo extends EventTarget {
  paused = true;
  ended = false;
  muted = false;
  play = vi.fn(async () => {
    this.paused = false;
    this.dispatchEvent(new Event("play"));
  });
  pause = vi.fn(() => {
    this.paused = true;
    this.dispatchEvent(new Event("pause"));
  });
}

describe("Autoplay preferences and ownership", () => {
  let video: FakeVideo;
  let motion: EventTarget & { matches: boolean };
  let connection: EventTarget & { saveData: boolean };
  let document: EventTarget & { hidden: boolean };
  let intersect: (entries: Partial<IntersectionObserverEntry>[]) => void;
  let disconnect: () => void;
  const observerDisconnect = vi.fn();
  const visible = (ratio = 1) =>
    intersect([{ isIntersecting: ratio > 0, intersectionRatio: ratio }]);
  const settle = async () => {
    await Promise.resolve();
    await Promise.resolve();
  };

  beforeEach(() => {
    video = new FakeVideo();
    motion = Object.assign(new EventTarget(), { matches: false });
    connection = Object.assign(new EventTarget(), { saveData: false });
    document = Object.assign(new EventTarget(), { hidden: false });
    vi.stubGlobal("window", { matchMedia: () => motion });
    vi.stubGlobal("navigator", { connection });
    vi.stubGlobal("document", document);
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: typeof intersect) {
          intersect = callback;
        }
        observe() {}
        disconnect = observerDisconnect;
      },
    );
    disconnect = connectMediaAutoplay(video as unknown as HTMLVideoElement);
  });
  afterEach(() => {
    disconnect();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("should start only when sufficiently visible and always mutes", async () => {
    visible(0.1);
    expect(video.play).not.toHaveBeenCalled();
    visible();
    await settle();
    expect(video.play).toHaveBeenCalledOnce();
    expect(video.muted).toBe(true);
  });

  it.each(["motion", "data", "hidden"])(
    "should suppress automatic playback for %s",
    (preference) => {
      if (preference === "motion") motion.matches = true;
      if (preference === "data") connection.saveData = true;
      if (preference === "hidden") document.hidden = true;
      visible();
      expect(video.play).not.toHaveBeenCalled();
    },
  );

  it("should pause offscreen and resumes automatic playback on return", async () => {
    visible();
    await settle();
    visible(0);
    expect(video.paused).toBe(true);
    visible();
    await settle();
    expect(video.play).toHaveBeenCalledTimes(2);
  });

  it("should never override a viewer's pause", async () => {
    visible();
    await settle();
    video.pause();
    visible(0);
    visible();
    await settle();
    expect(video.play).toHaveBeenCalledOnce();
    expect(video.paused).toBe(true);
  });

  it("should allow deliberate playback under reduced motion without taking ownership", async () => {
    motion.matches = true;
    visible();
    await video.play();
    visible(0);
    expect(video.pause).not.toHaveBeenCalled();
    expect(video.paused).toBe(false);
  });

  it("shoukld respond to live preference changes", async () => {
    visible();
    await settle();
    motion.matches = true;
    motion.dispatchEvent(new Event("change"));
    expect(video.paused).toBe(true);
    motion.matches = false;
    motion.dispatchEvent(new Event("change"));
    await settle();
    expect(video.play).toHaveBeenCalledTimes(2);
  });

  it("should handle blocked autoplay without retrying on every scroll", async () => {
    video.play.mockRejectedValueOnce(new Error("NotAllowedError"));
    visible();
    await settle();
    visible(0);
    visible();
    await settle();
    expect(video.play).toHaveBeenCalledOnce();
  });

  it("should resume when a preference pause aborts a pending play request", async () => {
    let rejectPlay!: (reason: Error) => void;
    video.play.mockImplementationOnce(() => {
      video.paused = false;
      video.dispatchEvent(new Event("play"));
      return new Promise<void>((_, reject) => {
        rejectPlay = reject;
      });
    });
    visible();
    motion.matches = true;
    motion.dispatchEvent(new Event("change"));
    motion.matches = false;
    motion.dispatchEvent(new Event("change"));
    rejectPlay(new Error("AbortError"));
    await settle();
    await settle();
    expect(video.play).toHaveBeenCalledTimes(2);
    expect(video.paused).toBe(false);
  });

  it("should disconnect and stop automatic playback when removed", async () => {
    visible();
    await settle();
    disconnect();
    expect(observerDisconnect).toHaveBeenCalledOnce();
    expect(video.paused).toBe(true);
    document.hidden = false;
    document.dispatchEvent(new Event("visibilitychange"));
    expect(video.play).toHaveBeenCalledOnce();
    // Avoid a second disconnect in afterEach.
    disconnect = () => {};
  });
});
