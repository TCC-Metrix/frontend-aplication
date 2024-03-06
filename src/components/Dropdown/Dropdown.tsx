import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./Dropdown.css";

interface Option {
	label: string;
}

interface DropdownSearchProps {
	options: Option[];
  placeholder: string;
}

const Dropdown: React.FC<DropdownSearchProps> = ({ options, placeholder }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = event.target.value;
		setSearchTerm(searchTerm);

		const filteredOptions = options.filter((option) =>
			option.label.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredOptions(filteredOptions);
		setSelectedOption(null);
	};

	const handleSelectOption = (value: string, label: string) => {
		setSearchTerm(label); // Atualiza o searchTerm com o rótulo da opção selecionada
		setSelectedOption(value);
		setIsOpen(false);
	};

	return (
		<div className="container-input">
			<div className="input-style">
				<input
					type="text"
					value={searchTerm}
					onChange={handleInputChange}
					onFocus={toggleDropdown}
					placeholder={placeholder}
					className="input-drop"
				/>

				<div className="arrow-style">
					{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
				</div>
			</div>
			<div
				className="drop-itens"
				style={{ display: isOpen ? "block" : "none"}}
			>
				{isOpen && (
					<ul className="options-list">
						{filteredOptions.map((option, index) => (
							<li
								key={index}
								onClick={() => handleSelectOption(option.label, option.label)}
								className={selectedOption === option.label ? "selected" : ""}
							>
								{option.label}
                {index !== filteredOptions.length - 1 && (
                  <div className="border-bot-drop"></div>
                )}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Dropdown;
