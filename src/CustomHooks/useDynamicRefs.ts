import {createRef} from "react";

const map = new Map<string, React.RefObject<Element>>();

const setRef = <Type>(key: string): React.RefObject<Element> | null => {
  if (!key) {
    return null;
  }
  const ref = createRef();
  map.set(key, ref as React.RefObject<Element>);
  return ref as React.RefObject<Element>;
};

const getRef = <Type>(key: string): React.RefObject<Element> | null => {
  if (!map.has(key)) {
    return null;
  }
  return map.get(key) as React.RefObject<Element>;
};

const useDynamicRefs = () => {
  return [getRef, setRef];
};

export default useDynamicRefs;
