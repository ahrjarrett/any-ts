/* term-level import */ import { assert, describe, expect, expectToFail } from "./test.js"
/* term-level import */ import * as Sym from "./symbol.js"

import type { any } from "../any/exports.js"
import type { TypeError } from "../err/exports.js"

namespace __Spec__ {
  declare const unsafeAny: any
  const singleAny: [Sym.IllegalAny] = [Sym.IllegalAny]
  const doubleAny: [Sym.IllegalAny, Sym.IllegalAny] = [Sym.IllegalAny, Sym.IllegalAny]

  describe("handleAnys", t => {
    // ^?
    return [
      expect(t.assert.equal(assert.is.true(unsafeAny), singleAny)),
      expect(t.assert.equal(assert.is.false(unsafeAny), singleAny)),
      expect(t.assert.equal(assert.equal(1, unsafeAny), singleAny)),
      expect(t.assert.equal(assert.equal(unsafeAny, 1), singleAny)),
      expect(t.assert.equal(assert.equal(unsafeAny, unsafeAny), doubleAny)),
    ]
  })

  describe("assert.equal", t => {
    // ^?
    return expect(t.assert.equal({ a: 1 }, { a: 1 }))
  })


  type __any_type__ = [
    // ^?
    expect<assert.extends<any.type, unknown>>,
    expect<assert.extends<unknown, any.type>>,
    expect<assert.equivalent<any.type, unknown>>,
    expect<assert.equivalent<any.object, object>>,
    expect<assert.not.equal<any.type, unknown>>,
    expect<assert.not.equal<any.object, object>>,
  ]

  declare const expectToFailErrorMsg: TypeError<[Sym.RedEmoji, `Expected a failing test, but got a passing one instead`]>

  describe(
    // ^?
    "expectToFail",
    t => [
      expect(
        assert.equal(
          /* @ts-expect-error: tests to make a failing assertion raises a TypeError */
          expectToFail(t.assert.equal({ abc: 123 }, { abc: 123 })),
          expectToFailErrorMsg
        )
      ),
      expect(
        assert.equal(
          /* @ts-expect-error: tests to make a failing assertion raises a TypeError */
          expectToFail(Sym.GreenEmoji),
          expectToFailErrorMsg
        )
      )
    ]
  )

  const __extends__ = [
    //  ^?
    /* unhappy path */
    /* @ts-expect-error: failing to provide a value raises a type error */
    assert.extends(),
    /* @ts-expect-error: failing to provide a value raises a type error */
    assert.extends<number>(),
    /* @ts-expect-error: failing to explicitly provide a type parameter raises a type error */
    assert.extends(1),
    /* happy path */
    assert.extends<number>(2),
    assert.extends<2>(2),
  ] as const


  /** @ts-expect-error: testing to make sure comparing 2 unequal values raises a TypeError */
  type __2 = expect<assert.equal<{ a: 1 }, { a: 2 }>>
  //   ^?
  /** @ts-expect-error: testing to make sure comparing 2 unequal values raises a TypeError */
  const __2 = expect(assert.equal({ a: 1 }, { a: 2 }))
  //    ^?

  declare const __2_expected: ["🚫", [𝐧𝐨𝐭_𝐞𝐪𝐮𝐚𝐥: [𝐥𝐞𝐟𝐭: { readonly a: 1; }, 𝐫𝐢𝐠𝐡𝐭: { readonly a: 2; }]]]
  expect(assert.equal(__2, __2_expected))
  // ^?

  const result = describe(
    //  ^?
    "comparing 2 unequal values raises a TypeError",
    t => ({
      /** @ts-expect-error: directive makes sure this relation raises a TypeError */
      notEqual: expectToFail(t.assert.not.equal({ a: 2 }, { a: 3 })),
      /** @ts-expect-error: directive makes sure this relation raises a TypeError */
      equal: expect(t.assert.equal({ a: 1 }, { a: 2 })),
    })
  )
}


