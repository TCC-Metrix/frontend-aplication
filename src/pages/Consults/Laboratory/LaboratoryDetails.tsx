import { useNavigate, useParams } from "react-router-dom";
import { useLaboratoryById } from "../../../services/useFetchData";
import ErrorPage from "../../ErrorPage/ErrorPage";
import LoadingPage from "../../LoadingPage/LoadingPage";
import "./LaboratoryDetails.css";
import { Button } from "../../../components";
import { useNavbarStore } from "../../../store";

function LaboratoryDetails() {
	const setActiveNavbar = useNavbarStore((state) => state.setActiveNavbar);
	const { id } = useParams();
	const { data, isLoading, isError } = useLaboratoryById(id);
	const navigate = useNavigate();

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
					<h1 className="detail-title">Laboratório</h1>
					<div className="details-section">
						<div className="detail-area">
							<p className="detail-subtitle">CalCode</p>
							<p className="detail-content">{data?.calCode}</p>
						</div>

						<div className="details-area">
							<p className="detail-subtitle">Descrição</p>
							<p
								className="detail-content"
								style={{ textTransform: "uppercase" }}
							>
								{data?.description}
							</p>
						</div>
					</div>
					<div style={{ marginTop: "50px", width: "fit-content" }}>
						<Button
							className="btn btn-md btn-tertiary"
							onClickFunction={() => {
								sessionStorage.setItem("laboratory", JSON.stringify(data));
								navigate(`/edit/laboratory/${id}`);
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

export default LaboratoryDetails;
