import './RadioInput.css'

interface RadioInputProps{
  title: string
  name: string
  value: string
  id: string
}

const RadioInput = (props: RadioInputProps) => {
	return (
		<div className="radio-container normal-text">
			<input type="radio" name={props.name} value={props.value} id={props.id}/>
			<label htmlFor={props.id}>{props.title}</label>
		</div>
	);
};

export default RadioInput;
import './RadioInput.css'

interface RadioInputProps{
  title: string
  name: string
  value: string
  id: string
}

const RadioInput = (props: RadioInputProps) => {
	return (
		<div className="radio-container normal-text">
			<input type="radio" name={props.name} value={props.value} id={props.id}/>
			<label htmlFor={props.id}>{props.title}</label>
		</div>
	);
};

export default RadioInput;
