import React, { SetStateAction, useState } from "react";
import { DropdownState, List } from "../utils/interfaces/Interfaces";
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
						console.log("active nav: ", activeNavbar);

						if (activeNavbar === false && prevState[key] === true) {
							console.log("caiiiiiiiiiiiiiiiiiiiiiiii");
							updatedState[key] = true;
							setActiveNavbar(true)
						} else if (prevState[key] === false) {
							console.log("segundo if");
							updatedState[key] = true;
							setActiveNavbar(true);
							console.log("era false virou true");
						} else if (prevState[key] === true) {
							setActiveNavbar(false);
							updatedState[key] = false;
							console.log("era true virou false");
						}

						// updatedState[key] = !prevState[key];
					} else {
						updatedState[key] = false;
						// setActiveNavbar(false);
					}
				}
			}
			console.log("return", updatedState);
			return updatedState;
		});
	};

	return (
		<li>
			<a
				href="#"
				className="nav-link"
				onClick={() => toggleDropdown(optionKey)}
			>
				{title}
				{option && activeNavbar ? <IoIosArrowUp /> : <IoIosArrowDown />}
			</a>
			{option && activeNavbar && (
				<ul className={`dropdown open`}>
					{links.map((item, index) => (
						<li key={index}>
							<a href="" className="drop-link">
								{item.name}
							</a>
							{index !== links.length - 1 && <div className="border-bot"></div>}
						</li>
					))}
				</ul>
			)}
		</li>
	);
};

export default NavDropdown;
