import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { BasicInput, Button } from "../../../components";
import { useAllAreas } from "../../../services/useFetchData";
import { Area } from "../../../utils/interfaces/Interfaces";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import "./ConsultArea.css";
import { useUpdateArea } from "../../../services/useMutation";

function ConsultArea() {
  const { data: allAreas, isFetching } = useAllAreas();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    setValue,
     handleSubmit
  } = useForm();

  const [editingAreaId, setEditingAreaId] = useState("");

  const updateArea = useUpdateArea()

  const headersList = ["Nome", ""];

  const handleEditClick = (id: string, name: string) => {
    setEditingAreaId(id);

    setValue("description", name); 
    setValue("id", id)
  };  

  const handleConfirm = (data: FieldValues) => {
    console.log(data)
    updateArea.mutate(data, {
      onSettled: (data) =>  {
        console.log(data)
        window.location.reload()
      }
    })

  }

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
                    <tr key={index}>
                      <td className="text">
                        {editingAreaId === item.id ? (
                          <div
                            style={{ display: "inline-block", width: "60%" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "20px",
                              }}
                            >
                              <BasicInput
                                errors={errors}
                                inputName="description"
                                inputPlaceholder="Nome"
                                inputStyle="medium-input"
                                inputType="text"
                                isRequired
                                register={register}
                              />
                              <button className="confirm-button" onClick={handleSubmit(handleConfirm)}>
                                Confirmar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p
                            className="td-text"
                            style={{ textTransform: "uppercase" }}
                          >
                            {item.description}
                          </p>
                        )}
                      </td>
                      <td
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => handleEditClick(item.id, item.description)}
                      >
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
        </div>
      </div>
    </div>
  );
}

export default ConsultArea;
