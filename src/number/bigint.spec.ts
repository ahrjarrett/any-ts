import { bigint as _ } from "./bigint"
import { assert, expect } from "../test/exports"

/**
 * module under test should always be imported as `_`, 
 * which is useful because we might import many modules
 * into a single file.
 * 
 * this pattern comes with a one-time cost (it takes about 
 * 5 minutes for your brain to adjust), but quickly makes
 * up for it by reducing cognitive load.
 * 
 * not only that, but it also unlocks some other interesting 
 * patterns. for example, here we're able to organize our
 * spec module to mirror the structure that exists in
 * {@link _ `bigint`} proper.
 * 
 * now, spec modules are self-organizing. as we add functionality
 * to {@link _ `bigint`}, we never have to stop and ask ourselves
 * where it should live in the spec file.
 * 
 * we can also overlay the two more easily; a couple nice qualities
 * fall pretty naturally out of that, one that comes to mind is 
 * coverage. or, if we to, say, alphabetize {@link _ `bigint`} 
 * proper, we could trivially alphabetize the spec file. 
 */
declare namespace bigint {
  export type parse = [
    // ^?
    expect<assert.equal<_.parse<bigint>, bigint>>,
    expect<assert.equal<_.parse<-1>, -1n>>,
    expect<assert.equal<_.parse<-1.0>, -1n>>,
    expect<assert.equal<_.parse<`-1`>, -1n>>,
    expect<assert.equal<_.parse<`-1n`>, -1n>>,
    expect<assert.equal<_.parse<0>, 0n>>,
    expect<assert.equal<_.parse<0.0>, 0n>>,
    expect<assert.equal<_.parse<-0>, 0n>>,
    expect<assert.equal<_.parse<0n>, 0n>>,
    /** TODO: decide how you want to handle these */
    // _.parse<"-0">,
    // _.parse<"-0n">,
    expect<assert.equal<_.parse<1>, 1n>>,
    expect<assert.equal<_.parse<1.0>, 1n>>,
    expect<assert.equal<_.parse<`1`>, 1n>>,
    expect<assert.equal<_.parse<`1n`>, 1n>>,
    expect<assert.is.never<_.parse<`${number}1`>>>,
    expect<assert.is.never<_.parse<number>>>,
    expect<assert.is.never<_.parse<`${number}1n`>>>,
    expect<assert.is.never<_.parse<`${bigint}1`>>>,
    expect<assert.is.never<_.parse<`${bigint}1n`>>>,
    expect<assert.is.never<_.parse<"0.0">>>,
    expect<assert.is.never<_.parse<0.3>>>,
  ]

  namespace parse {
    export type literal = [
      expect<assert.equal<_.parse.literal<1n>, 1n>>,
      expect<assert.equal<_.parse.literal<1n>, 1n>>,
      expect<assert.is.never<_.parse.literal<bigint>>>,
    ]

    export type universal = [
      expect<assert.equal<_.parse.universal<bigint>, bigint>>,
      expect<assert.equal<_.parse.universal<`${bigint}`>, bigint>>,
      /** TODO: I think this should parse to `bigint`? */
      expect<assert.equal<_.parse.universal<"bigint">, never>>,
      expect<assert.is.never<_.parse.universal<`${1n}`>>>,
    ]
  }
}
