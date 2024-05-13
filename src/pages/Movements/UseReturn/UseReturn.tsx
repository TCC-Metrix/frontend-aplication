import "./UseReturn.css";
import { useState } from "react";
import { Button, BasicInputFilter, DateInputInside } from "../../../components";
import {
	GeneralInstrument,
	UseReturnPost,
} from "../../../utils/interfaces/Interfaces";
import { usePostReturnUse } from "../../../services/useMutation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAllAreas, useAllEmployees } from "../../../services/useFetchData";
import LoadingPage from "../../LoadingPage/LoadingPage";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import request from "axios";
import ModalSearchInstrument from "../../../components/ModalSearchInstrument/ModalSearchInstrument";

export const UseReturn = () => {
	// Estados para controlar o estado dos componentes
	const [isLoadingPostUseOutput, setIsLoadingPostUseOutput] =
		useState<boolean>(false);
	const [tableMainPage, setTableMainPage] = useState<GeneralInstrument[]>([]);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [isReloaded, setIsReloaded] = useState<boolean>(false);

	//Variáveis controladas no contexto da aplicação
	const listExpiredInstruments: GeneralInstrument[] = [];
	//Pegar o dia atual
	const currentDate: Date = new Date();
	const currentMonth: number = currentDate.getMonth() + 1;
	const currentYear: number = currentDate.getFullYear();

	const headersList = ["Código", "Nome", "Data de Saída", "Motivo", "Colaborador", "Área"];

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
			toast.error(
				`${message ? message : "Erro ao processar sua solicitação"}`,
				{
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				}
			);
	};

	

	//Abre o modal
	const handleModal = () => {
		// setIsPopupActive(true);
		setOpenModal(true);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		clearErrors,
		setError,
		getValues,
		watch,
	} = useForm();

	const valueInArea = watch("area");
	const valueInShippingResponsible = watch("shippingResponsible");

	//Hooks de api
	const postReturnUseMutation = usePostReturnUse(); //posta a saida para uso
	const { data: allEmployees, isLoading, isError } = useAllEmployees(); //busca todos os funcionarios
	const {
		data: allAreas,
		isLoading: isLoadingArea,
		isError: isErrorArea,
	} = useAllAreas(); //busca todas as áreas

	const handlePostUseOutput: SubmitHandler<UseReturnPost> = (data) => {
		setIsLoadingPostUseOutput(true);
		postReturnUseMutation.mutate(data, {
			onSettled: (data, error) => {
				if (error && request.isAxiosError(error)) {
					setIsLoadingPostUseOutput(false);
					notify("error", "Erro ao processar sua solicitação");
				} else {
					setIsLoadingPostUseOutput(false);
					notify("success", "Movimentação realizada com sucesso");
					setValue("returnDate", "");
					setValue("shippingResponsible", "");
					setValue("shippingResponsibleDescription", "");
					setValue("receivingResponsibleDescription", "");
					setValue("receivingResponsible", "");
					setValue("area", "");
					setValue("areaDescription", "");
					setTableMainPage([]);
					console.log(data);
					setIsReloaded(true);
				}
			},
		});
	};

	//Busca os ids dos instrumentos dentro da lista de instrumentos e chama função que envia à api
	const handleConfirmUseOutput = (data: FieldValues) => {
		const idsList = tableMainPage.map((item) => item.id);

		setIsLoadingPostUseOutput(true);

		setIsLoadingPostUseOutput(false);
		if (idsList.length == 0) {
			notify("error", "Nenhum instrumento selecionado");
			return;
		}


		if (
			(valueInArea === "" || valueInArea === undefined) &&
			(valueInShippingResponsible === "" ||
				valueInShippingResponsible === undefined)
		) {
			notify(
				"error",
				"Informe ao menos uma área ou responsável de entrega"
			);
			return;
		}

		tableMainPage.map((item) => {
			const dateNextCalibration: Date = new Date(
				item.nextCalibration + "T00:00:00"
			);

			const monthNextCalibration: number = dateNextCalibration.getMonth() + 1;
			const yearNextCalibration: number = dateNextCalibration.getFullYear();
			if (currentYear > yearNextCalibration) {
				listExpiredInstruments.push(item);
			} else if (currentMonth >= monthNextCalibration) {
				listExpiredInstruments.push(item);
			}
		});



		const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
		const match = data.returnDate.match(regex);
		if (match) {
			const ano = parseInt(match[1], 10);

			if (match[1].length > 4 || isNaN(ano)) {
				setError("returnDate", {
					type: "invalid",
					message: "Ano inválido",
				});
				return;
			} else if (ano < 2000 || ano > 2100) {
				setError("returnDate", {
					type: "invalid",
					message: "Ano está fora do intervalo válido (2000-2100)",
				});
				return;
			} else {
				// Limpa qualquer erro existente
				clearErrors("returnDate");
			}
		} else {
			setError("returnDate", {
				type: "invalid",
				message: "Formato de data inválido",
			});
			return;
		}

		handlePostUseOutput({
			instrumentIds: idsList,
			shippingResponsible: data.shippingResponsible,
			receivingResponsible: data.receivingResponsible,
			area: data.area,
			returnDate: data.returnDate,
		});
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
					<h1 className="header-three">Retorno de uso</h1>
					<p className="text">Instrumento</p>
					<Button className="btn btn-tertiary " onClickFunction={handleModal}>
						Adicionar / Editar
					</Button>
				</div>
				<div className="flex-center-table scroll">
					<table className="table-container ">
						<thead>
							<tr className="first-line ">
								{headersList.map((item, index) => {
									return <th key={index}>{item}</th>;
								})}
							</tr>
						</thead>
						<tbody>
							{tableMainPage.length > 0 ? (
								tableMainPage.map((item) => (
									<tr>
										<td className="text">
											<p className="td-text">{item.code}</p>
										</td>
										<td>{item.description}</td>

										
									</tr>
								))
							) : (
								<tr>
									<td colSpan={headersList.length + 1} className="text">
										Nenhum instrumento encontrado
									</td>
								</tr>
							)}
						</tbody>
					</table>
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
									inputPlaceholder="responsável entrega"
									register={register}
									setValue={setValue}
									getValues={getValues}
									isRequired={true}
									errors={errors}
									isActive={valueInArea !== "" && valueInArea !== undefined
									? false
									: true}
								/>
							</div>
							<div>
								<BasicInputFilter
									inputStyle="classe-large"
									inputId="receivingResponsible"
									inputName="receivingResponsibleDescription"
									items={allEmployees}
									inputPlaceholder="responsável recebimento"
									register={register}
									setValue={setValue}
									getValues={getValues}
									isRequired={false} //undefined
									errors={errors}
									isActive={true}
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
									isActive={
										valueInShippingResponsible !== "" &&
										valueInShippingResponsible !== undefined
											? false
											: true
									}
								/>
							</div>
							<div>
								<DateInputInside
									placeholder="data de saída"
									inputStyle="large-input"
									register={register}
									inputName="returnDate"
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
				<ModalSearchInstrument
					openModal={openModal}
					setFinalInstruments={setTableMainPage}
					setOpenModal={setOpenModal}
					isReloaded={isReloaded}
					setIsReloaded={setIsReloaded}
					status="in%20use"
				/>
			</div>
		</main>
	);
};
