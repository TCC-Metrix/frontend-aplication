import NavBar from "../../../components/Navbar/Navbar";
import "./MovSaidaUso.css";
import TableMovSaidaUso from "../../../components/TableMovSaidaUso/TableMovSaidaUso";
import { useState } from "react";
import { IoMdCalendar, IoMdAlert } from "react-icons/io";
import InputSearch from "../../../components/InputSearch/InputSearch";
import Checkbox from "../../../components/Checkbox/Checkbox";
import Buttons from "../../../components/Buttons/Buttons";
import Modal from "../../../components/Modal/Modal";
// import ModalErro from "../../../components/Modal/ModalErro"
import InputSearchFilter from "../../../components/InputSearchFilter/InputSearchFilter";

export const MovSaidaUso = () => {
	const options = [
		{ label: "Option 1" },
		{ label: "Option 2" },
		{ label: "Option 3" },
		{ label: "Option 4" },
		{ label: "Option 5" },
		{ label: "Option 3" },
		{ label: "Option 4" },
		{ label: "Option 5" },
	]; // será alimentado pela API provavelmente em outro arquivo

	const optionsInstrument = [
		{ value: "Option 1" },
		{ value: "Option 2" },
		{ value: "Option 3" },
		{ value: "Option 4" },
		{ value: "Option 5" },
		{ value: "Option 3" },
		{ value: "Option 4" },
		{ value: "Option 5" },
	]; // será alimentado pela API provavelmente em outro arquivo

	const filtersOptions = [
		{ value: "Descrição" },
		{ value: "Nome" },
		{ value: "Outro nome" },
		{ value: "Exemplo" },
	]; // será alimentado pela API provavelmente em outro arquivo

	const [activeEntrega, setActiveEntrega] = useState<boolean>(false);
	const [activeReceb, setActiveReceb] = useState<boolean>(false);
	const [activeArea, setActiveArea] = useState<boolean>(false);
	const [activeInstrument, setActiveInstrument] = useState<boolean>(false);
	const [activeNavbar, setActiveNavbar] = useState<boolean>(true);
	const [items, setItems] = useState<Item[]>([
		{
			codigo: "1214-11",
			descricao: "manometro",
			referencia: "111mm",
		},
	]);

	const refAdicionalOptions = [
    { value: '50mm/11', label: '50mm/11' },
    // Adicione outras opções conforme necessário
  ];

	const [openModal, setOpenModal] = useState<boolean>(false);
	// const [openErrorModal, setOpenErrorModal] = useState<boolean>(false)

	function validInputActive(event: any) {
		const name = event.target.name;
		setActiveArea(name === "area");
		setActiveEntrega(name === "resp-entrega");
		setActiveReceb(name === "resp-receb");
		setActiveInstrument(name === "search-instrument");
		setActiveNavbar(false);
	}

	const handleAddButtonClick = () => {
		setOpenModal(true);
	};
  
	return (
		<main>
			<NavBar activeNavbar={activeNavbar} setActiveNavbar={setActiveNavbar} />
			<div className="container-main" onClick={(e) => validInputActive(e)}>
				<div className="top-information">
					<h1>Saída para uso</h1>
					<p>Instrumento</p>
					<Buttons
						name="+ Adicionar"
						className="btn-dark"
						onClickFunction={handleAddButtonClick}
					/>
					{/* <button className="btn-dark" onClick={handleAddButtonClick}>+ Adicionar</button> */}
					<Modal
						isOpen={openModal}
						setModalOpen={() => {
							setOpenModal(!openModal);
						}}
					>
						<text className="mainText">Selecionar instrumento(s)</text>
						<text className="normalText">Buscar por</text>
						

						<div className="inputFilter">
							<InputSearchFilter
								dropdownOptions={filtersOptions}
								searchOptions={optionsInstrument}
								placeholder="Buscar por descrição do instrumento"
								placeholderOption="Descrição"
								isActive={activeInstrument}
								title="search-instrument"
							/>
						</div>

						<p className="alertGray">Nenhum instrumento selecionado</p>
					</Modal>
				</div>
				<div className="flex-center-table">
					<TableMovSaidaUso options={refAdicionalOptions}/>
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
								<input type="date" name="exit-date" className="date-input" />
								<div className="calendar-input">
									<IoMdCalendar size={23} color="476273" />
								</div>
							</div>
						</div>
					</div>
				</section>
				<div className="margin-top-checkbox">
					<Checkbox text="Instrumento com calibração vencida" />
					<Checkbox text="Instrumento reprovado" />
				</div>
				<div className="confirm-btn-center">
					{/* <Buttons name="Confirmar" className="main-blue-1" onClickFunction={setOpenErrorModal} /> */}
					{/* <ModalErro
						isOpen={openErrorModal}
						setModalErrorOpen={() => {
							setOpenErrorModal(!openErrorModal)
						}}
					>
						<div className="alert">
							<IoMdAlert 
								size={250}
								color="#ff0000"
							/>
							<h1 className="alertText">Campo "responsável recebimento" ou "área" precisa ser informado.</h1>
						</div>
					</ModalErro> */}
				</div>
			</div>
		</main>
	);
};
