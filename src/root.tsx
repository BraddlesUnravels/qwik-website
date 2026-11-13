import { component$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { partytownSnippet } from "@qwik.dev/partytown/integration";
import { PARTYTOWN_LIBRARY_PATH } from "./config/partytown";
import { RouterHead } from "./components/router-head/router-head";
import { gaMeasurementId } from "./lib/analytics";
import "./global.css";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <RouterHead />
        {gaMeasurementId && (
          <>
            {/*
              Waiting for load keeps Partytown's service worker and sandbox
              setup off the initial load path. setTimeout 0 runs it as its own
              task after the load handlers. The guard stops a second run from
              repeating the forward config and starting a second sandbox.
            */}
            <script
              dangerouslySetInnerHTML={`
                (() => {
                  if (window.__qwikPartytownScheduled) return;
                  window.__qwikPartytownScheduled = true;
                  const startPartytown = () => window.setTimeout(() => {
                    ${partytownSnippet({
                      lib: PARTYTOWN_LIBRARY_PATH,
                      fallbackTimeout: 0,
                      forward: ["dataLayer.push"],
                    })}
                  }, 0);
                  if (document.readyState === "complete") {
                    startPartytown();
                  } else {
                    window.addEventListener("load", startPartytown, { once: true });
                  }
                })();
              `}
            />
            <script
              type="text/partytown"
              data-ptworkeronly=""
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            />
            <script
              type="text/partytown"
              data-ptworkeronly=""
              dangerouslySetInnerHTML={`
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                  window.dataLayer.push(arguments);
                }
                gtag("js", new Date());
                gtag("config", ${JSON.stringify(gaMeasurementId)}, {
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
