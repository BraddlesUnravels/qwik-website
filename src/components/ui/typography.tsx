import { component$, Slot } from "@builder.io/qwik";

type TypographyElement = "h1" | "h2" | "h3" | "p" | "span" | "div";

type TypographyVariant =
  | "display"
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "body-large"
  | "body"
  | "small"
  | "eyebrow";

type TypographyTone = "default" | "muted" | "accent" | "emerald" | "teal";

interface TypographyProps {
  as?: TypographyElement;
  variant?: TypographyVariant;
  tone?: TypographyTone;
  align?: "left" | "center";
  id?: string;
  class?: string;
}

const variants: Record<TypographyVariant, string> = {
  display:
    "text-6xl font-semibold leading-[0.96] tracking-[-0.055em]",
  "heading-1":
    "text-5xl font-semibold leading-tight tracking-[-0.04em]",
  "heading-2":
    "text-4xl font-semibold leading-tight tracking-[-0.035em]",
  "heading-3":
    "text-2xl font-semibold leading-tight tracking-[-0.025em]",
  "body-large": "text-xl leading-8",
  body: "text-base leading-7",
  small: "text-sm leading-6",
  eyebrow: "text-xs font-semibold uppercase tracking-[0.12em]",
};

const tones: Record<TypographyTone, string> = {
  default: "text-zinc-100",
  muted: "text-zinc-400",
  accent: "text-indigo-300",
  emerald: "text-emerald-400",
  teal: "text-green-200"
};

const defaultElements: Record<TypographyVariant, TypographyElement> = {
  display: "h1",
  "heading-1": "h1",
  "heading-2": "h2",
  "heading-3": "h3",
  "body-large": "p",
  body: "p",
  small: "p",
  eyebrow: "span",
};

export const Typography = component$<TypographyProps>((props) => {
  const variant = props.variant ?? "body";
  const element = props.as ?? defaultElements[variant];

  const className = [
    variants[variant],
    tones[props.tone ?? "default"],
    props.align === "center" ? "text-center" : "",
    props.class ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if (element === "h1") {
    return (
      <h1 id={props.id} class={className}>
        <Slot />
      </h1>
    );
  }

  if (element === "h2") {
    return (
      <h2 id={props.id} class={className}>
        <Slot />
      </h2>
    );
  }

  if (element === "h3") {
    return (
      <h3 id={props.id} class={className}>
        <Slot />
      </h3>
    );
  }

  if (element === "span") {
    return (
      <span id={props.id} class={className}>
        <Slot />
      </span>
    );
  }

  if (element === "div") {
    return (
      <div id={props.id} class={className}>
        <Slot />
      </div>
    );
  }

  return (
    <p id={props.id} class={className}>
      <Slot />
    </p>
  );
});
