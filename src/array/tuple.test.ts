import { attest } from "@arktype/attest";
import { describe, it } from "vitest";

import type { tuple } from "./tuple.js";
import type { any } from "../any/exports.js";

const input: readonly [a: 1, b: 2, c: 3, d: 4, e: 5] = [1, 2, 3, 4, 5];

function preserveLabels<const T extends any.array>(xs: T): tuple.take<T, 2>;
function preserveLabels<const T extends any.array>(xs: T) {
  return xs.slice(0, 2);
}

describe("tuple.take", () => {
  it("preserves tuple labels", () => {
    attest(preserveLabels(input)).type.toString.snap("[a: 1, b: 2]");
  });
});
