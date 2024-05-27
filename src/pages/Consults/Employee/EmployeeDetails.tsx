import { useNavigate, useParams } from "react-router-dom";
import { useEmployeeById } from "../../../services/useFetchData";
import ErrorPage from "../../ErrorPage/ErrorPage";
import LoadingPage from "../../LoadingPage/LoadingPage";
import "./ConsultEmployee.css";
import { Button } from "../../../components";
import { useNavbarStore } from "../../../store";

function EmployeeDetails() {
	const { id } = useParams();
	const { data, isLoading, isError } = useEmployeeById(id);
	const navigate = useNavigate();
	const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);

	if (isError) return <ErrorPage />;
	if (isLoading) return <LoadingPage />;

	return (
		<div
			className="background-container-main"
			onClick={() => {
				setActiveNavbar(false);
			}}
		>
			<div className="details-general-container">
				<div className="details-general-box">
					<h1 className="detail-title">Funcionário</h1>
					<div className="details-section">
						<div className="detail-area">
							<p className="detail-subtitle">Nome</p>
							<p className="detail-content">{data?.name}</p>
						</div>

						<div className="details-area">
							<p className="detail-subtitle">Setor</p>
							<p
								className="detail-content"
								style={{ textTransform: "uppercase" }}
							>
								{data?.sector}
							</p>
						</div>

						<div className="details-area">
							<p className="detail-subtitle">Email</p>
							<p className="detail-content">{data?.email}</p>
						</div>
					</div>
					<div style={{ marginTop: "50px", width: "fit-content" }}>
						<Button
							className="btn btn-md btn-tertiary"
							onClickFunction={() => {
								sessionStorage.setItem("employee", JSON.stringify(data));
								navigate(`/edit/employee/${id}`);
							}}
						>
							editar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EmployeeDetails;
