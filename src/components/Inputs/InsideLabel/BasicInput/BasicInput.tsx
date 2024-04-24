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
}

function BasicInput(props: BasicInputProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue: string = event.target.value;
		// Remove caracteres não numéricos utilizando uma expressão regular
		const newValue: string = inputValue.replace(/\D/g, "");
		props.register(props.inputName).onChange(newValue);
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
				props.inputStyle === "medium-input"
					? "classe-medium"
					: props.inputStyle === "little-input"
					? "classe-little"
					: "large-input"
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
						decimalScale={2}
						allowNegativeValue={false}
						maxLength={8}
						required
						{...props.register(props.inputName, {
							required: props.isRequired && "Campo obrigatório",
						})}
					/>
				) : props.inputName === "cnpj" ? (
					<InputMask
						mask="99.999.999/9999-99"
						className={`${
							props.errors[props.inputName] ? "error-formatted" : "text-input"
						}`}
						required
						{...props.register("cnpj", {
							required: props.isRequired && "Campo obrigatório",
						})}
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
						onKeyDown={props.inputType === "number" ? handleKeyDown : undefined}
						{...(props.inputType === "number" ? { onChange: handleChange } : {})}
			
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
