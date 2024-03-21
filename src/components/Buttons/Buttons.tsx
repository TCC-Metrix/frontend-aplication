import React from 'react'
import { ButtonProps } from '../../utils/Types/Types'
import './Buttons.css'
import { IoMdClose } from "react-icons/io";


// const Buttons = (props: ButtonProps) => {
  const Buttons: React.FC<ButtonProps> = (props) => {
    return (
      <button className={props.className} 
        onClick={() => {
          if (props.onClickFunction) {
            props.onClickFunction(true);
          }
        }}
      >
        {props.name === "close" ? <IoMdClose size={35} /> : props.name}
      </button>
    );
  }
  
 export default Buttons;
  
