import "./Checkbox.css";

interface CheckboxProps {
	text: string;
	id: string;
}

const Checkbox = (props: CheckboxProps) => {
	return (
		<div className="container-checkbox">
			<input type="checkbox" id={props.id} className="checkbox-style"/>
			<label htmlFor={props.id} className="text">{props.text}</label>
		</div>
	);
};

export default Checkbox;
