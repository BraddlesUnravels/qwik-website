---
applyTo: "**/*.{test,spec}.{ts,tsx}"
---

# Testing Instructions

Apply these instructions whenever writing or modifying automated TypeScript tests. They are general policies that apply to any repository. Project-specific facts, such as commands, directories, and domain rules, belong in the project documentation.

## Testing Principles

Tests must describe observable behaviour.

Prioritise:

1. Security behaviour and access rules
2. Public contracts
3. Domain rules and state transitions
4. Error handling
5. Important edge cases
6. Implementation details only when unavoidable

Do not test private implementation details when the same behaviour can be verified through a public boundary.

Do not weaken an assertion merely to make a failing test pass.

## Test Structure

Tests should mirror the source structure, following the repository's existing test directory conventions.

```text
src/lib/auth.ts
test/lib/auth.test.ts
```

Keep related tests together under clear `describe` blocks.

Name each test with a behaviour-focused sentence. Follow the repository's existing title convention, such as a consistent prefix like `should`.

Prefer:

```ts
it("should reject unauthenticated requests with 401", async () => {
  // ...
});
```

Avoid:

```ts
it("works", async () => {
  // ...
});
```

## Arrange, Act, Assert

Structure tests into clear phases separated by blank lines:

```ts
it("should return only the records owned by the caller", async () => {
  const caller = createUser();
  const ownedRecord = createRecord({ ownerId: caller.id });
  const otherRecord = createRecord();

  const response = await requestRecords(caller);

  expect(response.status).toBe(200);
  expect(response.body.records).toEqual([ownedRecord]);
  expect(response.body.records).not.toContain(otherRecord);
});
```

Comments such as `Arrange`, `Act`, and `Assert` are unnecessary when the structure is already obvious.

## Test Isolation

Each test must be independent.

- Do not depend on test execution order.
- Reset mocks between tests.
- Restore replaced globals.
- Use fresh test data.
- Avoid shared mutable state.
- Clean up persisted records or transactions when required.
- Do not depend on local seed state unless the test is explicitly an integration or demonstration test.

Use deterministic values. Control time when a test depends on it.

## Exact Assertions

Assert exact values when they are part of a stable contract.

For public error responses, assert:

- HTTP status
- Response shape
- Exact message when message stability is intentional

```ts
expect(response.status).toBe(403);
expect(await response.json()).toEqual({
  message: "Administrator access is required.",
});
```

For thrown public errors:

```ts
await expect(operation()).rejects.toThrow("Authenticated user is required.");
```

For internal errors whose wording is not a public contract, prefer asserting:

- Error class
- Error code
- Relevant fields
- Stable message content

Do not assert only that an operation throws when the error identity matters.

Avoid:

```ts
await expect(operation()).rejects.toThrow();
```

## Security Tests

When a change touches a protected boundary, cover:

- Missing authentication
- Valid authentication with each permitted role
- Incorrect or missing role
- Failure to resolve the session or identity
- Access to another principal's resources
- Client-supplied identity, role, or ownership values being ignored or rejected

Do not mock authentication so broadly that role and ownership behaviour are bypassed.

When ownership-sensitive behaviour depends on a query, assert that the query is scoped by the authenticated identity. Do not limit the test to checking that a query occurred.

## State Transition Tests

For any workflow with defined states:

- Test each supported transition.
- Test that unsupported transitions are rejected.
- Test that terminal states cannot be modified.
- Test that idempotent operations stay idempotent.
- Assert related timestamps or metadata that the transition sets or clears.

Use controlled timestamps when exact values matter.

## Input Validation Tests

Tests for operations that accept external input should cover:

- Missing required fields
- Empty values
- Incorrect types
- Out-of-range and malformed values
- Unsupported options
- Unexpected fields
- Valid payloads

Assert that invalid input does not cause side effects such as writes.

## HTTP Contract Tests

For request handlers, assert:

- HTTP status
- Response body
- Relevant response headers when they are part of the contract, including security headers
- Calls made to dependencies
- Absence of calls that should not happen, such as unauthorised writes

Use statuses consistently:

- `401` for unauthenticated requests
- `403` for authenticated callers who lack permission
- `404` for resources unavailable within the caller's scope
- `409` for conflicts with current state, when conflict semantics are used

Do not expose raw infrastructure or database errors in expected response bodies.

## Failure Tests

When a dependency fails:

- Assert the expected safe public response.
- Assert that internal details are not returned.
- Assert logging only when logging is part of the boundary's responsibility.
- Assert that no later side effect occurs after the failure.
- Assert that the same error is not logged repeatedly across layers.

Third-party code, such as analytics or embeds, must fail safe. Test that its failure leaves the page usable and does not move its work into a less restricted context.

## Mocking

Mock only external boundaries or expensive dependencies.

Appropriate mock targets include:

- Data-access clients
- Authentication or session resolution
- Time
- Network operations
- Environment-dependent behaviour

Avoid mocking the unit's own internal implementation.

Prefer typed mocks. Reset mocks between tests and restore real implementations and globals that a test replaced.

## Test Data

Use factory functions when they improve readability and consistency.

```ts
const record = createRecord({ status: "cancelled" });
```

Factories should:

- Provide valid defaults
- Allow narrow overrides
- Avoid hidden mutable state
- Return fresh values
- Use deterministic identifiers and timestamps

Do not create a generic test-factory framework for a small number of simple values.

## Browser and End-to-End Tests

Use end-to-end tests for behaviour that depends on a real browser, such as navigation, media, service workers, and response headers on a served build.

- Run against a production build when the behaviour differs in development.
- Stub third-party network calls so tests are deterministic and send nothing to real services.
- Assert what the user or the network observes, not internal script text or private globals.
- Prefer accessible locators, such as roles and labels, over brittle selectors.
- Wait on conditions, not fixed delays.

## Test Coverage Boundaries

Focus coverage on meaningful behaviour rather than achieving a percentage through low-value assertions.

High-priority boundaries include:

- Authentication and role resolution
- Ownership enforcement
- Request handlers
- State transitions
- Validation
- Safe error responses
- Security headers and policies
- Data-layer access policies, when the project has them

Snapshot tests must not replace explicit assertions for security-sensitive behaviour.

## Running Tests

Run the narrowest relevant test while developing, then the broader suite. Use the scripts defined in the project's `package.json`.

Before considering a substantial change complete, run every applicable check described in the repository instructions.

Do not state that a test passed unless it was actually executed.
