import React, { FC, ReactNode } from "react";
import "./Modal.css";
import Button from "../Buttons/Button";

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
							name="close"
							className="close-button"
							onClickFunction={setModalOpen}
							/>
							{children}
				</div>

				
			</div>
		);
	}

	return null;
};

export default Modal;
