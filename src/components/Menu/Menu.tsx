// import { IoMdPerson, IoIosLogOut } from "react-icons/io";
import { Profile, User, LogOut } from "../../index";
import MenuOption from "../MenuOption/MenuOption";
import './Menu.css'
const Menu = () => {
	return (
		<>
			<div className="nameImg">
				<img src={Profile} alt="logoRexroth" className="imgProfile"></img>
				<div>
					<p>Matheus Aprigio</p>
				</div>
			</div>
			<div className="menu-option">
				<MenuOption img={User} text="Meu perfil"/>
        <MenuOption img={LogOut} text="Sair" />
      </div>
		</>
	);
};

export default Menu;
