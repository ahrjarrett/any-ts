export {
  Focus,
}

import { any, describe, empty, expect, never, nonempty } from "../exports"
import { traversable } from "../traversable/traversable"

declare namespace List {
  type head<type extends any.array> = type[0]
  type tail<type extends any.array>
    = type extends readonly [any, ...infer tail] ? tail : never
  type lead<type extends any.array> = type extends readonly [...infer lead, any] ? lead : never
  type last<type extends any.array> = type extends readonly [...any, infer last] ? last : never

  type behead<type extends nonempty.array> = type extends readonly [infer head, ...infer tail] ? readonly [head: head, tail: tail] : never
  type dequeue<type extends nonempty.array> = type extends readonly [...infer lead, infer last] ? readonly [lead: lead, last: last] : never
}

interface Ok<ok> { tag: "Ok", ok: ok }
interface Err<err> { tag: "Err", err: err }
type Result<ok, err> = Ok<ok> | Err<err>

declare namespace Ok {
  type infer<type extends Result<any, any>> = type extends Result<infer ok, any> ? ok : never
}

declare namespace Err {
  type infer<type extends Err<any>> = type extends Err<infer err> ? err : never
}

type PartialParams<
  structure = unknown,
  tried extends any.index = any.index,
> = never | [𝐬𝐭𝐫𝐮𝐜𝐭𝐮𝐫𝐞: structure, 𝐭𝐫𝐢𝐞𝐝: tried]

type FullParams<
  focus = unknown,
  tried extends any.index = any.index,
  breadcrumbs extends any.path = any.path,
  structure = unknown,
> = never | [𝐬𝐭𝐫𝐮𝐜𝐭𝐮𝐫𝐞: structure, 𝐛𝐫𝐞𝐚𝐝𝐜𝐫𝐮𝐦𝐛𝐬: breadcrumbs, 𝐟𝐨𝐜𝐮𝐬: focus, 𝐭𝐫𝐢𝐞𝐝: tried]

declare namespace TypeError {
  interface PathNotFound<params extends PartialParams>
    extends Err<{
      tag: "SegmentNotFound"
      tree: params[0]
      tried: params[1]
    }> { }
  interface PathNotFoundExtended<params extends FullParams>
    extends Err<{
      tag: "SegmentNotFound"
      focus: params[0]
      segment: params[1]
      history: params[2]
    }> { }
}

declare namespace impl {
  type fold<tree, path extends any.path>
    = path extends empty.path ? tree
    : path extends nonempty.path<any.keyof<tree, infer head>, infer tail>
    ? impl.fold<tree[head], tail>
    : never.close.inline_var<"head" | "tail">
    ;

  type safeFold<tree, path extends any.path>
    = path extends empty.path ? Ok<tree>
    : path extends nonempty.path<any.keyof<tree, infer head>, infer tail>
    ? impl.safeFold<tree[head], tail>
    : TypeError.PathNotFound<PartialParams<tree, List.head<path>>>
    ;

  interface Metadata { history: any.path, structure: unknown }

  type foldWithDebugger<
    tree,
    path extends any.path,
    debug extends Metadata
  >
    = path extends empty.path ? tree
    :
    path extends nonempty.path<
      any.keyof<tree, infer head>,
      infer tail
    >
    ?
    impl.foldWithDebugger<
      tree[head],
      tail,
      {
        history: [...debug["history"], head],
        structure: debug["structure"]
      }
    >
    :
    TypeError.PathNotFoundExtended<
      FullParams<tree, List.head<path>,
        debug["history"],
        debug["structure"]
      >
    >
    ;

  type safeFoldWithDebugger<
    tree,
    path extends any.path,
    meta extends Metadata
  >
    = path extends empty.path ? Ok<tree>
    :
    path extends nonempty.path<
      any.keyof<tree, infer head>,
      infer tail
    >
    ?
    impl.safeFoldWithDebugger<
      tree[head],
      tail,
      {
        history: [...meta["history"], head],
        structure: meta["structure"]
      }
    >
    :
    TypeError.PathNotFoundExtended<
      FullParams<tree, List.head<path>,
        meta["history"],
        meta["structure"]
      >
    >
    ;

  type unfold<
    path extends any.path,
    leaf
  > = path extends empty.path ? leaf
    : path extends nonempty.pathLeft<infer init, infer last>
    ? impl.unfold<init, { readonly [ix in last]: leaf }>
    : never.close.inline_var<"init" | "last">
    ;

  type merge<union>
    = { [ix in union extends union ? keyof union : never.close.distributive]
      : union extends any.indexedby<ix> ? union[ix] : never.close.distributive }
    ;

  type mergeTrees<union> = never.as_identity
    | [union] extends [any.primitive] ? union :
    { [ix in union extends union ? keyof union : never.close.distributive]
      : impl.mergeTrees<union extends any.indexedby<ix> ? union[ix] : never.close.distributive> }
    ;

