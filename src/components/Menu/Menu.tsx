// import { IoMdPerson, IoIosLogOut } from "react-icons/io";
import { Profile, User, LogOut } from "../../index";
import MenuOption from "../MenuOption/MenuOption";
import "./Menu.css";
const Menu = () => {
	return (
		<>
			<div className="name-img text">
				<img src={Profile} alt="logo-rexroth" className="img-profile"></img>
				<div>
					<p>Matheus Aprigio</p>
				</div>
			</div>
			<div className="menu-option">
				<MenuOption name={"person"} text="Meu perfil" />
				<MenuOption name={"exit"} text="Sair" />
			</div>
		</>
	);
};

export default Menu;
