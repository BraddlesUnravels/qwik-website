import { addQwikLoader, mount } from "cypress-ct-qwik";
import "./commands";

addQwikLoader();

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);
