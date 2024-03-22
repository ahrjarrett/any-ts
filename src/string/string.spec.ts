import type { string } from "./string"
import type * as Internal from "./_internal"
import type { charset } from "./char"
import type { assert, expect } from "../test/exports"

declare namespace Spec {
  type isParsableNumeric = [
    // ^?
    // forgotten path
    expect<assert.is.false<string.is.parsableNumeric<"abc">>>,
    expect<assert.is.false<string.is.parsableNumeric<"a0a">>>,
    // happy path
    expect<assert.is.true<string.is.parsableNumeric<"0">>>,
    expect<assert.is.true<string.is.parsableNumeric<"0.000">>>,
  ]

  type split = [
    // ^?
    expect<assert.equal<string.split<``, [``]>, "">>,
    expect<assert.equal<string.split<`.`, [`.`]>, `.`>>,
    // expect<assert.equal<string.split<`hey jude`, [" "], HKT.replace<" ", "\n">>, "hey\njude">>,
    // expect<assert.equal<
    //   string.split<`123e4567-e89b-12d3-a456-426614174000`, [`-`], HKT.replace<`-`, `_`>>,
    //   "123e4567_e89b_12d3_a456_426614174000"
    // >>,
  ]

  type splitOnceOnChar = [
    // ^?
    expect<assert.equal<Internal.splitOnceOnChar<``, ``>, never>>,
    expect<assert.equal<Internal.splitOnceOnChar<" ", " ">, [before: "", after: ""]>>,
    expect<assert.equal<Internal.splitOnceOnChar<`1`, 1>, [before: "", after: ""]>>,
    expect<assert.equal<Internal.splitOnceOnChar<`.x`, `.`>, [before: "", after: "x"]>>,
    expect<assert.equal<Internal.splitOnceOnChar<`x.`, `.`>, [before: "x", after: ""]>>,
    expect<assert.equal<Internal.splitOnceOnChar<`hey.ho`, `, `>, never>>,
  ]

  type splitOnceOnChars = [
    // ^?
    expect<assert.equal<
      Internal.splitOnceOnChars<``, `555-555-5555`, `555`>,
      [before: "", after: "-555-5555"]
    >>,
    expect<assert.equal<
      Internal.splitOnceOnChars<``, `555-333-5555`, `333`>,
      [before: "555-", after: "-5555"]
    >>,
  ]

  type startsWith = [
    // ^?
    /* unhappy path */
    expect<assert.is.false<string.startsWith<123, "hey">>>,
    /* happy path */
    expect<assert.is.true<string.startsWith<"", "">>>,
    expect<assert.is.true<string.startsWith<"", "123">>>,
    expect<assert.is.true<string.startsWith<123, "123">>>,
    expect<assert.is.true<string.startsWith<123, "123456">>>,
  ]

  type takeUntilCaseChange = [
    Internal.takeUntilCaseChange<"", "fbi">,
    Internal.takeUntilCaseChange<"", "fbiVan">,
    Internal.takeUntilCaseChange<"", "aFbiVan">,
    Internal.takeUntilCaseChange<"", "anFbiVan">,
    Internal.takeUntilCaseChange<"", "FBIVanWest">,
    Internal.takeUntilCaseChange<"", "FbiVanWest">,
    Internal.takeUntilCaseChange<"", "fbiVanWest">,
    Internal.takeUntilCaseChange<"", "f">,
    Internal.takeUntilCaseChange<"", "F">,
    Internal.takeUntilCaseChange<"prev", "F">,
    Internal.takeUntilCaseChange<"", "">,
    Internal.takeUntilCaseChange<"f", "biVanEast">,
    Internal.takeUntilCaseChange<"fbi", "VanEast">,
  ]

