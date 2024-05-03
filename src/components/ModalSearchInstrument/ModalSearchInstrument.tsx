import { PiMagnifyingGlassBold } from "react-icons/pi";
import "./ModalSearchInstrument.css";
import { BasicInput, Button, Modal, SelectInput } from "..";
import { useCallback, useState } from "react";
import {
  GeneralInstrument,
  RootFilter,
} from "../../utils/interfaces/Interfaces";
import { useForm } from "react-hook-form";
import instance from "../../services/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { RotatingLines } from "react-loader-spinner";

function ModalSearchInstrument() {
  const [openModal, setOpenModal] = useState(true);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<{
    [key: string]: boolean;
  }>({});

  let instruments;

  const headersList = ["código", "descrição", "família", "próx. calibração"];

  const {
    formState: { errors },
    register,
    handleSubmit,
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
      `/instrument/deepfilter?&column=${filterData.column}&value=${filterData.value}&page=${pageParam}&size=7`
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
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["instrumentsFilteredModalSearch"],
    queryFn: ({ pageParam }) => fetchInstrumentsFiltered(pageParam),
    initialPageParam: 0,
    getNextPageParam: (firstPage) => {
      return calculateNextPage(firstPage);
    },
    enabled: filterData.enabled,
  });

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;

    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 1) {
      console.log("Chegou ao fim do scroll!");
      fetchNextFilteredPage();
    }
  }, []);

  instruments = dataFilter?.pages.flatMap((item) => item.content);

  const handleSearchButton = () => {
    filterData.enabled = true;
    refetch();
  };

  const handleButtonConfirmModal = () => {
    return;
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => {
    const { checked } = event.target;
    setSelectedCheckboxes({ ...selectedCheckboxes, [itemId]: checked });
    console.log(
      `Checkbox com id ${itemId} ${checked ? "selecionado" : "desmarcado"}`
    );
    // Execute ações desejadas quando o checkbox for alterado
  };

  const handleRowClick = (itemId: string) => {
    setSelectedCheckboxes({ ...selectedCheckboxes, [itemId]: !selectedCheckboxes[itemId] });
  };

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
              inputPlaceholder={`Busque por ${
                filterData.column === undefined
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
      <div className="modal-content scroll" onScroll={handleScroll}>
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
            {instruments !== undefined && instruments?.length > 0 ? (
              instruments?.map((item: GeneralInstrument, index) => {
                return (
                  <tr key={index} className="tr-hover" onClick={() => handleRowClick(item.id)}>
                    <td className="text">
                      <p className="td-text">{item.code}</p>
                    </td>
                    <td>{item.description}</td>
                    <td>{item.familyId.description}</td>
                    <td>
                      {item.status === "in use" && "Em uso"}
                      {item.status === "available" && "Disponível"}
                    </td>
                    <td className="text">
                      <input
                        type="checkbox"
                        id={item.id}
                        checked={selectedCheckboxes[item.id] || false}
                        onChange={(event) =>
                          handleCheckboxChange(event, item.id)
                        }
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={headersList.length + 1} className="text">
                  Nenhum instrumento encontrado
                </td>
              </tr>
            )}
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
            width="20"
          />
        </div>
      )}
      <div className="last-modal-section">
        <Button
          onClickFunction={handleButtonConfirmModal}
          className="btn btn-secondary"
        >
          Confirmar
        </Button>
      </div>
    </Modal>
  );
}

export default ModalSearchInstrument;
