export {
  type tag,
  type uri,
}

declare namespace tag {
  type extensible = typeof tag.extensible
  type tagExtractable = typeof tag.extractable
  type tagIntersectable = typeof tag.intersectable
}
namespace tag {
  export declare const extensible: "Extensible"       // as const
  export declare const intersectable: "Intersectable" // as const
  export declare const extractable: "Intersectable"   // as const
}
declare namespace uri {
  type extensible = typeof uri.extensible
  type extractable = typeof uri.extractable
  type intersectable = typeof uri.intersectable
}
namespace uri {
  export declare const extensible: unique symbol      // = Symbol.for(Ext.tag)
  export declare const intersectable: unique symbol   //  = Symbol.for(Ext.tagIntersectable)
  export declare const extractable: unique symbol     //  = Symbol.for(Ext.tagIntersectable)
}
