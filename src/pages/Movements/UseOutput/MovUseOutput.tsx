import "./MovUseOutput.css";
import Table from "../../../components/Table/Table";
import { useState } from "react";
import InputSearch from "../../../components/InputSearch/InputSearch";
import Checkbox from "../../../components/Checkbox/Checkbox";
import Button from "../../../components/Buttons/Button";
import Modal from "../../../components/Modal/Modal";
import InputSearchFilter from "../../../components/InputSearchFilter/InputSearchFilter";
import DateInput from "../../../components/DateInput/DateInput";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import {
  GeneralInstrument,
  InstrumentToModalTableUseOutput,
  InstrumentUseOutput,
  OutputUsePost,
  SearchPattern,
} from "../../../utils/interfaces/Interfaces";
import {
  useGetInstrumentBy,
  usePostOutputUse,
} from "../../../services/useMutation";
import { SubmitHandler } from "react-hook-form";
import { useAllAreas, useAllEmployees } from "../../../services/useFetchData";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import ErrorPage from "../../ErrorPage/ErrorPage";
import useStore from "../../../store/store";
import { RotatingLines } from "react-loader-spinner";

export const MoveUseOutput = () => {
  // Estados para controlar o estado dos componentes
  const [activeShippingInput, setActiveShippingInput] =
    useState<boolean>(false);
  const [activeReceiverInput, setActiveReceiverInput] =
    useState<boolean>(false);
  const [activeAreaInput, setActiveAreaInput] = useState<boolean>(false);
  const [activeInputDropdown, setActiveInputDropdown] =
    useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");
  const [isLoadingInput, setIsLoadingInput] = useState<boolean>(false);
  const [isLoadingPostUseOutput, setIsLoadingPostUseOutput] =
    useState<boolean>(false);
  const [tableModalList, setTableModalList] = useState<
    InstrumentToModalTableUseOutput[]
  >([]);
  const [inputErrors, setInputErrors] = useState({});
  
  const [shippingResponsibleSelected, setShippingResponsibleSelected] =
    useState<string>("");
  const [receivingResponsibleSelected, setReceivingResponsibleSelected] =
    useState<string>("");
  const [areaSelected, setAreaSelected] = useState<string>("");
  const [dateSelected, setDateSelected] = useState<string>("");
  const [tableMainPage, setTableMainPage] = useState<InstrumentUseOutput[]>([]);
  const [instrumentSelected, setInstrumentSelected] =
    useState<InstrumentToModalTableUseOutput>({
      id: "",
      code: "",
      description: "",
      family: "",
      calibrationFrequency: 0,
      nextCalibration: "",
      additionalReferences: [],
    });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [instrumentsFiltered, setInstrumentsFiltered] =
    useState<GeneralInstrument[]>();
  const [dropdownSelected, setDropdownSelected] =
    useState<string>("description");

  //Variáveis controladas no contexto da aplicação
  const setActiveNavbar = useStore((state) => state.setActiveNavbar);
  const setPopupType = useStore((state) => state.setPopupType);
  const setPopupBody = useStore((state) => state.setPopupBody);
  const setPopupTitle = useStore((state) => state.setPopupTitle);
  const setIsPopupActive = useStore((state) => state.setIsPopupActive);

  const dropdownOptions = [{ value: "Descrição" }, { value: "Código" }];

  //Valida onde o usuario está clicando, para que feche os dropdowns dos inputs abertos
  const validInputActive = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    const name = target.getAttribute("name");
    setActiveAreaInput(name === "area");
    setActiveShippingInput(name === "resp-entrega");
    setActiveReceiverInput(name === "resp-receb");
    setActiveNavbar(false);

    //Se o usuário clicar no botão de search, então ele seta o dropdown do modal como true, para abrir ao pesquisar algo
    if (target.classList.contains("search-btn")) {
      setActiveInputDropdown(true);
    } else {
      setActiveInputDropdown(name === "search-instrument");
    }
  };

  //Abre o modal
  const handleModal = () => {
    // setIsPopupActive(true);
    setOpenModal(true);
  };

  //Hooks de api
  const getInstrumentBy = useGetInstrumentBy(); //busca instrumento por algum parametro
  const postOutputMutation = usePostOutputUse(); //posta a saida para uso
  const { data: allEmployees, isLoading, isError } = useAllEmployees(); //busca todos os funcionarios
  const { data: allAreas } = useAllAreas(); //busca todas as áreas

  //Função que de fato chama a api, e seta o resultado nos instrumentos filtrados
  const handleSearch: SubmitHandler<SearchPattern> = (data) => {
    setIsLoadingInput(true);
    getInstrumentBy.mutate(data, {
      onSettled: (data, error) => {
        if (error) {
          console.error("Ocorreu um erro:", error);
          setIsLoadingInput(false);
          return;
        }
        const instruments = data?.data;

        const instrumentsReloaded =
          instruments &&
          instruments.filter((item) => item.code !== instrumentSelected.code);

        setInstrumentsFiltered(instrumentsReloaded);
        setIsLoadingInput(false);

        if (instrumentsReloaded?.length == 0) {
          setInputError("Instrumento não encontrado.");
        }
      },
    });
  };

  //Função que valida se o input está vazio, e envia os parametros para a função que chama a api caso não esteja
  const handleSearchButton = () => {
    setInputError("");
    setActiveInputDropdown(true);
    if (searchTerm !== "") {
      handleSearch({
        column: dropdownSelected,
        value: searchTerm,
        secondColumn: "status",
        secondValue: "disponivel",
      });
    } else {
      setInstrumentsFiltered([]);
      setInputError("Campo não pode ser vazio");
    }
  };

  //Adiciona instrumento na lista do modal
  const handleAddButton = () => {
    setInputError("");
    if (searchTerm !== "" && instrumentSelected.code !== "") {
      const isCodeAlreadyInList = tableModalList.some(
        (item) => item.code === instrumentSelected.code
      );

      const isCodeAlreadyInMainList = tableMainPage.some(
        (item) => item.code === instrumentSelected.code
      );

      if (!isCodeAlreadyInList && !isCodeAlreadyInMainList) {
        setTableModalList([...tableModalList, instrumentSelected]);
        resetInstrumentSelected();
        setSearchTerm("");
        setInstrumentsFiltered([]);
      } else {
        setInputError("Instrumento já adicionado");
        setSearchTerm("");
      }
    } else {
      setInputError("Nenhum instrumento selecionado");
    }
  };

  //Adiciona os instrumentos do modal na lista principal
  const handleButtonConfirmModal = () => {
    const repeatedItems: InstrumentToModalTableUseOutput[] = [];

    // Verifica se todos os itens em tableModalList são exclusivos em relação a tableMainPage
    tableModalList.forEach((item) => {
      const isUnique = !tableMainPage.some((existingItem) => {
        return (
          existingItem.code === item.code &&
          existingItem.description === item.description
        );
      });

      if (!isUnique) {
        repeatedItems.push(item);
      }
    });

    if (repeatedItems.length === 0) {
      // Adiciona todos os itens de tableModalList a tableMainPage
      setTableMainPage((prevTableMainPage) => [
        ...prevTableMainPage,
        ...tableModalList.map((item) => ({
          id: item.id,
          code: item.code,
          description: item.description,
          additionalReferences: item.additionalReferences,
        })),
      ]);
      setOpenModal(false);
      console.log("fechando");
      resetAllModalData();
    } else {
      // Trata a situação em que há itens repetidos
      console.log("Há itens repetidos em tableMainPage:", repeatedItems);
    }
  };

  //faz a mutação pra api
  const handlePostUseOutput: SubmitHandler<OutputUsePost> = (data) => {
    setIsLoadingPostUseOutput(true);
    postOutputMutation.mutate(data, {
      onSettled: (data, error) => {
        if (error) {
          setTimeout(() => {
            setIsLoadingPostUseOutput(false);
            console.error("Ocorreu um erro:", error);
            
          }, 1000);
          return;
        } else {
          console.log(data);
          setIsLoadingPostUseOutput(false);
          
        }
      },
    });
  };

  //Busca os ids dos instrumentos dentro da lista de instrumentos e chama função que envia à api
  const handleConfirmUseOutput = () => {
    const idsList = tableMainPage.map((item) => item.id);

    if (idsList.length == 0) {
      createPopup("error", "Nenhum instrumento selecionado", "Selecione ao menos um instrumento para dar saída.")
      return
    }
    const data = {
      instrumentIds: idsList,
      shippingResponsible: shippingResponsibleSelected,
      receivingResponsible: receivingResponsibleSelected,
      area: areaSelected,
      outputDate: dateSelected,
    };

    handlePostUseOutput(data);
  };

  const handleInputError = (inputName: string, errorMessage: string) => {
    setInputErrors(prevErrors => ({
      ...prevErrors,
      [inputName]: errorMessage
    }));
  };

  const clearInputError = (inputTitle: string) => {
    setInputErrors(prevstate => ({
      ...prevstate,
      [inputTitle]: ""
    }))
  }

  const createPopup = (
    type: string,
    title: string,
    body: string
  ) => {
    setIsPopupActive(true);
    setPopupType(type);
    setPopupTitle(title);
    setPopupBody(body);
  };

  const resetInstrumentSelected = () => {
    setInstrumentSelected({
      id: "",
      code: "",
      description: "",
      family: "",
      calibrationFrequency: 0,
      nextCalibration: "",
      additionalReferences: [],
    });
  };

  const resetAllModalData = () => {
    setInputError("");
    setInstrumentsFiltered([]);
    setSearchTerm("");
    resetInstrumentSelected();
    setTableModalList([]);
  };

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <main>
      <div className="container-main" onClick={(e) => validInputActive(e)}>
        <div>
          <h1 className="header-three">Saída para uso</h1>
          <p className="text">Instrumento</p>
          <Button className="btn btn-tertiary " onClickFunction={handleModal}>
            + Adicionar
          </Button>
          <Modal
            isOpen={openModal}
            setModalOpen={() => {
              resetAllModalData();
              // setIsPopupActive(false);
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
                  <InputSearchFilter
                    dropdownOptions={dropdownOptions} //Opções que aparecerão no dropdown
                    instrumentsFiltered={instrumentsFiltered} //Instrumentos filtrados
                    setInstrumentsFiltered={setInstrumentsFiltered}
                    isActive={activeInputDropdown} // Define de está ativo ou inativo o dropdown de instrumentos
                    title="search-instrument"
                    setDropdownSelected={setDropdownSelected} //Seta a opção selecionada do dropdown de opções
                    setInstrumentSelected={setInstrumentSelected}
                    instrumentSelected={instrumentSelected}
                    tableModalList={tableModalList}
                    inputError={inputError}
                    setInputError={setInputError}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    isLoadingInput={isLoadingInput}
                  />
                </div>
                <Button
                  className="btn btn-sm btn-tertiary search-btn"
                  onClickFunction={handleSearchButton}
                >
                  <PiMagnifyingGlassBold
                    size={20}
                    className="search-btn"
                    onClick={handleSearchButton}
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
        </div>
        <div className="flex-center-table">
          <Table
            tableContent={tableMainPage}
            tableHeaders={["Codigo", "Descrição", "Referência Adicional"]}
            setTableContent={setTableMainPage}
            isReferencesPresent={true}
          />
        </div>
        <div className="form-section-container">
          <section className="mov-info">
            <div className="form-column">
              <div>
                <p className="text-major">Responsável entrega</p>
                <InputSearch
                  options={allEmployees}
                  placeholder="Busque por código ou nome"
                  isActive={activeShippingInput}
                  title="resp-entrega"
                  setValueSelected={setShippingResponsibleSelected}
                  setInputGroupError={handleInputError}
                  inputGroupError={inputErrors}
                  clearInputError={clearInputError}
                  isInputActive={true}
                  />
              </div>
              <div>
                <p className="text-major">Responsavel Recebimento</p>
                <InputSearch
                  options={allEmployees}
                  placeholder="Busque por código ou nome"
                  isActive={activeReceiverInput}
                  title="resp-receb"
                  setValueSelected={setReceivingResponsibleSelected}
                  setInputGroupError={handleInputError}
                  inputGroupError={inputErrors}
                  clearInputError={clearInputError}
                  isInputActive={areaSelected !== "" ? false : true}
                />
              </div>
            </div>
            <div className="form-column">
              <div>
                <p className="text-major">Área</p>
                <InputSearch
                  options={allAreas}
                  placeholder="Busque por descrição"
                  isActive={activeAreaInput}
                  title="area"
                  setValueSelected={setAreaSelected}
                  setInputGroupError={handleInputError}
                  inputGroupError={inputErrors}
                  clearInputError={clearInputError}
                  isInputActive={receivingResponsibleSelected !== "" ? false : true}
                />
              </div>
              <div>
                <p className="text-major">Data de Saída</p>
                <DateInput setValueSelected={setDateSelected} />
              </div>
            </div>
          </section>
          <div>
            <Checkbox text="Instrumento com calibração vencida" id="calib" />
            <Checkbox text="Instrumento reprovado" id="rep" />
          </div>
        </div>
        <div className="m-auto btn-session-confirm">
          <Button
            className="btn btn-secondary btn-lg"
            onClickFunction={handleConfirmUseOutput}
          >
            {isLoadingPostUseOutput ? (
              <RotatingLines
                visible={true}
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                strokeColor="#fff"
                width="20"
              />
            ) : (
              <>Confirmar</>
            )}
          </Button>
        </div>
      </div>
    </main>
  );
};