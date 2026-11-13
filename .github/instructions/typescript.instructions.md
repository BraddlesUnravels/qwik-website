---
applyTo: "**/*.{ts,tsx}"
---

# TypeScript Instructions

Apply these instructions whenever writing or modifying TypeScript or TSX. They are general policies that apply to any repository and framework. Project-specific facts, such as framework conventions, commands, and domain rules, belong in the project documentation.

## TypeScript Style

Prefer code that is easy to scan and has consistent shapes.

- Use descriptive names.
- Keep functions focused.
- Use guard clauses for invalid or unsupported states.
- Separate validation, authorization, persistence, and response construction into readable blocks.
- Avoid nested ternaries.
- Avoid clever expressions that conceal business or security behaviour.
- Avoid boolean parameters when a named option or separate function is clearer.
- Do not introduce classes unless framework or library integration makes them appropriate.
- Prefer functions and plain objects for application code.

Use exported arrow functions for ordinary module operations:

```ts
export const getOrders = async () => {
  // ...
};
```

Use default exports where a framework or tool requires or conventionally expects them, such as pages, layouts, and configuration files.

## Type Definitions

Use string literal unions for closed sets:

```ts
export type UserRole = "member" | "admin";
```

Do not use TypeScript enums.

Prefer explicit types at module and framework boundaries, including:

- Request payloads and response bodies
- Authentication context
- Data-access mapping boundaries
- Shared component props
- Reusable exported functions

Allow TypeScript to infer straightforward local implementation details.

Do not create generic types or abstractions until there is a real repeated relationship. Two functions with superficially similar shapes are not enough.

## Nullability

Prefer `undefined` for optional values within application code.

At storage and API boundaries, preserve `null` when it represents an explicit empty value. For example, clearing a stored field requires writing `null`, because `undefined` may omit the field instead of updating it.

Do not hide nullability with unsafe assertions. Convert nullable values at an explicit mapping boundary when the application benefits from an `undefined`-based shape.

## External Data

Treat the following as untrusted until validated or narrowed:

- Request bodies
- URL and search parameters
- Form data
- Headers and cookies
- Responses from databases and third-party services
- Authentication metadata
- Environment variables
- Values from external libraries typed as `unknown`

Do not cast external data directly into the desired type. Validate it before use.

Prefer `unknown` over `any`. Do not use `as SomeType` to replace runtime validation.

## Type Assertions

Use type assertions only when:

- Runtime behaviour guarantees the type
- TypeScript cannot represent the guarantee
- The assertion is local and narrow
- The reason is clear from the surrounding code

Do not use assertions to silence unresolved type errors.

Avoid double assertions such as `value as unknown as SomeType`. Use one only when an external library boundary makes it unavoidable, and document the reason.

## Imports

Use one import block with no blank lines.

Order imports as:

1. External dependencies
2. Internal aliases
3. Relative modules

Import from public surfaces when available. Do not reach into another module's internal path to bypass its intended API.

Use type-only imports when an import is used only as a type:

```ts
import type { Order } from "@/types/order";
```

## Functions

Prefer small, intention-focused functions. A function should normally perform one meaningful operation or coordinate a small sequence of closely related operations.

Extract a helper when it:

- Names meaningful behaviour
- Removes genuine duplication
- Isolates a side effect
- Represents a security decision
- Makes behaviour easier to test

Do not extract a helper only to reduce line count.

Avoid vague names such as `handleData`, `processItem`, `doRequest`, `manageState`, and `executeAction`. Use names that describe the specific operation.

## Control Flow

Use guard clauses for:

- Missing authentication
- Incorrect roles
- Invalid input
- Missing resources
- Ownership failures
- Unsupported state transitions
- Failed external operations

Prefer:

```ts
if (!user) {
  throw new Error("Authenticated user is required.");
}

if (user.role !== "admin") {
  throw new Error("Administrator access is required.");
}

return performOperation();
```

Avoid:

```ts
if (user) {
  if (user.role === "admin") {
    return performOperation();
  }
}
```

Do not add `else` after a branch that returns, throws, or otherwise exits.

## Asynchronous Code

Prefer `async` and `await`. Avoid promise chains when sequential code is clearer.

Run independent operations concurrently when safe:

```ts
const [profile, orders] = await Promise.all([
  getProfile(userId),
  getOrders(userId),
]);
```

Do not run operations concurrently when:

- One depends on another
- Ordering is important
- Partial execution could leave inconsistent state
- One operation determines whether another is authorised

Do not leave promises unhandled. Do not add `async` to a function that does not await anything.

## Collections

Prefer:

- `map` for one-to-one transformation
- `filter` for selection
- `find` for locating one item
- `some` for existence checks
- `every` for universal checks

Use a loop when it improves readability, allows early exit, or avoids unnecessary passes.

