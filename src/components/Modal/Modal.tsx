import React, { FC, ReactNode } from "react";
import "./Modal.css";
import Buttons from "../Buttons/Buttons";

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
					<div className="flex-align-center-icon">
						<Buttons
							name="close"
							className="close-button"
							onClickFunction={setModalOpen}
							/>
					</div>
							<div>{children}</div>
				</div>

				
			</div>
		);
	}

	return null;
};

export default Modal;
