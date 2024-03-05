import React, { useState } from 'react';
import './Dropdown.css'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface DropdownProps {
  options: string[];
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || placeholder} {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map(option => (
            <div key={option} onClick={() => handleSelect(option)} className="dropdown-item">
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;