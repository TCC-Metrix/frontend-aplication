import { zodResolver } from "@hookform/resolvers/zod";
import { BasicInput, Button, RadioInput } from "../../../components";
import { useNavbarStore, usePopupStore } from "../../../store";
import "./FamilyRegister.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AreaRegisterPost } from "../../../utils/interfaces/Interfaces";
import { usePostAreaRegister } from "../../../services/useMutation";
import { useState } from "react";

const schema = z.object({
	name: z
		.string()
		.min(1, "Campo obrigatorio")
		.refine((value) => !/^\s+$/.test(value), {
			message: "Nome não pode conter apenas espaços em branco",
		}),
	calibrationFrequency: z
		.string()
		.regex(/^\d+$/, "Campo obrigatorio")
		.refine(
			(value) => {
				const numberValue = parseInt(value);
				return !isNaN(numberValue); // Garante que o valor é um número válido
			},
			{ message: "Campo obrigatorio" }
		)
		.transform((value) => parseInt(value)),
	familyCode: z
		.string()
		.min(1, "Campo obrigatorio")
		.refine((value) => !/^\s+$/.test(value), {
			message: "Nome não pode conter apenas espaços em branco",
		}),
});

type FormFields = z.infer<typeof schema>;

const FamilyRegister = () => {
	const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);
	const setPopupType = usePopupStore((state) => state.setPopupType);
	const setPopupBody = usePopupStore((state) => state.setPopupBody);
	const setPopupTitle = usePopupStore((state) => state.setPopupTitle);
	const setIsPopupActive = usePopupStore((state) => state.setIsPopupActive);
	const setPopupFunction = usePopupStore((state) => state.setPopupFunction);
	const [calibrationTimeCounter, setCalibrationTimeCounter] = useState("use");
	const [isLoadingPostAreaRegister, setIsLoadingPostAreaRegister] =
		useState<boolean>(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormFields>({ resolver: zodResolver(schema) });

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

	const postAreaMutation = usePostAreaRegister(); //posta a saida para uso

	const handlePostAreaRegister: SubmitHandler<AreaRegisterPost> = (data) => {
		setIsLoadingPostAreaRegister(true);
		postAreaMutation.mutate(data, {
			onSettled: (data, error) => {
				if (error) {
					setTimeout(() => {
						setIsLoadingPostAreaRegister(false);
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
					setIsLoadingPostAreaRegister(false);
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

	const handleConfirmAreaRegister = (dataApi: z.infer<typeof schema>) => {
		setIsLoadingPostAreaRegister(true);
		setTimeout(() => {
			setIsLoadingPostAreaRegister(false);

			const data = {
				code: dataApi.familyCode,
				description: dataApi.name,
				calibrationFrequencyInMonths: dataApi.calibrationFrequency,
				calibrationTimeCounter: calibrationTimeCounter,
			};

			handlePostAreaRegister(data);
		}, 1000);
	};

	const onSubmit = (data: z.infer<typeof schema>) => {
		data;
		// console.log(data.calibrationFrequency);
		// const regex = /^[0-9]+$/; // Expressão regular que aceita apenas números inteiros
		// if (!regex.test(data.calibrationFrequency)) {
		// 	console.log("entrei no erro");
		// 	setError("calibrationFrequency", {
		// 		message:
		// 			"A frequência de calibração deve conter apenas números inteiros.",
		// 	});
		// }
	};

	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCalibrationTimeCounter(event.target.value); // Atualiza o estado com o valor selecionado do radio input
	};

	return (
		<>
			<div
				className="main-container-instrument-register-page"
				onClick={() => {
					setActiveNavbar(false);
				}}
			>
				<div className="main-content">
					<div className="text-header">
						<h1 className="header-three">Cadastro: Família</h1>
					</div>
					<form className="main-form-family-register">
						<BasicInput
							errors={errors}
							isRequired={true}
							inputName="name"
							inputPlaceholder="nome"
							inputStyle="large-input"
							inputType="text"
							register={register}
						/>
						<div className="flex-form-line-inputs-family-register">
							<BasicInput
								errors={errors}
								isRequired={true}
								inputName="calibrationFrequency"
								inputPlaceholder="freq de calibração (meses)"
								inputStyle="medium-input"
								inputType="number"
								register={register}
							/>
							<BasicInput
								errors={errors}
								isRequired={true}
								inputName="familyCode"
								inputPlaceholder="código familia"
								inputStyle="medium-input"
								inputType="text"
								register={register}
							/>
						</div>
						<div>
							<h3 className="text-major">Contagem do tempo de calibração</h3>
							<div className="flex-row-direction-family-register">
								<RadioInput
									title="Inicia a partir do uso"
									name="calibrationFrequency"
									value="use"
									id="uso"
									onChange={handleRadioChange}
									defaultChecked
								/>
								<RadioInput
									title="Inicia a partir da data de calibração"
									name="calibrationFrequency"
									value="calibration"
									id="calibracao"
									onChange={handleRadioChange}
								/>
							</div>
						</div>
						<div className="confirm-button-family-register">
							<Button
								onClickFunction={handleConfirmAreaRegister}
								className="btn btn-secondary"
							>
								Confirmar
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default FamilyRegister;
