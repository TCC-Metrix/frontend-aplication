import { PiMagnifyingGlassBold } from "react-icons/pi";
import "./ModalSearchInstrument.css";
import { BasicInput, Button, Modal, SelectInput } from "..";
import { FC, useEffect, useState } from "react";
import {
  GeneralInstrument,
  RootFilter,
} from "../../utils/interfaces/Interfaces";
import { useForm } from "react-hook-form";
import instance from "../../services/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { RotatingLines } from "react-loader-spinner";


interface ModalSearchInstrumentProps {
	openModal: boolean,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  setFinalInstruments: React.Dispatch<React.SetStateAction<GeneralInstrument[]>>,
  isReloaded:boolean,
  setIsReloaded: React.Dispatch<React.SetStateAction<boolean>>,
  status?: string
}



const ModalSearchInstrument: FC<ModalSearchInstrumentProps> = ({openModal, setOpenModal, status, setFinalInstruments, isReloaded, setIsReloaded}) => {
  const [selectedInstruments, setSelectedInstruments] = useState<GeneralInstrument[]>([]);
  const [isScroll, setIsScroll] = useState(false)
  const [isShowingInstrumentsFiltered, setIsShowingInstrumentsFiltered] = useState(false)
  const [instruments, setInstruments] = useState<GeneralInstrument[] | undefined>([])



  const headersList = ["código", "descrição", "família", "próx. calibração"];

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm();



  let filterData = {
    column: watch("column"),
    value: watch("value"),
    enabled: false,
  };


  
  const fetchInstrumentsFiltered = async (
    pageParam = 0
  ): Promise<RootFilter> => {
    const response = await instance.get(
      `/instrument/deepfilter?&column=${filterData.column}&value=${filterData.value}&status=${status ? status : "available"}&page=${pageParam}&size=7`
    );
    return response.data;
  };
  
  function calculateNextPage(pageable: RootFilter): number | null {
    if (pageable.pageable.pageNumber < pageable.totalPages) {
      return pageable.pageable.pageNumber + 1;
    }
    
    return null;
  }



  const {
    data: dataFilter,
    refetch,
    fetchNextPage: fetchNextFilteredPage,
    isLoading,
    isFetching,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ["instrumentsFilteredModalSearch"],
    queryFn: ({ pageParam }) => fetchInstrumentsFiltered(pageParam),
    initialPageParam: 0,
    getNextPageParam: (firstPage) => {
      return calculateNextPage(firstPage);
    },
    enabled: filterData.enabled,
  });
  




  useEffect(() => {
    setInstruments(dataFilter?.pages.flatMap((item) => item.content))
    // console.log(instruments)
  }, [dataFilter])

  
  useEffect(() => {
    if(isReloaded){
      reset()
      setSelectedInstruments([])
      setInstruments([])
      setIsReloaded(false)
    }
  }, [isReloaded])
  
  useEffect(() => {
    instruments !== undefined && instruments?.length > 5 ? setIsScroll(true) : setIsScroll(false)
  }, [instruments])
  
  const handleSearchButton = () => {
    setIsShowingInstrumentsFiltered(false)
    filterData.enabled = true;
    refetch();
  };



  const handleRowClick = (item: GeneralInstrument) => {
    handleCheckboxChange({ target: { checked: !selectedInstruments.some(selectedItem => selectedItem.id === item.id) } } as React.ChangeEvent<HTMLInputElement>, item);
  };



  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, item: GeneralInstrument) => {
    const isChecked = event.target.checked;

    // Se o checkbox estiver marcado, adiciona o item à lista selectedInstruments
    if (isChecked) {
      setSelectedInstruments([...selectedInstruments, item]);
    } else {
      // Se o checkbox estiver desmarcado, remove o item da lista selectedInstruments
      const filteredInstruments = selectedInstruments.filter(selectedItem => selectedItem.id !== item.id);
      setSelectedInstruments(filteredInstruments);
    }
  };

  const handleConfirmButton = () => {
    setFinalInstruments(selectedInstruments)
    setOpenModal(false)
  }

  return (
    <Modal
      isOpen={openModal}
      setModalOpen={() => {
        setOpenModal(!openModal);
      }}
    >
      <div>
        <h1 className="header-three">Selecionar instrumento(s)</h1>
        <p className="text-major">Buscar por</p>
      </div>
      <div className="search-modal-area-container">
        <div className="search-modal-area">
          <div className="input-filter">
            <SelectInput
              id="column"
              optionsList={["descrição", "código"]}
              placeholder="Busque por"
              register={register}
            />
            <BasicInput
              inputType="text"
              errors={errors}
              register={register}
              inputName="value"
              inputPlaceholder={`Busque por ${filterData.column === undefined
                ? "descrição"
                : filterData.column === "description"
                  ? "descrição"
                  : "código"
                }`}
              inputStyle="classe-large"
              isRequired={true}
            />
          </div>
          <Button
            className="btn btn-sm btn-tertiary search-btn"
            onClickFunction={handleSubmit(handleSearchButton)}
          >
            <PiMagnifyingGlassBold
              size={20}
              className="search-btn"
              onClick={handleSubmit(handleSearchButton)}
            />
          </Button>
        </div>
      </div>
      {isLoading && (
        <div style={{display: "flex", justifyContent: "center", height: "100%"    }}>
          <RotatingLines
          visible={true}
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          strokeColor="#99aebb"
          width="40"
        />
        </div>
            )}
      { !isLoading && <div className={`modal-content ${isScroll ? "scroll" : ""}`}>

        <table className="table-container ">
          <thead>
            <tr className="first-line ">
              {headersList.map((item, index) => {
                return <th key={index}>{item}</th>;
              })}
              <th></th>
            </tr>
          </thead>
          <tbody>

            {isShowingInstrumentsFiltered && selectedInstruments.length > 0 ? (
              selectedInstruments?.map((item: GeneralInstrument, index) => {
                return (
                  <tr key={index} className="tr-hover" onClick={() => handleRowClick(item)}>
                    <td className="text">
                      <p className="td-text">{item.code}</p>
                    </td>
                    <td>{item.description}</td>
                    <td>{item.familyId.description}</td>
                    <td>
                      {item.nextCalibration ? item.nextCalibration : "-"}
                    </td>
                    <td className="text">
                      <input
                        type="checkbox"
                        id={item.id.toString()}
                        checked={selectedInstruments.some(selectedItem => selectedItem.id === item.id)}
                        onChange={(event) =>
                          handleCheckboxChange(event, item)
                        }
                      />
                    </td>
                  </tr>
                );
              })
            ) : isShowingInstrumentsFiltered && isLoading && (
              <tr>
              <td colSpan={headersList.length + 1} className="text">
                Nenhum instrumento selecionado 
              </td>
            </tr>
            ) }



            {!isShowingInstrumentsFiltered && instruments !== undefined && instruments?.length > 0 ? (
              instruments?.map((item: GeneralInstrument, index) => {
                return (
                  <tr key={index} className="tr-hover" onClick={() => handleRowClick(item)}>
                    <td className="text">
                      <p className="td-text">{item.code}</p>
                    </td>
                    <td>{item.description}</td>
                    <td>{item.familyId.description}</td>
                    <td>
                    {item.nextCalibration ? item.nextCalibration : "-"}
                    </td>
                    <td className="text">
                      <input
                        type="checkbox"
                        id={item.id.toString()}
                        checked={selectedInstruments.some(selectedItem => selectedItem.id === item.id)}
                        onChange={(event) =>
                          handleCheckboxChange(event, item)
                        }
                      />
                    </td>
                  </tr>
                );
              })
            ) : !isShowingInstrumentsFiltered && (
              <tr>
                <td colSpan={headersList.length + 1} className="text">
                  Nenhum instrumento encontrado
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div >}
      {(instruments !== undefined && instruments.length >= 7 && hasNextPage && !isShowingInstrumentsFiltered) && (
      <p className="underline-p" onClick={() => fetchNextFilteredPage()}>carregar mais</p>
      )}
      {isFetching && (
        <div className="loading-area">
          <RotatingLines
            visible={true}
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            strokeColor="#99aebb"
            width="20"

          />

        </div>
      )
      }

      <div className="last-modal-section">
        
      <p className="underline-p" onClick={() => setIsShowingInstrumentsFiltered(!isShowingInstrumentsFiltered)}>{isShowingInstrumentsFiltered ? "Ver todos" : "Ver instrumentos selecionados"}</p>
        <button className="btn btn-secondary" onClick={handleConfirmButton}>
          <span className="text button-font">

          Confirmar
          </span>
        </button>


      </div>
    </Modal >
  );
}

export default ModalSearchInstrument;
