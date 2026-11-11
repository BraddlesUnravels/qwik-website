import { component$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { partytownSnippet } from "@qwik.dev/partytown/integration";
import { RouterHead } from "./components/router-head/router-head";
import "./global.css";

const measurementId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
const hasAnalytics = /^G-[A-Z0-9]+$/.test(measurementId);

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <RouterHead />
        {hasAnalytics && (
          <>
            <script
              dangerouslySetInnerHTML={partytownSnippet({
                forward: ["dataLayer.push"],
              })}
            />
            <script
              type="text/partytown"
              src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            />
            <script
              type="text/partytown"
              dangerouslySetInnerHTML={`
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                  window.dataLayer.push(arguments);
                }
                gtag("js", new Date());
                gtag("config", ${JSON.stringify(measurementId)}, {
                  allow_google_signals: false,
                  allow_ad_personalization_signals: false
                });
              `}
            />
          </>
        )}
      </head>

      <body>
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
