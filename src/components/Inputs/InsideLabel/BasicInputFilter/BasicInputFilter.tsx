import React, { useEffect, useState } from "react";
import "../BasicInput/BasicInput.css";
import "./BasicInputFilter.css";
import {
  Family,
  GeneralSupplier,
} from "../../../../utils/interfaces/Interfaces";

interface BasicInputFilterProps {
  inputPlaceholder: string;
  register: any;
  setValue: any;
  items: Family[] | GeneralSupplier[] | undefined;
  inputName: string;
  inputId: string;
  inputStyle: string;
}

type Item = Family | GeneralSupplier;

function BasicInputFilter(props: BasicInputFilterProps) {
  const [filteredOptions, setFilteredOptions] = useState<Item[] | undefined>(
    props.items
  );
  const [isFocused, setIsFocused] = useState(false);

  const setSelectedValue = (option: any) => {
    console.log("Setting value");
    props.setValue(
      props.inputName,
      "name" in option ? option.name : option.description
    );
    props.setValue(props.inputId, option.id);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;

    const filteredOptions = props.items?.filter((option) =>
      "name" in option
        ? option.name.toLowerCase().includes(searchTerm.toLowerCase())
        : option.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredOptions(filteredOptions ?? []);
  };

  return (
    <div>
      <input type="hidden" {...props.register(props.inputId)} />
      <div className={props.inputStyle}>
        <div className="entryarea">
          <input
            className="text-input"
            required
            {...props.register(props.inputName)}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              // Adicionando um pequeno atraso antes de definir isFocused como false
              setTimeout(() => {
                setIsFocused(false);
              }, 100);
            }}
          />
          <div className="label-line text-major">{props.inputPlaceholder}</div>
        </div>
        {isFocused && (
          <div className="search-itens z-997">
            <ul className="options-list">
              {filteredOptions?.map((option) => (
                <li key={option.id} onClick={() => setSelectedValue(option)}>
                  {"name" in option ? option.name : option.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default BasicInputFilter;
