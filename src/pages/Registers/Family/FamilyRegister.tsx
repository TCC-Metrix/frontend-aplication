import { zodResolver } from "@hookform/resolvers/zod";
import { BasicInput, Button, RadioInput } from "../../../components";
import { useNavbarStore } from "../../../store";
import "./FamilyRegister.css";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	name: z
		.string()
		.min(1, "Campo obrigatorio")
		.refine((value) => !/^\s+$/.test(value), {
			message: "Nome não pode conter apenas espaços em branco",
		}),
	calibrationFrequency: z.string().regex(/^\d+$/, "Campo obrigatorio"),
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
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		setError,
		clearErrors,
	} = useForm<FormFields>({ resolver: zodResolver(schema) });

	const onSubmit = (data: FormFields) => {
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
									value="uso"
									id="uso"
									defaultChecked
								/>
								<RadioInput
									title="Inicia a partir da data de calibração"
									name="calibrationFrequency"
									value="calibracao"
									id="calibracao"
								/>
							</div>
						</div>
						<div className="confirm-button-family-register">
							<Button
								onClickFunction={handleSubmit(onSubmit)}
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
