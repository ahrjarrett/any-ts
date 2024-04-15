export {
  type arguments_ as arguments,
  type return_ as return,
}

type return_<type> = [type] extends [(...args: any) => infer out] ? out : never
type arguments_<type> = [type] extends [(...args: infer arguments) => any] ? arguments : never
