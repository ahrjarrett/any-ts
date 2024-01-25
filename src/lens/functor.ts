interface Store<type = unknown> { [-1]: unknown }
interface Free<
  _0 = unknown,
  _1 = unknown,
  _2 = unknown
> extends
  Store,
  Free1<_0>,
  Free2<_1>,
  Free3<_2> { }

interface Free1<type = unknown> extends Store { [0]: type }
interface Free2<type = unknown> extends Store { [1]: type }
interface Free3<type = unknown> extends Store { [2]: type }

type ParamsArray = readonly [
  contravariant: unknown,
  covariant1: unknown,
  covariant2: unknown,
  invariant: unknown,
]
interface ParamsObject { [0]: unknown, [1]: unknown, [2]: unknown, [3]: unknown }
type TypeParameters = ParamsArray | ParamsObject
interface normalize
  <params extends TypeParameters = TypeParameters> extends Store { [0]: params[0], [1]: params[1], [2]: params[2], [3]: params[3] }

interface contravariant<type> { (_: type): never }
interface covariant<type> { (_: never): type }
interface invariant<type> { (_: type): type }
interface applyVariance<params extends TypeParameters = TypeParameters> extends Store {
  [0]: invariant<params[0]>,
  [1]: covariant<params[1]>,
  [2]: covariant<params[2]>,
  [3]: contravariant<params[3]>,
}

interface Bound<type = unknown> extends Store { [-2]: type }
interface Bind<F extends Free, args extends TypeParameters> extends Store, applyVariance<args> { F: F }

type forget<F extends Bound, args extends TypeParameters> = (F & normalize<args>)[-2]

type Kind<F extends Free, args extends TypeParameters>
  = F extends Bound ? forget<F, args>
  : Bind<F, args>
  ;


export declare const URI: unique symbol

declare namespace type {
  interface Class<F extends Free> { [URI]?: F }
  export { Class as class }
}

declare namespace Functor {
  export interface Invariant<F extends Free> extends type.class<F> {
    readonly imap: {
      <left, right>(
        to: (_: left) => right,
        from: (_: right) => left,
      ): <env, ok, err>(type: Kind<F, [env, ok, err, left]>)
          => Kind<F, [env, ok, err, right]>

      <env, ok, err, left, right>(
        type: Kind<F, [env, ok, err, left]>,
        to: (_: left) => right,
        from: (_: right) => left
      ): Kind<F, [env, ok, err, right]>
    }
  }

  export interface Covariant<F extends Free> extends type.class<F> {
    readonly map: {
      <input, output>(fn: (_: input) => output)
        : <env, err, ok>(type: Kind<F, [env, err, ok, input]>)
          => Kind<F, [env, err, ok, output]>

      <env, err, ok, input, output>(
        type: Kind<F, [env, err, ok, input]>,
        fn: (_: input) => output
      ): Kind<F, [env, err, ok, output]>
    }
  }

  export interface Contravariant<F extends Free> extends type.class<F> {
    readonly contramap: {
      <after, before>(fn: (_: after) => before)
        : <env, ok, err>(type: Kind<F, [env, err, ok, before]>)
          => Kind<F, [env, err, ok, after]>

      <env, ok, err, after, before>(
        type: Kind<F, [env, err, ok, before]>,
        fn: (_: after) => before
      ): Kind<F, [env, err, ok, after]>
    }
  }
}