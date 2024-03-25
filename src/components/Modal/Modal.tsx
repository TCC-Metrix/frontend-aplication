import React, { FC, ReactNode } from "react";
import "./Modal.css";
import Button from "../Buttons/Button";
import {IoIosClose} from 'react-icons/io'

interface ModalProps {
	isOpen: boolean;
	setModalOpen: () => void;
	children?: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, setModalOpen, children }) => {
	if (isOpen) {
		return (
			<div className="background">
				<div className="modal">
						<Button
							className="close-button"
							onClickFunction={setModalOpen}
							>
								<IoIosClose size={35}/>
							</Button>
							{children}
				</div>

				
			</div>
		);
	}

	return null;
};

export default Modal;
