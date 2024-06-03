import { useAllCalibrations } from '../../services/useFetchData';
import './Home.css'
const Home = () => {
	const headersList = ["Código", "Nome"];
	const { data: allCalibrations } = useAllCalibrations();
	console.log(allCalibrations);
	
	return (
		<main>
			<div className="container-main-home">
				<div>
					<h1 className="header-three">Bem vindo(a), Jaque!</h1>
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
							<>
								<tr>
									<td className="text">
										<p className="td-text">2133</p>
									</td>
									<td>Description</td>
								</tr>
								<tr>
									<td className="text">
										<p className="td-text">2133</p>
									</td>
									<td>Description</td>
								</tr>
								<tr>
									<td className="text">
										<p className="td-text">2133</p>
									</td>
									<td>Description</td>
								</tr>
							</>
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
};

export default Home;
