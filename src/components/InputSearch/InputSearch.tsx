import React, { useState } from "react";
import "./InputSearch.css";
import { GeneralEmployee } from "../../utils/interfaces/Interfaces";

interface InputSearchProps {
	options: GeneralEmployee[] | undefined;
	placeholder: string;
	isActive: boolean;
	title: string;
}

const InputSearch: React.FC<InputSearchProps> = ({
	options,
	placeholder,
	isActive,
	title,
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [filteredOptions, setFilteredOptions] = useState<GeneralEmployee[] | undefined>(options);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = event.target.value;
		setSearchTerm(searchTerm);

		const filteredOptions = options?.filter((option) =>
			option.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredOptions(filteredOptions ?? []);
		setSelectedOption(null);
	};

	const handleSelectOption = (value: string, name: string) => {
		setSearchTerm(name); // Atualiza o searchTerm com o rótulo da opção selecionada
		setSelectedOption(value);
	};

	return (
		<div className="container-inputsearch">
			<div className="input-container">
				<input
					type="text"
					value={searchTerm}
					onChange={handleInputChange}
					placeholder={placeholder}
					className="text input-area"
					name={title}
				/>
			</div>
			<div className={isActive ? "search-itens" : "none"}>
				<ul className="options-list">
					{filteredOptions?.map((option, index) => (
						<li
							key={index}
							onClick={() => handleSelectOption(option.name, option.name)}
							className={selectedOption === option.name ? "selected" : ""}
						>
							{option.name}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default InputSearch;
