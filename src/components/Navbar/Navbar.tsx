import { useState } from "react";
import { Logo } from "../../index";
import "./Navbar.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
	cadLinks,
	consultaLinks,
	movLinks,
	relatorioLinks,
} from "../utils/Links/Links";
import { DropdownState } from "../utils/interfaces/Interfaces";
import Menu from "../Menu/Menu";

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
					<li>
						<a href="#" onClick={() => toggleDropdown("Mov")}>
							Movimentação
							{dropdownVisible.Mov ? <IoIosArrowUp /> : <IoIosArrowDown />}
						</a>
						{dropdownVisible.Mov && (
							<ul className={`dropdown ${dropdownVisible.Mov ? "open" : ""}`}>
								{movLinks.map((item, index) => (
									<li key={index}>
										<a href="">{item.name}</a>
										{index !== movLinks.length - 1 && (
											<div className="border-bot"></div>
										)}
									</li>
								))}
							</ul>
						)}
					</li>
					<li>
						<a href="#" onClick={() => toggleDropdown("Cad")}>
							Cadastro
							{dropdownVisible.Cad ? <IoIosArrowUp /> : <IoIosArrowDown />}
						</a>
						{dropdownVisible.Cad && (
							<ul className={`dropdown ${dropdownVisible.Cad ? "open" : ""}`}>
								{cadLinks.map((item, index) => (
									<li key={index}>
										<a href="">{item.name}</a>
										{index !== cadLinks.length - 1 && (
											<div className="border-bot"></div>
										)}
									</li>
								))}
							</ul>
						)}
					</li>
					<li>
						<a href="#" onClick={() => toggleDropdown("Cons")}>
							Consulta
							{dropdownVisible.Cons ? <IoIosArrowUp /> : <IoIosArrowDown />}
						</a>
						{dropdownVisible.Cons && (
							<ul className={`dropdown ${dropdownVisible.Cons ? "open" : ""}`}>
								{consultaLinks.map((item, index) => (
									<li key={index}>
										<a href="">{item.name}</a>
										{index !== consultaLinks.length - 1 && (
											<div className="border-bot"></div>
										)}
									</li>
								))}
							</ul>
						)}
					</li>
					<li>
						<a href="#" onClick={() => toggleDropdown("Rel")}>
							Relatório
							{dropdownVisible.Rel ? <IoIosArrowUp /> : <IoIosArrowDown />}
						</a>
						{dropdownVisible.Rel && (
							<ul className={`dropdown ${dropdownVisible.Rel ? "open" : ""}`}>
								{relatorioLinks.map((item, index) => (
									<li key={index}>
										<a href="">{item.name}</a>
										{index !== relatorioLinks.length - 1 && (
											<div className="border-bot"></div>
										)}
									</li>
								))}
							</ul>
						)}
					</li>
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
			{isMenuClicked && <div className="overlay" onClick={updateMenu}>BECK</div>}
		</div>
	);
}
