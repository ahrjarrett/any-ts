import type { id } from "./util.js";

/** @ts-expect-error hush */
export interface newtype<nonunion extends {} = {}> extends id<nonunion> { }
