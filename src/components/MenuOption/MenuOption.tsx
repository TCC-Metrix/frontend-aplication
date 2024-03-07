import { MenuOptionProps } from "../utils/interfaces/Interfaces";
import { GoPerson } from "react-icons/go";
import { RxExit } from "react-icons/rx";
import "./MenuOption.css";
const MenuOption: React.FC<MenuOptionProps> = ({ name, text }) => {
	return (
		<div className="menu-option-info">
			<div className="menu-option-icon">
				{name === "person" ? 
				(
					<GoPerson />
				):
				(
					<RxExit/>
				)
				}
				
			</div>
			<p>{text}</p>
		</div>
	);
};

export default MenuOption;
