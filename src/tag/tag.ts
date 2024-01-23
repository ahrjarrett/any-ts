/* eslint-disable
 custom-rules/use-global-this,
 prettier/prettier,
 @typescript-eslint/ban-types,
 @typescript-eslint/no-explicit-any,
 @typescript-eslint/naming-convention,
 @typescript-eslint/no-empty-interface,
 @typescript-eslint/no-namespace,
 @typescript-eslint/no-shadow,
*/
export {
  Discriminant,
  hasDiscriminant,
  type HasDiscriminant,
  type TagWithEntries,
  Tag,
}

import type { any } from "../exports";

type Discriminant = typeof Discriminant
type HasDiscriminant<
  type extends
  | any.indexedBy<Discriminant>
  = any.indexedBy<Discriminant>> = type

const Discriminant = Symbol.for("@hotel-engine/data/constructor::Discriminant")
const hasDiscriminant
  : (u: unknown) => u is HasDiscriminant
  = (u): u is never => u !== null && typeof u === "object" && Discriminant in u

type TagWithEntries<type extends Tag | "entries" = Tag | "entries"> = type
type Tag<type extends keyof typeof Tag = keyof typeof Tag> = type
namespace Tag {
  export const array = "array";
  export const boolean = "boolean";
  export const intersection = "intersection";
  export const number = "number";
  export const object = "object";
  export const string = "string";
  export const tuple = "tuple";
  export const union = "union";
}

declare namespace Tag {
  type Array = typeof Tag.array;
  type Boolean = typeof Tag.boolean;
  type Intersection = typeof Tag.intersection;
  type Number = typeof Tag.number;
  type Object = typeof Tag.object;
  type String = typeof Tag.string;
  type Tuple = typeof Tag.tuple;
  type Union = typeof Tag.union;
  export {
    Array as array,
    Boolean as boolean,
    Intersection as intersection,
    Number as number,
    Object as object,
    String as string,
    Tuple as tuple,
    Union as union,
  };
}
