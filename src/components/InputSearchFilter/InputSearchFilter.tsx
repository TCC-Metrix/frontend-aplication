import React, { useState } from "react";
import "./InputSearchFilter.css";
import "../InputSearch/InputSearch.css";
import {
  GeneralInstrument,
  InstrumentToModalTableUseOutput,
  Option,
} from "../../utils/interfaces/Interfaces";

interface InputSearchProps {
  instrumentsFiltered: GeneralInstrument[] | undefined; // Opções para filtrar
  dropdownOptions: Option[]; // Opções para o dropdown
  isActive: boolean;
  title: string;
  setDropdownSelected: (dropdownValue: string) => void;
  setInputSearchValue: (inputValue: string) => void;
  setInstrumentsFiltered: (arg: GeneralInstrument[] | undefined) => void;
  setInstrumentSelected: (arg: InstrumentToModalTableUseOutput) => void;
  instrumentSelected: InstrumentToModalTableUseOutput;
  tableModalList: InstrumentToModalTableUseOutput[];
}

const InputSearchFilter = (props: InputSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("description");
  const [selectedOptionInput, setSelectedOptionInput] = useState<string>("");
  const [error, setError] = useState<string>("")
  const [placeholder, setPlaceholder] = useState<string>(
    "Busque pela descrição do instrumento"
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    props.setInputSearchValue(searchTerm);
    setSearchTerm(searchTerm);

    if (searchTerm === "") {
      props.setInstrumentsFiltered([]);
    }

    setSelectedOptionInput(""); // Limpa a opção selecionada ao digitar no input de texto
  };

  const handleSelectOption = (value: string) => {
    if (value === "Codigo") {
      setPlaceholder("Busque pelo codigo do instrumento");
      props.setDropdownSelected("code");
    } else if (value === "Descrição") {
      setPlaceholder("Busque pela descrição do instrumento");
      props.setDropdownSelected("description");
    }

    setSearchTerm("");

    setSelectedOption(value);
  };

  return (
	<>
	
    <div className="input-search-filter-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={error == "" ? "input-search-filter-area" : "input-search-filter-area error-formatted"}
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
            props.instrumentsFiltered.map((instrumentItem, index) => (
				<li
                key={index}
                onClick={() => {
					setSelectedOptionInput(instrumentItem.description);
					setSearchTerm(
						instrumentItem.code + " / " + instrumentItem.description
						);
						const hasInstrumentInTableList = props.tableModalList.some(item => item.code === instrumentItem.code)
						
						if (!hasInstrumentInTableList){
							props.setInstrumentSelected({
								code: instrumentItem.code,
								description: instrumentItem.description,
								family: instrumentItem.familyId.description,
								nextCalibration: instrumentItem.nextCalibration,
								calibrationFrequency: instrumentItem.familyId.calibrationFrequencyInMonths,
							});
							setError("")
					}else{
						console.log("aaaaaaaaaaaaaaaaaaaaaaaaa")
						setError("instrumento já adicionado")
					}
                }}
                className={
					selectedOptionInput === instrumentItem.description
                    ? "selected"
                    : ""
                }
				>
                {instrumentItem.code} /&nbsp;
                {instrumentItem.description}&nbsp;/ Próx. calibração{" "}
                {instrumentItem.nextCalibration}
              </li>
            ))}
        </ul>
			
      </div>
    </div>
	{error}
	</>
  );
};

export default InputSearchFilter;
