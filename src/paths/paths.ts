export type { pathsof }

import type { any } from "../any/exports.js"
import { assert, expect } from "../test/exports.js"
import type { never } from "../never/exports.js"

type isOptional<key extends keyof type, type>
  = {} extends { [ix in key]: type[ix] } ? true : false

type pathsof<type>
  = Path.go<type, []> extends
  | any.two<any, any.arrayOf<Path.propWithMeta, infer path>>
  ? { [ix in keyof path]: path[ix] extends
    | any.two<infer segment, infer meta>
    ? meta extends typeof Path.Meta.Optional
    ? segment extends any.key
    ? `${segment}?`
    : segment // optional symbol prop
    : path[ix][0]
    : never.close.inline_var<"segment" | "meta">
  }
  : never.close.inline_var<"path">
  ;


declare namespace Path {
  export type go<type, path extends any.array<Path.propWithMeta>>
    = type extends any.primitive ? [𝐋𝐄𝐀𝐅: type, 𝐏𝐀𝐓𝐇: path]
    : type extends any.array ? Path.array<type, path>
    : type extends any.object ? Path.object<type, path>
    : never.close.unmatched_expr
    ;
  export type Meta = typeof Meta[keyof typeof Meta]
  export const Meta: {
    Optional: "Path/Meta::OPTIONAL",
    Required: "Path/Meta::REQUIRED",
  }
  export type propWithMeta = any.two<any.index, Path.Meta>

  export type array<type extends any.array, path extends any.array<Path.propWithMeta>>
    = number extends type["length"] ? Path.go<type[number], [...path, [𝐤𝐞𝐲: number, 𝐦𝐞𝐭𝐚: typeof Meta.Required]]>
    : any.indexOf<type> extends infer ix
    ? ix extends keyof type
    ? isOptional<ix, type> extends true
    ? Path.go<Exclude<type[ix], undefined>, [...path, [𝐤𝐞𝐲: ix, 𝐦𝐞𝐭𝐚: typeof Meta.Optional]]>
    : Path.go<type[ix], [...path, [𝐤𝐞𝐲: ix, 𝐦𝐞𝐭𝐚: typeof Meta.Required]]>
    : never.close.distributive<"ix">
    : never.close.inline_var<"ix">
    ;

  export { object_ as object }

  type object_<type, path extends any.array<Path.propWithMeta>>
    = keyof type extends infer key
    ? key extends keyof type
    ? isOptional<key, type> extends true
    ? Path.go<Exclude<type[key], undefined>, [...path, [𝐤𝐞𝐲: key, 𝐦𝐞𝐭𝐚: typeof Meta.Optional]]>
    : Path.go<type[key], [...path, [𝐤𝐞𝐲: key, 𝐦𝐞𝐭𝐚: typeof Meta.Required]]>
    : never.close.unmatched_expr
    : never.close.inline_var<"key">
    ;
}

export namespace __Spec__ {
  declare const sym: unique symbol

  declare namespace isOptional {
    const expectTrue: isOptional<2, [1, 2, 3?]>
  }

  export const __isOptional__ = [
    //  ^?
    expect(assert.is.true(isOptional.expectTrue)),
  ] as const

  declare namespace pathsof {
    const actual: pathsof<
      {
        a: { b: { c: 1 }, d: 2 },
        e?: ["four", "five"?, "six"?],
        [sym]: { f: number[] }
      }
    >
    const expected:
      | [typeof sym, "f", number]
      | ["a", "b", "c"]
      | ["a", "d"]
      | ["e?", "0"]
      | ["e?", "1?"]
      | ["e?", "2?"]
      ;
  }

  export const __pathof__ = [
    //  ^?
    expect(assert.equal(pathsof.actual, pathsof.expected))
  ] as const
}

