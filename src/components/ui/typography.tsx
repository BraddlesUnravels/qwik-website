import { component$, Slot } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";

type TypographyElement = "h1" | "h2" | "h3" | "p" | "span" | "div";

type TypographyVariant =
  | "display"
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "body-large"
  | "body"
  | "small"
  | "eyebrow"
  | "x-small"
  | "caption"
  | "foot-note";

type TypographyTone = "default" | "muted" | "accent" | "emerald" | "teal";

interface TypographyProps {
  as?: TypographyElement;
  variant?: TypographyVariant;
  tone?: TypographyTone;
  align?: "left" | "center" | "right";
  id?: string;
  class?: string;
}

const variants: Record<TypographyVariant, string> = {
  display: "text-6xl font-semibold leading-[0.96] tracking-[-0.055em]",
  "heading-1": "text-5xl font-semibold leading-tight tracking-[-0.04em]",
  "heading-2": "text-4xl font-semibold leading-tight tracking-[-0.035em]",
  "heading-3": "text-2xl font-semibold leading-tight tracking-[-0.025em]",
  "body-large": "text-xl leading-8",
  body: "text-base leading-7",
  small: "text-sm leading-6",
  eyebrow: "text-xs font-semibold uppercase tracking-[0.12em]",
  "x-small": "text-xxs leading-4",
  caption: "text-caption leading-4",
  "foot-note": "text-foot-note leading-4",
};

const tones: Record<TypographyTone, string> = {
  default: "text-zinc-100",
  muted: "text-zinc-400",
  accent: "text-indigo-300",
  emerald: "text-emerald-400",
  teal: "text-green-200",
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
  "x-small": "span",
  caption: "span",
  "foot-note": "span",
};

export const Typography = component$<TypographyProps>((props) => {
  const variant = props.variant ?? "body";
  const Component = defaultElements[variant];
  const alignment =
    props.align === "center"
      ? "text-center"
      : props.align === "right"
        ? "text-right"
        : undefined;

  const className = twMerge(
    variants[variant],
    tones[props.tone ?? "default"],
    alignment,
    props.class,
  );

  return (
    <Component id={props.id} class={className}>
      <Slot />
    </Component>
  );
});
