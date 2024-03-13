import React from "react";
import "./Checkbox.css";

interface CheckboxProps {
	text: string;
}

const Checkbox = (props: CheckboxProps) => {
	return (
		<div className="container-checkbox">
			<input type="checkbox" className="checkbox-style"/>
			<span>{props.text}</span>
		</div>
	);
};

export default Checkbox;
