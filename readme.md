
# FAQ

- **Q:** What's with the empty namespaces?

- **A:** Those are how we support namespace aliasing with [`import equals`](https://www.typescriptlang.org/docs/handbook/namespaces.html#aliases).

`import equals` is an old and (unfortunately) obscure TypeScript feature that solves
what I'll call "the aliasing problem". Let's look at an example.

Let's say `any-ts` *didn't* export the `nonempty` namespace at the top-level (we do). No problem -- you'd still be
able to reference it by its fully-qualified name:

```ts
import { type any } from "any-ts"

declare function safeHead<const list extends any.nonempty.array>(list: list): list[0]
```

That _works_, but let's say you're super into brevity, and would prefer to simply use `nonempty.array`.

Here's one way you could achieve that:

```typescript
import { type any } from "any-ts"

type NonEmptyArray<
  head = unknown, 
  tail extends any.array = any.array<head>
> = any.nonempty.array<head, tail>

declare function safeHead<const list extends NonEmptyArray>(list: list): list[0]
```

That also works. But what have we gained by doing this? This doesn't really scale, especially with
trivial type constructors like the ones that `any-ts` provides: you'd be better off copying the
source code and copy/pasting `nonempty` somewhere at the top-level.

This is a good use case for `import =`:

```typescript
import { type any } from "any-ts"

import nonempty = any.nonempty

declare function safeHead<const list extends nonempty.array>(list: list): list[0]
```

Looks great!

But `import =` doesn't work if the target namespace is exported using the `type` keyword. And
simply removing `type` from `export { type nonempty }` doesn't work unless the `nonempty` namespace
exports at least one term.

That's why for every ambient namespace we expose, we also expose a regular namespace that includes 
a single term called `never` whose type is `never` and whose runtime value is `undefined`.

If you don't want to include that single term in your bundle, you can still do `import type { any } from "any-ts"`
and it won't be added to your bundle.