  type joinLeft<left, right> = never.as_identity
    | [left] extends [never] ? right
    : [left] extends [any.primitive] ? left
    : [right] extends [any.primitive] ? left
    : { [ix in keyof left | keyof right]
      : impl.joinLeft<
        ix extends keyof left ? left[ix] : never,
        ix extends keyof right ? right[ix] : never
      >
    }

  type delimit<left extends any.showable, delimiter extends any.showable, right extends any.showable>
    = `${left}${left extends empty.string ? "" : delimiter}${right}`
    ;

  type join<acc extends string, path extends any.path, delimiter extends any.showable>
    = path extends empty.path ? acc
    : path extends nonempty.path<infer head, infer tail>
    ? join<delimit<acc, delimiter, head extends any.key ? head : `<symbol>`>, tail, delimiter>
    : never.close.inline_var<"head" | "tail">
    ;
}

type join<path extends any.path, delimiter extends any.showable> = impl.join<``, path, delimiter>

const safeFold = Tree.fold.safely(["abc", "def"])
const r1 = Tree.fold(["abc", "def"])({ abc: { def: 123 } })
const r2 = safeFold({ abc: 123 })
const r3 = Tree.fold.safelyWithDebugger(["abc", "def"])({ abc: {} })

declare namespace Tree {
  type fold<tree, path extends any.path> = impl.fold<tree, path>
  const fold: {
    <const path extends any.path>(path: path): <const tree extends Tree.unfold<path, any>>(tree: tree) => fold<tree, path>
    safely<const path extends any.path>(path: path): <const tree>(tree: tree) => fold.safely<tree, path>
    withDebugger<const path extends any.path>(path: path): <const tree extends Tree.unfold<path, any>>(tree: tree) => fold.withDebugger<tree, path>
    safelyWithDebugger<const path extends any.path>(path: path): <const tree>(tree: tree) => fold.withDebugger<tree, path>
  }
  namespace fold {
    type safely<tree, path extends any.path> = impl.safeFold<tree, path>
    type withDebugger<tree, path extends any.path> = impl.foldWithDebugger<tree, path, { history: [], structure: tree }>
    type safelyWithDebugger<tree, path extends any.path> = impl.safeFoldWithDebugger<tree, path, { history: [], structure: tree }>
  }

  type unfold<path extends any.path, leaf> = impl.unfold<path, leaf>
  const unfold
    : {
      <const leaf, const path extends any.path>(leaf: leaf, path: path): unfold<path, leaf>
      <const path extends any.path>(path: path): unfold<path, {}>
    }


  type mergeTrees<union> = impl.mergeTrees<union>
  type joinLeft<left, right> = impl.joinLeft<left, right>
  type merge<union> = impl.merge<union>
}


type _4 = Tree.merge<{ abc: 123, def: 456 } | { def: 789, ghi: 0 }>
type _5 = Tree.fold<{ a: { b: { c: 123 } } }, ["a", "b", "c"]>
type _7 = Tree.unfold<["a", "b", "c"], 123>
type _8 = Tree.mergeTrees<{ a: { b: { c: 1 } } } | { a: { b: { d: 2 } } }>
type _9 = Tree.joinLeft<
  { a: { b: { c: 1, e: 789 }, f: 10 }, h: { i: { j: { k: { l: 1000 } } } } },
  { a: { b: { c: ["RIGHT BOO"] }, d: 4565 }, g: 0, h: 10 }
>


interface Storage<type = {}> { [0]: type }


interface IndexedStorage<index extends any.array<any.index>, type extends any.object> {
  [-1]: index
  [0]: type
}

type createIndexedStorage<type extends any.object, index extends any.array<any.keyof<type>>>
  = IndexedStorage<index, { [ix in Extract<keyof type, index[number]>]: type[ix] }>

type indexed = createIndexedStorage<{ abc: 123, def: [456], ghi: 789 }, ["abc", "def"]>

declare const Focus: FocusConstructor
interface FocusConstructor {
  of<const structure extends {} = never>(): Focus<[], structure>
  of<const structure extends {}>(structure: structure): Focus<[], structure>
  /** given a path, construct a {@link Focus} that is focused on that path (constructing the required parent directories along the way) */
  from<path extends any.path>(...path: path): Focus<path, Tree.unfold<path, {}>>
}

type mapFocus<next, F extends Focus>
  = Tree.joinLeft<Tree.unfold<F["_path"], next>, F["_root"]>

type propsInFocus<F extends Focus> = keyof F["."]

type tag<type>
  = [type] extends [any.array] ? "array"
  : [type] extends [any.object] ? "object"
  : [type] extends [any.primitive] ? "primitive"
  : "unknown"
  ;

type tagAtFocus<F extends Focus> = tag<Tree.fold<F["_root"], F["_path"]>>
type popFocus<F extends Focus> = Extract<List.lead<F["_path"]>, any.path>
type foldFocus<F extends Focus> = Tree.fold<F["_root"], F["_path"]>
type pushFocus<prop extends any.index, F extends Focus> = [...F["_path"], prop]

