# Repository Development Instructions

Follow these instructions when reviewing, writing, or modifying code in this repository.

These rules are general engineering policies. They apply to any project and stack. Project-specific facts, such as architecture, commands and domain rules, belong in the project documentation.

Follow these policies unless they conflict with:

1. Correctness or security
2. An explicit task requirement
3. A framework, library, or external contract
4. An established repository convention

When an exception is necessary, keep it narrow and explain the reason.

## Decision Priorities

Make decisions in this order:

1. Correctness
2. Security
3. Maintainability
4. Readability
5. Consistency
6. Measured performance
7. Brevity

Do not sacrifice correctness, security, or readability to comply mechanically with a stylistic preference.

## Before Modifying Code

Before writing or changing code:

- Read the relevant source file completely.
- Inspect neighbouring modules that solve similar problems.
- Inspect the relevant tests.
- Identify the layer responsible for the behaviour.
- Check existing public exports before importing internal files.
- Check whether the change affects security, data access, or an external contract.
- Preserve existing naming and response conventions unless the task explicitly changes them.
- Inspect installed package versions and version-appropriate documentation before using an unfamiliar API. Prefer repository code and documentation over assumptions.

Do not introduce a new pattern when an appropriate repository pattern already exists.

## Scope of Changes

Make the smallest complete change that correctly satisfies the task.

- Do not modify unrelated files.
- Do not rename unrelated symbols.
- Do not perform opportunistic refactors.
- Do not change public APIs unless required.
- Do not add speculative abstractions.
- Do not add a dependency without a clear need. Prefer what the project already uses.
- Update tests when observable behaviour changes.
- Update documentation when commands, architecture, configuration, or externally visible behaviour changes.

A small complete change is preferred over either a broad refactor or an incomplete minimal diff.

## Architecture

Preserve the architecture the project already has.

- Keep framework-specific concerns near framework boundaries.
- Keep validation, side effects, and presentation clearly separated.
- Extract shared logic only when it removes meaningful duplication, defines a security or framework boundary, or represents a stable operation.
- Do not introduce service layers, repositories, or other generic patterns merely to follow a convention.
- Add a layer only when there is a concrete need, such as complex workflows, multi-step transactions, external integrations, multiple entry points, or substantial repeated logic.

## Security

Treat security as a requirement of every change.

- Never treat the user interface as a security boundary. Enforce access rules on the server or in the data layer.
- Enforce authentication and authorization at the boundary that owns the resource. Overlapping checks in more than one layer are intentional defence in depth. Do not remove one because another exists.
- Derive identity and ownership from trusted server-side state. Do not trust identifiers, roles, or ownership values supplied by the client.
- Treat all external input as untrusted until validated: request bodies, URL and search parameters, form data, headers, cookies, environment variables, and third-party responses.
- Grant the least privilege needed and prefer deny by default.
- Do not weaken a security control to make a test or a feature pass.
- Do not commit secrets. Load them from the environment, and do not expose server-only values to browser code.
- Add third-party scripts, embeds, and network destinations deliberately. Document what they load and what they send.
- Treat Content Security Policy and similar response headers as part of the security surface. Any change to them needs a test.

## Functions and Control Flow

Prefer:

- Small functions with one clear responsibility
- Intention-revealing names
- Guard clauses
- Flat control flow
- Explicit boundaries
- Minimal side effects
- Clear separation between validation, authorization, persistence, and response construction

Avoid:

- Deep nesting
- Boolean flag arguments with unclear meaning
- Generic helpers that hide important behaviour
- Premature abstractions
- Functions extracted solely to reduce line count
- Comments that narrate obvious code

Extract a function when it:

- Creates a meaningful abstraction
- Removes genuine duplication
- Isolates a side effect
- Defines a security or framework boundary
- Makes behaviour independently testable

Do not extract code merely to make a function shorter.

## Errors

Application functions return successful values and throw errors on failure.

Do not introduce generic result-object wrappers unless:

- An existing public API requires one
- Partial success is an expected outcome
- Failure is a normal domain value rather than an exceptional condition

Error messages must be:

- Sentence case
- Human readable
- Specific
- Searchable
- Stable when exposed as part of a public contract

Do not expose internal database, authentication, stack-trace, or infrastructure details to clients.

Catch an error only when:

- Recovering from it
- Translating it at a boundary
- Adding meaningful context
- Performing required cleanup
- Converting it into an appropriate response

Do not catch and immediately rethrow an unchanged error.

Features that depend on a third party or the browser, such as analytics, must fail safe. A failure in them must not break the site.

## Logging

