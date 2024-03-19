import { MenuOptionProps } from "../../utils/interfaces/Interfaces";
import { GoPerson } from "react-icons/go";
import { RxExit } from "react-icons/rx";
import "./MenuOption.css";
const MenuOption: React.FC<MenuOptionProps> = ({ name, text }) => {
	return (
		<div className="menu-option-container">
			<div className="menu-option-row">
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
			<p className="text">{text}</p>
			</div>

		</div>
	);
};

export default MenuOption;
