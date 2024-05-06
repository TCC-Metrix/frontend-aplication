import { FieldValues, useForm } from "react-hook-form";
import { SelectInput, BasicInput, Button } from "../../../components";
import "./ConsultInstrument.css";
import LoadingPage from "../../LoadingPage/LoadingPage";
import ErrorPage from "../../ErrorPage/ErrorPage";
import { GeneralInstrument } from "../../../utils/interfaces/Interfaces";
import { useInfiniteQuery } from "@tanstack/react-query";
import instance from "../../../services/axiosInstance";
import { RootFilter } from "../../../utils/interfaces/Interfaces";
import { RotatingLines } from "react-loader-spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGeneralDataStore } from "../../../store";


function ConsultInstrument() {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();
  const navigate = useNavigate()

  let filterData = {
    status: watch("status"),
    situation: watch("situation"),
    column: watch("column"),
    value: watch("value"),
    sortedBy: watch("sortedBy"),
    enabled: false,
  };

  const setGeneralDataInstrument = useGeneralDataStore((state) => state.setInstrument);

  //fetchs function
  const fetchInstruments = async (pageParam = 0): Promise<RootFilter> => {
    const response = await instance.get(
      `/instrument/all?page=${pageParam}&size=15&sortBy=acquisitionDate&sortDirection=desc`
    );
    return response.data;
  };

  const fetchInstrumentsFiltered = async (
    pageParam = 0
  ): Promise<RootFilter> => {
    const response = await instance.get(
      `/instrument/deepfilter?status=${
        filterData.status === "todos" ? "" : filterData.status
      }&situation=${
        filterData.situation === "todos" ? "" : filterData.situation
      }&column=${filterData.column}&value=${filterData.value}&sortedBy=${
        filterData.sortedBy
      }&page=${pageParam}&size=15`
    );
    return response.data;
  };

  function calculateNextPage(pageable: RootFilter): number | null {
    if (pageable.pageable.pageNumber < pageable.totalPages) {
      return pageable.pageable.pageNumber + 1;
    }

    return null;
  }

  //queryFunctions

  const {
    data: dataFilter,
    refetch,
    fetchNextPage: fetchNextFilteredPage,
    hasNextPage: hasNextFilteredPage,
  } = useInfiniteQuery({
    queryKey: ["instrumentsFiltered"],
    queryFn: ({ pageParam }) => fetchInstrumentsFiltered(pageParam),
    initialPageParam: 0,
    getNextPageParam: (firstPage) => {
      return calculateNextPage(firstPage);
    },
    enabled: filterData.enabled,
  });

  const {
    fetchNextPage,
    isFetching,
    isLoading,
    hasNextPage,
    isError,
    data,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["instruments"],
    queryFn: ({ pageParam }) => fetchInstruments(pageParam),
    refetchOnWindowFocus: false,
    initialPageParam: 0,
    getNextPageParam: (firstPage) => {
      return calculateNextPage(firstPage);
    },
  });

  const instruments = data?.pages.flatMap((item) => item.content);
  let instrumentsFiltered = dataFilter?.pages.flatMap((item) => item.content);
  useEffect(() => {
    console.log("instrumentsFiltered: ", instrumentsFiltered);
  }, [instrumentsFiltered]);

  const headersList = [
    "Código",
    "Descrição",
    "Família",
    "Status",
    "Data de aquisição",
  ];

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

 
  

  const handleSubmitSearch = async (data: FieldValues) => {
    if (
      data.status === "todos" &&
      data.situation === "todos" &&
      data.sortedBy === "desc" &&
      data.value.length === 0
    ) {
      instrumentsFiltered = instruments;
    }
    filterData.enabled = true;
    refetch();
  };

  const formatDate = (date: string) => {
    // Separe o ano, mês e dia
    const [ano, mes, dia] = date.split("-");
    // Retorne a data no formato DD/MM/YYYY
    return `${dia}/${mes}/${ano}`;
  };






  return (
    <div className="consult-page">
      <div className="box-shadow-container">
        <div className="box-shadow-container-header">
          <h1 className="header-three">Instrumentos</h1>
          <p className="normal-text">Filtrar por</p>
          <div className="search-area">
            <SelectInput
              placeholder="Buscar por"
              optionsList={["descrição", "família", "código"]}
              id="column"
              register={register}
            />
            <BasicInput
              register={register}
              inputName="value"
              inputPlaceholder="Busque por isso "
              inputStyle="large-input"
              isRequired={false}
              inputType="text"
              errors={errors}
            />

            <SelectInput
              id="situation"
              optionsList={["todos", "ativo", "inativo"]}
              register={register}
              placeholder="situação"
            />
            <SelectInput
              id="status"
              optionsList={[
                "todos",
                "em uso",
                "calibração externa",
                "disponível",
              ]}
              register={register}
              placeholder="status"
            />
            <SelectInput
              id="sortedBy"
              optionsList={["mais recente", "mais antigo"]}
              register={register}
              placeholder="data de aquisição"
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
                {instrumentsFiltered === undefined && isSuccess
                  ? instruments?.map((item: GeneralInstrument, index) => {
                      return (
                        <tr key={index} className="tr-hover" onClick={() => {
                          setGeneralDataInstrument(item)
                          navigate(`/consult/instrument/${item.id}`)
                          }}>
                          <td className="text">
                            <p className="td-text">{item.code}</p>
                          </td>
                          <td>{item.description}</td>
                          <td>{item.familyId.description}</td>
                          <td>
                            {item.status === "in use" && "Em uso"}
                            {item.status === "available" && "Disponível"}
                          </td>
                          <td>{formatDate(item.acquisitionDate)}</td>
                        </tr>
                      );
                    })
                  : instrumentsFiltered?.map((item, index) => {
                      return (
                        <tr key={index} className="tr-hover" onClick={() => navigate(`/consult/instrument/${item.id}`)}>
                          <td className="text">
                            <p className="td-text">{item.code}</p>
                          </td>
                          <td>{item.description}</td>
                          <td>{item.familyId.description}</td>
                          <td>
                            {item.status === "in use" && "Em uso"}
                            {item.status === "available" && "Disponível"}
                          </td>
                          <td>{formatDate(item.acquisitionDate)}</td>
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
          <div className="load-more-area">
            {(hasNextPage === true && instrumentsFiltered === undefined && instruments !== undefined && instruments.length >= 15) ||
            (hasNextFilteredPage === true && instrumentsFiltered !== undefined && instrumentsFiltered.length >= 15) ? (
              <Button
                className="btn btn-md btn-secondary"
                onClickFunction={() =>
                  instrumentsFiltered !== undefined
                    ? fetchNextFilteredPage()
                    : fetchNextPage()
                }
              >
                ver mais
              </Button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultInstrument;
