import React, { useState } from "react";
import "./InputSearchFilter.css";
import "../InputSearch/InputSearch.css";
import {
  GeneralInstrument,
  InstrumentToModalTableUseOutput,
  Option,
} from "../../utils/interfaces/Interfaces";
import { IoAlertCircle } from "react-icons/io5";
import { RotatingLines } from "react-loader-spinner";

interface InputSearchProps {
  instrumentsFiltered: GeneralInstrument[] | undefined; // Opções para filtrar
  dropdownOptions: Option[]; // Opções para o dropdown
  isActive: boolean;
  title: string;
  setDropdownSelected: (dropdownValue: string) => void;
  setInstrumentsFiltered: (arg: GeneralInstrument[] | undefined) => void;
  setInstrumentSelected: (arg: InstrumentToModalTableUseOutput) => void;
  instrumentSelected: InstrumentToModalTableUseOutput;
  tableModalList: InstrumentToModalTableUseOutput[];
  inputError: string;
  setInputError: (arg: string) => void;
  setSearchTerm: (arg: string) => void;
  searchTerm: string;
}

const InputSearchFilter = (props: InputSearchProps) => {
  const [placeholder, setPlaceholder] = useState<string>(
    "Busque pela descrição do instrumento"
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    props.setSearchTerm(searchTerm);
    props.setInputError("");

    if (searchTerm === "") {
      props.setInstrumentsFiltered([]);
    }
  };

  const handleSelectOption = (value: string) => {
    if (value === "Código") {
      setPlaceholder("Busque pelo codigo do instrumento");
      props.setDropdownSelected("code");
    } else if (value === "Descrição") {
      setPlaceholder("Busque pela descrição do instrumento");
      props.setDropdownSelected("description");
    }

    props.setSearchTerm("");
  };

  const setSelectedInstrumentToInputValue = (
    instrumentItem: GeneralInstrument
  ) => {
    props.setSearchTerm(
      instrumentItem.code + " / " + instrumentItem.description
    );

    props.setInstrumentSelected({
      code: instrumentItem.code,
      description: instrumentItem.description,
      family: instrumentItem.familyId.description,
      nextCalibration: instrumentItem.nextCalibration,
      calibrationFrequency:
        instrumentItem.familyId.calibrationFrequencyInMonths,
      additionalReferences: instrumentItem.additionalReferences,
    });
  };

  return (
    <>
      <div className="input-search-filter-container">
        <select
          onChange={(e) => handleSelectOption(e.target.value)}
          className="filter-dropdown small-text"
        >
          {props.dropdownOptions.map((option, index) => (
            <option className="text" key={index} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={props.searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={
            props.inputError == ""
              ? "input-search-filter-area"
              : "input-search-filter-area error-formatted"
          }
          name={props.title}
        />
        <div className="loader-container">
          <RotatingLines
            visible={true}
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            strokeColor="#99aebb"
            width="20"
          />
        </div>

        <div className={props.isActive ? "search-filter-instrument" : "none"}>
          <ul className="options-list-filter">
            {props.instrumentsFiltered &&
              props.instrumentsFiltered.map((instrumentItem, index) => (
                <li
                  key={index}
                  onClick={() =>
                    setSelectedInstrumentToInputValue(instrumentItem)
                  }
                >
                  <span>{instrumentItem.code} /&nbsp;</span>
                  <span className="description-instrument-width">
                    {instrumentItem.description}&nbsp;{" "}
                  </span>
                  <span>
                    / Próx. calibração {instrumentItem.nextCalibration}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <span className="error-text small-text">
        {props.inputError && (
          <>
            <IoAlertCircle size={15} />
            {props.inputError}
          </>
        )}
      </span>
    </>
  );
};

export default InputSearchFilter;
