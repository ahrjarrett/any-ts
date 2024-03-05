#!/usr/bin/env pnpx tsx
import * as FileSystem from "node:fs"
import * as Url from "node:url"
import * as OS from "node:os"
import * as Shell from 'node:child_process'

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
  exec(cmd: string, args?: Shell.ExecOptions): () => string | Buffer
}

const $: CLI = ({
  exec: (cmd: string, args?: Shell.ExecSyncOptions) => () =>
    Shell.execSync(
      cmd,
      { stdio: "inherit", ...args },
    )
})

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

const path
  : <xs extends readonly literal[]>(...xs: xs) => join<xs, "/">
  = (...[head, ...tail]: readonly literal[]) => {
    const hd = head ? `${head}` : "/";
    const path = tail.map(String).reduce(
      (path, s) => {
        return s === "" ? `${path}`
          : s.startsWith("/") ? s.endsWith("/") ? `${path}${s.slice(1, 1)}` : `${path}${s.slice(0, 1)}/`
            : s.endsWith("/") ? `${path}${s}`
              : `${path}${s}/`
      },
      hd.startsWith("/") ? hd.endsWith("/") ? hd : `${hd}/` : hd.endsWith("/") ? `/${hd}` : `/${hd}/`
    )
    return (path.endsWith("/") ? path.slice(0, -1) : path) as never
  }

const root: `~` = Url.fileURLToPath(new URL("..", import.meta.url)) as never

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

const hasVersion
  = (u: unknown): u is Exclude<{ version: string }, null | undefined> =>
    u !== null &&
    typeof u === "object" &&
    "version" in u &&
    typeof u.version === "string"
  ;

const readPackageVersion = () => {
  const manifest = readFile(fromRoot("package.json"))
  if (typeof manifest === "object") throw manifest
  const json: {} | null | undefined = JSON.parse(manifest)
  return hasVersion(json) ? json.version : void 0 as never
}

const versionTemplate = (version: string) =>
  `export const ANY_TS_VERSION = "${version}" as const${OS.EOL}`
    .concat(`export type ANY_TS_VERSION = typeof ANY_TS_VERSION`)


const log = (...args: readonly unknown[]) => {
  console.log()
  console.log(`✨\t`, ...args)
}

const logError = (taskName: string, ...args: readonly unknown[]) => {
  console.log()
  console.error(`🚫\t`, `failure occurred during task ${taskName}`)
  if (args.length > 0) console.info(`🫥\t`, `additional context:`, ...args)
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
const writeVersion = (version: string) => {
  version && writeFile(versionFile)(versionTemplate(version))
}

function commitVersion(version: string) {
  run($.exec(`git add src/version.ts && git commit -m "automated: writes version ${version} to \`src/version.ts\`"`))
}

function publish(version: string) {
  run($.exec("pnpm publish"))
}

const main = () => {
  const version = readPackageVersion()
  log(`releasing version v${version} 🤞`)

  log(`Writing package version \`${version}\` to:${OS.EOL}\t${versionFile}`)
  writeVersion(version)

  log(`Committing with changes to ${versionFile}`)
  commitVersion(version)

  log(`kicking off build script`)
  try { run($.exec("pnpm build")) }
  catch (e) { logError("pnpm build") }

  // log(`publishing...`)
  // try {
  //   log(`successfully published \`any-ts\` version \`${version}\` 😊`)
  //   log(`https://www.npmjs.com/package/any-ts/v/${version}`)
  // }
  // catch (e) { logError("pnpm publish") }

}

run(main)
