import React, { FC, ReactNode } from "react";
import './Modal.css'
import Buttons from "../Buttons/Buttons";

interface ModalProps {
	isOpen: boolean;
  setModalOpen: () => void
  children?: ReactNode
}

const Modal: FC<ModalProps> = ({ isOpen, setModalOpen, children }) => {
	if (isOpen) {
		return (
			<div className="background" >
				<div className="modal">
          <div>
            {children}
          </div>
          <Buttons name="X" className="closeButton" onClickFunction={setModalOpen} />
        </div>
			</div>
		);
	}

	return null;
};

export default Modal;
