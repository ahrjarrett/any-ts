import { int as _ } from "./integer"
import { assert, describe, expect } from "../test/exports"
import { TypeError } from "../err/exports"
import { Whitespace } from "./shared"

namespace int {
  declare const one: _.new<1>
  declare const typeError: TypeError<[𝗺𝘀𝗴: "Expected an integer", 𝗴𝗼𝘁: 1.2]>
  describe("int", () => {
    return [
      describe("is", t => {
        return [
          expect(t.assert.equal(_.new(1), one)),
          /** @ts-expect-error directive here to ensure that this usage raises a {@link TypeError `TypeError`} */
          expect(t.assert.equal(_.new(1.2), typeError)),
        ] as const
        //   ^?
      })
    ]
  })

  describe("is", t => {
    const real: 1.2 = 1.2 as const
    const one: 1 = 1 as const
    const number: number = Math.random()
    const intTwo: _.new<2> = _.new(2)

    if (_.is(real)) { expect(t.assert.is.never(real)) }
    //                 ^?
    if (_.is(one)) { expect(t.assert.equal(one, 1)) }
    //               ^?
    if (_.is(intTwo)) { expect(t.assert.extends<_.new<2>>(intTwo)) }
    //                  ^?
    if (_.is(number)) { expect(t.assert.extends<typeof number>(number)) }
    //                  ^?
  })

  type is = [
    // ^?
    /* 𝖈𝖚𝖗𝖘𝖊𝖉 */
    expect<assert.is.false<_.is<1 | 1.2>>>,
    expect<assert.is.false<_.is<[]>>>,
    expect<assert.is.false<_.is<1.2>>>,
    expect<assert.is.false<_.is<number>>>,
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
    expect<assert.is.false<_.is<`${1n}`>>>,
    expect<assert.is.false<_.is<`${bigint}1`>>>,
    expect<assert.is.false<_.is<`${bigint}1n`>>>,
    expect<assert.is.false<_.is<`${1.1}n`>>>,
    /* happy path */
    expect<assert.is.true<_.is<-1>>>,
    expect<assert.is.true<_.is<-1e+10>>>,
    expect<assert.is.true<_.is<1e+0>>>,
    expect<assert.is.true<_.is<2>>>,
    expect<assert.is.true<_.is<0>>>,
    expect<assert.is.true<_.is<-0>>>,
    expect<assert.is.true<_.is<1>>>,
    expect<assert.is.true<_.is<-1>>>,
    /* bigints are integers */
    expect<assert.is.true<_.is<1n>>>,
    expect<assert.is.true<_.is<-1n>>>,
    expect<assert.is.true<_.is<bigint>>>,
    expect<assert.is.true<_.is<0e1>>>,
    expect<assert.is.true<_.is<9999e+3>>>,
  ]
}
