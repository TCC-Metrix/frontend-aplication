import { useState } from "react";
import { Logo, LogoMetrix } from "../../index";
import "./Navbar.css";
import {
	cadLinks,
	consultaLinks,
	movLinks,
	relatorioLinks,
} from "../../utils/Links/Links";
import { DropdownState } from "../../utils/interfaces/Interfaces";
import Menu from "../Menu/Menu";
import NavDropdown from "../NavDropdown/NavDropdown";

interface NavBarProps {
	activeNavbar: boolean;
	setActiveNavbar: (isActive: boolean) => void;
}

export default function NavBar({ activeNavbar, setActiveNavbar }: NavBarProps) {
	const [bar, setBar] = useState("bar unclicked");
	const [menuClass, setMenuClass] = useState("menu-hidden");
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
						setActiveNavbar(true);
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
						<p className="nav-header-option text"><a href="/">Início</a></p>
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
			<img
				src={LogoMetrix}
				alt="logo-metrix"
				className="logo-metrix-navbar"
			></img>
			</nav>
			{isMenuClicked && <div className="overlay" onClick={updateMenu}></div>}
			<div className="menu-toggle" onClick={updateMenu}>
				<span className={bar}></span>
				<span className={bar}></span>
				<span className={bar}></span>
			</div>
			<div className={`menu ${menuClass}`}>
				<Menu />
			</div>
		</div>
	);
}
