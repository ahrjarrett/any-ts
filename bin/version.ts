#!/usr/bin/env pnpx tsx
import * as FileSystem from "node:fs"
import * as Url from "node:url"
import * as OS from "node:os"

type intercalate<acc extends string, xs extends readonly unknown[], btwn extends string>
  = xs extends readonly [infer head extends string, ...infer tail]
  ? intercalate<acc extends "" ? `${head}` : `${acc}${btwn}${head}`, tail, btwn>
  : acc
  ;

type join<
  xs extends readonly string[],
  btwn extends string = ""
> = intercalate<"", xs, `${btwn}`>

const join
  : <btwn extends string>(btwn: btwn) => <const xs extends readonly string[]>(...xs: xs) => join<xs, btwn>
  = (btwn) => (...xs) => xs.join(btwn) as never

const root: `~` = Url.fileURLToPath(new URL("..", import.meta.url)) as never
const versionFile = root.concat(join("/")("src", "version.ts"))

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
  const fileContents = readFile(`${root}package.json`)
  if (typeof fileContents === "object") throw fileContents
  const json = JSON.parse(fileContents)
  if ("version" in json && typeof json.version === "string") {
    console.log(`\nWriting package version \`${json.version}\` to:\n${versionFile}\n`)
    writeFile(versionFile)(versionTemplate(json.version))
  }
}

const main = () => {
  /** 
   * Writes the version from `package.json#version` to `src / version.ts`.
   * We write the version as a TypeScript string literal and export it
   * from the library as a type-level indicator of what version of the
   * library users have installed.
   */
  writeVersion()
}

main()
