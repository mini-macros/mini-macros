import { useState, useEffect, useRef } from "react";
import type { DropdownButtonProps } from "../types/props";
import { dropdownBtnStyles, dropdownChildStyles } from "../styles/macro-styles";

function DropdownButton({ Icon, children }: DropdownButtonProps) {
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
    <div ref={divRef} className="relative">
      <button
        className={dropdownBtnStyles}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Icon size={24} />
      </button>
      {isOpen && <div className={dropdownChildStyles}>{children}</div>}
    </div>
  );
}

export default DropdownButton;
