"use client";

import { useState, useRef, useEffect } from "react";

type OptionType = {
  value: string;
  label: string;
};

export default function SelectWithImage({imageUrl, updateParam, type, options} : {imageUrl : string, updateParam: (key : string, value: string) => void, type: string, options: OptionType[]}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleImageClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: OptionType) => {
    updateParam(type, option.value);
    setIsOpen(false);
  };

  // Chiudere il menu se clicco fuori
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="md:hidden relative flex flex-col items-center space-y-4 max-md:mr-8" ref={menuRef}>
      <img
        src={imageUrl}
        alt="Apri Selezione"
        onClick={handleImageClick}
        className="cursor-pointer block size-12"
      />

      {isOpen && (
        <div className="absolute mt-2 -right-8 top-8 w-max rounded-md shadow-lg bg-white border z-10">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}