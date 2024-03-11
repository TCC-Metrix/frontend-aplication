import NavBar from "../../../components/Navbar/Navbar";
import "./MovSaidaUso.css";
import ButtonDark from "../../../components/ButtonDark/ButtonDark";
import TableMovSaidaUso from "../../../components/TableMovSaidaUso/TableMovSaidaUso";
import { useState } from "react";
import { IoMdCalendar } from "react-icons/io";
import InputSearch from "../../../components/InputSearch/InputSearch";

export const MovSaidaUso = () => {
	const options = [
		{ label: "Option 1" },
		{ label: "Option 2" },
		{ label: "Option 3" },
		{ label: "Option 4" },
		{ label: "Option 5" },
	]; // será alimentado pela API provavelmente em outro arquivo

	const [activeEntrega, setActiveEntrega] = useState<boolean>(false);
	const [activeReceb, setActiveReceb] = useState<boolean>(false);
	const [activeArea, setActiveArea] = useState<boolean>(false);

	function validInputActive(event: any) {
		const name = event.target.name;
		console.log(name === "area");
		setActiveArea(name === "area");
		setActiveEntrega(name === "resp-entrega");
		setActiveReceb(name === "resp-receb");
	}

	return (
		<main onClick={(e) => validInputActive(e)}>
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
					<div className="form-column">
						<div>
							<h1>Responsável entrega</h1>
							<InputSearch
								options={options}
								placeholder="Busque por código ou nome"
								isActive={activeEntrega}
								title="resp-entrega"
							/>
						</div>
						<div>
							<h1>Responsavel Recebimento</h1>
							<InputSearch
								options={options}
								placeholder="Busque por código ou nome"
								isActive={activeReceb}
								title="resp-receb"
							/>
						</div>
					</div>
					<div className="form-column">
						<div>
							<h1>Área</h1>
							<InputSearch
								options={options}
								placeholder="Busque por descrição"
								isActive={activeArea}
								title="area"
							/>
						</div>
						<div>
							<h1>Data de Saída</h1>
							<div className="flex-column-calendar-icon">
								<input
									type="date"
									id="birthday"
									name="birthday"
									className="date-input"
									
								/>
								<div className="calendar-input">
									<IoMdCalendar size={23} color="476273"/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
};
