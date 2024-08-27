export const areObjectValuesDifferent = <T extends Record<string, any>>(obj1: T, obj2: T): boolean => (
    Object.keys(obj1).some(key => obj1[key] !== obj2[key])
  );
  