import React, { useEffect, useState } from "react";
import "./InputSearch.css";
import {
  GeneralEmployee,
  GeneralArea,
} from "../../../../utils/interfaces/Interfaces";
import { IoAlertCircle } from "react-icons/io5";

interface InputSearchProps {
  options: (GeneralEmployee | GeneralArea)[] | undefined;
  placeholder: string;
  isActive: boolean;
  title: string;
  setValueSelected: (args: string) => void;
  setInputGroupError: (title: string, errorMessage: string) => void;
  inputGroupError: Record<string, string>;
  clearInputError: (all: boolean, title: string) => void;
  isInputActive: boolean;
  valueSelected: string;
}

type Option = GeneralEmployee | GeneralArea;

const InputSearch: React.FC<InputSearchProps> = ({
  options,
  placeholder,
  isActive,
  title,
  setValueSelected,
  valueSelected,
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
  const label =
    title === "resp-entrega" || title === "resp-receb" ? "responsável" : "área";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setValueSelected("")
    clearInputError(true, title)

    const filteredOptions = options?.filter((option) =>
      "name" in option
        ? option.name.toLowerCase().includes(searchTerm.toLowerCase())
        : option.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filteredOptions ?? []);
    if (filteredOptions?.length == 0 && isActive) {
      setInputGroupError(title, `${label} não encontrado(a)`);
      
    } else {
      clearInputError(false, title);
    }
    setSelectedOption(null);
  };

  const handleSelectOption = (option: Option) => {
    clearInputError(true, title)
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
      console.log("erro: ", inputGroupError[title])
      return inputGroupError[title];
    } else {
      return null;
    }
  };


  useEffect(() => {
    if(!isActive){
      if(searchTerm.length > 0){
        if(valueSelected.length == 0){
          setInputGroupError(title, `${label} não selecionado(a)`);
          setSearchTerm("")
        }
      }
    }
    
  }, [isActive])




  return (
    <div className="container-inputsearch">
      <div className="input-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`text input-area ${!isInputActive ? 'input-inative' : ''} ${getErrorByTitle(title) !== null ? "error-formatted" : ""}`}
          name={title}
          disabled={!isInputActive}
        />
      </div>
      <span className="error-text-main-page small-text">
     
        {getErrorByTitle(title) && (
          <>
           <IoAlertCircle size={15} />
          {getErrorByTitle(title)}
          </>
        )}
      </span>
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
