import { useNavigate, useParams } from "react-router-dom";
import { useFamilyById } from "../../../services/useFetchData";
import ErrorPage from "../../ErrorPage/ErrorPage";
import LoadingPage from "../../LoadingPage/LoadingPage";
import "./ConsultFamily.css";
import { Button } from "../../../components";

function FamilyDetails() {
  const { id } = useParams();

  const { data, isLoading, isError } = useFamilyById(id);
  const navigate = useNavigate()


  if (isError) return <ErrorPage />;
  if (isLoading) return <LoadingPage />;

  return (
    <div className="details-general-container">
      <div className="details-general-box">
        <h1 className="detail-title">Família</h1>
        <div className="details-section">
          <div className="detail-area">
            <p className="detail-subtitle">Descrição</p>
            <p className="detail-content">{data?.description}</p>
          </div>
          <div className="detail-area">
            <p className="detail-subtitle">Código</p>
            <p className="detail-content" style={{textTransform: "uppercase"}}>{data?.code}</p>
          </div>
          <div className="detail-area">
            <p className="detail-subtitle">Frequência de calibração</p>
            <p className="detail-content">
              {data?.calibrationFrequencyInMonths} meses
            </p>
          </div>
        </div>
        <div className="details-section">
          <div className="detail-area">
            <p className="detail-subtitle">Contagem de calibração</p>
            <p className="detail-content">
              {data?.calibrationTimeCounter === "uso"
                ? "Inicia a partir do uso"
                : "Inicia a partir da calibração"}
            </p>
          </div>
        </div>
        <div style={{ marginTop: "50px", width: "fit-content" }}>
          <Button
            className="btn btn-md btn-tertiary"
            onClickFunction={() => {
              sessionStorage.setItem("family", JSON.stringify(data));
              navigate(`/edit/family/${id}`);
            }}
          >
            editar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FamilyDetails;
