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

type ErrorProps = {
  failedSignal?: Signal<string | undefined>;
  srcFailure?: string;
};

type NativeVideoProps = MediaPlayerProps & {
  videoRef?: Signal<HTMLVideoElement | undefined>;
  describedBy?: string;
  onError$: QRL<() => void>;
};

const NativeVideo = (props: NativeVideoProps) => (
  <video
    key={props.src}
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
  const video = useSignal<HTMLVideoElement>();
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
    // Handle players mounted by client navigation or a source change.
    if (isBrowser) {
      const frame = requestAnimationFrame(() => {
        if (!disconnect.value && video.value) {
          disconnect.value = noSerialize(connectMediaAutoplay(video.value));
        }
      });

      cleanup(() => cancelAnimationFrame(frame));
    }

    cleanup(() => disconnect.value?.());
  });

  // Calling the function directly keeps <video> as the actual root.
  return NativeVideo({
    ...props,
    videoRef: video,
  });
});

const MediaPlayerByType = (props: NativeVideoProps & { captionId: string }) => {
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

const MediaFailed = (props: ErrorProps) =>
  props.failedSignal?.value === props.srcFailure && (
    <p role="status" class="text-ink-soft mt-3 text-sm">
      This video could not be loaded.{" "}
      <a class="underline" href={props.srcFailure}>
        Open the MP4 directly
      </a>
      .
    </p>
  );

export const MediaPlayer = component$<MediaPlayerProps | undefined>((props) => {
  if (!props) return undefined;

  const captionId = useId();
  const failedSrc = useSignal<string>();
  const onError$ = $(() => {
    failedSrc.value = props.src;
  });
  const figureClass = ["max-w-full min-w-0", props.class].join(" ");

  return (
    <figure class={figureClass}>
      <MediaPlayerByType
        {...props}
        captionId={captionId}
        describedBy={captionId ? props.caption : undefined}
        onError$={onError$}
      />

      <MediaCaption captionId={captionId} {...props} />

      <MediaFailed failedSignal={failedSrc} srcFailure={props.src} />
    </figure>
  );
});

export const OptionalMedia = component$<{
  video?: MediaPlayerProps | MediaPlayerProps[] | undefined;
}>(({ video }) => {
  if (video === undefined || Array.isArray(video)) {
    return undefined;
  }

  return <MediaPlayer {...video} />;
});
