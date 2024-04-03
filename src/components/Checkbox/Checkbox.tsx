import { useState } from "react";
import "./Checkbox.css";

interface CheckboxProps {
	text: string;
	id: string;
	onCheckboxChange: (checked: boolean) => void;
}

const Checkbox = (props: CheckboxProps) => {
	const [isChecked, setIsChecked] = useState(false);
	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const checked = event.target.checked;
		setIsChecked(checked);
		props.onCheckboxChange(checked);
	};

	return (
		<div className="container-checkbox">
			<input type="checkbox" id={props.id} className="checkbox-style" checked={isChecked} onChange={handleCheckboxChange}/>
			<label htmlFor={props.id} className="text">
				{props.text}
			</label>
		</div>
	);
};

export default Checkbox;
