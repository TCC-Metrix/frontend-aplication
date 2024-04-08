import "./DateInputInside.css";
import { AiOutlineCalendar } from "react-icons/ai";



interface DateInputInside {
  placeholder: string,
  inputStyle: string;
}

function DateInputInside(props: DateInputInside) {
  return (
    <div className={`inside-date-container ${props.inputStyle}`}>
      <div className="label-select">{props.placeholder}</div>
      <input type="date" name="" id="" className="inside-date-input" />
      <div className="calendar-inside-icon">
        <AiOutlineCalendar size={30} color="#506e81" />
      </div>
    </div>
  );
}

export default DateInputInside;
