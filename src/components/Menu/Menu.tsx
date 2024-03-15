import { Profile } from "../../index";
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
			<div className="menu-infos-container">
				<div className="border"></div>
				<MenuOption name={"person"} text="Meu perfil" />
				<div className="border"></div>
				<MenuOption name={"exit"} text="Sair" />
			</div>
		</>
	);
};

export default Menu;
