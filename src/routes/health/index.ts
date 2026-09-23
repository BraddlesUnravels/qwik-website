import type { RequestHandler } from "@builder.io/qwik-city";

const applyHealthHeaders = (headers: Headers) => {
  headers.set("cache-control", "no-store");
};

export const onGet: RequestHandler = async ({ text, headers }) => {
  applyHealthHeaders(headers);
  text(200, "ok");
};

export const onHead: RequestHandler = async ({ status, headers }) => {
  applyHealthHeaders(headers);
  headers.set("content-type", "text/plain; charset=utf-8");
  status(200);
};
