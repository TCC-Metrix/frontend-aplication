import "./SelectInput.css";

interface SelectInput {
  optionsList: string[],
  id: string,
  placeholder: string,
  register: any
}

function SelectInput(props: SelectInput) {


  return (
    <div className="inside-select-container">
      <div className="label-select">{props.placeholder}</div>
      <select id={props.id} {...props.register(props.id)} className="inside-select">
        {props.optionsList.map((item) => (
          <option key={item} value={item === "ativo" ? "active" : item === "inativo" ? "inative" : ""}>{item}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
