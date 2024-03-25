import React from 'react'
import { ButtonProps } from '../../utils/types/button'
import './Button.css'




  const Button: React.FC<ButtonProps> = (props) => {
    return (
      <div className='module-button'>
      <button className={props.className} 
        onClick={() => {
          if (props.onClickFunction) {
            console.log("a")
            props.onClickFunction();
          }
          console.log('aa')
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
  
