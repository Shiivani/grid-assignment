import {useEffect} from "react";

const useOutsideHandler = (
  ref: React.MutableRefObject<HTMLInputElement | null>,
  onOutsideClick: () => void,
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onOutsideClick();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export default useOutsideHandler;
