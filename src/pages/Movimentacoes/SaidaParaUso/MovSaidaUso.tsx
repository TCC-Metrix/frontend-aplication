import NavBar from "../../../components/Navbar/Navbar";
import "./MovSaidaUso.css";
import ButtonDark from "../../../components/ButtonDark/ButtonDark";
import TableMovSaidaUso from "../../../components/TableMovSaidaUso/TableMovSaidaUso";
import Dropdown from "../../../components/Dropdown/Dropdown";

export const MovSaidaUso = () => {
	const options = [
		{ label: "Option 1" },
		{ label: "Option 2" },
		{ label: "Option 3" },
		{ label: "Option 4" },
		{ label: "Option 5" },
	]; // será alimentado pela API provavelmente em outro arquivo


	return (
		<main>
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
				<section className="mov-info">
					<div className="responsáveis-mov">
						<h1>Responsável entrega</h1>
						<Dropdown
							options={options}
							placeholder="Busque por código ou nome"
						/>
						<h1 className="responsavel-recebimento">Responsavel Recebimento</h1>
						<Dropdown
							options={options}
							placeholder="Busque por código ou nome"
						/>
					</div>
					<div>
						<h1>Área</h1>
						<Dropdown options={options} placeholder="Busque por descrição" />

						<h1 className="data-saída">Data de Saída</h1>
					</div>
				</section>
			</div>
		</main>
	);
};
