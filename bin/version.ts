#!/usr/bin/env pnpx tsx
import * as FileSystem from "node:fs"
import * as Url from "node:url"
import * as OS from "node:os"
import * as Shell from 'child_process'

type Result<ok, err> = Ok<ok> | Err<err>

interface Ok<ok> { _tag: "Result::Ok", ok: ok }
interface Err<err> { _tag: "Result::Err", err: err }

const ok
  : <const ok, err = never>(ok: ok) => Result<ok, err>
  = (ok) => ({ _tag: "Result::Ok", ok })

const isOk
  : <const ok, err>(result: Result<ok, err>) => result is Ok<ok>
  = (result): result is never => result._tag === "Result::Ok"

const isErr
  : <const ok, err>(result: Result<ok, err>) => result is Err<err>
  = (result): result is never => result._tag === "Result::Err"

const err
  : <const err, ok = unknown>(err: err) => Result<ok, err>
  = (err) => ({ _tag: "Result::Err", err })

interface Task<ok, err> {
  (): Promise<Result<ok, err>>
}

const run
  : <type>(f: () => type) => type
  = (f) => f()

export function map<a, b, err>(f: (a: a) => b): (task: Task<a, err>) => Task<b, err>
export function map<a, b, err>(f: (a: a) => b) {
  return (task: Task<a, err>) => () =>
    Promise.resolve()
      .then(task)
      .then((a) => isOk(a) ? ok(f(a.ok)) : a)
}

export function flatMap<a, b, err>(f: (a: a) => Task<b, err>): (task: Task<a, err>) => Task<b, err>
export function flatMap<a, b, err>(f: (a: a) => Task<b, err>) {
  return (task: Task<a, err>) => () =>
    Promise.resolve()
      .then(task)
      .then((a) => isOk(a) ? run(f(a.ok)) : a)
}

interface CLI {
  exec(cmd: string, args?: Shell.ExecOptions): Task<void, Error>
}

const isNull
  = (u: unknown): u is null => u === null
const isNotNull
  = <u extends {} | null | undefined>(u: u): u is Exclude<u, null> => u !== null

const CLI: CLI = {
  exec: (cmd, args) => () =>
    new Promise((resolve) =>
      Shell.exec(
        cmd,
        args,
        (e) => isNull(e)
          ? resolve(ok(void 0))
          : resolve(err(e))
      )
    )
}

type intercalate<acc extends string, xs extends readonly unknown[], btwn extends string>
  = xs extends readonly [infer head extends string, ...infer tail]
  ? intercalate<acc extends "" ? `${head}` : `${acc}${btwn}${head}`, tail, btwn>
  : acc
  ;

type join<
  xs extends readonly literal[],
  btwn extends string = ""
> = intercalate<"", xs, `${btwn}`>

type literal = string | number | boolean | bigint

const join
  : <btwn extends string>(btwn: btwn) => <const xs extends readonly string[]>(...xs: xs) => join<xs, btwn>
  = (btwn) => (...xs) => xs.join(btwn) as never

const root: `~` = Url.fileURLToPath(new URL("..", import.meta.url)) as never

const path
  : <xs extends readonly literal[]>(...xs: xs) => join<xs, "/">
  = (...[head, ...tail]: readonly literal[]) => {
    const hd = head ? `${head}` : "/"

    return tail.map(String).reduce(
      (path, s) => {
        console.log("s", s)

        return s === "" ? `${path}`
          : s.startsWith("/") ? s.endsWith("/") ? `${path}${s.slice(1, 1)}` : `${path}${s.slice(0, 1)}/`
            : s.endsWith("/") ? `${path}${s}`
              : `${path}${s}/`
      },
      hd.startsWith("/") ? hd.endsWith("/") ? hd : `${hd}/` : hd.endsWith("/") ? `/${hd}` : `/${hd}/`
    ) as never
  }

function fromRoot(...xs: []): typeof root
function fromRoot<const xs extends readonly string[]>(...xs: xs): join<[typeof root, ...xs], "/">
function fromRoot<const xs extends readonly string[]>(...xs: xs): string {
  return path(root, ...xs)
}

const versionFile = fromRoot("src", "version.ts")

declare namespace Cause {
  interface PathNotFound<path extends string = string> {
    readonly tag: "PathNotFound";
    readonly message: `Path not found, received: \`${path}\`` | `Path not found`
  }
}
namespace Cause {
  export const PathNotFound = (path: unknown): PathNotFound => ({
    tag: "PathNotFound",
    message: typeof path === "string" ? `Path not found, received: \`${JSON.stringify(path)}\`` : `Path not found`
  })
}

function readFile(filepath: `${typeof root}${string}`): string | Cause.PathNotFound {
  try { return FileSystem.readFileSync(filepath).toString("utf-8") }
  catch (err) { return Cause.PathNotFound(err) }
}

function writeFile(filepath: `${typeof root}${string}`): (contents: string) => void | Cause.PathNotFound {
  return (contents) => {
    try { return FileSystem.writeFileSync(filepath, contents) }
    catch (err) { return Cause.PathNotFound(err) }
  }
}

