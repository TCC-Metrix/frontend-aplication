import { useNavigate, useParams } from "react-router-dom";
import { useSupplierById } from "../../../services/useFetchData";
import ErrorPage from "../../ErrorPage/ErrorPage";
import LoadingPage from "../../LoadingPage/LoadingPage";
import "./SuppilerDetails.css";
import { Button } from "../../../components";
import { useNavbarStore } from "../../../store";

function SupplierDetails() {
	const { id } = useParams();
	const { data, isLoading, isError } = useSupplierById(id);
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
					<h1 className="detail-title">Fornecedor</h1>
					<div className="details-section">
						<div className="detail-area">
							<p className="detail-subtitle">Nome</p>
							<p className="detail-content">{data?.name}</p>
						</div>

						<div className="details-area">
							<p className="detail-subtitle">CNPJ</p>
							<p
								className="detail-content"
								style={{ textTransform: "uppercase" }}
							>
								{data?.cnpj}
							</p>
						</div>
					</div>
					<div style={{ marginTop: "50px", width: "fit-content" }}>
						<Button
							className="btn btn-md btn-tertiary"
							onClickFunction={() => {
								sessionStorage.setItem("supplier", JSON.stringify(data));
								navigate(`/edit/supplier/${id}`);
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

export default SupplierDetails;
