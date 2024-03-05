import NavBar from "../../../components/Navbar/Navbar";
import "./MovSaidaUso.css";
import ButtonDark from "../../../components/ButtonDark/ButtonDark";
import TableMovSaidaUso from "../../../components/TableMovSaidaUso/TableMovSaidaUso";
import Dropdown from "../../../components/Dropdown/Dropdown";

export const MovSaidaUso = () => {
	const options: string[] = ["Option 1", "Option 2", "Option 3"];

	return (
		<section>
			<NavBar />
			<div className="container-main">
				<div className="top-information">
					<h1>Saída para uso</h1>
					<p>Instrumento</p>
					<ButtonDark name="+ Adicionar" />
				</div>
				<div>
					<TableMovSaidaUso />
				</div>
				<div className="mov-info">
					<h1>Responsável entrega</h1>
					<Dropdown options={options} placeholder="Busque por código ou nome"/>
					<h1>Responsavel Recebimento</h1>
					<Dropdown options={options} placeholder="Busque por código ou nome"/>
					<Dropdown options={options} placeholder="Busque por descrição"/>
				</div>
			</div>
		</section>
	);
};
