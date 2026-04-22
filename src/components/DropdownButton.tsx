import { useState, useEffect, useRef } from "react";
import type { DropdownButtonProps } from "../types/props";
import {
  dropdownBtnStyles,
  dropdownChildrenStyles,
} from "../styles/macro-styles";

function DropdownButton({
  Icon,
  position,
  title,
  children,
}: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!divRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={divRef} className={position}>
      <button
        title={title}
        className={dropdownBtnStyles}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Icon size={24} />
      </button>
      {isOpen && <div className={dropdownChildrenStyles}>{children}</div>}
    </div>
  );
}

export default DropdownButton;
