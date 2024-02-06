import * as any from "../any"
import { never } from "../semantic-never/exports";
import { empty, nonempty } from "../empty"
import { traversable } from "../traversable/traversable"
import { Union } from "../union/exports";
import { Err } from "../err/exports";
import { Fn } from "../function/exports";

type pathlike<leaf extends any.object = {}> = any.showable | readonly [any.showable, leaf]

const map
  : <a, b>(f: (a: a) => b)
    => <type extends any.dictionary<a>>(object: type)
      => { [ix in keyof type]: b }
  = (f) => (object) => {
    let out: any.indexedby<keyof typeof object> = {} as never
    for (const k in object) {
      out[k] = f(object[k] as never)
    }
    return out as never
  }

const isShowable = (u: unknown): u is any.showable =>
  typeof u === "string" ||
  typeof u === "number" ||
  typeof u === "boolean" ||
  (u == null)
  ;

const standardizePaths
  : <delimiter extends any.showable, onEmpty extends () => {}>
    (delimiter: delimiter, onEmpty: onEmpty)
    => <const paths extends any.array<pathlike>>(paths: paths)
      => any.array<any.two<string[], () => {}>>
  = (delimiter, onEmpty) => (paths) => paths
    .map(
      pathlike => isShowable(pathlike)
        ? [pathlike, onEmpty] as const
        : [pathlike[0], () => pathlike[1]] as const)
    .map(
      ([delimited, leaf]) =>
        [`${delimited}`.split(`${delimiter}`), leaf] as const)
  ;

declare namespace impl {
  type splitPath<acc extends any.array, type extends any.showable, delimiter extends any.showable>
    = Union.is<delimiter> extends true ? Fn.return<typeof Err.NonUnion<delimiter>>
    : [type] extends [any.number] ? (1)
    : [`${type}`] extends [empty.string] ? acc
    : [`${type}`] extends [`${infer head}${delimiter}${infer tail}`]
    ? impl.splitPath<[...acc, head], tail, delimiter>
    : [...acc, `${type}`]
    ;
  type joinTrees<acc, trees extends any.array>
    = trees extends empty.array ? acc
    : trees extends nonempty.array<infer head, infer tail>
    ? joinTrees<joinRight<acc, head>, tail>
    : never.illegal_state<"unhandled case in `impl.joinTrees`">
    ;
}

type splitPath<path extends any.showable, delimiter extends any.showable> = impl.splitPath<[], path, delimiter>
type splitPaths<paths extends any.array<pathlike>, delimiter extends any.showable>
  = { [ix in keyof paths]
    : paths[ix] extends infer v
    ? v extends readonly [any.showable<infer path>, infer tag]
    ? [tag, splitPath<path, delimiter>]
    : v extends any.showable
    ? [typeof primitive.AnyObject, splitPath<v, delimiter>]
    : never
    : never
  }

type joinRight<left, right> = never.as_identity
  | [right] extends [never] ? left
  : [right] extends [any.primitive] ? right
  : [left] extends [any.primitive] ? right
  : { [ix in keyof left | keyof right]
    : joinRight<
      ix extends keyof left ? left[ix] : never,
      ix extends keyof right ? right[ix] : never
    >
  }

function fromPaths<
  delimiter extends any.showable,
  const onEmpty extends () => {}
>(
  delimiter: delimiter,
  onEmpty: onEmpty
) {
  return <const paths extends any.array<pathlike>>(...paths: paths) => {
    const ps = standardizePaths(delimiter, onEmpty)(paths)

    const go
      : (pathways: any.array<any.two<string[], () => {}>>) => unknown
      = (pathways) => {
        const reducedPairs = pathways.reduce(
          (acc, [[head, ...tail], leaf]) =>
            typeof leaf === "function"
              ? leaf
              : { ...acc, [head as never]: [...(acc[head as never] ? [...acc[head as never], tail] : [tail])] }
          , {}
        )

        return typeof reducedPairs === "function"
          ? reducedPairs()
          : map(go)(reducedPairs)
      }

    return go(ps)
  }
}
