export type identity<x> = x

/* @ts-expect-error hush */
export interface Identity<nonunion extends {} = {}> extends identity<nonunion> { }
