import { attest, bench } from "@arktype/attest";
import { describe, it } from "vitest";

import type { Kind } from "./kind.js";
import type { any } from "../any/exports.js";

interface Intercalate<delimiter extends any.showable>
  extends Kind<[string, string]> {
  [-1]: this[0] extends "" ? this[1] : `${this[0]}${delimiter}${this[1]}`;
}

describe("tuple.take", () => {
  bench("Kind.apply", () => {
    const type: Kind.apply<
      Kind.fold<string>,
      [Intercalate<";">, ["A", "B", "C", "D"]]
    > = "A;B;C;D";
    return type;
  }).types([2133, "instantiations"]);
  // }).types([2711, "instantiations"]);

  bench("Kind.apply$", () => {
    const type: Kind.apply$<Kind.fold<string>, [Intercalate<";">, ["E"]]> = "E";
    return type;
  }).types([841, "instantiations"]);
  // }).types([1423, "instantiations"]);

  it("preserves tuple labels", () => {
    const type: Kind.apply<
      Kind.fold<string>,
      [Intercalate<";">, ["a", "b"]]
    > = "a;b";
    attest(type).type.toString.snap('"a;b"');
  });
  //   attest(test).type.toString.snap('"a;b"');
  // });
});
