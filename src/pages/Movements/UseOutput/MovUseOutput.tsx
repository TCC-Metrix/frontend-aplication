import "./MovUseOutput.css";
import Table from "../../../components/Table/Table";
import { useState } from "react";
import {InputSearch, Modal, Button, DateInput, InputSearchFilter} from '../../../components'
import { PiMagnifyingGlassBold } from "react-icons/pi";
import {
	GeneralInstrument,
	InstrumentToModalTableUseOutput,
	InstrumentUseOutput,
	OutputUsePost,
	SearchPattern,
} from "../../../utils/interfaces/Interfaces";
import {
	useGetInstrumentBy,
	usePostOutputUse,
} from "../../../services/useMutation";
import { SubmitHandler } from "react-hook-form";
import { useAllAreas, useAllEmployees } from "../../../services/useFetchData";
import LoadingPage from "../../LoadingPage/LoadingPage";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { useNavbarStore, usePopupStore } from "../../../store";
import { RotatingLines } from "react-loader-spinner";

export const MoveUseOutput = () => {
	// Estados para controlar o estado dos componentes
	const [activeShippingInput, setActiveShippingInput] =
		useState<boolean>(false);
	const [activeReceiverInput, setActiveReceiverInput] =
		useState<boolean>(false);
	const [activeAreaInput, setActiveAreaInput] = useState<boolean>(false);
	const [activeInputDropdown, setActiveInputDropdown] =
		useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [inputFilterError, setInputFilterError] = useState<string>("");
	const [isLoadingInput, setIsLoadingInput] = useState<boolean>(false);
	const [isLoadingPostUseOutput, setIsLoadingPostUseOutput] =
		useState<boolean>(false);
	const [tableModalList, setTableModalList] = useState<
		InstrumentToModalTableUseOutput[]
	>([]);
	const [inputErrors, setInputErrors] = useState({});

	const [shippingResponsibleSelected, setShippingResponsibleSelected] =
		useState<string>("");
	const [receivingResponsibleSelected, setReceivingResponsibleSelected] =
		useState<string>("");
	const [areaSelected, setAreaSelected] = useState<string>("");
	const [dateSelected, setDateSelected] = useState<string>("");
	const [tableMainPage, setTableMainPage] = useState<InstrumentUseOutput[]>([]);
	const [instrumentSelected, setInstrumentSelected] =
		useState<InstrumentToModalTableUseOutput>({
			id: "",
			code: "",
			description: "",
			family: "",
			calibrationFrequency: 0,
			nextCalibration: "",
			additionalReferences: [],
			nextCalibrationHide: "",
		});
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [instrumentsFiltered, setInstrumentsFiltered] =
		useState<GeneralInstrument[]>();
	const [dropdownSelected, setDropdownSelected] =
		useState<string>("description");

	//Variáveis controladas no contexto da aplicação
	const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);
	const setPopupType = usePopupStore((state) => state.setPopupType);
	const setPopupBody = usePopupStore((state) => state.setPopupBody);
	const setPopupTitle = usePopupStore((state) => state.setPopupTitle);
	const setIsPopupActive = usePopupStore((state) => state.setIsPopupActive);
	const setPopupFunction = usePopupStore((state) => state.setPopupFunction);

	const dropdownOptions = [{ value: "Descrição" }, { value: "Código" }];
	const listExpiredInstruments: InstrumentUseOutput[] = []
	//Pegar o dia atual
	const currentDate: Date = new Date();

	const currentMonth: number = currentDate.getMonth() + 1;
	const currentYear: number = currentDate.getFullYear();

	//Valida onde o usuario está clicando, para que feche os dropdowns dos inputs abertos
	const validInputActive = (event: React.MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLElement;

		const name = target.getAttribute("name");
		setActiveAreaInput(name === "area");
		setActiveShippingInput(name === "resp-entrega");
		setActiveReceiverInput(name === "resp-receb");
		setActiveNavbar(false);

		//Se o usuário clicar no botão de search, então ele seta o dropdown do modal como true, para abrir ao pesquisar algo
		if (target.classList.contains("search-btn")) {
			setActiveInputDropdown(true);
		} else {
			setActiveInputDropdown(name === "search-instrument");
		}
	};



	//Abre o modal
	const handleModal = () => {
		// setIsPopupActive(true);
		setOpenModal(true);
	};

	//Hooks de api
	const getInstrumentBy = useGetInstrumentBy(); //busca instrumento por algum parametro
	const postOutputMutation = usePostOutputUse(); //posta a saida para uso
	const { data: allEmployees, isLoading, isError } = useAllEmployees(); //busca todos os funcionarios
	const {
		data: allAreas,
		isLoading: isLoadingArea,
		isError: isErrorArea,
	} = useAllAreas(); //busca todas as áreas

	//Função que de fato chama a api, e seta o resultado nos instrumentos filtrados
	const handleSearch: SubmitHandler<SearchPattern> = (data) => {
		setIsLoadingInput(true);
		getInstrumentBy.mutate(data, {
			onSettled: (data, error) => {
				if (error) {
					console.error("Ocorreu um erro:", error);
					setIsLoadingInput(false);
					return;
				}
				const instruments = data?.data;

				const instrumentsReloaded =
					instruments &&
					instruments.filter((item) => item.code !== instrumentSelected.code);

				setInstrumentsFiltered(instrumentsReloaded);
				setIsLoadingInput(false);

				if (instrumentsReloaded?.length == 0) {
					setInputFilterError("Instrumento não encontrado.");
				}
			},
		});
	};

	//Função que valida se o input está vazio, e envia os parametros para a função que chama a api caso não esteja
	const handleSearchButton = () => {
		setInputFilterError("");
		setActiveInputDropdown(true);
		if (searchTerm !== "") {
			handleSearch({
				column: dropdownSelected,
				value: searchTerm,
				secondColumn: "status",
				secondValue: "disponivel",
			});
		} else {
			setInstrumentsFiltered([]);
			setInputFilterError("Campo não pode ser vazio");
		}
	};

	//Adiciona instrumento na lista do modal
	const handleAddButton = () => {
		setInputFilterError("");
		if (searchTerm !== "" && instrumentSelected.code !== "") {
			const isCodeAlreadyInList = tableModalList.some(
				(item) => item.code === instrumentSelected.code
			);

			const isCodeAlreadyInMainList = tableMainPage.some(
				(item) => item.code === instrumentSelected.code
			);

			if (!isCodeAlreadyInList && !isCodeAlreadyInMainList) {
				setTableModalList([...tableModalList, instrumentSelected]);
				resetInstrumentSelected();
				setSearchTerm("");
				setInstrumentsFiltered([]);
			} else {
				setInputFilterError("Instrumento já adicionado");
				setSearchTerm("");
			}
		} else {
			setInputFilterError("Nenhum instrumento selecionado");
		}
	};

	//Adiciona os instrumentos do modal na lista principal
	const handleButtonConfirmModal = () => {
		const repeatedItems: InstrumentToModalTableUseOutput[] = [];

		// Verifica se todos os itens em tableModalList são exclusivos em relação a tableMainPage
		tableModalList.forEach((item) => {
			const isUnique = !tableMainPage.some((existingItem) => {
				return (
					existingItem.code === item.code &&
					existingItem.description === item.description
				);
			});

			if (!isUnique) {
				repeatedItems.push(item);
			}
		});

		if (repeatedItems.length === 0) {
			// Adiciona todos os itens de tableModalList a tableMainPage
			setTableMainPage((prevTableMainPage) => [
				...prevTableMainPage,
				...tableModalList.map((item) => ({
					id: item.id,
					code: item.code,
					description: item.description,
					additionalReferences: item.additionalReferences,
					nextCalibrationHide: item.nextCalibration,
				})),
			]);
			setOpenModal(false);
			console.log("fechando");
			resetAllModalData();
		} else {
			// Trata a situação em que há itens repetidos
			console.log("Há itens repetidos em tableMainPage:", repeatedItems);
		}
	};

	//faz a mutação pra api
	const handlePostUseOutput: SubmitHandler<OutputUsePost> = (data) => {
		setIsLoadingPostUseOutput(true);
		postOutputMutation.mutate(data, {
			onSettled: (data, error) => {
				if (error) {
					setTimeout(() => {
						setIsLoadingPostUseOutput(false);
						console.error("Ocorreu um erro:", error);
						createPopup(
							"error",
							"Erro interno do servidor",
							"Estamos com problemas em nosso servidor, tente novamente",
							() => {
								setIsPopupActive(false);
							}
						);
					}, 1000);
					return;
				} else {
					console.log(data);
					setIsLoadingPostUseOutput(false);
					createPopup(
						"feedback",
						"Movimentação realizada com sucesso",
						"",
						() => {
							setIsPopupActive(false);
						}
					);
				}
			},
		});
	};

	//Busca os ids dos instrumentos dentro da lista de instrumentos e chama função que envia à api
	const handleConfirmUseOutput = () => {
		const idsList = tableMainPage.map((item) => item.id);
		setIsLoadingPostUseOutput(true);
		setTimeout(() => {
			setIsLoadingPostUseOutput(false);
			if (idsList.length == 0) {
				createPopup(
					"error",
					"Nenhum instrumento selecionado",
					"Selecione ao menos um instrumento para dar saída.",
					() => {
						setIsPopupActive(false);
					}
				);
				return;
			}
			if (shippingResponsibleSelected.length == 0 || dateSelected.length == 0) {
				createPopup(
					"error",
					"Campos incompletos",
					"Campos *responsável de entrega* e *data de saída* devem ser preenchidos.",
					() => {
						setIsPopupActive(false);
					}
				);
				return;
			}
			if (
				areaSelected.length == 0 &&
				receivingResponsibleSelected.length == 0
			) {
				createPopup(
					"error",
					"Campos incompletos",
					"Preencha ao menos um dos campos de área ou responsável de recebimento",
					() => {
						setIsPopupActive(false);
					}
				);
				return;
			}

			tableMainPage.map((item) => {
				console.log(item.nextCalibrationHide);
				const dateNextCalibration: Date = new Date(
					item.nextCalibrationHide + "T00:00:00"
				);
				console.log(dateNextCalibration);

				const monthNextCalibration: number = dateNextCalibration.getMonth() + 1;
				const yearNextCalibration: number = dateNextCalibration.getFullYear();
					if (currentYear > yearNextCalibration) {
						listExpiredInstruments.push(item);
					} else if (currentMonth >= monthNextCalibration) {
						listExpiredInstruments.push(item);
					}
				}
			);

			if (listExpiredInstruments.length > 0) {
				const messageInstruments: string = listExpiredInstruments
					.map((instrument) => `${instrument.code} - ${instrument.description}/ `)
					.join("");
				createPopup(
					"error",
					"Instrumentos com calibração vencida: ",
					messageInstruments,
					() => {
						setIsPopupActive(false);
					}
				);
				return;
			}

			const data = {
				instrumentIds: idsList,
				shippingResponsible: shippingResponsibleSelected,
				receivingResponsible: receivingResponsibleSelected,
				area: areaSelected,
				outputDate: dateSelected,
			};

			handlePostUseOutput(data);
		}, 1000);
	};

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

	const createPopup = (
		type: string,
		title: string,
		body: string,
		btnFunction: () => void
	) => {
		setPopupType(type);
		setPopupTitle(title);
		setPopupBody(body);
		setPopupFunction(() => {
			setPopupBody("");
			setPopupTitle("");
			setPopupType("none");
			btnFunction();
		});
		setIsPopupActive(true);
	};

	const resetInstrumentSelected = () => {
		setInstrumentSelected({
			id: "",
			code: "",
			description: "",
			family: "",
			calibrationFrequency: 0,
			nextCalibration: "",
			additionalReferences: [],
			nextCalibrationHide: "",
		});
	};

	const resetAllModalData = () => {
		setInputFilterError("");
		setInstrumentsFiltered([]);
		setSearchTerm("");
		resetInstrumentSelected();
		setTableModalList([]);
	};

	if (isError || isErrorArea) {
		return <ErrorPage />;
	}

	if (isLoading || isLoadingArea) {
		return <LoadingPage />;
	}

	return (
		<main>
			<div className="container-main" onClick={(e) => validInputActive(e)}>
				<div>
					<h1 className="header-three">Saída para uso</h1>
					<p className="text">Instrumento</p>
					<Button className="btn btn-tertiary " onClickFunction={handleModal}>
						+ Adicionar
					</Button>
					<Modal
						isOpen={openModal}
						setModalOpen={() => {
							resetAllModalData();
							// setIsPopupActive(false);
							setOpenModal(!openModal);
						}}
					>
						<div>
							<h1 className="header-three">Selecionar instrumento(s)</h1>
							<p className="text-major">Buscar por</p>
						</div>
						<div className="search-modal-area-container">
							<div className="search-modal-area">
								<div className="input-filter">
									<InputSearchFilter
										dropdownOptions={dropdownOptions} //Opções que aparecerão no dropdown
										instrumentsFiltered={instrumentsFiltered} //Instrumentos filtrados
										setInstrumentsFiltered={setInstrumentsFiltered}
										isActive={activeInputDropdown} // Define de está ativo ou inativo o dropdown de instrumentos
										title="search-instrument"
										setDropdownSelected={setDropdownSelected} //Seta a opção selecionada do dropdown de opções
										setInstrumentSelected={setInstrumentSelected}
										instrumentSelected={instrumentSelected}
										tableModalList={tableModalList}
										inputError={inputFilterError}
										setInputError={setInputFilterError}
										searchTerm={searchTerm}
										setSearchTerm={setSearchTerm}
										isLoadingInput={isLoadingInput}
									/>
								</div>
								<Button
									className="btn btn-sm btn-tertiary search-btn"
									onClickFunction={handleSearchButton}
								>
									<PiMagnifyingGlassBold
										size={20}
										className="search-btn"
										onClick={handleSearchButton}
									/>
								</Button>
								<Button
									className="btn-sm btn-tertiary"
									onClickFunction={handleAddButton}
								>
									Adicionar
								</Button>
							</div>
						</div>
						<div className="modal-content">
							<Table
								tableContent={tableModalList}
								tableHeaders={[
									"Código",
									"Descrição",
									"Família",
									"Próx. Calibração",
									"Freq. Calibração",
								]}
								setTableContent={setTableModalList}
								isReferencesPresent={false}
							/>
						</div>
						<div className="last-modal-section">
							<Button
								onClickFunction={handleButtonConfirmModal}
								className="btn btn-secondary"
							>
								Confirmar
							</Button>
						</div>
					</Modal>
				</div>
				<div className="flex-center-table">
					<Table
						tableContent={tableMainPage}
						tableHeaders={["Codigo", "Descrição", "Referência Adicional"]}
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
					<div>
					</div>
				</div>
				<div className="m-auto btn-session-confirm">
					<Button
						className="btn btn-secondary btn-lg"
						onClickFunction={handleConfirmUseOutput}
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
				</div>
			</div>
		</main>
	);
};
