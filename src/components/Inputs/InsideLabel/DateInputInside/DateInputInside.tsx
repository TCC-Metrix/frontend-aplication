import "./DateInputInside.css";
import { AiOutlineCalendar } from "react-icons/ai";

interface DateInputInside {}

function DateInputInside() {
  return (
    <div className="inside-date-container">
      <div className="label-select">Placeholder</div>
      <input type="date" name="" id="" className="inside-date-input" />
      <div className="calendar-inside-icon">
        <AiOutlineCalendar size={30} color="#506e81" />
      </div>
    </div>
  );
}

export default DateInputInside;
