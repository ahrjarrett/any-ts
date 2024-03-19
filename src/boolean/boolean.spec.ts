import type { _ } from "../util"
import type { assert, expect } from "../test/exports"
import type { boolean } from "./boolean"

declare namespace __Spec__ {
  type __not__ = [
    expect<assert.is.true<boolean.not<false>>>,
    expect<assert.is.false<boolean.not<true>>>,
    expect<assert.is.never<boolean.not<boolean>>>,
  ]

  type __finite__ = [
    expect<assert.is.true<boolean.is.finite<true>>>,
    expect<assert.is.true<boolean.is.finite<false>>>,
    expect<assert.is.false<boolean.is.finite<boolean>>>,
    expect<assert.is.never<boolean.is.finite<never>>>,
  ]

  type __nonfinite__ = [
    expect<assert.is.true<boolean.is.nonfinite<boolean>>>,
    expect<assert.is.false<boolean.is.nonfinite<true>>>,
    expect<assert.is.false<boolean.is.nonfinite<false>>>,
    expect<assert.is.never<boolean.is.nonfinite<never>>>,
  ]

  type __all__ = [
    expect<assert.is.true<boolean.all<[]>>>,
    expect<assert.is.false<boolean.all<[boolean]>>>,
    expect<assert.is.true<boolean.all<[true]>>>,
    expect<assert.is.false<boolean.all<[false]>>>,
    expect<assert.is.false<boolean.all<[boolean, false]>>>,
    expect<assert.is.false<boolean.all<[boolean, true]>>>,
    expect<assert.is.false<boolean.all<[false, false]>>>,
    expect<assert.is.true<boolean.all<[true, true]>>>,
  ]

  type __any__ = [
    expect<assert.is.false<boolean.any<[]>>>,
    expect<assert.is.true<boolean.any<[boolean]>>>,
    expect<assert.is.true<boolean.any<[true]>>>,
    expect<assert.is.false<boolean.any<[false]>>>,
    expect<assert.is.true<boolean.any<[boolean, false]>>>,
    expect<assert.is.true<boolean.any<[boolean, true]>>>,
    expect<assert.is.false<boolean.any<[false, false]>>>,
    expect<assert.is.true<boolean.any<[true, true]>>>,
    expect<assert.is.false<boolean.any<[boolean], "strict">>>,
    expect<assert.is.true<boolean.any<[true], "strict">>>,
    expect<assert.is.false<boolean.any<[false], "strict">>>,
    expect<assert.is.false<boolean.any<[boolean, false], "strict">>>,
    expect<assert.is.true<boolean.any<[boolean, true], "strict">>>,
  ]
}