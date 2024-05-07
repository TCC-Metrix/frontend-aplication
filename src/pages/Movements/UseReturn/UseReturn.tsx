import { useState } from "react";
import { Button, DateInput, InputSearch, Table } from "../../../components";
import { useNavbarStore } from "../../../store";
import { InstrumentUseOutput } from "../../../utils/interfaces/Interfaces";
import "./UseReturn.css";
import { useAllEmployees, useAllAreas } from "../../../services/useFetchData";
import ErrorPage from "../../ErrorPage/ErrorPage";
import LoadingPage from "../../LoadingPage/LoadingPage";

const UseReturn = () => {
	const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);
	const [tableMainPage, setTableMainPage] = useState<InstrumentUseOutput[]>([]);
	const [activeShippingInput, setActiveShippingInput] =
		useState<boolean>(false);
	const [activeReceiverInput, setActiveReceiverInput] =
		useState<boolean>(false);
	const [activeAreaInput, setActiveAreaInput] = useState<boolean>(false);
	const [shippingResponsibleSelected, setShippingResponsibleSelected] =
		useState<string>("");
	const [receivingResponsibleSelected, setReceivingResponsibleSelected] =
		useState<string>("");
	const [areaSelected, setAreaSelected] = useState<string>("");
	const [dateSelected, setDateSelected] = useState<string>("");
	const [inputErrors, setInputErrors] = useState({});

	const validInputActive = (event: React.MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLElement;

		const name = target.getAttribute("name");
		setActiveAreaInput(name === "area");
		setActiveShippingInput(name === "resp-entrega");
		setActiveReceiverInput(name === "resp-receb");
		setActiveNavbar(false);

		//Se o usuário clicar no botão de search, então ele seta o dropdown do modal como true, para abrir ao pesquisar algo
	};

	const {
		data: allEmployees,
		isLoading: isLoadingEmployees,
		isError: isErrorEmployees,
	} = useAllEmployees(); //busca todos os funcionarios

	const {
		data: allAreas,
		isLoading: isLoadingArea,
		isError: isErrorArea,
	} = useAllAreas();

	const handleInputError = (inputName: string, errorMessage: string) => {
		setInputErrors((prevErrors) => ({
			...prevErrors,
			[inputName]: errorMessage,
		}));
	};

	const clearInputError = (all: boolean, inputTitle: string) => {
		if (all) {
			setInputErrors({});
		} else {
			setInputErrors((prevstate) => ({
				...prevstate,
				[inputTitle]: "",
			}));
		}
	};

	if (isErrorEmployees || isErrorArea) {
		return <ErrorPage />;
	}

	if (isLoadingEmployees || isLoadingArea) {
		return <LoadingPage />;
	}

	return (
		<main>
			<div
				className="container-main-use-return-page"
				onClick={(e) => {
					validInputActive(e);
				}}
			>
				<div>
					<h1 className="header-three">Retorno de uso</h1>
					<p className="text">Instrumento</p>
					<Button
						className="btn btn-tertiary "
						onClickFunction={() => {
						}}
					>
						+ Adicionar
					</Button>
				</div>
				<div className="flex-center-table">
					<Table
						tableContent={tableMainPage}
						tableHeaders={[
							"Codigo",
							"Nome",
							"Data de Saída",
							"Motivo",
							"Colaborador",
							"Área",
						]}
						setTableContent={setTableMainPage}
						isReferencesPresent={true}
					/>
				</div>
				<div className="form-section-container">
					<section className="mov-info">
						<div className="form-column">
							<div>
								<p className="text-major">Responsável entrega</p>
								<InputSearch
									options={allEmployees}
									placeholder="Busque por código ou nome"
									isActive={activeShippingInput}
									title="resp-entrega"
									setValueSelected={setShippingResponsibleSelected}
									setInputGroupError={handleInputError}
									inputGroupError={inputErrors}
									clearInputError={clearInputError}
									isInputActive={true}
									valueSelected={shippingResponsibleSelected}
								/>
							</div>
							<div>
								<p
									className={`text-major ${
										areaSelected !== "" ? "label-inative" : ""
									}`}
								>
									Responsavel Recebimento
								</p>
								<InputSearch
									options={allEmployees}
									placeholder="Busque por código ou nome"
									isActive={activeReceiverInput}
									title="resp-receb"
									setValueSelected={setReceivingResponsibleSelected}
									setInputGroupError={handleInputError}
									inputGroupError={inputErrors}
									clearInputError={clearInputError}
									isInputActive={areaSelected !== "" ? false : true}
									valueSelected={receivingResponsibleSelected}
								/>
							</div>
						</div>
						<div className="form-column">
							<div>
								<p
									className={`text-major ${
										receivingResponsibleSelected !== "" ? "label-inative" : ""
									}`}
								>
									Área
								</p>
								<InputSearch
									options={allAreas}
									placeholder="Busque por descrição"
									isActive={activeAreaInput}
									title="area"
									setValueSelected={setAreaSelected}
									setInputGroupError={handleInputError}
									inputGroupError={inputErrors}
									clearInputError={clearInputError}
									isInputActive={
										receivingResponsibleSelected !== "" ? false : true
									}
									valueSelected={areaSelected}
								/>
							</div>
							<div>
								<p className="text-major">Data de Saída</p>
								<DateInput setValueSelected={setDateSelected} />
							</div>
						</div>
					</section>
					<div></div>
				</div>
				{/* <div className="m-auto btn-session-confirm">
					<Button
						className="btn btn-secondary btn-lg"
						onClickFunction={handleConfirmUseReturn}
					>
						{isLoadingPostUseOutput ? (
							<RotatingLines
								visible={true}
								strokeWidth="5"
								animationDuration="0.75"
								ariaLabel="rotating-lines-loading"
								strokeColor="#fff"
								width="20"
							/>
						) : (
							<>Confirmar</>
						)}
					</Button>
				</div> */}
			</div>
		</main>
	);
};

export default UseReturn;
