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


interface NavBarProps {
  activeNavbar: boolean;
  setActiveNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBar({activeNavbar, setActiveNavbar} : NavBarProps) {
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
						setActiveNavbar(() => {
							return true;
						});
					} else {
						updatedState[key] = false;
					}
				}
			}
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
				<ul>
					<li>
						<a href="#" className="text">
							Início
						</a>
					</li>
					<NavDropdown
						option={dropdownVisible.Mov}
						setDropdownVisible={setDropdownVisible}
						title="Movimentação"
						optionKey="Mov"
						links={movLinks}
						activeNavbar={activeNavbar}
						setActiveNavbar={setActiveNavbar}
					/>
					<NavDropdown
						option={dropdownVisible.Cad}
						setDropdownVisible={setDropdownVisible}
						title="Cadastro"
						optionKey="Cad"
						links={cadLinks}
						activeNavbar={activeNavbar}
						setActiveNavbar={setActiveNavbar}
					/>
					<NavDropdown
						option={dropdownVisible.Cons}
						setDropdownVisible={setDropdownVisible}
						title="Consulta"
						optionKey="Cons"
						links={consultaLinks}
						activeNavbar={activeNavbar}
						setActiveNavbar={setActiveNavbar}
					/>
					<NavDropdown
						option={dropdownVisible.Rel}
						setDropdownVisible={setDropdownVisible}
						title="Relatório"
						optionKey="Rel"
						links={relatorioLinks}
						activeNavbar={activeNavbar}
						setActiveNavbar={setActiveNavbar}
					/>
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
