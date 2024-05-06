import { _ } from "../util";

type tupleOne<only = _> = readonly [_1: only]
type tupleTwo<first = _, second = _> = readonly [_1: first, _2: second]
type tupleThree<first = _, second = _, third = _> = readonly [_1: first, _2: second, _3: third]

export type tupleN = [
  tupleOne,
  tupleTwo,
  tupleThree,
]

export declare namespace tuple {
  export {
    tupleOne as one,
    tupleTwo as two,
    tupleThree as three,
  }
}
