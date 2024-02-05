import { nat as _ } from "./natural"
import { expect, assert } from "../test/exports"
import { Whitespace } from "./shared"

type __Natural_is__ = [
  // ^?
  /* 𝖈𝖚𝖗𝖘𝖊𝖉 */
  expect<assert.is.false<_.is<never>>>,
  expect<assert.is.false<_.is<number>>>,
  expect<assert.is.false<_.is<0.1>>>,
  expect<assert.is.false<_.is<-0.1>>>,
  expect<assert.is.false<_.is<` `>>>,
  expect<assert.is.false<_.is<`\n`>>>,
  expect<assert.is.false<_.is<`\t`>>>,
  expect<assert.is.false<_.is<Whitespace>>>,
  expect<assert.is.false<_.is<`${number}1`>>>,
  expect<assert.is.false<_.is<`${number}1n`>>>,
  expect<assert.is.false<_.is<`${bigint}1`>>>,
  expect<assert.is.false<_.is<`${bigint}1n`>>>,
  expect<assert.is.false<_.is<`${1.1}n`>>>,
  expect<assert.is.false<_.is<`${1n}`>>>,
  expect<assert.is.false<_.is<-1>>>,
  expect<assert.is.false<_.is<-1n>>>,
  /* happy path */
  expect<assert.is.true<_.is<0>>>,
  expect<assert.is.true<_.is<-0>>>,
  expect<assert.is.true<_.is<1>>>,
  /* positive bigints are also natural numbers */
  expect<assert.is.true<_.is<1n>>>,
  expect<assert.is.true<_.is<bigint>>>,
]