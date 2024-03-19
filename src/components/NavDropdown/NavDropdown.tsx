import React, { SetStateAction } from "react";
import { DropdownState, List } from "../../utils/interfaces/Interfaces";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./NavDropdows.css";

interface NavDropdownProps {
	option: boolean;
	optionKey: string;
	title: string;
	links: List[];
	setDropdownVisible: React.Dispatch<SetStateAction<DropdownState>>;
	activeNavbar: boolean;
	setActiveNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavDropdown = ({
	option,
	title,
	links,
	optionKey,
	setDropdownVisible,
	activeNavbar,
	setActiveNavbar,
}: NavDropdownProps) => {
	const toggleDropdown = (dropdown?: keyof DropdownState) => {
		setDropdownVisible((prevState) => {
			const updatedState: DropdownState = {} as DropdownState;

			for (const key in prevState) {
				if (Object.prototype.hasOwnProperty.call(prevState, key)) {
					if (dropdown && key === dropdown) {

						if (activeNavbar === false && prevState[key] === true) {
							updatedState[key] = true;
							setActiveNavbar(true);
						} else if (prevState[key] === false) {
							updatedState[key] = true;
							setActiveNavbar(true);
						} else if (prevState[key] === true) {
							setActiveNavbar(false);
							updatedState[key] = false;
						}
					} else {
						updatedState[key] = false;
					}
				}
			}
			return updatedState;
		});
	};

	return (
		<li>
			<p
				className="text nav-header-option"
				onClick={() => toggleDropdown(optionKey)}
			>
		
				{title}
				{option && activeNavbar ? <IoIosArrowUp /> : <IoIosArrowDown />}
			</p>
		
				<ul className={`dropdown ${option && activeNavbar ? 'open' : 'hidden'}`}>
					{links.map((item, index) => (
						<li key={index} className="navbar-option-li">
							<a href="" className="drop-link small-text">
								{item.name}
							</a>
							{index !== links.length - 1 && <div className="border small-margin"></div>}
						</li>
					))}
				</ul>
		
		</li>
	);
};

export default NavDropdown;
