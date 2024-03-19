import type { assert, expect } from "../test/exports"
import type * as _ from "./char"

declare namespace Spec {
  namespace char {
    type is = [
      // ^?
      // happy path
      expect<assert.is.true<_.char.is<"h">>>,
      // sad path
      expect<assert.is.false<_.char.is<"">>>,
      expect<assert.is.false<_.char.is<string>>>,
      expect<assert.is.false<_.char.is<"hello">>>,
    ]
    type is_digit = [
      // ^?
      // happy path
      expect<assert.is.true<_.char.is.digit<"0">>>,
      expect<assert.is.true<_.char.is.digit<"1">>>,
      // sad path
      expect<assert.is.false<_.char.is.digit<".">>>,
      expect<assert.is.false<_.char.is.digit<"11">>>,
      expect<assert.is.false<_.char.is.digit<"a">>>,
      expect<assert.is.false<_.char.is.digit<" ">>>,
    ]
  }

  namespace chars {
    type is = [
      // ^?
      // happy path
      expect<assert.is.true<_.charset.is<"hello">>>,
      // sad path
      expect<assert.is.false<_.charset.is<"">>>,
      expect<assert.is.false<_.charset.is<string>>>,
      expect<assert.is.false<_.charset.is<"h">>>,
    ]
  }
}
