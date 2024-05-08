import type { id } from "./util.js";

/** @ts-expect-error hush */
export interface Identity<nonunion extends {} = {}> extends id<nonunion> { }
