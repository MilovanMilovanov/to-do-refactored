import { Ref, RefCallback, MutableRefObject } from "react";

export const areObjectValuesDifferent = <T extends Record<string, any>>(
  obj1: T,
  obj2: T
): boolean => Object.keys(obj1).some((key) => obj1[key] !== obj2[key]);

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
