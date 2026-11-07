import {
  $,
  component$,
  noSerialize,
  useId,
  useOn,
  useSignal,
  useTask$,
  type NoSerialize,
  type QRL,
  type Signal,
} from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";
import { connectMediaAutoplay } from "~/lib/media-autoplay";
import { Typography } from "./typography";

export type MediaPlayerProps = {
  src: string;
  title: string;
  poster?: string;
  width?: number;
  height?: number;
  caption?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  class?: string;
  tracks?: Array<{
    src: string;
    srclang: string;
    label: string;
    default?: boolean;
  }>;
};

type NativeVideoProps = MediaPlayerProps & {
  videoId: string;
  videoRef: Signal<HTMLVideoElement | undefined>;
  describedBy?: string;
  onError$: QRL<() => void>;
  onPlay$: QRL<() => void>;
  onPause$: QRL<() => void>;
  onEnded$: QRL<() => void>;
};

const NativeVideo = (props: NativeVideoProps) => (
  <video
    key={props.src}
    id={props.videoId}
    ref={props.videoRef}
    src={props.src}
    poster={props.poster}
    width={props.width}
    height={props.height}
    controls={!props.autoPlay}
    playsInline
    preload="none"
    muted={props.autoPlay || props.muted}
    loop={props.loop}
    aria-label={props.title}
    aria-describedby={props.describedBy}
    onError$={props.onError$}
    onPlay$={props.onPlay$}
    onPause$={props.onPause$}
    onEnded$={props.onEnded$}
    style={
      props.width && props.height
        ? {
            aspectRatio: `auto ${props.width} / ${props.height}`,
            width: `min(100%, calc(min(75svh, 48rem) * ${props.width / props.height}))`,
          }
        : undefined
    }
    class="mx-auto block h-auto max-h-[min(75svh,48rem)] w-full max-w-full rounded-xl border border-white/10 bg-black object-contain"
  >
    {props.tracks?.map((track) => (
      <track key={track.src} kind="captions" {...track} />
    ))}
    Your browser cannot play this video. <a href={props.src}>Open the MP4</a>.
  </video>
);

const AutoPlayVideo = component$<NativeVideoProps>((props) => {
  const disconnect = useSignal<NoSerialize<() => void>>();

  useOn(
    "qvisible",
    $((_, element) => {
      if (disconnect.value) return;
      disconnect.value = noSerialize(
        connectMediaAutoplay(element as HTMLVideoElement),
      );
    }),
  );

  useTask$(({ cleanup }) => {
    if (isBrowser) {
      const frame = requestAnimationFrame(() => {
        if (!disconnect.value && props.videoRef.value) {
          disconnect.value = noSerialize(
            connectMediaAutoplay(props.videoRef.value),
          );
        }
      });
      cleanup(() => cancelAnimationFrame(frame));
    }
    cleanup(() => disconnect.value?.());
  });

  return NativeVideo(props);
});

export const MediaPlayer = component$<MediaPlayerProps | undefined>((props) => {
  if (!props) return undefined;

  const id = useId();
  const videoId = `video-${id}`;
  const captionId = `caption-${id}`;
  const video = useSignal<HTMLVideoElement>();
  const paused = useSignal(true);
  const failedSrc = useSignal<string>();
  const playbackFailedSrc = useSignal<string>();

  useTask$(({ track }) => {
    track(() => props.src);
    paused.value = true;
  });

  const onError$ = $(() => {
    failedSrc.value = props.src;
  });
  const onPlay$ = $(() => {
    paused.value = false;
    playbackFailedSrc.value = undefined;
  });
  const onPause$ = $(() => {
    paused.value = true;
  });
  const onEnded$ = $(() => {
    paused.value = true;
  });

  // TODO: add toggle playback button back to video, not urgent or implemented yet

  // const togglePlayback$ = $(async () => {
  //   const element = video.value;
  //   if (!element) return;

  //   playbackFailedSrc.value = undefined;
  //   if (!element.paused) {
  //     element.pause();
  //     paused.value = element.paused;
  //     return;
  //   }

  //   try {
  //     if (props.autoPlay || props.muted) element.muted = true;
  //     await element.play();
  //     paused.value = element.paused;
  //   } catch {
  //     paused.value = true;
  //     playbackFailedSrc.value = props.src;
  //   }
  // });

  const nativeProps: NativeVideoProps = {
    ...props,
    videoId,
    videoRef: video,
    describedBy: props.caption ? captionId : undefined,
    onError$,
    onPlay$,
    onPause$,
    onEnded$,
  };
  const mediaFailed = failedSrc.value === props.src;
  const playbackFailed = playbackFailedSrc.value === props.src;

  const MediaPlayerByType = (
    props: NativeVideoProps & { captionId: string },
  ) => {
    const { captionId, onError$ } = props;
    return props.autoPlay ? (
      <AutoPlayVideo
        key={props.src}
        {...props}
        describedBy={props.caption ? captionId : undefined}
        onError$={onError$}
      />
    ) : (
      <NativeVideo
        key={props.src}
        {...props}
        describedBy={props.caption ? captionId : undefined}
        onError$={onError$}
      />
    );
  };

  const MediaCaption = (props: MediaPlayerProps & { captionId: string }) =>
    props.caption && (
      <figcaption
        id={props.captionId}
        class="text-ink-muted mt-3 text-sm leading-relaxed"
      >
        <Typography as="p">{props.caption}</Typography>
      </figcaption>
    );

  const MediaFailed = () =>
    (mediaFailed || playbackFailed) && (
      <p role="status" class="text-ink-soft mt-3 text-sm">
        This video could not be loaded.{" "}
        <a class="underline" href={props.src}>
          Open the MP4 directly
        </a>
        .
      </p>
    );

  return (
    <figure
      class={["mt-4 mb-4 max-w-full min-w-0 touch-auto", props.class].join(" ")}
    >
      <MediaPlayerByType {...nativeProps} captionId={captionId} />

      <MediaCaption {...props} captionId={captionId} />

      <MediaFailed />
    </figure>
  );
});

export const OptionalMedia = component$<{
  video?: MediaPlayerProps | MediaPlayerProps[];
}>(({ video }) => {
  if (video === undefined || Array.isArray(video)) return undefined;
  return <MediaPlayer {...video} />;
});
