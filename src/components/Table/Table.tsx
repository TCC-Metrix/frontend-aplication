import { useState } from "react";
import "./Table.css";

interface Option {
	value: string;
	label: string;
}


interface Props {
	options: Option[];
}

interface Item {
	code: string;
	description: string;
	reference: string;
}

const Table = (props: Props) => {
	const [items, setItems] = useState<Item[]>([]);
	const [newItem, setNewItem] = useState<Item>({ code: '', description: '', reference: '' });

	const item = [
		{
			code: '09237',
			description: 'Paquimetro',
			reference: '50mm'
		},
		{
			code: '09237',
			description: 'Paquimetro',
			reference: '50mm'
		},
		{
			code: '09237',
			description: 'Paquimetro',
			reference: '50mm'
		},
		{
			code: '09237',
			description: 'Paquimetro',
			reference: '50mm'
		}
	]

	const tableHeader = [
		'Codigo',
		'Descrição',
		'Família',
		'Freq. Calibração',
		'Próx. Calibração',

	]

	const tableOne = [
		'Codigo',
		'Descrição',
		'Ref Adicional'
	]

	const itemMoreDescritive = [
		{
			code: '1214-11',
			description: 'Micrometro externo',
			family: 'Micrometro Universal',
			freqCalibration: '12 meses',
			nextCalibration: '19/03/2025'
		},
		{
			code: '1214-11',
			description: 'Micrometro externo',
			family: 'Micrometro Universal',
			freqCalibration: '12 meses',
			nextCalibration: '19/03/2025'
		},
		{
			code: '1214-11',
			description: 'Micrometro externo',
			family: 'Micrometro Universal',
			freqCalibration: '12 meses',
			nextCalibration: '19/03/2025'
		}
	]

	const addItem = () => {
		if (newItem.code && newItem.description && newItem.reference) {
			setItems([...items, newItem]);
			setNewItem({ code: '', description: '', reference: '' });
		} else {
			alert('Por favor, preencha todos os campos.');
		}
	};

	const removeItem = (index: number) => {
		const updatedItems = [...items];
		updatedItems.splice(index, 1);
		setItems(updatedItems);
	};

	return (
		<div>
			<table className="table-container">
				<thead>
					<tr className="first-line">
						{tableOne.map((item, index) => (
							<th>{item}</th>
						))}
						{tableOne.length == 3 && (
							<th></th>
						)}

					</tr>
				</thead>
				<tbody>
					{item.length === 0 ? (
						<span className="text">
							Nenhum instrumento selecionado
						</span>
					) : (
						item.map((item, index) => (

							<tr key={index}>
								{Object.keys(item).map((key, idx) => {
									if (key === "reference") {
										return (
											<td className="text">
												<select className="dropdown-select-ref">
													{props.options.map((option, idx) => (
														<option key={idx} value={option.value}>
															{option.label}
														</option>
													))}
												</select>
											</td>

										)
									} else {
										return (
											<td key={idx} className="text">{item[key]}</td>
										)
									}

								}
								)}
								{/* <td className="text">

							</td> */}
								<td className="remove-item-list text" onClick={() => removeItem(index)}>
									Remover
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
