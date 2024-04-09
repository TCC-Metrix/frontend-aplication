interface RadioInputProps{
  title: string
  name: string
  value: string
  id: string
}

const RadioInput = (props: RadioInputProps) => {
	return (
		<div>
			<input type="radio" name={props.name} value={props.value} id={props.id}/>
			<label>{props.title}</label>
		</div>
	);
};

export default RadioInput;
