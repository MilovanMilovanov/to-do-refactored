import { Ref, RefCallback, MutableRefObject } from "react";

export function mergeRefs<T>(...refs: Ref<T>[]): RefCallback<T> {
  return (instance: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref != null) {
        (ref as MutableRefObject<T | null>).current = instance;
      }
    });
  };
}
