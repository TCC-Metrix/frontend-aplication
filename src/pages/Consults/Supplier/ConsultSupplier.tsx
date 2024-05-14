import { FieldValues, useForm } from "react-hook-form";
import { BasicInput, Button, SelectInput } from "../../../components";
import {
	useAllSuppliers,
	useSupplierFiltered,
} from "../../../services/useFetchData";
import { GeneralSupplier } from "../../../utils/interfaces/Interfaces";
import { RotatingLines } from "react-loader-spinner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNavbarStore } from "../../../store";

function ConsultSupplier() {
	const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);
	const [enable, setEnable] = useState(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	const { data: allSuppliers, isFetching } = useAllSuppliers();
	const navigate = useNavigate();

	const { data, refetch } = useSupplierFiltered(
		{ column: watch("column"), value: watch("value") },
		enable
	);

	const handleSubmitSearch = (data: FieldValues) => {
		if (data.value === "") {
			setEnable(false);
			return;
		}
		setEnable(true);
		refetch();
	};

	const headersList = ["Nome", "CNPJ", ""];

	return (
		<div
			className="background-container-main"
			onClick={() => {
				setActiveNavbar(false);
			}}
		>
			<div className="consult-page">
				<div className="box-shadow-container">
					<div className="box-shadow-container-header">
						<h1 className="header-three">Fornecedores</h1>
						<p className="normal-text">Filtrar por</p>
						<div className="search-area">
							<SelectInput
								placeholder="Buscar por"
								optionsList={["nome", "cnpj"]}
								id="column"
								register={register}
							/>
							<BasicInput
								register={register}
								inputName="value"
								inputPlaceholder={`Busque por ${
									watch("column") === "nome" ? "nome" : "cnpj"
								}`}
								inputStyle="classe-large"
								isRequired={false}
								inputType="large-input"
								errors={errors}
							/>
							<Button
								className="btn btn-sm btn-tertiary"
								onClickFunction={handleSubmit(handleSubmitSearch)}
							>
								{" "}
								Pesquisar{" "}
							</Button>
						</div>
					</div>

					<div className="box-shadow-container-table-area">
						<div className="table-container-main">
							<table className="table-container">
								<thead>
									<tr className="first-line">
										{headersList.map((item, index) => {
											return <th key={index}>{item}</th>;
										})}
									</tr>
								</thead>

								<tbody>
									{!enable &&
										allSuppliers?.map((item: GeneralSupplier, index) => {
											return (
												<tr
													key={index}
													className="tr-hover"
													onClick={() => {
														navigate(`/consult/supplier/${item.id}`);
													}}
												>
													<td className="text">
														<p
															className="td-text"
															style={{ textTransform: "capitalize" }}
														>
															{item.name}
														</p>
													</td>
													<td>{item.cnpj}</td>
													<td style={{ textDecoration: "underline" }}>
														Editar
													</td>
												</tr>
											);
										})}

									{enable &&
										data?.map((item: GeneralSupplier, index) => {
											return (
												<tr
													key={index}
													className="tr-hover"
													onClick={() => {
														navigate(`/consult/supplier/${item.id}`);
													}}
												>
													<td>
														<p className="td-text">{item.name}</p>
													</td>
													<td>{item.cnpj}</td>
													<td style={{ textDecoration: "underline" }}>
														Editar
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</div>
						{isFetching && (
							<div className="loading-area">
								<RotatingLines
									visible={true}
									strokeWidth="5"
									animationDuration="0.75"
									ariaLabel="rotating-lines-loading"
									strokeColor="#99aebb"
									width="50"
								/>
							</div>
						)}
						<div className="load-more-area"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default ConsultSupplier;
