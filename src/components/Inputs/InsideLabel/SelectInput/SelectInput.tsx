import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import "./SelectInput.css";

interface SelectInputProps {
  optionsList: string[];
  id: string;
  placeholder: string;
  register: UseFormRegister<FieldValues> | any;
  errors?: any;
  style?: string;
  disabled? : boolean
}

const SelectInput: React.FC<SelectInputProps> = ({
  optionsList,
  id,
  placeholder,
  register,
  errors,
  style,
  disabled
}) => {
  const translateValue = (value: string): string => {
    const translations: { [key: string]: string } = {
      "ativo": "active",
      "inativo": "inactive",
      "descrição": "description",
      "família": "familyID",
      "em uso": "in use",
      "disponível": "available",
      "mais recente": "desc",
      "mais antigo": "asc", 
      "todos": "",
      "código": "code",
      "ativo não calibrável": "active non-calibratable",
      "inconformidade": "nonconformity",
      "perda": "loss",
      "nome": "name",
      "reprovado na calibração": "failed calibration",
      "código cal": "calCode",
      "calibração": "calibration",
      "calibração externa": "external calibration"
    }

    return translations[value] || value;
  };

  return (
    <div className={`inside-select-container ${style ? style : ""} ${errors && errors[id] ? "error-formatted" : ""}`}>
      <div className="label-select">{placeholder}</div>
      <select
        id={id}
        {...register(id)}
        className="inside-select"
        disabled={disabled ? disabled : false}
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
