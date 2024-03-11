
type order<type extends any.entries> = { [ix in keyof type]: type[ix][0] }
type ord = typeof ord
declare const ord: unique symbol

type structured<type extends any.entries> = never | { [entry in type[number]as entry[0]]: entry[1] }
type ordered<type extends any.entries> = never | { [entry in ([ord, order<type>] | type[number]) as entry[0]]: entry[1] }
type struct<type extends any.entries> = never | Struct<ordered<type>>
interface Struct<type extends any.object> extends Semantic<type> { }