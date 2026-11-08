import { extendTailwindMerge } from "tailwind-merge";

export const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["xxs", "foot-note", "caption", "header"],
    },
  },
});
