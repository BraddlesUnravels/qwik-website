import { component$ } from "@builder.io/qwik";
import ImgSeekLogo from "~/media/icon/logo/seek-logo.svg?jsx";

export const SeekIcon = component$<{ class?: string }>((props) => (
  <ImgSeekLogo class={props.class ?? "h-5 w-5"} width={20} height={20} />
));
