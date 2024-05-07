import type { id } from "./util";

/** @ts-expect-error hush */
export interface Identity<nonunion extends {} = {}> extends id<nonunion> { }
