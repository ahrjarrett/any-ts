/**
 * 
 * Glossary
 * 
 * -----------
 * _type-constructor_
 * ---
 *   A {@link https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases type alias} 
 *   that accepts an argument. 
 * 
 *   Note that in the TypeScript ecosystem this is sometimes 
 *   called a "generic". The problem with "generic" is that 
 *   the ecosystem _also_ often calls the type parameter itself 
 *   a "generic", and _also_ calls a function that returns a 
 *   type-constructor a "generic".
 * 
 *   The lack of precision introduces the opportunity for 
 *   miscommunication, which wastes time and energy.
 * 
 *   See also:
 *   - {@link https://en.wikipedia.org/wiki/Type_constructor type-constructor}
 * 
 * 
 * -----------
 * _invariant_
 * ---
 *   A _type-constructor_ that sets an additional constraint 
 *   on the type being constructed. Usually this constraint
 *   comes in the form of an additional type parameter.
 *  
 *   Example: 
 *   - {@link Any.arrayof any.arrayof}
 * 
 * 
 * -----------
 * _nullary_
 * ---
 *   A _type-constructor_ that accepts zero arguments.
 * 
 *   Note that a type-constructor that accepts an optional
 *   argument can be called _nullary_ **or** _unary_,
 *   although conventionally you would use "nullary" in
 *   that context to indicate which variant you're referring 
 *   to.
 * 
 *   Example:
 *   - {@link Any.primitive any.primitive}
 *
 * 
 * -----------
 * _unary_
 * ---
 *   A _type-constructor_ that accepts (at least one) argument.
 * 
 *   Example:
 *   - {@link Any.primitive any.primitive}
 *   - {@link Any.arrayof any.arrayof}
 *
 *
 * -----------
 * _binary_
 * ---
 * 
 *   A _type-constructor_ that accepts (at least two) arguments.
 *   
 *   Example:
 *   - {@link Any.arrayof any.arrayof}
 */
export * from "./exports.js"