  type takeUntilCaseChangeRec = [
    Internal.takeUntilCaseChangeRec<[], "">,            //  [""]
    Internal.takeUntilCaseChangeRec<[], "_">,           //  ["F"]
    Internal.takeUntilCaseChangeRec<[], "f">,           //  ["f"]
    Internal.takeUntilCaseChangeRec<[], "F">,           //  ["F"]
    Internal.takeUntilCaseChangeRec<[], "fbi">,         //  ["fbi"]
    Internal.takeUntilCaseChangeRec<[], "FBI">,         //  ["FBI"]
    Internal.takeUntilCaseChangeRec<[], "fbiVan">,      //  ["fbi", "Van"]
    Internal.takeUntilCaseChangeRec<[], "aFbiVan">,     //  ["a", "Fbi", "Van"]
    Internal.takeUntilCaseChangeRec<[], "anFbiVan">,    //  ["an", "Fbi", "Van"]
    Internal.takeUntilCaseChangeRec<[], "FBIVanWest">,  //  ["FBI", "Van", "West"]
    Internal.takeUntilCaseChangeRec<[], "FbiVanWest">,  //  ["Fbi", "Van", "West"]
    Internal.takeUntilCaseChangeRec<[], "fbiVanWest">,  //  ["fbi", "Van", "West"]
    Internal.takeUntilCaseChangeRec<[], "fbi_Van_West">,  //  ["fbi", "Van", "West"]
    Internal.takeUntilCaseChangeRec<[], "fbiVan123">,  //  ["fbi", "Van", "West"]
    Internal.takeUntilCaseChangeRec<[], "FBIVan123">,
    Internal.takeUntilCaseChangeRec<[], "FBIVan1abc">,
    Internal.takeUntilCaseChangeRec<[], "123">,
    Internal.takeUntilCaseChangeRec<[], "FBIVan123AndStuff">,
    Internal.takeUntilCaseChangeRec<[], "FBIVan123andStuff">,
    Internal.takeUntilCaseChangeRec<[], "PROPERTY">,
  ]

  type takeUntilExclusive = [
    string.takeUntilExclusive<"FBI", charset.Uppers>,
    string.takeUntilExclusive<"FBIVan", charset.Uppers>,
    string.takeUntilExclusive<"FBIVanWest", charset.Uppers>,
    string.takeUntilExclusive<"FbiVanWest", charset.Uppers>,
    string.takeUntilExclusive<"fbiVanWest", charset.Uppers>,
    string.takeUntilExclusive<"f", charset.Uppers>,
    string.takeUntilExclusive<"F", charset.Uppers>,
    string.takeUntilExclusive<"", charset.Uppers>,
  ]

  type takeUntilInclusive = [
    string.takeUntilInclusive<"fbi", charset.Lowers>,
    string.takeUntilInclusive<"fbiVan", charset.Lowers>,
    string.takeUntilInclusive<"aFbiVan", charset.Lowers>,
    string.takeUntilInclusive<"anFbiVan", charset.Lowers>,
    string.takeUntilInclusive<"FBIVanWest", charset.Lowers>,
    string.takeUntilInclusive<"FbiVanWest", charset.Lowers>,
    string.takeUntilInclusive<"fbiVanWest", charset.Lowers>,
    string.takeUntilInclusive<"f", charset.Lowers>,
    string.takeUntilInclusive<"F", charset.Lowers>,
    string.takeUntilInclusive<"", charset.Lowers>,
  ]

  type snake = [
    // ^?
    expect<assert.equal<string.snake<"FBIVan123">, "fbi_van_123">>,
    expect<assert.equal<string.snake<"FBIVan1abc">, "fbi_van_1_abc">>,
    expect<assert.equal<string.snake<"123">, "123">>,
    expect<assert.equal<string.snake<"FBIVan123AndStuff">, "fbi_van_123_and_stuff">>,
    expect<assert.equal<string.snake<"FBIVan123andStuff">, "fbi_van_123_and_stuff">>,
    expect<assert.equal<string.snake<"PROPERTY">, "property">>,
    expect<assert.equal<Internal.snake<"FBIVan123">, "fbi_van_123">>,
    expect<assert.equal<Internal.snake<"FBIVan1abc">, "fbi_van_1_abc">>,
    expect<assert.equal<Internal.snake<"123">, "123">>,
    expect<assert.equal<Internal.snake<"FBIVan123AndStuff">, "fbi_van_123_and_stuff">>,
    expect<assert.equal<Internal.snake<"FBIVan123andStuff">, "fbi_van_123_and_stuff">>,
  ]
}
