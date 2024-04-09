import "./SelectInput.css";

interface SelectInput {
  optionsList: string[],
  id: string,
  placeholder: string
}

function SelectInput(props: SelectInput) {


  return (
    <div className="inside-select-container">
      <div className="label-select">{props.placeholder}</div>
      <select id={props.id} className="inside-select">
        {props.optionsList.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
