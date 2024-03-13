import "./TableMovSaidaUso.css";

const TableMovSaidaUso = () => {
	return (
		<div>
			<table className="table-saidauso">
				<thead>
					<tr className="first-line">
						<th className="first-clounm-table">Código</th>
						<th>Descrição</th>
						<th>Referência Adicional</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1214-11</td>
						<td>Micrometro Externo</td>
						<td>50mm / 0,010</td>
						<td className="remove-item-list">Remover</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default TableMovSaidaUso;
