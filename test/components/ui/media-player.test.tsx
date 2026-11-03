import { renderToString } from "@builder.io/qwik/server";
import { createDOM } from "@builder.io/qwik/testing";
import { component$, useSignal } from "@builder.io/qwik";
import { describe, expect, it } from "vitest";
import { MediaPlayer } from "~/components/ui/media-player";

const SourceChangingPlayer = component$(() => {
  const src = useSignal("/failed.mp4");
  return (
    <div>
      <button
        onClick$={() => {
          src.value = "/next.mp4";
        }}
      >
        Next source
      </button>
      <MediaPlayer src={src.value} title="Workflow" />
    </div>
  );
});

describe("MediaPlayer SSR", () => {
  it.each([false, true])(
    "should keep autoplay=%s behind a browser preference check",
    async (autoPlay) => {
      const { html } = await renderToString(
        <MediaPlayer
          src="/any.mp4"
          title="Workflow"
          autoPlay={autoPlay}
          width={780}
          height={1736}
          caption="Mobile demo"
        />,
        {
          containerTagName: "div",
          symbolMapper: (name) => [name, "/test-qrl.js"],
        },
      );
      const video = html.match(/<video\b[^>]*>/)?.[0] ?? "";
      expect(video).toContain('preload="none"');
      expect(video).toContain("controls");
      expect(video.toLowerCase()).toContain("playsinline");
      expect(video.toLowerCase()).not.toMatch(/\sautoplay(?:[\s=>]|$)/);
      expect(video).toContain('aria-label="Workflow"');
      expect(video).toContain('width="780"');
      expect(video).toContain('height="1736"');
      expect(video).toContain("object-contain");
      expect(html).toContain("Mobile demo");
      expect(/\son:qvisible\s*=/.test(video)).toBe(autoPlay);
    },
  );
});

describe("MediaPlayer rendering", () => {
  it("should show the failed video's direct link and clears the message for a new source", async () => {
    const { render, screen, userEvent } = await createDOM();
    await render(<SourceChangingPlayer />);
    await userEvent("video", "error");
    expect(
      screen.querySelector('[role="status"] a')?.getAttribute("href"),
    ).toBe("/failed.mp4");
    await userEvent("button", "click");
    expect(screen.querySelector("video")?.getAttribute("src")).toBe(
      "/next.mp4",
    );
    expect(screen.querySelector('[role="status"]')).toBeFalsy();
  });

  it("should omit the caption and its reference when no caption is supplied", async () => {
    const { render, screen } = await createDOM();
    await render(<MediaPlayer src="/any.mp4" title="Workflow" />);
    expect(screen.querySelector("figcaption")).toBeFalsy();
    expect(
      screen.querySelector("video")?.hasAttribute("aria-describedby"),
    ).toBe(false);
  });

  it("should attach a visibility handler only to the autoplay video in a mixed gallery", async () => {
    const { html } = await renderToString(
      <div>
        <MediaPlayer src="/auto.mp4" title="Auto" autoPlay />
        <MediaPlayer src="/manual.mp4" title="Manual" />
      </div>,
      {
        containerTagName: "div",
        symbolMapper: (name) => [name, "/test-qrl.js"],
      },
    );
    const videos = html.match(/<video\b[^>]*>/g) ?? [];
    expect(videos).toHaveLength(2);
    expect(videos.map((video) => /\son:qvisible\s*=/.test(video))).toEqual([
      true,
      false,
    ]);
  });
});
