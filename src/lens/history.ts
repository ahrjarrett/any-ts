import { describe, expect } from "../exports.js"
import type { any } from "../exports.js"

declare namespace History {
  const History: HistoryConstructor
  interface HistoryConstructor<prev extends any.array = []> {
    <const next>(next: next): History<next, prev>
  }

  interface History<type, prev extends any.array = []> {
    <const next>(next: next): History<next, [...prev, ...([type] extends [never] ? [] : [type])]>
    concat: HistoryConstructor<[...prev, ...([type] extends [never] ? [] : [type])]>
  }
}

describe("History", t =>
  // ^?
  expect(t.assert.equal(
    History.History(123)(456)(789),
    History.History(123).concat(456).concat(789),
  ))
)
