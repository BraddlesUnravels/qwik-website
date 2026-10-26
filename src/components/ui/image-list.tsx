import { component$ } from "@builder.io/qwik";
import type { CaseStudyImage } from "~/content/types";
import { ImageWrapper } from "~/components/ui/image-wrapper";

export const CaseStudyImages = component$<{
  images?: CaseStudyImage[];
  sizes?: string;
}>(({ images = [], sizes }) => (
  <div class="mt-8 grid gap-8 empty:hidden">
    {images.map((image) => (
      <ImageWrapper key={image.src} image={image} sizes={sizes} />
    ))}
  </div>
));
