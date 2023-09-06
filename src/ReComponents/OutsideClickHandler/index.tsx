import React, {useRef, ComponentProps} from "react";
import useOutsideHandler from "CustomHooks/useOutsideHandler";

interface OutsideClickProps extends ComponentProps<"div"> {
  onOutsideClick: () => void;
  children: React.ReactNode;
}

export default function OutsideClickHandler({
  children,
  onOutsideClick,
  ...restProps
}: OutsideClickProps) {
  const wrapperRef = useRef(null);
  useOutsideHandler(wrapperRef, onOutsideClick);

  return (
    <div ref={wrapperRef} {...restProps}>
      {children}
    </div>
  );
}

OutsideClickHandler.defaultProps = {
  onOutsideClick: () => null,
};
