import NavBar from "../../../components/Navbar/Navbar";
import "./MovSaidaUso.css";
import ButtonDark from "../../../components/ButtonDark/ButtonDark";
import TableMovSaidaUso from "../../../components/TableMovSaidaUso/TableMovSaidaUso";

export const MovSaidaUso = () => {
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
			</div>
		</section>
	);
};
