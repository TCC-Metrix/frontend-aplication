import "./RadioInput.css";

interface RadioInputProps {
	title: string;
	name: string;
	value: string;
	id: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	defaultChecked?: boolean;
}

const RadioInput = (props: RadioInputProps) => {
	return (
		<div className="radio-container normal-text">
			<input
				type="radio"
				name={props.name}
				value={props.value}
				id={props.id}
				defaultChecked={props.defaultChecked}
				onChange={props.onChange}
			/>
			<label htmlFor={props.id} className="text-major">
				{props.title}
			</label>
		</div>
	);
};

export default RadioInput;
