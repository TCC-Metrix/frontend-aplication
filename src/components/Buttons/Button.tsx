import { ButtonProps } from "../../utils/types/button";
import "./Button.css";

const Button: React.FC<ButtonProps> = (props) => {
	return (
		<div className="module-button m-auto">
			<button
				className={props.className}
				onClick={(e) => {
					if (props.onClickFunction) {
						props.onClickFunction(e);
					}
				}}
			>
				<span className="text button-font">{props.children}</span>
			</button>
		</div>
	);
};

export default Button;
