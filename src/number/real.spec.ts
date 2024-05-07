import type { real as _ } from "./real.js"

declare namespace __Spec__ {
  type __is__ = [
    _.is<1.3>,
    _.is<-1>,
    _.is<number>,
  ]
}
