import { any, describe, empty, expect, never, nonempty } from "../exports"

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

type Params<
  focus = unknown,
  tried extends any.index = any.index,
  breadcrumbs extends any.path = any.path,
  structure = unknown
> = never | [𝐬𝐭𝐫𝐮𝐜𝐭𝐮𝐫𝐞: structure, 𝐛𝐫𝐞𝐚𝐝𝐜𝐫𝐮𝐦𝐛𝐬: breadcrumbs, 𝐟𝐨𝐜𝐮𝐬: focus, 𝐭𝐫𝐢𝐞𝐝: tried]

declare namespace TypeError {
  interface PathNotFound<params extends Params>
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
    : TypeError.PathNotFound<Params<tree, List.head<path>>>
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
    TypeError.PathNotFound<
      Params<tree, List.head<path>,
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
    TypeError.PathNotFound<
      Params<tree, List.head<path>,
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

declare namespace Tree {
  namespace safely {
    type fold<tree, path extends any.path> = impl.safeFold<tree, path>
  }
  namespace withDebugger {
    type fold<tree, path extends any.path> = impl.foldWithDebugger<tree, path, { history: [], structure: tree }>
  }
  namespace safelyWithDebugger {
    type fold<tree, path extends any.path> = impl.safeFoldWithDebugger<tree, path, { history: [], structure: tree }>
  }

  type fold<tree, path extends any.path> = impl.fold<tree, path>
  type unfold<path extends any.path, leaf> = impl.unfold<path, leaf>
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

declare const Focus: FocusConstructor
interface FocusConstructor {
  of<const structure extends {} = never>(): Focus<[], structure>
  of<const structure extends {}>(structure: structure): Focus<[], structure>
}

type mapFocus<next, self extends Focus>
  = Tree.joinLeft<Tree.unfold<self["_path"], next>, self["_root"]>

type propsInFocus<self extends Focus> = keyof self["."]

interface Focus<path extends any.path = any.path, structure = unknown> extends Storage {
  /** @internal */
  _root: structure
  /** @internal */
  _path: path
  /** @internal */
  _focus(): Tree.fold<this["_root"], this["_path"]>
  /** unwraps the {@link Focus} at the current focus */
  get ["."](): ReturnType<this["_focus"]>
  /** focus parent directory */
  get [".."](): Focus<Extract<List.lead<this["_path"]>, any.path>, this["_root"]>
  /** print working directory */
  get pwd(): join<this["_path"], "/">
  /** "change directory" */
  cd<prop extends propsInFocus<this>>(prop: prop):
    Focus<[...this["_path"], prop], this["_root"]>

  /** 
   * {@link Focus.map} applies a user-provided function to the current focus, and replaces the
   * focused node with the function's output.
   */
  map<const next>(fn: (focus: this["."]) => next):
    Focus<this["_path"], mapFocus<next, this>>
  /** 
   * {@link Focus.mergeLeft} allows you to merge two {@link Focus} structures into one.
   *
   * **Note:** "Left" in this context indicates that the focus to the left of the "." will take
   * precedence in the event of any path collisions.
   * 
   * **Note:** The focus of the left {@link Focus} is kept, and the right focus is discarded.
   */

  mergeLeft<const other extends Focus>(other: other):
    Focus<this["_path"], Tree.joinLeft<this["_root"], other["_root"]>>
  /** 
   * {@link Focus.mergeRight} allows you to merge two {@link Focus} structures into one.
   * 
   * **Note:** "Right" in this context indicates that the focus to the right of the "." will take
   * precedence in the event of any path collisions.
   * 
   * **Note:** The focus of the right {@link Focus} is kept, and the left focus is discarded.
   */

  mergeRight<const other extends Focus>(other: other):
    Focus<other["_path"], Tree.joinLeft<other["_root"], this["_root"]>>
}

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

declare const minimal: { a: { b: { c: 123 } } }

const focus
  = Focus
    .of(data)
    //^?
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

focus // =>

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
