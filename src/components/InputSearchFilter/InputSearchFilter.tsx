import React, { useState } from "react";
import "./InputSearchFilter.css";
import "../InputSearch/InputSearch.css";
import { GeneralInstrument, Option } from "../../utils/interfaces/Interfaces";

interface InputSearchProps {
	searchOptions: GeneralInstrument[] | undefined; // Opções para filtrar
	dropdownOptions: Option[]; // Opções para o dropdown
	isActive: boolean;
	title: string;
	setDropdownSelected: (dropdownValue: string) => void
	setInputSearchValue: (inputValue: string) => void
}

const InputSearchFilter = (props: InputSearchProps) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedOption, setSelectedOption] = useState<string>("");
	const [selectedOptionInput, setSelectedOptionInput] = useState<string>("");
	const [placeholder, setPlaceholder] = useState<string>("Busque pela descrição do instrumento");
	const [filteredOptions, setFilteredOptions] = useState<GeneralInstrument[] | undefined>(
		props.searchOptions
	);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = event.target.value;
		setSearchTerm(searchTerm);
		props.setInputSearchValue(searchTerm)
		if (props.searchOptions === undefined){
			return null
		}
		const filteredOptions = props.searchOptions.filter(
			(option) =>
				option.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				option.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
				option.nextCalibration.toLowerCase().includes(searchTerm.toLowerCase())
		);

		setSelectedOptionInput(""); // Limpa a opção selecionada ao digitar no input de texto
		setFilteredOptions(filteredOptions);
	};

	const handleSelectOption = (value: string) => {
		if (value === "Codigo") {
			setPlaceholder("Busque pelo codigo do instrumento");
			props.setDropdownSelected('code')
		} else if (value === "Descrição") {
			setPlaceholder("Busque pela descrição do instrumento");
			props.setDropdownSelected('description')
		} else if (value === "Prox Calibração") {
			setPlaceholder("Busque pela data de próxima calibração");
			props.setDropdownSelected('nextCalibration')
		}
		setSearchTerm("");
		setSelectedOption(value);
	};

	return (
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
					className="filter-dropdown small-text"
				>
					{props.dropdownOptions.map((option, index) => (
						<option className="text" key={index} value={option.value}>
							{option.value}
						</option>
					))}
				</select>
				<div className={props.isActive ? "search-filter-instrument" : "search-filter-instrument"}>
					<ul className="options-list-filter">
						{props.searchOptions && 
						props.searchOptions.map((optionItens, index) => (
							<li
							key={index}
							onClick={() => {
								setSelectedOptionInput(optionItens.description);
								setSearchTerm(optionItens.description);
							}}
							className={
								selectedOptionInput === optionItens.description
									? "selected"
									: ""
							}
						>
							{optionItens.code}&nbsp;&nbsp;
							{optionItens.description}&nbsp;/
							Próx. calibração {optionItens.nextCalibration}
						</li>
						))}

						
					</ul>
				</div>
			</div>
	
	);
};

export default InputSearchFilter;
