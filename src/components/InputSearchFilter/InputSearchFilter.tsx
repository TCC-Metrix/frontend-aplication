import React, { useState } from "react";
import "./InputSearchFilter.css";
import "../InputSearch/InputSearch.css";

interface Option {
	value: string;
}

interface InputSearchProps {
	searchOptions: Option[]; // Opções para filtrar
	dropdownOptions: Option[]; // Opções para o dropdown
	placeholder: string;
	isActive: boolean;
	title: string;
	placeholderOption: string;
}

const InputSearchFilter = (props: InputSearchProps) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedOption, setSelectedOption] = useState<string>("");
	const [selectedOptionInput, setSelectedOptionInput] = useState<string>("");
	const [placeholder, setPlaceholder] = useState<string>("");
	const [filteredOptions, setFilteredOptions] = useState<Option[]>(
		props.searchOptions
	);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = event.target.value;
		console.log(searchTerm);
		setSearchTerm(searchTerm);

		const filteredOptions = props.searchOptions.filter((option) =>
			option.value.toLowerCase().includes(searchTerm.toLowerCase())
		);

		setSelectedOptionInput(""); // Limpa a opção selecionada ao digitar no input de texto
		setFilteredOptions(filteredOptions);
	};

	const handleSelectOption = (value: string) => {
		if (value === "Nome") {
			setPlaceholder("Busque por nome do instrumento");
		} else if (value === "Exemplo") {
			setPlaceholder("Busque por exemplo do instrumento");
		} else if (value === "") {
			setPlaceholder("Busque por descrição do instrumento");
		}
		setSearchTerm("");
		setSelectedOption(value);
	};

	return (
		<div className="container-input-search-filter">
			<div className="input-search-filter-container">
				<input
					type="text"
					value={searchTerm}
					onChange={handleInputChange}
					placeholder={placeholder}
					className="input-search-filter-area"
					name={props.title}
				/>

				{/* Dropdown de opções */}
				<select
					value={selectedOption}
					onChange={(e) => handleSelectOption(e.target.value)}
					className="filter-dropdown"
				>
					<option value="">{props.placeholderOption}</option>
					{props.dropdownOptions.map((option, index) => (
						<option key={index} value={option.value}>
							{option.value}
						</option>
					))}
				</select>
				<div className={props.isActive ? "search-filter-instrument" : "none"}>
					<ul className="options-list-filter">
						{filteredOptions.map((optionItens, index) => (
							<li
								key={index}
								onClick={() => {
									setSearchTerm(optionItens.value);
								}}
								className={
									selectedOptionInput === optionItens.value ? "selected" : ""
								}
							>
								{optionItens.value}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default InputSearchFilter;
