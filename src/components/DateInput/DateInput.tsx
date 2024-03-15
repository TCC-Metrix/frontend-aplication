import { IoMdCalendar } from "react-icons/io";
import './DateInput.css'

const DateInput = () => {
	return (
		<div className="container-input-search">
							<div className="flex-column-calendar-icon">
								<input type="date" name="exit-date" className="date-input" />
								<div className="calendar-input">
									<IoMdCalendar size={23} color="476273" />
								</div>
							</div>
		</div>
	);
};

export default DateInput;
