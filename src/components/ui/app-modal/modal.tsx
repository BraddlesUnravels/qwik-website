import { component$, Slot, type Signal } from "@builder.io/qwik";
import { Modal } from "@qwik-ui/headless";

type AppModalProps = {
  show: Signal<boolean>;
  variant?: "message" | "image";
  alert?: boolean;
  closeOnBackdropClick?: boolean;
};

export const modalButtonClass = [
  "inline-flex min-h-11 min-w-11 items-center justify-center",
  "cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2",
  "text-sm font-medium text-zinc-100",
  "hover:border-zinc-500 hover:bg-zinc-800",
  "focus-visible:outline-2 focus-visible:outline-offset-2",
  "focus-visible:outline-emerald-400",
  "disabled:cursor-default disabled:opacity-50",
].join(" ");

const panelClass = [
  "fixed inset-0 m-auto hidden min-h-0 min-w-0 overflow-hidden p-0",
  "open:grid grid-rows-[auto_minmax(0,1fr)_auto]",
  "border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl",
  "backdrop:bg-black/85",
].join(" ");

const imagePanelClass = [
  "h-dvh w-screen max-h-none! max-w-none! rounded-none",
  "sm:h-[calc(100dvh-2rem)] sm:w-[calc(100vw-2rem)] sm:rounded-2xl",
].join(" ");

const messagePanelClass = [
  "h-auto w-[min(32rem,calc(100vw-2rem))]",
  "max-h-[calc(100dvh-2rem)]! max-w-none! rounded-2xl",
].join(" ");

export default component$<AppModalProps>(
  ({
    show,
    variant = "message",
    alert = false,
    closeOnBackdropClick = true,
  }) => (
    <Modal.Root
      bind:show={show}
      alert={alert}
      closeOnBackdropClick={closeOnBackdropClick}
      class="contents"
    >
      <Modal.Panel
        class={[
          panelClass,
          variant === "image" ? imagePanelClass : messagePanelClass,
        ]}
        aria-modal="true"
      >
        <Slot />
      </Modal.Panel>
    </Modal.Root>
  ),
);
