import { ButtonProps } from '../utils/Types/Types'
import './ButtonDark.css'


const ButtonDark = (props: ButtonProps) => {
  return (
    <button className={props.className}>{props.name}</button>
  )
}

export default ButtonDark