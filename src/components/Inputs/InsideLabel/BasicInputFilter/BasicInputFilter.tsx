import React, { useState } from "react";
import "../BasicInput/BasicInput.css";
import "./BasicInputFilter.css";
import {
  Family,
  GeneralArea,
  GeneralEmployee,
  GeneralLaboratory,
  GeneralSupplier,
} from "../../../../utils/interfaces/Interfaces";
import {
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

interface BasicInputFilterProps {
  inputPlaceholder: string;
  register: UseFormRegister<FieldValues> | UseFormRegister<any>;
  setValue: UseFormSetValue<FieldValues> | UseFormSetValue<any>;
  items:
    | Family[]
    | GeneralSupplier[]
    | GeneralEmployee[]
    | GeneralArea[]
    | GeneralLaboratory[]
    | undefined;
  inputName: string;
  inputId: string;
  inputStyle: string;
  getValues: UseFormGetValues<FieldValues> | any;
  isRequired: boolean;
  errors: any;
  isActive?: boolean;
}

type Item =
  | Family
  | GeneralSupplier
  | GeneralEmployee
  | GeneralArea
  | GeneralLaboratory;

const BasicInputFilter: React.FC<BasicInputFilterProps> = ({
  inputPlaceholder,
  register,
  setValue,
  items,
  inputName,
  inputId,
  inputStyle,
  getValues,
  isRequired,
  errors,
  isActive,
}) => {
  const [filteredOptions, setFilteredOptions] = useState<Item[] | undefined>(
    items
  );
  const [isFocused, setIsFocused] = useState(false);

  const setSelectedValue = (
    option:
      | Family
      | GeneralSupplier
      | GeneralEmployee
      | GeneralArea
      | GeneralLaboratory
  ) => {
    const valueToSet = "name" in option ? option.name : option.description;

    setValue(inputName, valueToSet);
    setValue(inputId, option.id);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(inputId, "");
    const searchTerm = event.target.value;

	const filteredOptions = items?.filter((option) => {
		const searchTermLowerCase = searchTerm.toLowerCase();
	  
		if ("name" in option) {
		  return option.name && option.name.toLowerCase().includes(searchTermLowerCase);
		} else if ("calCode" in option) {
		  const calCodeLowerCase = option.calCode ? option.calCode.toLowerCase() : "";
		  const descriptionLowerCase = option.description ? option.description.toLowerCase() : "";
		  return calCodeLowerCase.includes(searchTermLowerCase) || descriptionLowerCase.includes(searchTermLowerCase);
		} else {
		  return option.description && option.description.toLowerCase().includes(searchTermLowerCase);
		}
	  })

    setFilteredOptions(filteredOptions ?? []);
  };

  return (
    <div className={inputStyle}>
      <input type="hidden" {...register(inputId)} />
      <div>
        <div className="entryarea">
          <input
            disabled={
              isActive === undefined ? false : isActive === true ? false : true
            }
            className={`${
              errors[inputName] ? "error-formatted" : "text-input"
            }`}
            required
            {...register(
              inputName,
              isRequired
                ? {
                    required: `Campo obrigatório`,
                  }
                : undefined
            )}
            onChange={handleInputChange}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              // Adicionando um pequeno atraso antes de definir isFocused como false
              if (getValues(inputId) === "") {
                setValue(inputName, "");
              }

              setTimeout(() => {
                setFilteredOptions(items);
                setIsFocused(false);
              }, 250);
            }}
          />
          <div className="label-line text-major">{inputPlaceholder}</div>
        </div>
        {isFocused && (
          <div className="search-itens z-999">
            <ul className="options-list">
              {filteredOptions?.map((option) => (
                <li key={option.id} onClick={() => setSelectedValue(option)}>
                  {"name" in option ? option.name : option.description}{"calCode" in option ? ` / cod ${option.calCode}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}
        {errors[inputName] && (
          <p className="error-text">{errors[inputName].message}</p>
        )}
      </div>
    </div>
  );
};

export default BasicInputFilter;
