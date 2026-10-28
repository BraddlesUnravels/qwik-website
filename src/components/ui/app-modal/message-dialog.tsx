import { component$, type Signal } from "@builder.io/qwik";
import { Modal } from "@qwik-ui/headless";
import AppModal, { modalButtonClass } from "./modal";

type MessageDialogProps = {
  show: Signal<boolean>;
  title: string;
  message: string;
  closeLabel?: string;
  alert?: boolean;
};

export const MessageDialog = component$<MessageDialogProps>(
  ({ show, title, message, closeLabel = "Close", alert = false }) => (
    <AppModal show={show} alert={alert} closeOnBackdropClick={false}>
      <header class="border-b border-zinc-800 px-5 py-4">
        <Modal.Title class="text-lg font-semibold">{title}</Modal.Title>
      </header>

      <div class="min-h-0 overflow-auto overscroll-contain px-5 py-4">
        <Modal.Description class="leading-relaxed wrap-anywhere whitespace-pre-line text-zinc-300">
          {message}
        </Modal.Description>
      </div>

      <footer class="flex justify-end border-t border-zinc-800 px-5 py-4">
        <Modal.Close type="button" class={modalButtonClass} autofocus>
          {closeLabel}
        </Modal.Close>
      </footer>
    </AppModal>
  ),
);
