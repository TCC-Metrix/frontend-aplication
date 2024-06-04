import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { useAllCalibrations } from "../../services/useFetchData";
import ErrorPage from "../ErrorPage/ErrorPage";
import LoadingPage from "../LoadingPage/LoadingPage";
import "./Home.css";
import { RotatingLines } from "react-loader-spinner";
import { formatDate } from "../Consults/Instrument/InstrumentDetails";
const Home = () => {
	const { instance } = useMsal();
	const account = instance.getActiveAccount();
	const [isLoadingCalibrationData, setIsLoadingCalibrationData] =
		useState(false);
	const headersList = ["Código", "Nome", "Próx. Calibração"];
	const { data: allCalibrations, isLoading, isError } = useAllCalibrations();
	console.log(allCalibrations);
	console.log(account)

	if (isError || isError) {
		return <ErrorPage />;
	}

	if (isLoading || isLoading) {
		return <LoadingPage />;
	}

	if (allCalibrations === undefined){
		return
	}

	return (
		<main>
			<div className="container-main-home">
				<div>
					<h1 className="header-three">Bem vindo(a), {account?.name?.split(" ").slice(1,2)}!</h1>
					<p className="text">Próximos instrumentos a serem calibrados</p>
				</div>
				<div className="flex-center-table">
					<table className="table-container ">
						<thead>
							<tr className="first-line ">
								{headersList.map((item, index) => {
									return <th key={index}>{item}</th>;
								})}
							</tr>
						</thead>
						<tbody>
							{isLoadingCalibrationData ? (
								<td colSpan={5}>
									<RotatingLines
										visible={true}
										strokeWidth="5"
										animationDuration="0.75"
										ariaLabel="rotating-lines-loading"
										strokeColor="#99aebb"
										width="30"
									/>
								</td>
							) : (
								<>
									{allCalibrations.length > 0 ? (
										allCalibrations.map((item, index) => (
											<tr key={index}>
												<td className="text">
													<p className="td-text">{item.code}</p>
												</td>
												<td>{item.description}</td>
												<td>{formatDate(item.nextCalibration)}</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan={headersList.length + 1} className="text">
												Nenhum instrumento a ser calibrado neste mês.
											</td>
										</tr>
									)}
								</>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
};

export default Home;
