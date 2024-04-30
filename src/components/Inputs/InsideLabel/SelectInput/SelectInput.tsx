import { FieldValues, UseFormRegister } from "react-hook-form";
import "./SelectInput.css";

interface SelectInput {
  optionsList: string[],
  id: string,
  placeholder: string,
  register: UseFormRegister<FieldValues>
}

function SelectInput(props: SelectInput) {


  return (
    <div className="inside-select-container">
      <div className="label-select">{props.placeholder}</div>
      <select id={props.id} {...props.register(props.id)} className="inside-select">
        {props.optionsList.map((item) => (
          <option key={item} value={item === "ativo" ? "active" : item === "inativo" ? "inative" : item}>{item}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
