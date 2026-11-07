type DataConnection = EventTarget & {
  readonly saveData?: boolean;
};

// Playback speed is an HTMLMediaElement property, not an HTML attribute.
export function enforceMediaPlaybackRate(video: HTMLVideoElement): void {
  // Both setters queue ratechange events. Guard writes to avoid an event loop.
  if (video.defaultPlaybackRate !== 2) video.defaultPlaybackRate = 2;
  if (video.playbackRate !== 2) video.playbackRate = 2;
}

export function connectMediaAutoplay(video: HTMLVideoElement): () => void {
  enforceMediaPlaybackRate(video);

  const enforceRate = () => enforceMediaPlaybackRate(video);
  const rateEvents = [
    "loadstart",
    "emptied",
    "loadedmetadata",
    "play",
    "playing",
    "ratechange",
  ] as const;

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const connection: DataConnection | undefined = (
    navigator as { readonly connection?: DataConnection }
  ).connection;

  let visible = false;
  let disposed = false;
  let pending = false;
  let interrupted = false;
  let automatic = false;
  let userControlled = !video.paused;
  let internalPauses = 0;

  const allowed = () =>
    !disposed &&
    visible &&
    !document.hidden &&
    !motion.matches &&
    !connection?.saveData &&
    !userControlled &&
    !video.ended;

  const pause = () => {
    if (!automatic && !pending) return;

    if (pending) interrupted = true;
    automatic = false;

    if (!video.paused) {
      internalPauses++;
      video.pause();
    }
  };

  const update = () => {
    if (!allowed()) return pause();
    if (pending || !video.paused) return;

    video.muted = true;
    enforceRate();
    pending = true;

    void video
      .play()
      .then(() => {
        if (!disposed) {
          // Resource initialization can reset media properties in WebKit.
          enforceRate();
          video.muted = true;
        }
        automatic = true;
        pending = false;
        interrupted = false;

        if (!allowed()) pause();
      })
      .catch(() => {
        pending = false;

        // A visibility/preference pause can abort a pending play promise.
        if (interrupted) {
          interrupted = false;
          update();
          return;
        }

        // Stop automatic retries; deliberate playback remains available.
        userControlled = true;
      });
  };

  const onPlay = () => {
    if (!pending) {
      userControlled = true;
      automatic = false;
    }
  };

  const onPause = () => {
    if (internalPauses) {
      internalPauses--;
    } else if (!video.ended) {
      userControlled = true;
      automatic = false;
    }
  };

  const onEnded = () => {
    userControlled = true;
    automatic = false;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries.some(
        (entry) => entry.isIntersecting && entry.intersectionRatio >= 0.25,
      );

      update();
    },
    {
      threshold: [0, 0.25],
    },
  );

  rateEvents.forEach((event) => video.addEventListener(event, enforceRate));
  video.addEventListener("play", onPlay);
  video.addEventListener("pause", onPause);
  video.addEventListener("ended", onEnded);
  motion.addEventListener("change", update);
  connection?.addEventListener("change", update);
  document.addEventListener("visibilitychange", update);
  observer.observe(video);

  return () => {
    disposed = true;
    pause();
    observer.disconnect();

    rateEvents.forEach((event) =>
      video.removeEventListener(event, enforceRate),
    );
    motion.removeEventListener("change", update);
    connection?.removeEventListener("change", update);
    document.removeEventListener("visibilitychange", update);
    video.removeEventListener("play", onPlay);
    video.removeEventListener("pause", onPause);
    video.removeEventListener("ended", onEnded);
  };
}
