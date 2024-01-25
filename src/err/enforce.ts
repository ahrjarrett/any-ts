export {
  enforce,
}

import type * as any from "../any";

import type { Fn } from "../function/exports";
import type { Err } from "./err";
import type { never } from "../semantic-never/exports";
import type { HasDiscriminant } from "../tag/tag";
import type { Union as U } from "../union/exports";

declare namespace impl {
  type duplicateKeys<type extends any.array, seen extends any.object, duplicates extends any.array>
    = [type] extends [readonly []] ? 0 extends duplicates["length"] ? never : duplicates
    : [type] extends [readonly [any.index<infer head>, ...any.list<infer tail>]]
    ? [head] extends [keyof seen] ? impl.duplicateKeys<tail, seen, [...duplicates, head]>
    : impl.duplicateKeys<tail, seen & { [ix in head]: void }, duplicates>
    : never.illegal_state<"branch unreachable">
    ;
}

declare namespace enforce {
  type nonobject<type>
    = [type] extends [any.array] ? (unknown)
    : [type] extends [any.object] ? Fn.return<typeof Err.NonObject<type>>
    : (unknown)
    ;

  type nonunion<type>
    = U.is<type> extends false ? (unknown)
    : Fn.return<typeof Err.NonUnion<type>>
    ;

  type singletonObject<type>
    = [type] extends [any.array] ? (unknown)
    : [type] extends [any.object]
    ? [keyof type] extends [never] ? (unknown)
    : U.is<keyof type> extends true ? Fn.return<typeof Err.MaxOneProp<type>>
    : type
    : (unknown)
    ;

  type literal<type>
    = [string] extends [type] ? Fn.return<typeof Err.Literal<type>>
    : [number] extends [type] ? Fn.return<typeof Err.Literal<type>>
    : [boolean] extends [type] ? Fn.return<typeof Err.Literal<type>>
    : (unknown)
    ;

  type nonliteral<type>
    = [string] extends [type] ? (unknown)
    : [number] extends [type] ? (unknown)
    : [boolean] extends [type] ? (unknown)
    : Fn.return<typeof Err.MaxOneProp<type>>
    ;

  type _54 = Parameters<typeof Err.IsNotAssignableTo<123>>

  type isNotAssignableTo<type, disallow>
    = [type] extends [disallow] ? Fn.return<typeof Err.IsNotAssignableTo<type>>
    : (unknown)
    ;

  type nonEmptyString<type>
    = [type] extends [``]
    ? Fn.return<typeof Err.NonEmptyString<type>>
    : (unknown)
    ;

  type nonEmptyArray<type>
    = [type] extends readonly []
    ? Fn.return<typeof Err.NonEmptyString<type>>
    : (unknown)
    ;

  type shallowArray<type extends any.array> = U.exists<
    type[number],
    any.object,
    { onMatch: Fn.return<typeof Err.Shallow<type>>; onNoMatch: unknown }
  >;

  type shallow<type>
    = [type] extends [any.primitive] ? (unknown)
    : [type] extends [HasDiscriminant] ? (unknown)
    : [type] extends [any.array] ? enforce.shallowArray<type>
    : [type] extends [any.object] ? Fn.return<typeof Err.Shallow<type>>
    : (unknown)
    ;

  type extract<type, invariant> = [type] extends [invariant] ? type : never

  type getKeys<type> = [type] extends [any.entries] ? extract<{ [ix in keyof type]: type[ix][extract<0, keyof type[ix]>] }, any.array> : never

  namespace uniqueness {
    type ofEntries<type>
      = [impl.duplicateKeys<getKeys<type>, {}, []>] extends [any.list<infer duplicates>]
      ? [duplicates] extends [never]
      ? (unknown)
      : Fn.return<typeof Err.KeyUniqueness<duplicates>>
      : (unknown)
      ;
  }
}



declare namespace __Spec__ {
  namespace uniqueness {
    type __ofEntries__ = [
      enforce.uniqueness.ofEntries<[]>,
      enforce.uniqueness.ofEntries<[["a", 1]]>,
      enforce.uniqueness.ofEntries<[["a", 1], ["b", 2]]>,
      enforce.uniqueness.ofEntries<[["a", 1], ["b", 2], ["c", 3]]>,
      enforce.uniqueness.ofEntries<[["a", 1], ["a", 2]]>,
      enforce.uniqueness.ofEntries<[["a", 1], ["b", 2], ["a", 2]]>,
      enforce.uniqueness.ofEntries<[["a", 1], ["a", 2], ["a", 2]]>,
    ]
  }

  namespace __impl__ {
    type __duplicateKeys__ = [
      impl.duplicateKeys<never, {}, []>,
      impl.duplicateKeys<any.array, {}, []>,
      impl.duplicateKeys<any.array<number>, {}, []>,
      impl.duplicateKeys<[], {}, []>,
      impl.duplicateKeys<["a"], {}, []>,
      impl.duplicateKeys<["a", "b"], {}, []>,
      impl.duplicateKeys<["a", "b", "c"], {}, []>,
      // duplicate(s) found
      impl.duplicateKeys<["a", "a"], {}, []>,
      impl.duplicateKeys<["a", "b", "c", "a"], {}, []>,
      impl.duplicateKeys<["a", "b", "a", "c"], {}, []>,
      impl.duplicateKeys<["a", "a", "a"], {}, []>,
      impl.duplicateKeys<["a", "c", "a", "c"], {}, []>,
    ]
  }

  type __getKeys__ = [
    enforce.getKeys<never>,
    enforce.getKeys<[]>,
    enforce.getKeys<[["abc", 123]]>,
    enforce.getKeys<[["abc", 123], ["def", 456]]>,
    enforce.getKeys<[["abc", 123], ["def", 456], ["ghi", 789]]>,
  ]
}
