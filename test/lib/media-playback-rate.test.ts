import { describe, expect, it, vi } from "vitest";
import { enforceMediaPlaybackRate } from "~/lib/media-autoplay";

describe("Fixed 2x playback speed", () => {
  it.each([0, 0.5, 1, 1.5, 3, 4])("corrects a current speed of %s", (rate) => {
    const video = { defaultPlaybackRate: 1, playbackRate: rate };
    enforceMediaPlaybackRate(video as HTMLVideoElement);
    expect(video).toEqual({ defaultPlaybackRate: 2, playbackRate: 2 });
  });

  it("does not write either property when already at 2x", () => {
    const setDefault = vi.fn();
    const setCurrent = vi.fn();
    const video = Object.defineProperties(
      {},
      {
        defaultPlaybackRate: { get: () => 2, set: setDefault },
        playbackRate: { get: () => 2, set: setCurrent },
      },
    ) as HTMLVideoElement;
    enforceMediaPlaybackRate(video);
    enforceMediaPlaybackRate(video);
    expect(setDefault).not.toHaveBeenCalled();
    expect(setCurrent).not.toHaveBeenCalled();
  });

  it.each(["defaultPlaybackRate", "playbackRate"] as const)(
    "corrects %s independently",
    (property) => {
      const video = { defaultPlaybackRate: 2, playbackRate: 2 };
      video[property] = 1;
      enforceMediaPlaybackRate(video as HTMLVideoElement);
      expect(video).toEqual({ defaultPlaybackRate: 2, playbackRate: 2 });
    },
  );
});
