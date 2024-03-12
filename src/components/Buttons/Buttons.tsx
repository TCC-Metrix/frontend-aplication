import { ButtonProps } from '../utils/Types/Types'
import './Buttons.css'


const Buttons = (props: ButtonProps) => {
  return (
    <button className={props.className}>{props.name}</button>
  )
}

export default Buttons