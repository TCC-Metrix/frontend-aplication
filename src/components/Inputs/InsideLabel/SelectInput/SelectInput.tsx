import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import "./SelectInput.css";

interface SelectInputProps {
  optionsList: string[];
  id: string;
  placeholder: string;
  register: UseFormRegister<FieldValues> | any;
  errors?: any;
}

const SelectInput: React.FC<SelectInputProps> = ({
  optionsList,
  id,
  placeholder,
  register,
  errors,
}) => {
  const translateValue = (value: string): string => {
    const translations: { [key: string]: string } = {
      "ativo": "active",
      "inativo": "inactive",
      "descrição": "description",
      "família": "family",
      "em uso": "in%20use",
      "disponível": "available",
      "mais recente": "desc",
      "mais antigo": "asc",
      "todos": "",
      "código": "code",
      "ativo não calibrável": "active non-calibratable",
      "inconformidade": "nonconformity",
      "perda": "loss"
    }

    return translations[value] || value;
  };

  return (
    <div className={`inside-select-container ${errors && errors[id] ? "error-formatted" : ""}`}>
      <div className="label-select">{placeholder}</div>
      <select
        id={id}
        {...register(id)}
        className="inside-select"
      >
        {optionsList.map((item) => (
          <option key={item} value={translateValue(item)}>
            {item}
          </option>
        ))}
      </select>
      {errors && errors[id] && (
        <p className="error-text">{errors[id].message}</p>
      )}
    </div>
  );
};

export default SelectInput;
