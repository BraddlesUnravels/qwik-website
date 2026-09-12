/**
 * Bundle entry for `bun run preview`.
 */
import { createQwikCity } from "@builder.io/qwik-city/middleware/node";
import qwikCityPlan from "@qwik-city-plan";
import render from "./entry.ssr";

/**
 * Default export is the Qwik City adapter used by Vite preview.
 */
export default createQwikCity({ render, qwikCityPlan });
