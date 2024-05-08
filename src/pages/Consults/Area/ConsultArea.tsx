import {
    useAllAreas,
} from "../../../services/useFetchData";
import { Area, Family } from "../../../utils/interfaces/Interfaces";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function ConsultArea() {


  const { data: allAreas, isFetching } = useAllAreas();
  const navigate = useNavigate()

  




  const headersList = [
    "Nome",
  ];

  return (
    <div className="consult-page">
      <div className="box-shadow-container">
        <div className="box-shadow-container-header">
          <h1 className="header-three">Áreas</h1>
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
                
                  {allAreas?.map((item: Area, index) => {
                    return (
                      <tr
                        key={index}
                        className="tr-hover"
                        onClick={() => {
                          navigate(`/consult/family/${item.id}`);
                        }}
                      >
                        <td className="text">
                          <p className="td-text" style={{textTransform: "uppercase"}}>{item.description}</p>
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
          
        </div>
      </div>
    </div>
  );
}

export default ConsultArea;
