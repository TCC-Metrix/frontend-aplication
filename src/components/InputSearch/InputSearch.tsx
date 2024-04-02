import React, { useState } from "react";
import "./InputSearch.css";
import {
  GeneralEmployee,
  GeneralArea,
} from "../../utils/interfaces/Interfaces";

interface InputSearchProps {
  options: (GeneralEmployee | GeneralArea)[] | undefined;
  placeholder: string;
  isActive: boolean;
  title: string;
  setValueSelected: (args: string) => void;
  setInputGroupError: (title: string, errorMessage: string) => void;
  inputGroupError: Record<string, string>;
  clearInputError: (title: string) => void;
  isInputActive: boolean;
}

type Option = GeneralEmployee | GeneralArea;

const InputSearch: React.FC<InputSearchProps> = ({
  options,
  placeholder,
  isActive,
  title,
  setValueSelected,
  inputGroupError,
  setInputGroupError,
  clearInputError,
  isInputActive
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [filteredOptions, setFilteredOptions] = useState<Option[] | undefined>(
    options
  );
  const [error, setError] = useState<string>("");
  const label =
    title === "resp-entrega" || title === "resp-receb" ? "responsável" : "área";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setValueSelected("")

    const filteredOptions = options?.filter((option) =>
      "name" in option
        ? option.name.toLowerCase().includes(searchTerm.toLowerCase())
        : option.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filteredOptions ?? []);
    console.log("passei no input: ", filteredOptions);
    if (filteredOptions?.length == 0) {
      setError(`${label} não encontrado(a)`);
      setInputGroupError(title, "tal coisa nao encontrada");
      console.log(inputGroupError);
    } else {
      clearInputError(title);
    }
    setSelectedOption(null);
  };

  const handleSelectOption = (option: Option) => {
    setSearchTerm("name" in option ? option.name : option.description); // Atualiza o searchTerm com o rótulo da opção selecionada
    setSelectedOption(option); //Setting
    setValueSelected(option.id);
  };

  // Função para obter o erro com base no título
  const getErrorByTitle = (title: string) => {
    if (inputGroupError.hasOwnProperty(title)) {
      if(inputGroupError[title] == ""){
        return null
      }
      return inputGroupError[title];
    } else {
      console.log('returning null')
      return null;
    }
  };

  return (
    <div className="container-inputsearch">
      <div className="input-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`text input-area ${getErrorByTitle(title) !== null ? "error-formatted" : ""}`}
          name={title}
          disabled={isInputActive}
        />
      </div>
      <p className="error-text-main-page small-text">
        {getErrorByTitle(title) && (
          <>{getErrorByTitle(title)}</>
        )}
      </p>
      <div className={isActive ? "search-itens" : "none"}>
        {filteredOptions && filteredOptions?.length > 0 && (
          <ul className="options-list">
            {filteredOptions?.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelectOption(option)}
                className={selectedOption === option ? "selected" : ""}
              >
                {"name" in option ? option.name : option.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InputSearch;