const versionTemplate = (version: string) =>
  `export const ANY_TS_VERSION = "${version}" as const${OS.EOL}`
    .concat(`export type ANY_TS_VERSION = typeof ANY_TS_VERSION`)

const hasVersion
  : (u: unknown) => u is Exclude<{ version: string }, null | undefined>
  = (u): u is never => u !== null && typeof u === "object" && "version" in u && typeof u.version === "string"

const readPackageVersion = () => {
  const manifest = fromRoot("package.json")
  if (typeof manifest === "object") throw manifest
  const json: {} | null | undefined = JSON.parse(manifest)
  return hasVersion(json) ? json.version : void 0 as never
}

/**
 * Reads the package version from `package.json` and writes it as
 * a value to `src/version.ts`.
 * 
 * This function is called by the script that publishes the package,
 * and makes sure that the `ANY_TS_VERSION` identifier that ships
 * with `any-ts` stays up to date with the actual version that's 
 * published.
 */
const writeVersion = () => {
  const version = readPackageVersion()

  if (version) {

    console.log(`\nWriting package version \`${version}\` to:\n${versionFile}\n`)
    writeFile(versionFile)(versionTemplate(version))
  }

  const fileContents = readFile(`${root}package.json`)
  if (typeof fileContents === "object") throw fileContents
  const json = JSON.parse(fileContents)
  if ("version" in json && typeof json.version === "string") {
    console.log(`\nWriting package version \`${json.version}\` to:\n${versionFile}\n`)
    writeFile(versionFile)(versionTemplate(json.version))
  }
}

const tap
  : (msg: string, effect: (...args: any) => unknown) => <type>(x: type) => type
  = (msg, effect = console.log) => (x) => {
    effect(msg, x)
    return x
  }

const main2 = pipe(
  CLI.exec("git checkout @ahrjarrett/test"),
  // flatMap(() => CLI.exec("./bin/version.ts")),
  flatMap(() => CLI.exec("git add -A")),
  flatMap(() => CLI.exec("git commit -m \"writes package version to version.ts\"")),
  flatMap(() => CLI.exec("pnpm build")),
  // flatMap(() => CLI.exec("pnpm publish")),
)

// git checkout main && ./bin/version.ts && git add -A && git commit -m \"writes package version to version.ts\" && pnpm build && pnpm publish

const main = () => {
  /** 
   * Writes the version from `package.json#version` to `src / version.ts`.
   * We write the version as a TypeScript string literal and export it
   * from the library as a type-level indicator of what version of the
   * library users have installed.
   */
  writeVersion()
}

// main()

run(main2)

/**
 * Pipes the value of an expression into a pipeline of functions.
 *
 * See also [`flow`](#flow).
 *
 * @example
* import { pipe } from 'fp-ts/function'
*
* const len = (s: string): number => s.length
* const double = (n: number): number => n * 2
*
* // without pipe
* assert.strictEqual(double(len('aaa')), 6)
*
* // with pipe
* assert.strictEqual(pipe('aaa', len, double), 6)
*
* @since 2.6.3
*/
export function pipe<A>(a: A): A
export function pipe<A, B>(a: A, ab: (a: A) => B): B
export function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
export function pipe<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D
export function pipe<A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E
export function pipe<A, B, C, D, E, F>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F): F
export function pipe<A, B, C, D, E, F, G>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G): G
export function pipe<A, B, C, D, E, F, G, H>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H): H
export function pipe<A, B, C, D, E, F, G, H, I>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I): I
export function pipe<A, B, C, D, E, F, G, H, I, J>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J): J
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K): K
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L): L
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M): M
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N): N
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O): O
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P): P
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q): Q
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R): R
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R, rs: (r: R) => S): S
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E, ef: (e: E) => F, fg: (f: F) => G, gh: (g: G) => H, hi: (h: H) => I, ij: (i: I) => J, jk: (j: J) => K, kl: (k: K) => L, lm: (l: L) => M, mn: (m: M) => N, no: (n: N) => O, op: (o: O) => P, pq: (p: P) => Q, qr: (q: Q) => R, rs: (r: R) => S, st: (s: S) => T): T

export function pipe(a: unknown, ab?: Function, bc?: Function, cd?: Function, de?: Function, ef?: Function, fg?: Function, gh?: Function, hi?: Function): unknown {
  switch (arguments.length) {
    case 1: return a
    case 2: return ab!(a)
    case 3: return bc!(ab!(a))
    case 4: return cd!(bc!(ab!(a)))
    case 5: return de!(cd!(bc!(ab!(a))))
    case 6: return ef!(de!(cd!(bc!(ab!(a)))))
    case 7: return fg!(ef!(de!(cd!(bc!(ab!(a))))))
    case 8: return gh!(fg!(ef!(de!(cd!(bc!(ab!(a)))))))
    case 9: return hi!(gh!(fg!(ef!(de!(cd!(bc!(ab!(a))))))))
    default: {
      let ret = arguments[0]
      for (let i = 1; i < arguments.length; i++)
        ret = arguments[i](ret)
      return ret
    }
  }
}
