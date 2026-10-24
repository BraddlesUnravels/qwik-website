/// <reference types="vite/client" />
/// <reference types="@builder.io/qwik/server" />

declare module "*&as=img" {
  const image: import("./content/types").OptimizedImage;
  export default image;
}
