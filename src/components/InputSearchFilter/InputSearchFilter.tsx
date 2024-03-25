import React, { useState } from "react";
import "./InputSearchFilter.css";
import "../InputSearch/InputSearch.css";
import { GeneralInstrument, Option } from "../../utils/interfaces/Interfaces";

interface InputSearchProps {
	instrumentsFiltered: GeneralInstrument[] | undefined; // Opções para filtrar
	dropdownOptions: Option[]; // Opções para o dropdown
	isActive: boolean;
	title: string;
	setDropdownSelected: (dropdownValue: string) => void
	setInputSearchValue: (inputValue: string) => void
	setInstrumentsFiltered: (arg: GeneralInstrument[] | undefined) => void
}

const InputSearchFilter = (props: InputSearchProps) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedOption, setSelectedOption] = useState<string>("description");
	const [selectedOptionInput, setSelectedOptionInput] = useState<string>("");
	const [placeholder, setPlaceholder] = useState<string>("Busque pela descrição do instrumento");

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = event.target.value;
		props.setInputSearchValue(searchTerm)
		setSearchTerm(searchTerm)

		if (searchTerm === ""){
			props.setInstrumentsFiltered([])
		}
		
		setSelectedOptionInput(""); // Limpa a opção selecionada ao digitar no input de texto
		
	};

	const handleSelectOption = (value: string) => {
		if (value === "Codigo") {
			setPlaceholder("Busque pelo codigo do instrumento");
			props.setDropdownSelected('code')
		} else if (value === "Descrição") {
			setPlaceholder("Busque pela descrição do instrumento");
			props.setDropdownSelected('description')
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
				<div className={props.isActive ? "search-filter-instrument" : "none"}>
					<ul className="options-list-filter">
						{props.instrumentsFiltered && 
						props.instrumentsFiltered.map((optionItens, index) => (
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
							{optionItens.code}  /&nbsp;
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
