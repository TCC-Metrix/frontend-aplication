import React from 'react'
import { ButtonProps } from '../utils/Types/Types'
import './Buttons.css'


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
        {props.name}
      </button>
    );
  }
  
 export default Buttons;
  
