import NavBar from "../../../components/Navbar/Navbar";
import "./MovSaidaUso.css";
import ButtonDark from "../../../components/ButtonDark/ButtonDark";


export const MovSaidaUso = () => {
	return (
		<section>
			<NavBar />
			<div className="container-main">
				<h1>Saída para uso</h1>
				<p>Instrumento</p>
				<ButtonDark name="+ Adicionar" />
			</div>
		</section>
	);
};
