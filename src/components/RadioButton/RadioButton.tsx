interface RadioButtonProps{
  title: string
  name: string
  value: string
  id: string
}

const RadioButton = (props: RadioButtonProps) => {
	return (
		<div>
			<input type="radio" name={props.name} value={props.value} id={props.id}/>
			<label>{props.title}</label>
		</div>
	);
};

export default RadioButton;
