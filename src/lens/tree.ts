import * as any from "../any"
import { never } from "../semantic-never/exports";
import { empty, nonempty } from "../empty"
import { traversable } from "../traversable/traversable"
import { Union } from "../union/exports";
import { Err } from "../err/exports";

type Tree<type> = {
  value: type
  children: readonly Tree<type>[]
}

declare namespace impl {
  type splitPath<acc extends any.array, type extends string, delimiter extends any.showable>
    = Union.is<delimiter> extends true ? Fn.return<typeof Err.NonUnion<delimiter>>
    : type extends empty.string ? acc
    : type extends `${infer head}${delimiter}${infer tail}`
    ? impl.splitPath<[...acc, head], tail, delimiter>
    : [...acc, type]
    ;
  type joinTrees<acc, trees extends any.array>
    = trees extends empty.array ? acc
    : trees extends nonempty.array<infer head, infer tail>
    ? joinTrees<joinRight<acc, head>, tail>
    : never.illegal_state<"unhandled case in `impl.joinTrees`">
    ;
}

type splitPath<path extends string, delimiter extends any.showable> = impl.splitPath<[], path, delimiter>
type splitPaths<paths extends any.array<string>, delimiter extends any.showable>
  = { [ix in keyof paths]: splitPath<paths[ix], delimiter> }

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

type fromPaths<delimiter extends any.showable, type extends any.array<any.string>>
  = splitPaths<type, delimiter> extends any.arrayof<any.array<string>, infer split>
  ? { [ix in keyof split]: traversable.unfold<{}, split[ix]> } extends any.list<infer trees>
  ? impl.joinTrees<unknown, trees>
  : never.close.inline_var<"trees">
  : never.close.inline_var<"split">
  ;

const make
  : <const value, const children extends any.array>(value: value, children: children) => { value: value, children: children }
  = (value, children) => ({ value, children })

const unmake
  : <const type extends any.showable>(tree: Tree<type>) => { [ix in `${type}`]: {} }
  = (tree) => ({ [`${tree.value}`]: tree.children.map(unmake).reduce((acc, curr: any.object) => ({ ...acc, ...curr }), {}) }) as never

function fromPaths<delimiter extends any.showable, const paths extends any.array<any.string>>(
  delimiter: delimiter,
  ...paths: paths
): fromPaths<delimiter, paths>

function fromPaths(delimiter: any.showable, ...paths: any.array<any.string>): unknown {
  const ps = paths.map(path => `${path}`.split(`${delimiter}`))
  const go
    : (paths: any.array<any.array<string>>) => any.array<Tree<string>>
    = (paths) => {
      if (paths[0] && paths[0].length === 0) return []
      else {
        const branches = paths.reduce(
          (acc, [head, ...tail]) => !head ? acc : ({
            ...acc,
            [head]: [...(acc[head as never] ? acc[head as never] : [tail])]
          }),
          {}
        )
        return Object.entries(branches).map(([k, v]) => make(k, go(v as never)))
      }
    }

  return unmake(make("tmp", go(ps))).tmp
}

declare namespace Fn {
  export type arg0<type> = type extends (..._: infer args) => any ? args[0] : never
  type return_<type> = type extends (..._: any) => infer out ? out : never
  export { return_ as return }
}

declare namespace __Spec__ {
  type __fromPaths__ = [
    fromPaths<".", ["a.b.c", "a.b.d", "b.f.l"]>
  ]

  type __splitPath__ = [
    splitPath<"", ".">,
    splitPath<"", "">,
    splitPath<".", ".">,
    splitPath<"abc", "abc.">,
    splitPath<"abc.def.ghi.jkl", ".">,
  ]
}
