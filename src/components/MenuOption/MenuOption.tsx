import { MenuOptionProps } from "../../utils/interfaces/Interfaces";
import { RxExit } from "react-icons/rx";
import "./MenuOption.css";
import { useMsal } from "@azure/msal-react";
const MenuOption: React.FC<MenuOptionProps> = ({ text }) => {
	const { instance } = useMsal();

	const handleLogout = () => {
		instance.logoutRedirect({
			postLogoutRedirectUri: "/login",
		});
	};

	return (
		<div className="menu-option-container">
			<div className="menu-option-row" onClick={handleLogout}>
				<div className="menu-option-icon">
					<RxExit />
				</div>
				<p className="text">{text}</p>
			</div>
		</div>
	);
};

export default MenuOption;
