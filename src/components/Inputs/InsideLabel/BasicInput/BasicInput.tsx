import CurrencyInput from "react-currency-input-field";
import "./BasicInput.css";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface BasicInputProps {
  inputStyle: string;
  inputType: string;
  inputPlaceholder: string;
  register: UseFormRegister<FieldValues>;
  inputName: string;
  isRequired: boolean;
  errors: any;
}

function BasicInput(props: BasicInputProps) {
  return (
    <div
      className={`${
        props.inputStyle === "medium-input"
          ? "classe-medium"
          : props.inputStyle === "little-input"
          ? "classe-little"
          : "classe-large"
      }`}
    >
      <div className={`entryarea ${props.inputStyle} `}>
        {props.inputType === "money" ? (
          <CurrencyInput
            className="text-input"
            prefix="R$"
            allowDecimals={true}
            decimalSeparator=","
            groupSeparator="."
            decimalScale={2} // Define duas casas decimais
            allowNegativeValue={false} // Impede valores negativos
            maxLength={8} // Define o máximo de caracteres permitidos
            required
            {...props.register(
              props.inputName,
              props.isRequired ? {
                required: "Campo obrigatório",
              } : undefined
            )}
          />
        ) : (
          <input
            type={props.inputType}
            className={`${
              props.errors[props.inputName] ? "error-formatted" : "text-input"
            }`}
            required
            {...props.register(
              props.inputName,
              props.isRequired ? {
                required: "Campo obrigatório",
              } : undefined
            )}
          />
        )}
        <div className="label-line text-major">{props.inputPlaceholder}</div>
      </div>
      {props.errors[props.inputName] && (
        <p className="error-text">{props.errors[props.inputName].message}</p>
      )}
    </div>
  );
}

export default BasicInput;