interface FocusPlusMetadata<
  meta extends any.object = {},
  path extends any.path = any.path,
  structure = unknown
> extends Focus<path, structure> { }

type focus<F extends Focus = Focus> = F

interface Focus<path extends any.path = any.path, structure = unknown> extends Storage {
  ////////////////
  /// internal ///
  ////////////////
  ////////////////
  /** @internal */
  _root: structure
  /** @internal */
  _path: path
  /** @internal */
  _focus(): foldFocus<this>

  /////////////////////
  /// "file system" ///
  /////////////////////
  /////////////////////
  /** ["/"] moves the focus back to the current {@link Focus `Focus`} root */
  get ["/"](): Focus<[], this["_root"]>,
  /** ["."] unwraps the {@link Focus `Focus`} at the current focus */
  get ["."](): ReturnType<this["_focus"]>
  /** [".."] focuses the parent directory */
  get [".."](): Focus<popFocus<this>, this["_root"]>
  /** "print working directory" */
  get pwd(): join<this["_path"], "/">
  /** "change directory" */
  cd<prop extends propsInFocus<this>>(prop: prop): Focus<pushFocus<prop, this>, this["_root"]>

  //////////////////////
  /// dry run, debug ///
  //////////////////////
  //////////////////////
  /** 
   * query the focused value and derive a "tag" that describes it 
   * (makes it simple for users to pattern match: they just define 
   * a handler for each tag
   */
  tag(): FocusPlusMetadata<[𝘁𝗮𝗴: tagAtFocus<this>], path, structure>
  /** 
   * {@link peek `Focus.peek`} uses {@link path `path`} to query {@link structure `structure`} 
   * and returns a variant of {@link Focus `Focus`} called {@link FocusPlusMetadata `FocusPlusMetadata`},
   * which behaves the same as {@link Focus `Focus`} but includes some extra metadata (which in this case
   * will be result of the query).
   */
  peek(): FocusPlusMetadata<[𝗽𝗲𝗲𝗸: ReturnType<this["_focus"]>], path, structure>

  /** TODO: adapt (note: use the profunctor lens encoding) */

  /** 
   * {@link Focus.map} applies a user-provided function to the current focus, and replaces the
   * focused node with the function's output.
   */
  map<const next>(fn: (focus: this["."]) => next):
    Focus<this["_path"], mapFocus<next, this>>
  /** 
   * {@link mergeLeft `Focus.mergeLeft`} allows you to merge two {@link Focus `Focus`} structures into one.
   *
   * **Note:** "Left" in this context indicates that the focus to the left of the "." will take
   * precedence in the event of any path collisions.
   * 
   * **Note:** The focus of the left {@link Focus `Focus`} is kept, and the right focus is discarded.
   */
  mergeLeft<const other extends Focus>(other: other):
    Focus<this["_path"], Tree.joinLeft<this["_root"], other["_root"]>>
  /** 
   * {@link mergeRight `Focus.mergeRight`} allows you to merge two {@link Focus `Focus`} structures into one.
   * 
   * **Note:** "Right" in this context indicates that the focus to the right of the "." will take
   * precedence in the event of any path collisions.
   * 
   * **Note:** The focus of the right {@link Focus `Focus`} is kept, and the left focus is discarded.
   */

  mergeRight<const other extends Focus>(other: other):
    Focus<other["_path"], Tree.joinLeft<other["_root"], this["_root"]>>
}


namespace __Spec__ {
  declare const data: {
    a: {
      b: {
        c: 123
      },
      d: 456
    },
    e: {
      f: {
        g: 789,
        h: {
          i: 0
        }
      }
    }
  }

  declare const otherData: {
    e: {
      f: 9000
    }
  }

  declare const minimal: { a: { b: { c: 123 } }, d: 456 }

  const focus1
    //  ^?
    = Focus
      .of(minimal)
      .cd("d")
      .tag()
      .peek()
      .map(v => [v, v] as const)

  const focus2 = Focus.of(data)
    //  ^?
    .cd("a")
    //^?
    .cd("b")
    //^?
    .map((b) => b.c)
    //            ^?
    .mergeRight(
      // ^?
      Focus
        .of(otherData)
        .cd("e")
      // ^?
    )


  describe(
    // ^?
    "Focus",
    t => [
      expect(
        t.assert.equal(Focus.of(data).cd("a").cd("b").cd("c").pwd,
          "a/b/c"
        )),
      expect(
        t.assert.equal(Focus.of(data).cd("a").cd("b").cd("c")["."],
          123
        )
      ),
      expect(
        /** 
         * TODO: we're using `equivalent` instead of `equal` because one of the
         * tree operations is converting the subtree it operates on to be mutable,
         * which means that subtree is no longer readonly in the output
         */
        t.assert.equivalent(
          Focus.of({ a: { b: { c: 123 } } }).cd("a").map(() => 9000 as const),
          Focus.of({ a: 9000 }).cd("a")
        )
      )
    ]
  )
}