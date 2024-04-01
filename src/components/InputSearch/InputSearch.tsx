import React, { useState } from "react";
import "./InputSearch.css";
import { GeneralEmployee, GeneralArea } from "../../utils/interfaces/Interfaces";

interface InputSearchProps {
  options: (GeneralEmployee | GeneralArea)[] | undefined;
  placeholder: string;
  isActive: boolean;
  title: string;
}

type Option = GeneralEmployee | GeneralArea;

const InputSearch: React.FC<InputSearchProps> = ({
  options,
  placeholder,
  isActive,
  title,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [filteredOptions, setFilteredOptions] = useState<Option[] | undefined>(options);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredOptions = options?.filter((option) =>
      'name' in option ? option.name.toLowerCase().includes(searchTerm.toLowerCase()) : option.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filteredOptions ?? []);
    setSelectedOption(null);
  };

  const handleSelectOption = (option: Option) => {
    setSearchTerm('name' in option ? option.name : option.description); // Atualiza o searchTerm com o rótulo da opção selecionada
    setSelectedOption(option); //Setting
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
              onClick={() => handleSelectOption(option)}
              className={selectedOption === option ? "selected" : ""}
            >
              {'name' in option ? option.name : option.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InputSearch;