Use structured logging only at meaningful boundaries, such as:

- Request handler failures
- Authentication boundaries
- Background or CLI entry points
- Top-level unexpected failures

Do not log:

- Every function call
- Successful routine steps
- The same error at multiple layers
- Secrets, passwords, access tokens, or refresh tokens
- Session values or authentication cookies
- Sensitive personal information

Log an error once at the layer responsible for handling or reporting it.

## Types

Types should prevent mistakes and improve editor support without obscuring runtime behaviour.

- Prefer inferred local types when they are clear.
- Add explicit types at public boundaries.
- Prefer `unknown` over `any`.
- Narrow external data before using it.
- Use targeted `any` only when required by an untyped external boundary, and explain why.
- Use string literal unions instead of enums.
- Prefer `undefined` internally.
- Preserve `null` where an external contract gives it meaning, such as SQL `NULL` or a JSON API.
- Normalise external nullable values at clear boundaries when useful.
- Avoid complicated conditional or generic types when a simpler named type is clearer.

Do not use type assertions to bypass unresolved type errors.

## Modules and Exports

Prefer:

- Named exports
- Exported `const` arrow functions for ordinary module operations
- Imports through public module surfaces
- Functions and plain objects over classes for ordinary application code

Default exports are acceptable where the framework requires or conventionally expects them, including pages, layouts, routes, framework configuration, and other framework-defined entry points.

Follow existing repository conventions when they are more specific.

## Imports

Use one import block with no blank lines.

Order imports as:

1. External packages
2. Internal aliases
3. Relative modules

Use type-only imports when an import is used only as a type.

Import through public module surfaces when available.

Do not reach into another module's internal path to bypass its intended API.

## Asynchronous Code

Prefer `async` and `await` over promise chains.

- Run independent asynchronous operations concurrently where appropriate.
- Await dependent operations sequentially.
- Do not use `Promise.all` when partial execution could leave unsafe side effects.
- Do not leave promises unhandled.
- Do not add `async` when a function does not await anything.
- Preserve readable error boundaries around asynchronous work.

Promise combinators such as `Promise.all` are encouraged when they clearly represent safe concurrent work.

## Collections

Prefer `map`, `filter`, and `find` when they clearly express intent.

Use a loop when it provides:

- Early exit
- Fewer unnecessary passes
- Lower allocation
- Clearer stateful logic
- Better readability

Use `reduce` only when accumulation is genuinely the clearest operation.

Do not create multiple intermediate arrays in performance-sensitive paths without a reason.

## Performance

Avoid obvious unnecessary work, including:

- Repeated queries or network requests
- Unbounded result sets
- Sequential independent requests
- Repeated parsing or transformation
- Avoidable collection passes
- Recreating expensive clients inside repeated operations
- Fetching data that is not used
- Work on the critical rendering path that could run after load

Do not sacrifice readability for speculative optimisation.

Measure material performance changes where practical.

## Accessibility

Interactive elements must:

- Use semantic HTML
- Have accessible names
- Be keyboard usable
- Communicate disabled and loading states
- Associate labels with inputs
- Expose validation errors meaningfully

Use native elements before adding custom keyboard behaviour. Do not use a visual-only element as a button.

## Comments

Comments should explain:

- Why a non-obvious decision exists
- Why a security restriction is required
- Why an exception to the normal approach is necessary
- Why framework behaviour requires an unusual implementation

Do not use comments to repeat what the code already states.

Prefer clearer names and structure over explanatory comments.

## Testing Expectations

Tests must cover observable behaviour affected by a change.

Prioritise tests for:

- Security behaviour and access rules
- Public contracts, including response shape and headers
- Domain rules and state transitions
- Input validation and invalid payloads
- Error handling and safe failure
- Important edge cases

Do not test private implementation details when the same behaviour can be verified through a public boundary.

Do not weaken an assertion merely to make a failing test pass.

Exact error-message assertions are required when the message is part of the public or user-facing contract.

For internal errors, prefer asserting:

- Error type
- Stable error code
- Relevant properties
- Stable message content

Name each test with a behaviour-focused sentence. Keep tests independent, deterministic, and free of shared mutable state.

## Validation Commands

Use the narrowest relevant checks while developing. The project's scripts are defined in `package.json`.

Before considering a substantial change complete, run every applicable check:

- Format check
- Type check
- Lint
- Unit tests
- End-to-end tests
- Production build

When developing a narrow change, run the relevant targeted test first before running the broader suite.

Do not claim that checks passed unless they were actually run.

When a check cannot be run, state:

- Which check was not run
- Why it could not be run
- Which checks were successfully run
