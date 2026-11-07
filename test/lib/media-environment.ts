import { vi } from "vitest";
import { connectMediaAutoplay } from "~/lib/media-autoplay";

export function deferred<T = void>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}

// EventTarget dispatch itself is synchronous. Browser media setters and
// play()/pause() schedule events in later tasks; this queue models that boundary.
export class MediaVideo extends EventTarget {
  paused = true;
  ended = false;
  muted = false;
  writes = { current: 0, default: 0 };
  starts: Array<{ current: number; default: number; muted: boolean }> = [];
  private current = 1;
  private baseline = 1;

  constructor(private readonly queue: (task: () => void) => void) {
    super();
  }

  get playbackRate() {
    return this.current;
  }
  set playbackRate(value: number) {
    this.current = value;
    this.writes.current++;
    this.emitLater("ratechange");
  }
  get defaultPlaybackRate() {
    return this.baseline;
  }
  set defaultPlaybackRate(value: number) {
    this.baseline = value;
    this.writes.default++;
    this.emitLater("ratechange");
  }

  emitLater(event: string) {
    this.queue(() => this.dispatchEvent(new Event(event)));
  }
  resetRates() {
    // A resource reset, without scheduling a correcting event first.
    this.current = this.baseline = 1;
  }
  asElement() {
    return this as unknown as HTMLVideoElement;
  }

  play = vi.fn((): Promise<void> => {
    this.starts.push({
      current: this.playbackRate,
      default: this.defaultPlaybackRate,
      muted: this.muted,
    });
    this.paused = false;
    this.ended = false;
    this.emitLater("play");
    return new Promise<void>((resolve, reject) => {
      this.queue(() => {
        if (this.paused)
          reject(new DOMException("Playback interrupted", "AbortError"));
        else {
          this.dispatchEvent(new Event("playing"));
          resolve();
        }
      });
    });
  });
  pause = vi.fn(() => {
    if (this.paused) return;
    this.paused = true;
    this.emitLater("pause");
  });
}

export function mediaEnvironment(
  options: {
    motion?: boolean;
    saveData?: boolean;
    hidden?: boolean;
    connection?: boolean;
  } = {},
) {
  const tasks: Array<() => void> = [];
  const videos: MediaVideo[] = [];
  const disconnectors: Array<() => void> = [];
  const motion = Object.assign(new EventTarget(), {
    matches: options.motion ?? false,
  });
  const connection = Object.assign(new EventTarget(), {
    saveData: options.saveData ?? false,
  });
  const document = Object.assign(new EventTarget(), {
    hidden: options.hidden ?? false,
  });
  const observers: Array<{
    callback: IntersectionObserverCallback;
    options?: IntersectionObserverInit;
    observe: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
  }> = [];
  const matchMedia = vi.fn(() => motion);
  vi.stubGlobal("window", { matchMedia });
  vi.stubGlobal(
    "navigator",
    options.connection === false ? {} : { connection },
  );
  vi.stubGlobal("document", document);
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe = vi.fn();
      disconnect = vi.fn();
      constructor(
        callback: IntersectionObserverCallback,
        init?: IntersectionObserverInit,
      ) {
        observers.push({
          callback,
          options: init,
          observe: this.observe,
          disconnect: this.disconnect,
        });
      }
    },
  );
  const createVideo = () => {
    const video = new MediaVideo((task) => tasks.push(task));
    videos.push(video);
    return video;
  };
  const connect = (video = createVideo()) => {
    const disconnect = connectMediaAutoplay(video.asElement());
    disconnectors.push(disconnect);
    return { video, disconnect, observer: observers[observers.length - 1] };
  };
  const flush = async () => {
    // Bound the queue: a ratechange feedback loop fails instead of hanging CI.
    for (let turn = 0; turn < 100; turn++) {
      await Promise.resolve();
      if (tasks.length) tasks.shift()!();
      else {
        await Promise.resolve();
        if (!tasks.length) return;
      }
    }
    throw new Error("Media task queue did not settle after 100 tasks");
  };
  const visible = (ratio: number, index = 0, intersects = ratio > 0) => {
    const observer = observers[index];
    const bounds = {
      x: 0,
      y: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: 0,
      height: 0,
      toJSON: () => ({}),
    };
    observer.callback(
      [
        {
          target: videos[index].asElement(),
          isIntersecting: intersects,
          intersectionRatio: ratio,
          boundingClientRect: bounds,
          intersectionRect: bounds,
          rootBounds: null,
          time: 0,
        },
      ],
      {} as IntersectionObserver,
    );
  };
  const preference = (name: "motion" | "data" | "hidden", value: boolean) => {
    if (name === "motion") {
      motion.matches = value;
      motion.dispatchEvent(new Event("change"));
    }
    if (name === "data") {
      connection.saveData = value;
      connection.dispatchEvent(new Event("change"));
    }
    if (name === "hidden") {
      document.hidden = value;
      document.dispatchEvent(new Event("visibilitychange"));
    }
  };
  return {
    createVideo,
    connect,
    flush,
    visible,
    preference,
    motion,
    connection,
    document,
    matchMedia,
    observers,
    dispose: () => disconnectors.forEach((disconnect) => disconnect()),
  };
}
