import { describe, expect, it } from "vitest";
import { PARTYTOWN_LIBRARY_PATH } from "~/config/partytown";
import partytownPackage from "../../node_modules/@qwik.dev/partytown/package.json";

describe("config/partytown", () => {
  it("should point at the versioned path of the installed Partytown package", () => {
    expect(PARTYTOWN_LIBRARY_PATH).toBe(
      `/~partytown/${partytownPackage.version}/`,
    );
  });
});
