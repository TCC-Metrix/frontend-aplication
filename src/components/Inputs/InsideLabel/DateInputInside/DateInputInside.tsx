import { FieldValues, UseFormRegister } from "react-hook-form";
import "./DateInputInside.css";
import { AiOutlineCalendar } from "react-icons/ai";

interface DateInputInside {
  placeholder: string;
  inputStyle: string;
  register: UseFormRegister<FieldValues>;
  inputName: string;
  isRequired: boolean;
  errors: any;
}

function DateInputInside(props: DateInputInside) {


  return (
    <div
      className={`${
        props.inputStyle === "medium-input"
          ? "classe-medium"
          : props.inputStyle === "little-input"
          ? "classe-little"
          : ""
      }`}
    >
      <div
        className="inside-date-container"
      >
        <div className="label-select">{props.placeholder}</div>
        <input
          type="date"
          {...props.register(
            props.inputName,
            props.isRequired ? {
              required: "Data inválida",
            } : undefined
          )}
          className={`${
            props.errors[props.inputName] ? "error-formatted" : "inside-date-input"
          }`}
          
        />
        <div className="calendar-inside-icon">
          <AiOutlineCalendar size={25} color="#506e81" />
        </div>
      </div>
      {props.errors[props.inputName] && (
        <p className="error-text">{props.errors[props.inputName].message}</p>
      )}
    </div>
  );
}

export default DateInputInside;
