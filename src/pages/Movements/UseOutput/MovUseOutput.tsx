import "./MovUseOutput.css";
import Table from "../../../components/Table/Table";
import { useEffect, useState } from "react";
import {
	Modal,
	Button,
	InputSearchFilter,
	BasicInputFilter,
	DateInputInside,
} from "../../../components";
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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAllAreas, useAllEmployees } from "../../../services/useFetchData";
import LoadingPage from "../../LoadingPage/LoadingPage";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import request from "axios";
import ModalSearchInstrument from "../../../components/ModalSearchInstrument/ModalSearchInstrument";

export const MoveUseOutput = () => {
	// Estados para controlar o estado dos componentes
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


	const dropdownOptions = [{ value: "Descrição" }, { value: "Código" }];
	const listExpiredInstruments: InstrumentUseOutput[] = [];
	//Pegar o dia atual
	const currentDate: Date = new Date();
	const currentMonth: number = currentDate.getMonth() + 1;
	const currentYear: number = currentDate.getFullYear();



	

	const notify = (type: string, message?: string) => {
		type === "success" &&
			toast.success(message, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});

		type === "error" &&
			toast.error(`${message ? message : "Erro ao processar sua solicitação"}`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
	};



	//Abre o modal
	const handleModal = () => {
		// setIsPopupActive(true);
		setOpenModal(true);
	};

	const {
		register,
		handleSubmit,
		formState: { errors  },
		setValue,
		resetField,
		clearErrors,

		setError,
		getValues,
		reset,
		watch
	} = useForm();

	const valueInArea = watch("areaDescription")
	const valueInReceivingResponsible = watch("receivingResponsibleDescription")

	useEffect(() => {
		console.log("valueReceivonh:", valueInReceivingResponsible)
		console.log("value:", valueInReceivingResponsible)
		if(valueInArea !== undefined && valueInArea !== ""){
			console.log("limpando erro")
			clearErrors("receivingResponsibleDescription")
			console.log(errors)
		}
		if(valueInReceivingResponsible !== undefined && valueInReceivingResponsible !== ""){
			clearErrors("area")
		}
	}, [valueInReceivingResponsible, valueInArea])

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
				secondValue: "available",
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

	const handlePostUseOutput: SubmitHandler<OutputUsePost> = (data) => {
		setIsLoadingPostUseOutput(true);
		postOutputMutation.mutate(data, {
			onSettled: (data, error) => {
				if (error && request.isAxiosError(error)) {
					setIsLoadingPostUseOutput(false);
					notify("error", "Erro ao processar sua solicitação")
				} else {
					setIsLoadingPostUseOutput(false);
					notify("success", "Movimentação realizada com sucesso");
					setValue("outputDate", "")
					setValue("shippingResponsible", "")
					setValue("shippingResponsibleDescription", "")
					setValue("receivingResponsibleDescription", "")
					setValue("receivingResponsible", "")
					setValue("area", "")
					setValue("areaDescription", "")
					console.log("getvalues", getValues() )
					setTableMainPage([])
				}
			},
		});
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
			resetAllModalData();
		} else {
			// Trata a situação em que há itens repetidos
		}
	};


	//Busca os ids dos instrumentos dentro da lista de instrumentos e chama função que envia à api
	const handleConfirmUseOutput = (data: FieldValues) => {
		const idsList = tableMainPage.map((item) => item.id);


		


		setIsLoadingPostUseOutput(true);

		setIsLoadingPostUseOutput(false);
		if (idsList.length == 0) {
			notify("error", "Nenhum instrumento selecionado")
			return;
		}
		if (valueInArea === "" || valueInArea === undefined && valueInReceivingResponsible === "" || valueInReceivingResponsible === undefined) {
			notify("error", "Informe ao menos uma área ou responsável de recebimento")
			return;
		}


		tableMainPage.map((item) => {
			const dateNextCalibration: Date = new Date(
				item.nextCalibrationHide + "T00:00:00"
			);

			const monthNextCalibration: number = dateNextCalibration.getMonth() + 1;
			const yearNextCalibration: number = dateNextCalibration.getFullYear();
			if (currentYear > yearNextCalibration) {
				listExpiredInstruments.push(item);
			} else if (currentMonth >= monthNextCalibration) {
				listExpiredInstruments.push(item);
			}
		});

		if (listExpiredInstruments.length > 0) {
			const messageInstruments: string = listExpiredInstruments
				.map(
					(instrument) => `${instrument.code} - ${instrument.description}/ `
				)
				.join("");
			notify("error", `Instrumentos com calibração vencida ${messageInstruments}`)

			return;
		}

		const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
		const match = data.outputDate.match(regex);
		if (match) {
			const ano = parseInt(match[1], 10);

			if (match[1].length > 4 || isNaN(ano)) {
				setError("outputDate", {
					type: "invalid",
					message: "Ano inválido",
				});
				return
			} else if (ano < 2000 || ano > 2100) {
				setError("outputDate", {
					type: "invalid",
					message: "Ano está fora do intervalo válido (2000-2100)",
				});
				return
			} else {
				// Limpa qualquer erro existente
				clearErrors("outputDate");
			}
		} else {
			setError("outputDate", {
				type: "invalid",
				message: "Formato de data inválido",
			});
			return
		}

		handlePostUseOutput({
			instrumentIds: idsList,
			shippingResponsible: data.shippingResponsible,
			receivingResponsible: data.receivingResponsible,
			area: data.area,
			outputDate: data.outputDate,
		});
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
			<div className="container-main">
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
							<div className="inputs-responsible">
						
								<BasicInputFilter
									inputStyle="classe-large"
									inputId="shippingResponsible"
									inputName="shippingResponsibleDescription"
									items={allEmployees}
									inputPlaceholder="Resp entrega"
									register={register}
									setValue={setValue}
									getValues={getValues}
									isRequired={true}
									errors={errors}
									isActive={true}
								/>
							</div>
							<div>

								<BasicInputFilter
									inputStyle="classe-large"
									inputId="receivingResponsible"
									inputName="receivingResponsibleDescription"
									items={allEmployees}
									inputPlaceholder="resp receb"
									register={register}
									setValue={setValue}
									getValues={getValues}
									isRequired={false} //undefined
									errors={errors}
									isActive={valueInArea !== "" && valueInArea !== undefined ? false : true}
								/>
							</div>
						</div>
						<div className="form-column">
							<div>

								<BasicInputFilter
									inputStyle="classe-large"
									inputId="area"
									inputName="areaDescription"
									items={allAreas}
									inputPlaceholder="área"
									register={register}
									setValue={setValue}
									getValues={getValues}
									isRequired={false} // ""
									errors={errors}
									isActive={valueInReceivingResponsible !== "" && valueInReceivingResponsible !== undefined ? false : true}
								/> 
							</div>
							<div>	
								<DateInputInside
									placeholder="data de saída"
									inputStyle="large-input"
									register={register}
									inputName="outputDate"
									isRequired={true}
									errors={errors}
								/>
							</div>
						</div>
					</section>
					<div></div>
				</div>
				<div className="m-auto btn-session-confirm">
					<Button
						className="btn btn-secondary btn-lg"
						onClickFunction={handleSubmit(handleConfirmUseOutput)}
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
				<ModalSearchInstrument/>
				<ToastContainer/>
			</div>
		</main>
	);
};
