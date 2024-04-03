import { IoMdCalendar } from "react-icons/io";
import { useState, ChangeEvent } from "react";
import "./DateInput.css";

interface DateInputProps {
	setValueSelected: (args: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ setValueSelected }) => {
	const [selectedDate, setSelectedDate] = useState<string>("");

	const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValueSelected(event.target.value);
		setSelectedDate(event.target.value);
	};

	return (
		<div className="container-input-search">
			<div className="flex-column-calendar-icon">
				<input
					type="date"
					name="exit-date"
					className="date-input"
					value={selectedDate}
					onChange={handleDateChange}
				/>
				<div className="calendar-input">
					<IoMdCalendar size={23} color="476273" />
				</div>
			</div>
		</div>
	);
};

export default DateInput;