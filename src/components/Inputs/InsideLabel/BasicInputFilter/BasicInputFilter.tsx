import React, { useState } from "react";
import "../BasicInput/BasicInput.css";
import "./BasicInputFilter.css";
import {
	Family,
	GeneralEmployee,
	GeneralSupplier,
} from "../../../../utils/interfaces/Interfaces";
import {
	FieldValues,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue,
} from "react-hook-form";

interface BasicInputFilterProps {
	inputPlaceholder: string;
	register: UseFormRegister<FieldValues>;
	setValue: UseFormSetValue<FieldValues>;
	items: Family[] | GeneralSupplier[] | GeneralEmployee[] |undefined;
	inputName: string;
	inputId: string;
	inputStyle: string;
	getValues: UseFormGetValues<FieldValues>;
	isRequired: boolean;
	errors: any;
  isActive?: boolean;
}

type Item = Family | GeneralSupplier | GeneralEmployee;

function BasicInputFilter(props: BasicInputFilterProps) {
	const [filteredOptions, setFilteredOptions] = useState<Item[] | undefined>(
		props.items
	);
	const [isFocused, setIsFocused] = useState(false);

	const setSelectedValue = (option: Family | GeneralSupplier) => {
		const valueToSet = "name" in option ? option.name : option.description;

		props.setValue(props.inputName, valueToSet);
		props.setValue(props.inputId, option.id);

	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = event.target.value;

		const filteredOptions = props.items?.filter((option) =>
			"name" in option
				? option.name.toLowerCase().includes(searchTerm.toLowerCase())
				: option.description.toLowerCase().includes(searchTerm.toLowerCase())
		);

		setFilteredOptions(filteredOptions ?? []);
	};

	return (
		<div className={props.inputStyle}>
			<input type="hidden" {...props.register(props.inputId)} />
			<div>
				<div className="entryarea">
					<input
            disabled={props.isActive === true ? false : true}
						className={`${
							props.errors[props.inputName] ? "error-formatted" : "text-input"
						}`}
						required
						{...props.register(
							props.inputName,
							props.isRequired
								? {
										required: `Selecione ao menos um(a) ${props.inputPlaceholder}`,
								}
								: undefined
						)}
						onChange={handleInputChange}
						onFocus={() => setIsFocused(true)}
						onBlur={() => {
							// Adicionando um pequeno atraso antes de definir isFocused como false
							setTimeout(() => {
								setIsFocused(false);
							}, 250);
						}}
					/>
					<div className="label-line text-major">{props.inputPlaceholder}</div>
				</div>
				{isFocused && (
					<div className="search-itens z-999">
						<ul className="options-list">
							{filteredOptions?.map((option) => (
								<li key={option.id} onClick={() => setSelectedValue(option)}>
									{"name" in option ? option.name : option.description}
								</li>
							))}
						</ul>
					</div>
				)}
				{props.errors[props.inputName] && (
					<p className="error-text">{props.errors[props.inputName].message}</p>
				)}
			</div>
		</div>
	);
}

export default BasicInputFilter;
