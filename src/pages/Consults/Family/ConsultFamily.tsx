import { FieldValues, useForm } from "react-hook-form";
import { BasicInput, Button, SelectInput } from "../../../components";
import {
  useAllFamilies,
  useFamilyFiltered,
} from "../../../services/useFetchData";
import { Family } from "../../../utils/interfaces/Interfaces";
import { RotatingLines } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ConsultFamily() {
  const [enable, setEnable] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue
  } = useForm();

  const column = watch("column")

  useEffect(() => {
    setValue("value", "")
  }, [column])

  const { data: allFamilies, isFetching } = useAllFamilies();
  const navigate = useNavigate()

  const { data, refetch } = useFamilyFiltered(
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

  const headersList = [
    "Nome",
    "Freq. Calibração",
    "Código"
  ];

  return (
    <div className="consult-page">
      <div className="box-shadow-container">
        <div className="box-shadow-container-header">
          <h1 className="header-three">Instrumentos</h1>
          <p className="normal-text">Filtrar por</p>
          <div className="search-area">
            <SelectInput
              placeholder="Buscar por"
              optionsList={["descrição", "código"]}
              id="column"
              register={register}
            />
            <BasicInput
              register={register}
              inputName="value"
              inputPlaceholder={`Busque por ${
                watch("column") === "code" ? "código" : "descrição"
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
                  allFamilies?.map((item: Family, index) => {
                    return (
                      <tr
                        key={index}
                        className="tr-hover"
                        onClick={() => {
                          navigate(`/consult/family/${item.id}`);
                        }}
                      >
                        <td className="text">
                          <p className="td-text" style={{textTransform: "capitalize"}}>{item.description}</p>
                        </td>
                        <td>{item.calibrationFrequencyInMonths}</td>
                        <td style={{textTransform: "uppercase"}}> {item.code}</td>
                      </tr>
                    );
                  })}

                {enable &&
                  data?.map((item: Family, index) => {
                    return (
                      <tr
                        key={index}
                        className="tr-hover"
                        onClick={() => {
                            navigate(`/consult/family/${item.id}`);
                        }}
                      >
                        <td className="text">
                          <p className="td-text">{item.description}</p>
                        </td>
                        <td>{item.calibrationFrequencyInMonths}</td>
                        <td style={{textTransform: "uppercase"}}>{item.code}</td>
                        
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
  );
}

export default ConsultFamily;
