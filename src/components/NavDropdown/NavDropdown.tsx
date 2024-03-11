import React, { SetStateAction } from "react";
import { DropdownState, List } from "../utils/interfaces/Interfaces";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import './NavDropdows.css'

interface NavDropdownProps {
  option: boolean,
  optionKey: string,
  title: string,
  links: List[],
  setDropdownVisible: React.Dispatch<SetStateAction<DropdownState>>
}

const NavDropdown = ({option, title, links, optionKey, setDropdownVisible} : NavDropdownProps) => {

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

	return (
		<li>
			<a href="#" onClick={() => toggleDropdown(optionKey)}>
				{title}
				{option ? <IoIosArrowUp /> : <IoIosArrowDown />}
			</a>
			{option && (
				<ul className={`dropdown ${option ? "open" : ""}`}>
					{links.map((item, index) => (
						<li key={index}>
							<a href="" className="drop-link">
								{item.name}
							</a>
							{index !== links.length - 1 && (
								<div className="border-bot"></div>
							)}
						</li>
					))}
				</ul>
			)}
		</li>
	);
};

export default NavDropdown;
