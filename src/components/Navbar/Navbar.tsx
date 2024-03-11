import { useState } from "react";
import { Logo } from "../../index";
import "./Navbar.css";
import {
	cadLinks,
	consultaLinks,
	movLinks,
	relatorioLinks,
} from "../utils/Links/Links";
import { DropdownState } from "../utils/interfaces/Interfaces";
import Menu from "../Menu/Menu";
import NavDropdown from "../NavDropdown/NavDropdown";

export default function NavBar() {
	const [bar, setBar] = useState("bar unclicked");
	const [menu_class, setMenuClass] = useState("menu-hidden");
	const [isMenuClicked, setIsMenuClicked] = useState(false);
	const [dropdownVisible, setDropdownVisible] = useState<DropdownState>({
		Mov: false,
		Cad: false,
		Cons: false,
		Rel: false,
	});

	const toggleDropdown = (dropdown?: keyof DropdownState) => {
		setDropdownVisible((prevState) => {
			const updatedState: DropdownState = {} as DropdownState;
			for (const key in prevState) {
				if (Object.prototype.hasOwnProperty.call(prevState, key)) {
					if (dropdown && key === dropdown) {
						updatedState[key] = !prevState[key];
					} else {
						updatedState[key] = false;
					}
				}
			}
			console.log(updatedState)
			return updatedState;
		});
	};

	const updateMenu = () => {
		if (!isMenuClicked) {
			setBar("bar clicked");
			setMenuClass("menu-visible");
			document.body.classList.add("no-scroll");
		} else {
			setBar("bar unclicked");
			setMenuClass("menu-hidden");
			document.body.classList.remove("no-scroll");
		}
		setIsMenuClicked(!isMenuClicked);
		toggleDropdown();
	};

	return (
		<div className="container">
			<nav className="navbar">
			<img src={Logo} alt="logoRexroth" className="logoImg"></img>
				<ul className="nav-links">
					<li>
						<a href="#">Início</a>
					</li>
					<NavDropdown option={dropdownVisible.Mov} setDropdownVisible={setDropdownVisible} title="Movimentação" optionKey="Mov" links={movLinks}/>
					<NavDropdown option={dropdownVisible.Cad} setDropdownVisible={setDropdownVisible} title="Cadastro" optionKey="Cad" links={cadLinks}/>
					<NavDropdown option={dropdownVisible.Cons} setDropdownVisible={setDropdownVisible} title="Consulta" optionKey="Cons" links={consultaLinks}/>
					<NavDropdown option={dropdownVisible.Rel} setDropdownVisible={setDropdownVisible} title="Relatório" optionKey="Rel" links={relatorioLinks}/>
				</ul>
			</nav>
				<div className="menu-toggle" onClick={updateMenu}>
					<span className={bar}></span>
					<span className={bar}></span>
					<span className={bar}></span>
				</div>
			<div className={`menu ${menu_class}`}>
				<Menu />
			</div>
			{isMenuClicked && <div className="overlay" onClick={updateMenu}></div>}
		</div>
	);
}
