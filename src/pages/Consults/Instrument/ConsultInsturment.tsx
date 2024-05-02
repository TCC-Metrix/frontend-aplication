import { useForm } from "react-hook-form";
import { SelectInput } from "../../../components";
import { BasicInput } from "../../../components";
import "./ConsultInstrument.css";
import { useAllInstruments } from "../../../services/useFetchData";
import LoadingPage from "../../LoadingPage/LoadingPage";
import ErrorPage from "../../ErrorPage/ErrorPage";

function ConsultInsturment() {
	const {
		register,
		formState: { errors },
	} = useForm();

	const headersList = ["Código", "Descrição", "Família", "Status"];

	const {
		data: allInstruments,
		isLoading: isLoadingInstruments,
		isError: isErrorInstruments,
	} = useAllInstruments();

	if (isLoadingInstruments) {
		return <LoadingPage />;
	}

	if (isErrorInstruments) {
		return <ErrorPage />;
	}

	return (
		<div className="consult-page">
			<div className="box-shadow-container">
				<div className="box-shadow-container-header">
					<h1 className="header-three">Pesquisar instrumento</h1>

					<div className="box-shadow-container-inputs-area">
						<SelectInput
							placeholder="Buscar por"
							optionsList={[
								"descrição",
								"situação",
								"status",
								"família",
								"código",
							]}
							id="searchFor"
							register={register}
						/>
						<BasicInput
							register={register}
							inputName="searchTerm"
							inputPlaceholder="Busque por isso "
							inputStyle="classe-large"
							isRequired={true}
							inputType="text"
							errors={errors}
						/>
					</div>
				</div>
				<div className="box-shadow-container-table-area">
					<div className="table-container-main">
						<table className="table-container">
							<thead>
								<tr className="first-line">
									{headersList.map((item) => {
										return <th>{item}</th>;
									})}
								</tr>
							</thead>
							<tbody>
								{allInstruments?.map((item) => {
									return (
										<tr className="tr-hover">
											<td className="text">
												<p className="td-text">{item.code}</p>
											</td>
											<td>{item.description}</td>
											<td>{item.familyId.description}</td>
											<td>
												{item.status === "in use" && "Em uso"}
												{item.status === "available" && "Disponível"}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ConsultInsturment;
