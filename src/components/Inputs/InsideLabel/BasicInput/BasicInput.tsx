import CurrencyInput from "react-currency-input-field";
import "./BasicInput.css";
import InputMask from "react-input-mask";

interface BasicInputProps {
  inputStyle: string;
  inputType: string;
  inputPlaceholder: string;
  register: any;
  inputName: string;
  isRequired: boolean;
  errors: any;
  isActive?: boolean;
}

function BasicInput({
  inputStyle,
  inputType,
  inputPlaceholder,
  register,
  inputName,
  isRequired,
  errors,
  isActive
}: BasicInputProps) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = event.target.value;
    // Remove caracteres não numéricos utilizando uma expressão regular
    const newValue: string = inputValue.replace(/\D/g, "");
    register(inputName).onChange(newValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Permite apenas números, backspace e delete
    const allowedKeys: string[] = ["Backspace", "Delete"];
    const isNumber: boolean = !isNaN(Number(event.key));
    if (!isNumber && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <div
      className={`${
        inputStyle === "medium-input"
          ? "classe-medium"
          : inputStyle === "little-input"
          ? "classe-little"
          : "large-input"
      }`}
    >
      <div className={`entryarea ${inputStyle} `}>
        {inputType === "money" ? (
          <CurrencyInput
            className="text-input"
            prefix="R$"
            allowDecimals={true}
            decimalSeparator=","
            groupSeparator="."
            decimalScale={2}
            allowNegativeValue={false}
            maxLength={8}
            required
            {...register(inputName, {
              required: isRequired && "Campo obrigatório",
            })}
          />
        ) : inputName === "cnpj" ? (
          <InputMask
            mask="99.999.999/9999-99"
            className={`${
              errors[inputName] ? "error-formatted" : "text-input"
            }`}
            required
            {...register("cnpj", {
              required: isRequired && "Campo obrigatório",
            })}
          />
        ) : (
          <input
            type={inputType}
            className={`${
              errors[inputName] ? "error-formatted" : "text-input"
            }`}
            required
            {...register(inputName, isRequired ? { required: "Campo obrigatório" } : { required: false })}
            onKeyDown={inputType === "number" ? handleKeyDown : undefined}
            {...(inputType === "number" ? { onChange: handleChange } : {})}
            maxLength={100}
            disabled={isActive !== undefined ? true : false}
          />
        )}

        <div className="label-line text-major">{inputPlaceholder}</div>
      </div>
      {errors[inputName] && (
        <p className="error-text">{errors[inputName].message}</p>
      )}
    </div>
  );
}

export default BasicInput;
