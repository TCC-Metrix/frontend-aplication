import { MenuOptionProps } from "../utils/interfaces/Interfaces";
import "./MenuOption.css";
const MenuOption: React.FC<MenuOptionProps> = ({ img, text }) => {
	return (
		<div className="menu-option-info">
			<div className="menu-option-icon">
				<img src={img}></img>
			</div>
			<p>{text}</p>
		</div>
	);
};

export default MenuOption;