Use `reduce` only when accumulation is the clearest representation. Do not use it for simple mapping, filtering, or lookup.

## Components and Rendering

Keep server and client responsibilities explicit when the framework distinguishes them.

- Keep server-compatible components on the server unless they need client state, effects, browser APIs, or event handlers.
- Keep client components focused on interaction and presentation.
- Pass serialisable data from server code into focused client components.
- Do not move authorisation into client code.
- Do not expose server-only clients, secrets, or logic to browser bundles.
- Treat hidden UI actions as usability behaviour, not access control.
- Use framework conventions directly instead of wrapping them in unnecessary abstractions.

Keep components focused. Separate a component when it:

- Encapsulates meaningful reusable UI
- Owns a focused interaction
- Makes role-specific behaviour clearer
- Reduces substantial duplication

Do not split a component merely because it has reached an arbitrary line count.

Use descriptive prop names. Avoid passing large generic objects when a component needs only a few fields.

## Request Handlers

Request handlers are security boundaries. For a protected handler, use a readable, flat sequence:

1. Resolve authentication
2. Resolve and enforce the required role
3. Validate parameters and request data
4. Enforce resource ownership and state rules
5. Perform the operation
6. Return the response

```ts
export const GET = async () => {
  const auth = await requireAuthenticatedUser();

  if (auth.role !== "member") {
    return Response.json(
      { message: "Member access is required." },
      { status: 403 },
    );
  }

  const orders = await getOwnedOrders(auth.userId);

  return Response.json({ orders });
};
```

Do not hide important authorisation decisions inside generic request wrappers. Shared authentication and role helpers are appropriate when they make the boundary clearer.

## Authentication and Ownership

Resolve the current user from the trusted server-side session, and the role from trusted application data.

Do not trust:

- Client-provided user IDs or roles
- Request-body ownership fields
- Browser state as proof of authentication
- Unverified authentication metadata
- Email addresses or UI routes as proof of administrative access

Scope reads and mutations of owned resources by the authenticated identity in the query itself, rather than fetching by ID alone and checking ownership afterwards. Assign ownership from the authenticated user on creation. Do not let the client choose the owner.

## Request Validation

Validate all input that causes side effects before performing them.

Validation must cover required fields, types, formats, domain rules, supported state transitions, and route identifiers.

Reject:

- Missing required values
- Incorrect value types
- Invalid dates and out-of-range values
- Unsupported options and actions
- Unexpected fields when they create ambiguity

Keep validation messages sentence case and human readable. Do not rely only on TypeScript types for runtime validation.

## HTTP Responses

Use HTTP statuses consistently:

- `200 OK` for successful reads or idempotent updates
- `201 Created` for successful creation
- `400 Bad Request` for invalid request data
- `401 Unauthorized` when authentication is missing
- `403 Forbidden` when the authenticated role is not permitted
- `404 Not Found` when an accessible resource does not exist
- `409 Conflict` when a state transition conflicts with current state
- `500 Internal Server Error` for unexpected failures

Use a consistent response shape within the repository. Prefer clear messages such as `{ "message": "Order not found." }` over vague ones such as `{ "error": "Something went wrong" }`.

Do not expose raw database, authentication, or infrastructure errors to clients.

## Error Handling

Catch errors at boundaries where they are converted into responses or recovered from.

Do not catch an error solely to log and rethrow it. Do not return stack traces, query text, internal names, or authentication details.

When an unexpected error occurs:

- Log the internal error once, at the boundary that handles it
- Return a safe client-facing message
- Preserve the original error for diagnostics

## Data Access

Select only the columns or fields that are needed.

Always inspect the error result of a data-access call. Do not assume a missing value means a successful empty result.

Keep ownership and role restrictions in the query where possible, and keep storage-level access policies independently enforced.

Do not physically delete records through application operations when the domain defines a status transition instead.

## Environment Variables

Access environment variables through server-safe boundaries.

Do not expose server-only values through a public-prefixed variable.

Validate required variables before use, and throw a clear configuration error when a required value is missing. Validate the format of optional values that change behaviour, and disable the feature when the value is invalid.

## Third-Party Code

Treat third-party scripts and embeds as untrusted.

- Load them deliberately and document what they load and send.
- Isolate them from the main thread or page context where practical.
- Make failure safe: a failing third-party script must not break the page or fall back to a less restricted context.
- Do not load them in a way that blocks the initial render.
- Treat Content Security Policy and similar headers as part of the security surface, and test them.

## Accessibility

Interactive elements must:

- Use semantic HTML
- Have accessible names
- Be keyboard usable
- Communicate disabled and loading states
- Associate labels with inputs
- Expose validation errors meaningfully

Do not use a visual-only element as a button. Use native elements before adding custom keyboard behaviour.
