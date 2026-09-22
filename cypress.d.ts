/// <reference types="cypress" />

import type { mount } from "cypress-ct-qwik";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

export {};
