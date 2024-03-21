import React from 'react'
import { ButtonProps } from '../../utils/types/Types'
import './Button.css'
import { IoMdClose } from "react-icons/io";


// const Buttons = (props: ButtonProps) => {
  const Button: React.FC<ButtonProps> = (props) => {
    return (
      <div className='module-button'>
      <button className={props.className} 
        onClick={() => {
          if (props.onClickFunction) {
            props.onClickFunction();
          }
        }}
      >
        <span className='text button-font'>
        {props.name === "close" ? <IoMdClose size={35} /> : props.name}
        </span>
      </button>
      <div className="button-animation"></div>
      </div>
    );
  }
  
 export default Button;
  
