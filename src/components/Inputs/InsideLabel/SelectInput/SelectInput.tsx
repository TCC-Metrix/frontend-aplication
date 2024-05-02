import { FieldValues, UseFormRegister } from "react-hook-form";
import "./SelectInput.css";

interface SelectInput {
  optionsList: string[],
  id: string,
  placeholder: string,
  register: UseFormRegister<FieldValues>,
  size?: string
}

function SelectInput(props: SelectInput) {

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
      "código": "code"
    };

    return translations[value] || value;
  };

 
  return (
    <div className="inside-select-container">
      <div className="label-select">{props.placeholder}</div>
      <select id={props.id} {...props.register(props.id)} className="inside-select">
        {props.optionsList.map((item) => (
          <option key={item} value={translateValue(item)}>{item}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
