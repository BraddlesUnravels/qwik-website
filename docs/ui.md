# UI and accessibility

[global.css](../src/global.css) loads Tailwind v4 and the site styles. [theme.css](../src/theme/theme.css) holds the palette, [fonts.css](../src/theme/fonts.css) holds the font families and type scale, [base.css](../src/theme/base.css) holds global styles, and [utilities.css](../src/theme/utilities.css) holds shared card and image styles.

## Typography

Use the `variant` prop on [Typography](../src/components/ui/typography.tsx) for the visual treatment and `as` when the page needs a different HTML element. For example, a supporting section can use `as="h2"` with `variant="body-large"`.

Typography merges its variant, tone, alignment and caller classes through the local [Tailwind Merge configuration](../src/lib/tw-merge.ts). If you add a custom `--text-*` size, register the size name there so it merges correctly with other text sizes. The caption size lives in `fonts.css`. The eyebrow’s word spacing is set on its typography variant.

## Browser checks

| Area                                                                   | What to check                                                                                                                                    |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Project cards and buttons                                              | Try touch, keyboard and mouse. Check the pressed state, visible focus and whether the whole intended target responds.                            |
| [Mobile menu](../src/components/layout/mobile-nav-menu.tsx)            | Open it, close it with Escape, and check that focus returns to the trigger. Tap outside and follow a link. Check `aria-expanded` in both states. |
| [Back to top](../src/components/ui/mobile-back-to-top-button.tsx)      | Scroll past the intro on mobile. With reduced motion on, the jump should be instant.                                                             |
| [Toolkit carousel](../src/components/ui/technology-carousel.tsx)       | Check it at a narrow width and with reduced motion enabled. The duplicated logo list is hidden from assistive technology.                        |
| [Image viewer](../src/components/ui/app-modal/image-viewer.tsx)        | Open a screenshot, switch between fit and actual size, then close it by keyboard. Check focus and scrolling on a phone-sized viewport.           |
| [Demo error dialog](../src/components/ui/app-modal/message-dialog.tsx) | Submit the demo form with its configuration unset. Check that the message is readable and the dialog can be dismissed.                           |

The image viewer and message dialog share [AppModal](../src/components/ui/app-modal/modal.tsx), which uses `@qwik-ui/headless`. Check both when changing the shared panel or close control.
