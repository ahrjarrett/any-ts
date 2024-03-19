export {
  delimitedCase,
}

import type { any } from "../any/any"
import type { join } from "./_internal"

type fromList<keys extends any.showables> = never | ({ [k in `${keys[number]}`]: k })
function fromList<const keys extends any.showables>(keys: keys): fromList<keys>
function fromList<const keys extends any.showables>(keys: keys) {
  return keys.reduce((acc, key) => ({ ...acc, [`${key}`]: key }), {})
}

const Escapables = [
  '[', ']',
  '{', '}',
  '(', ')',
  '|',
  '/',
  '-',
  '\\'
] as const

const Delimiters = [
  ...Escapables,
  " ",
  "_",
  ".",
] as const

type Escapable = keyof typeof Escapable
const Escapable = fromList(Escapables)

function keyof<const type extends any.nonnullable>(object: type): <key extends any.key>(key: key) => key is keyof type & key
function keyof<const type extends any.nonnullable>(object: type) { return (key: any.key): key is never => key in object }

type escape<char extends string> = char extends Escapable ? `\\${char}` : char
function escape<char extends string>(char: char): escape<char>
function escape<char extends string>(char: char) {
  return keyof(Escapable)(char) ? `\\${Escapable[char]}` : char
}

type patternFromCharset<charset extends any.showables> = `[${join<{ [ix in keyof charset]: escape<`${charset[ix]}`> }, "">}]`
function patternFromCharset<const charset extends any.showables>(...charset: charset): patternFromCharset<charset>
function patternFromCharset<const charset extends any.showables>(...charset: charset) {
  return `[${charset.map(String).map(escape).join("")}]`
}

function regexFromPattern<pattern extends string>(pattern: pattern): RegExp { return new RegExp(pattern, 'g') }
const regexFromCharset = <const charset extends any.showables>(charset: charset): RegExp => regexFromPattern(patternFromCharset(...charset))

/**
 * A possible implementation of `string.delimitedCase`, inspired by `words` from `string-ts`
 */
function delimitedCase<delimiter extends string>(__: delimiter) {
  return <text extends string>(text: text) => text
    .replace(regexFromCharset(Delimiters), ' ')                  // replaces known delimiters with whitespace 
    .replace(/([a-zA-Z])([0-9])/g, '$1 $2')                      // separate ${alpha}${digit} with whitespace
    .replace(/([0-9])([a-zA-Z])/g, '$1 $2')                      // separate ${digit}${alpha} with whitespace
    .replace(/([a-zA-Z0-9_\-./])([^a-zA-Z0-9_\-./'])/g, '$1 $2') // separate ${non-special}${special} with whitespace
    .replace(/([^a-zA-Z0-9_\-./'])([a-zA-Z0-9_\-./])/g, '$1 $2') // separate ${special}${non-special} with whitespace
    .replace(/([a-z])([A-Z])/g, '$1 $2')                         // separate ${lower}${upper} with whitespace
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')                    // separate ${upper}${lower} with whitespace
}
