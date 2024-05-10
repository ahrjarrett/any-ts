import * as FileSystem from "node:fs"
import * as Path from "node:path"
import * as OS from "node:os"

import { $ } from "./cli.js"

function log(...args: readonly unknown[]) {
  console.log()
  console.log(`\t✨`, ...args)
}

namespace log {
  export const error = (taskName: string, ...args: readonly unknown[]) => {
    console.log()
    console.error(`🚫\t`, `Execution failed with message:\n ❌\t${taskName}`)
    if (args.length > 0) console.info(`🫥\t`, `Additional context:`, ...args)
  }

  export const thenDie = (taskName: string, ...args: readonly unknown[]) => {
    log.error(taskName, ...args)
    return process.exit(1)
  }
}

function run<fns extends readonly (() => unknown)[]>(...fns: fns): { [ix in keyof fns]: globalThis.ReturnType<fns[ix]> }
function run(...fns: (() => unknown)[]) { return fns.map(fn => fn()) }

const path
  : (...[head, ...tail]: string[]) => string
  = (...[head, ...tail]) => {
    const hd = head ? `${head}` : "/";
    const path = tail.map(String).reduce(
      (path, s) => {
        return s === "" ? `${path}`
          : s.startsWith("/") ? s.endsWith("/") ? `${path}${s.slice(1, 1)}`
            : `${path}${s.slice(0, 1)}/`
            : `${path}${s}`.concat(s.endsWith("/") ? "" : "/")
      },
      hd.startsWith("/") ? hd.endsWith("/") ? hd : `${hd}/` : hd.endsWith("/") ? `/${hd}` : `/${hd}/`
    )
    return (path.endsWith("/") ? path.slice(0, -1) : path) as never
  }

const versionFile = Path.join(Path.resolve(), "src", "version.ts")
console.log("\nversionFile", versionFile)

declare namespace Cause {
  interface PathNotFound<path extends string = string> {
    readonly tag: "PathNotFound";
    readonly message: `Path not found, received: \`${path}\`` | `Path not found`
  }
}
namespace Cause {
  export const PathNotFound = (path: unknown): PathNotFound => ({
    tag: "PathNotFound",
    message: typeof path === "string" ? `Path not found, received: \`${path}\`` : `Path not found`
  })
}

function readFile(filepath: string): string | Cause.PathNotFound {
  try { return FileSystem.readFileSync(filepath).toString("utf-8") }
  catch (err) { return Cause.PathNotFound(err) }
}

function writeFile(filepath: string): (contents: string) => void | Cause.PathNotFound {
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

const readPackageVersion = (): string => {
  const manifest = readFile(Path.join(Path.resolve(), "package.json"))
  if (typeof manifest === "object") throw ["Expected manifest to be a string", manifest]
  const json: {} | null | undefined = JSON.parse(manifest)
  if (hasVersion(json)) return json.version
  else throw ["Expected manifest to have a version", json]
}

const versionTemplate: (version: string) => string
  = (version) => [
    `export const ANY_TS_VERSION = "${version}" as const`,
    `export type ANY_TS_VERSION = typeof ANY_TS_VERSION`,
  ].join(OS.EOL)

/**
 * Reads the package version from `package.json` and writes it as
 * a value to `src/version.ts`.
 * 
 * This function is called by the script that publishes the package,
 * and makes sure that the `ANY_TS_VERSION` identifier that ships
 * with `any-ts` stays up to date with the actual version that's 
 * published.
 */
const writeVersion = (v: string): void => {
  return void (v && v.length > 0 && writeFile(versionFile)(versionTemplate(v)))
}

function commitWorktree(version: string): void {
  return void run(
    $.exec(`git add -A`),
    $.exec(`git commit -m "bump: v${version}"`),
  )
}

function checkCleanWorktree(): void {
  // return void 
  try {
    run(
      $.exec(`git add --all`),
      $.exec(`git diff-index --exit-code HEAD`),
    )
  } catch (e) {
    log.thenDie(`Failure: unclean worktree -- commit or discard your changes before attempting to version package`)
  }
}

function commitVersion(version: string) {
  run($.exec(`git add src/version.ts && git commit -m "automated: writes version ${version} to 'src/version.ts'"`))
}

const main = () => {
  const prev = readPackageVersion()

  run(
    checkCleanWorktree,
    // $.exec(`pnpm run changes`),
    $.exec(`pnpm changeset version`),
  )

  const next = readPackageVersion()

  if (prev === next) {
    log.error(`No version change detected`)
    log.thenDie(`Compared previous version (\`v${prev}\`) with the current version (\`v${next}\`)`)
  }

  else {
    log(`Writing package version \`v${next}\` to:${OS.EOL}\t${versionFile}`)
    writeVersion(next)

    log(`Committing with changes to ${versionFile}`)
    commitWorktree(next)

    log(`kicking off build script`)
    try { run($.exec(`pnpm run build`)) }
    catch (e) { log.thenDie(`pnpm build`, e) }

    log(`Done! Run ${OS.EOL}${OS.EOL}\tpnpm publish${OS.EOL}${OS.EOL}to push things to npm.`)
  }
}

run(main)

// log(`Writing package version \`v${next}\` to:${OS.EOL}\t${versionFile}`)
// writeVersion(next)
// log(`Committing with changes to ${versionFile}`)
// try { commitVersion(next) }
// catch (e) { log(`Nothing to commit!`) }
// log(`kicking off build script`)
// try { run($.exec("pnpm build")) }
// catch (e) { logError("pnpm build", e) }
// log(`Done! Run ${OS.EOL}${OS.EOL}\tpnpm publish${OS.EOL}${OS.EOL}to push things to npm.`)
// // TODO: get publishing working (probably just need to do this via a shell file)
// /**
//  * log(`publishing...`)
//  * try {
//  *   log(`successfully published \`any-ts′ version \`${v}\` 😊`)
//  *   log(`https://www.npmjs.com/package/any-ts/v/${v}`)
//  * }
//  * catch (e) { logError("pnpm publish", e) }
//  */
//
//
// type Result<ok, err> = Ok<ok> | Err<err>
// interface Ok<ok> { _tag: "Result::Ok", ok: ok }
// interface Err<err> { _tag: "Result::Err", err: err }
// const ok
//   : <const ok, err = never>(ok: ok) => Result<ok, err>
//   = (ok) => ({ _tag: "Result::Ok", ok })
// const isOk
//   : <const ok, err>(result: Result<ok, err>) => result is Ok<ok>
//   = (result): result is never => result._tag === "Result::Ok"
// const isErr
//   : <const ok, err>(result: Result<ok, err>) => result is Err<err>
//   = (result): result is never => result._tag === "Result::Err"
// const err
//   : <const err, ok = unknown>(err: err) => Result<ok, err>
//   = (err) => ({ _tag: "Result::Err", err })
// interface Task<ok, err> {
//   (): Promise<Result<ok, err>>
// }
// export function map<a, b, err>(f: (a: a) => b): (task: Task<a, err>) => Task<b, err>
// export function map<a, b, err>(f: (a: a) => b) {
//   return (task: Task<a, err>) => () =>
//     Promise.resolve()
//       .then(task)
//       .then((a) => isOk(a) ? ok(f(a.ok)) : a)
// }
// export function flatMap<a, b, err>(f: (a: a) => Task<b, err>): (task: Task<a, err>) => Task<b, err>
// export function flatMap<a, b, err>(f: (a: a) => Task<b, err>) {
//   return (task: Task<a, err>) => () =>
//     Promise.resolve()
//       .then(task)
//       .then((a) => isOk(a) ? run(f(a.ok)) : a)
// }
