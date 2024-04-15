import type { Widen } from "./widen"
import type { expect, assert } from "../test/exports"

declare namespace Spec {

  type __Widen__ = [
    // ^?
    expect<assert.equal<
      Widen<[1, [2, [3, [4, [5, [6]]]]]], 0>,
      [1, [2, [3, [4, [5, [6]]]]]]
    >>,

    expect<assert.equal<
      Widen<[1, [2, [3, [4, [5, [6]]]]]], 1>,
      [number, [2, [3, [4, [5, [6]]]]]]
    >>,

    expect<assert.equal<
      Widen<[1, [2, [3, [4, [5, [6]]]]]], 2>,
      [number, [number, [3, [4, [5, [6]]]]]]
    >>,

    expect<assert.equal<
      Widen<[1, [2, [3, [4, [5, [6]]]]]], 3>,
      [number, [number, [number, [4, [5, [6]]]]]]
    >>,

    expect<assert.equal<
      Widen<[1, [2, [3, [4, [5, [6]]]]]], 4>,
      [number, [number, [number, [number, [5, [6]]]]]]
    >>,

    expect<assert.equal<
      Widen<[1, [2, [3, [4, [5, [6]]]]]], 5>,
      [number, [number, [number, [number, [number, [6]]]]]]
    >>,

    expect<assert.equal<
      Widen<[1, [2, [3, [4, [5, [6]]]]]], 6>,
      [number, [number, [number, [number, [number, [number]]]]]]
    >>,

    expect<assert.equal<
      Widen<{ abc: 1, def: { ghi: 2, jkl: { mno: 3, pqr: { stu: 4, vwx: { yz: 5 } } } } }, 0>,
      { abc: 1, def: { ghi: 2, jkl: { mno: 3, pqr: { stu: 4, vwx: { yz: 5 } } } } }
    >>,

    expect<assert.equal<
      Widen<{ abc: 1, def: { ghi: 2, jkl: { mno: 3, pqr: { stu: 4, vwx: { yz: 5 } } } } }, 1>,
      { abc: number, def: { ghi: 2, jkl: { mno: 3, pqr: { stu: 4, vwx: { yz: 5 } } } } }
    >>,

    expect<assert.equal<
      Widen<{ abc: 1, def: { ghi: 2, jkl: { mno: 3, pqr: { stu: 4, vwx: { yz: 5 } } } } }, 2>,
      { abc: number, def: { ghi: number, jkl: { mno: 3, pqr: { stu: 4, vwx: { yz: 5 } } } } }
    >>,

    expect<assert.equal<
      Widen<{ abc: 1, def: { ghi: 2, jkl: { mno: 3, pqr: { stu: 4, vwx: { yz: 5 } } } } }, 3>,
      { abc: number, def: { ghi: number, jkl: { mno: number, pqr: { stu: 4, vwx: { yz: 5 } } } } }
    >>,

    expect<assert.equal<
      Widen<{ abc: 1, def: { ghi: 2, jkl: { mno: 3, pqr: { stu: 4, vwx: { yz: 5 } } } } }, 4>,
      { abc: number, def: { ghi: number, jkl: { mno: number, pqr: { stu: number, vwx: { yz: 5 } } } } }
    >>,

    expect<assert.equal<
      Widen<{ abc: 1, def: { ghi: 2, jkl: { mno: 3, pqr: { stu: 4, vwx: { yz: 5 } } } } }, 5>,
      { abc: number, def: { ghi: number, jkl: { mno: number, pqr: { stu: number, vwx: { yz: number } } } } }
    >>,

    expect<assert.equal<
      Widen<{ abc: [1, def: { ghi: [2, jkl: { mno: [3, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }, 0>,
      { abc: [1, { ghi: [2, { mno: [3, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }
    >>,

    expect<assert.equal<
      Widen<{ abc: [1, def: { ghi: [2, jkl: { mno: [3, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }, 1>,
      { abc: [1, { ghi: [2, { mno: [3, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }
    >>,

    expect<assert.equal<
      Widen<{ abc: [1, def: { ghi: [2, jkl: { mno: [3, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }, 2>,
      { abc: [number, { ghi: [2, { mno: [3, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }
    >>,

    expect<assert.equal<
      Widen<{ abc: [1, def: { ghi: [2, jkl: { mno: [3, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }, 3>,
      { abc: [number, { ghi: [2, { mno: [3, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }
    >>,

    expect<assert.equal<
      Widen<{ abc: [1, def: { ghi: [2, jkl: { mno: [3, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }, 4>,
      { abc: [number, { ghi: [number, { mno: [3, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }
    >>,

    expect<assert.equal<
      Widen<{ abc: [1, def: { ghi: [2, jkl: { mno: [3, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }, 5>,
      { abc: [number, { ghi: [number, { mno: [3, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }
    >>,

    expect<assert.equal<
      Widen<{ abc: [1, def: { ghi: [2, jkl: { mno: [3, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }, 6>,
      { abc: [number, { ghi: [number, { mno: [number, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }
    >>,

    expect<assert.equal<
      Widen<{ abc: [1, def: { ghi: [2, jkl: { mno: [3, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }, 7>,
      { abc: [number, { ghi: [number, { mno: [number, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }
    >>,

    expect<assert.equal<
      Widen<{ abc: [1, def: { ghi: [2, jkl: { mno: [3, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }, 8>,
      { abc: [number, { ghi: [number, { mno: [number, pqr: { stu: [number, vwx: { yz: [5] }] }] }] }] }
    >>,

    expect<assert.equal<
      Widen<{ abc: [1, def: { ghi: [2, jkl: { mno: [3, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }, 9>,
      { abc: [number, { ghi: [number, { mno: [number, pqr: { stu: [number, vwx: { yz: [5] }] }] }] }] }
    >>,

    expect<assert.equal<
      Widen<{ abc: [1, def: { ghi: [2, jkl: { mno: [3, pqr: { stu: [4, vwx: { yz: [5] }] }] }] }] }, 10>,
      { abc: [number, { ghi: [number, { mno: [number, pqr: { stu: [number, vwx: { yz: [number] }] }] }] }] }
    >>,
  ]
}