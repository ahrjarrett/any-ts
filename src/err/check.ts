export type {
  check,
  checkNot,
  doesNotSatisfy,
  TypeError,
  TypeError$,
  violatesRule,
}

import type { _ } from "../any"
import type { Kind } from "../kind/exports"

interface TypeError$ extends Kind<[string, _, _]> { [-1]: TypeError<this[0], [invariant: this[1], got: this[2]]> }
interface TypeError<msg extends string, pair extends [want: _, got: _]> extends Kind<[string, pair[0], pair[1]]> { }

type doesNotSatisfy<lowerBound, actual> = Kind.apply<TypeError$, [`Expected \`type\` to satisfy \`invariant\``, lowerBound, actual]>
type violatesRule<rule, violation> = Kind.apply<TypeError$, [`\`type\` cannot extend \`invariant\``, rule, violation]>

type check<type, invariant> = [type] extends [invariant] ? invariant : doesNotSatisfy<invariant, type>
type checkNot<type, invariant, constraint> = [type] extends [invariant] ? violatesRule<invariant, type> : constraint
