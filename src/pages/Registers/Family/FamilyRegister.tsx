import { zodResolver } from "@hookform/resolvers/zod";
import { BasicInput, Button, RadioInput } from "../../../components";
import { useNavbarStore, usePopupStore } from "../../../store";
import "./FamilyRegister.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { FamilyRegisterPost } from "../../../utils/interfaces/Interfaces";
import { usePostFamilyRegister } from "../../../services/useMutation";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";

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
	const [isLoadingPostFamilyRegister, setIsLoadingPostFamilyRegister] =
		useState<boolean>(false);
	const [calibrationTimeCounter, setCalibrationTimeCounter] = useState("uso");
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

	const postFamilyMutation = usePostFamilyRegister(); //posta a saida para uso

	const handlePostFamilyRegister: SubmitHandler<FamilyRegisterPost> = (
		data
	) => {
		setIsLoadingPostFamilyRegister(true);
		postFamilyMutation.mutate(data, {
			onSettled: (data, error) => {
				if (error) {
					setTimeout(() => {
						setIsLoadingPostFamilyRegister(false);
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
					setIsLoadingPostFamilyRegister(false);
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

	const handleConfirmFamilyRegister = (dataApi: z.infer<typeof schema>) => {
		setIsLoadingPostFamilyRegister(true);
		setTimeout(() => {
			setIsLoadingPostFamilyRegister(false);

			const data = {
				code: dataApi.familyCode,
				description: dataApi.name,
				calibrationFrequencyInMonths: dataApi.calibrationFrequency,
				calibrationTimeCounter: calibrationTimeCounter,
			};

			handlePostFamilyRegister(data);
		}, 1000);
	};

	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCalibrationTimeCounter(event.target.value);
	};

	return (
		<div
			className="background-container-main"
			onClick={() => {
				setActiveNavbar(false);
			}}
		>
			<div className="main-container-family-register-page">
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
									value="uso" // use
									id="uso"
									onChange={handleRadioChange}
									defaultChecked
								/>
								<RadioInput
									title="Inicia a partir da data de calibração"
									name="calibrationFrequency"
									value="calibration" //calibratio
									id="calibracao"
									onChange={handleRadioChange}
								/>
							</div>
						</div>
						<div className="confirm-button-family-register">
							<Button
								onClickFunction={handleSubmit(handleConfirmFamilyRegister)}
								className="btn btn-secondary"
							>
								{isLoadingPostFamilyRegister ? (
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
					</form>
				</div>
			</div>
		</div>
	);
};

export default FamilyRegister;
