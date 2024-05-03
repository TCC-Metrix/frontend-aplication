import { PiMagnifyingGlassBold } from "react-icons/pi";
import "./ModalSearchInstrument.css"
import { BasicInput, BasicInputFilter, Button, Modal, SelectInput, Table } from "..";
import { useState } from "react";
import { InstrumentToModalTableUseOutput, RootFilter, SearchPattern } from "../../utils/interfaces/Interfaces";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useGetInstrumentBy } from "../../services/useMutation";
import instance from "../../services/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";



function ModalSearchInstrument() {
    const [openModal, setOpenModal] = useState(true)
    const [tableModalList, setTableModalList] = useState<InstrumentToModalTableUseOutput[]>([])

    const getInstrumentBy = useGetInstrumentBy(); //busca instrumento por algum parametro


    const {
        formState: { errors },
        register,
        getValues,
        setValue,
        handleSubmit,
        watch
    } = useForm()

    let filterData = {
        column: watch("column"),
        value: watch("value"),
        enabled: false
    }

    
  const fetchInstrumentsFiltered = async (
    pageParam = 0,
  ): Promise<RootFilter> => {

    const response = await instance.get(
      `/instrument/deepfilter?&column=${filterData.column}&value=${filterData.value}&page=${pageParam}&size=4`
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



    const handleSearchButton = (data: FieldValues) => {
        filterData.enabled = true;
        refetch()
        console.log(dataFilter)
        return
    }

    const handleAddButton = () => {
        return
    }

    const handleButtonConfirmModal = () => {
        return
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
                        <SelectInput id="column" optionsList={["código", "descrição"]} placeholder="Busque por" register={register} />
                        <BasicInput inputType="text"  errors={errors}  register={register}  inputName="value" inputPlaceholder="Busque por isso" inputStyle="classe-large" isRequired={false} />
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
                    <Button
                        className="btn-sm btn-tertiary"
                        onClickFunction={handleAddButton}
                    >
                        Adicionar
                    </Button>
                </div>
            </div>
            <div className="modal-content">
                <Table
                    tableContent={tableModalList}
                    tableHeaders={[
                        "Código",
                        "Descrição",
                        "Família",
                        "Próx. Calibração",
                        "Freq. Calibração",
                    ]}
                    setTableContent={setTableModalList}
                    isReferencesPresent={false}
                />
            </div>
            <div className="last-modal-section">
                <Button
                    onClickFunction={handleButtonConfirmModal}
                    className="btn btn-secondary"
                >
                    Confirmar
                </Button>
            </div>
        </Modal>
    )
}

export default ModalSearchInstrument