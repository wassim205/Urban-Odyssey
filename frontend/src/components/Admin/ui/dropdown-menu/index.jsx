import React, { useState, useContext, createContext, useRef, useEffect } from "react";

const DropdownMenuContext = createContext();

export function DropdownMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, toggleDropdown, closeDropdown }}>
      <div className="relative">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({ asChild, children, ...props }) {
  const { toggleDropdown } = useContext(DropdownMenuContext);

  const handleClick = (e) => {
    e.stopPropagation();
    toggleDropdown();
    if (props.onClick) props.onClick(e);
  };

  return React.cloneElement(children, {
    ...props,
    onClick: handleClick,
  });
}

export function DropdownMenuContent({ className, align = "center", children, ...props }) {
  const { isOpen, closeDropdown } = useContext(DropdownMenuContext);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  if (!isOpen) return null;

  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  return (
    <div
      ref={ref}
      className={`absolute z-[1000] mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md ${alignClasses[align]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ className, children, ...props }) {
  return (
    <button
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}