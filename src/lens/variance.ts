import { any } from "../exports"

type enumFromList<type extends any.array<any.showable>> = never | ({ [name in `${type[number]}`]: name })

declare namespace variance {
  interface invariant<type> { (_: type): type }
  interface covariant<type> { (_: never): type }
  interface contravariant<type> { (_: type): never }
  type some<type> =
    | invariant<type>
    | covariant<type>
    | contravariant<type>
    ;

  namespace infer {
    type invariant<type extends some<any>> = type extends variance.invariant<infer type> ? type : never
    type covariant<type extends some<any>> = type extends variance.covariant<infer type> ? type : never
    type contravariant<type extends some<any>> = type extends variance.contravariant<infer type> ? type : never
    type variance<type extends some<any>> =
      | variance.infer.invariant<type>
      | variance.infer.covariant<type>
      | variance.infer.contravariant<type>
      ;
  }

  namespace tagged {
    type Tag = typeof Tag[keyof typeof Tag]
    const Tag: enumFromList<["Invariant", "Covariant", "Contravariant"]>
    namespace Tag {
      type Invariant = typeof Tag.Invariant
      type Covariant = typeof Tag.Covariant
      type Contravariant = typeof Tag.Contravariant
    }

    interface tagged<tag extends Tag> { readonly tag: tag }
    interface hasValue<type = unknown> { readonly value: type }

    interface invariant<type = unknown> extends tagged<Tag.Invariant>, hasValue<type> { }
    interface covariant<type = unknown> extends tagged<Tag.Covariant>, hasValue<type> { }
    interface contravariant<type = unknown> extends tagged<Tag.Contravariant>, hasValue<type> { }

    const from
      : {
        <
          variance extends some<any>,
          type extends variance.infer.variance<variance>
        >(fn: variance)
          : equal<variance, variance.invariant<type>> extends true ? tagged.invariant<type>
          : equal<variance, variance.covariant<type>> extends true ? tagged.covariant<type>
          : equal<variance, variance.contravariant<type>> extends true ? tagged.contravariant<type>
          : never
      }
  }
}

type expect<type extends true> = equal<type, true> extends true ? "✅" : "🚫"
type equal<a, b> =
  (<fix>() => fix extends a ? 1 : 2) extends
  (<fix>() => fix extends b ? 1 : 2) ? true : false
  ;

type __equal__ = [
  equal<variance.covariant<123>, variance.invariant<123>>
]

declare const myContravariantFn: variance.contravariant<123 | "four five six">
declare const myCovariantFn: variance.covariant<123 | "four five six">
declare const myInvariantFn: variance.invariant<123 | "four five six">

const input = {
  [variance.tagged.Tag.Invariant]: variance.tagged.from(myInvariantFn),
  [variance.tagged.Tag.Covariant]: variance.tagged.from(myCovariantFn),
  [variance.tagged.Tag.Contravariant]: variance.tagged.from(myContravariantFn),
}

type __variance_tagged_from__ = [
  // ^?
  expect<equal<typeof input[variance.tagged.Tag.Invariant], variance.tagged.invariant<123 | "four five six">>>,
  expect<equal<typeof input[variance.tagged.Tag.Covariant], variance.tagged.covariant<123 | "four five six">>>,
  expect<equal<typeof input[variance.tagged.Tag.Contravariant], variance.tagged.contravariant<123 | "four five six">>>,
]

declare namespace check {
  interface invariant<type> {
    _
  }
}
