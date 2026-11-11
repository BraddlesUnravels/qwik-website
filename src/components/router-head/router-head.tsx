import { component$ } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";
import firaSansSemibold from "@fontsource/fira-sans/files/fira-sans-latin-600-normal.woff2?url";

export const RouterHead = component$(() => {
  const head = useDocumentHead();

  return (
    <>
      <title>{head.title}</title>

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="32x32" />

      <link
        rel="apple-touch-icon"
        href="/apple-touch-icon.png"
        type="image/png"
        sizes="32x32"
      />

      <link
        rel="preload"
        href={firaSansSemibold}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {head.meta.map((meta) => (
        <meta key={meta.key} {...meta} />
      ))}

      {head.links.map((link) => (
        <link key={link.key} {...link} />
      ))}

      {head.styles.map((style) => (
        <style
          key={style.key}
          {...style.props}
          {...(style.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: style.style })}
        />
      ))}

      {head.scripts.map((script) => (
        <script
          key={script.key}
          {...script.props}
          {...(script.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: script.script })}
        />
      ))}
    </>
  );
});
