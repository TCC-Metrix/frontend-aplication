import React from 'react'
import { ButtonProps } from '../../utils/types/button'
import './Button.css'




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
        {props.children}
        </span>
      </button>
      </div>
    );
  }
  
 export default Button;
  
