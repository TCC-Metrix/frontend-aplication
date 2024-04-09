import CurrencyInput from "react-currency-input-field";
import "./BasicInput.css";
import { useForm } from "react-hook-form";


interface BasicInputProps {
  inputStyle: string;
  inputType: string;
  inputPlaceholder: string;
  register: any;
  inputName: string;
  isRequired: boolean;
}

function BasicInput(props: BasicInputProps) {

  

  return (
    <div className={`entryarea ${props.inputStyle}`}>
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
      />
      ) : (
        <input
          type={props.inputType}
          className="text-input"
          required
          {...props.register(props.inputName, props.isRequired && {
            required: "Campo obrigatório"
          })}
        />
      )}
      <div className="label-line text-major">{props.inputPlaceholder}</div>
    </div>
  );
}

export default BasicInput;
