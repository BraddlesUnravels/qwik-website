import { component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { MediaPlayer } from "~/components/ui/media-player";

export default component$(() => {
  const source = useSignal(false);
  const mounted = useSignal(true);
  return (
    <div style={{ padding: "1rem", maxWidth: "600px" }}>
      <h1>Playback speed regression fixture</h1>
      <button
        id="change-source"
        onClick$={() => {
          source.value = !source.value;
        }}
      >
        Change source
      </button>
      <button
        id="mount-player"
        onClick$={() => {
          mounted.value = !mounted.value;
        }}
      >
        Toggle mount
      </button>
      <Link id="leave-fixture" href="/about/approach">
        Leave fixture
      </Link>
      {mounted.value && (
        <MediaPlayer
          src={
            source.value
              ? "/media-speed-regression.mp4?v=2"
              : "/media-speed-regression.mp4"
          }
          title="Manual speed fixture"
          muted
          loop
          caption="Manual fixture caption"
        />
      )}
      <div aria-hidden="true" style={{ height: "100vh" }} />
      <MediaPlayer
        src="/media-speed-regression.mp4?auto"
        title="Autoplay speed fixture"
        autoPlay
        loop
      />
    </div>
  );
});
