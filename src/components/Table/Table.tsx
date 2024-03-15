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
			{/* <input
				type="text"
				placeholder="Código"
				value={newItem.code}
				onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
			/>
			<input
				type="text"
				placeholder="Descrição"
				value={newItem.description}
				onChange={(e) =>
					setNewItem({ ...newItem, description: e.target.value })
				}
			/>
			<input
				type="text"
				placeholder="Referência"
				value={newItem.reference}
				onChange={(e) => setNewItem({ ...newItem, reference: e.target.value })}
			/> */}
			{/* <button onClick={addItem}>Adicionar</button> */}
			<table className="table-container">
				<thead>
					<tr className="first-line">
						<th className="first-clounm-table">Código</th>
						<th>Descrição</th>
						<th>Referência Adicional</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{items.length === 0 ? (
						<span className="text">
							Nenhum instrumento selecionado
						</span>
					) : (
						items.map((item, index) => (
							<tr key={index}>
								<td className="text">{item.code}</td>
								<td className="text">{item.description}</td>
								<td className="text">
									<select className="dropdown-select-ref">
										{props.options.map((option, index) => (
											<option key={index} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
								</td>
								<td
									className="remove-item-list text"
									onClick={() => removeItem(index)}
								>
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
