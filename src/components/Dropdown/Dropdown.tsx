import React, { useState } from "react";
import "./Dropdown.css";

interface Option {
	label: string;
}

interface DropdownSearchProps {
	options: Option[];
	placeholder: string;
	isActive: boolean;
	title: string;
}

const Dropdown: React.FC<DropdownSearchProps> = ({
	options,
	placeholder,
	isActive,
	title,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

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
	};

	return (
		<div className="container-dropdown">
			<div className="input-container">
				<input
					type="text"
					value={searchTerm}
					onChange={handleInputChange}
					// onFocus={toggleDropdown}
					placeholder={placeholder}
					className="input-area"
					name={title}
				/>
			</div>
			<div className={isActive ? "drop-itens" : "none"}>
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
			</div>
		</div>
	);
};

export default Dropdown;
