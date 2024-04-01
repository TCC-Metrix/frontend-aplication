import NavBar from "../../../components/Navbar/Navbar";
import "./MovSaidaUso.css";
import Table from "../../../components/Table/Table";
import {useState } from "react";
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
  SearchPattern,
} from "../../../utils/interfaces/Interfaces";
import { useGetInstrumentBy } from "../../../services/mutation";
import { SubmitHandler } from "react-hook-form";
import { useAllAreas, useAllEmployees } from "../../../services/queries";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import ErrorPage from "../../../components/ErrorPage/ErrorPage";

export const MovSaidaUso = () => {

  const dropdownOptions = [{ value: "Descrição" }, { value: "Código" }];

  //Sessão de validação de inputs/navbar, se estão em foco ou não
  const [activeShippingInput, setActiveShippingInput] =
    useState<boolean>(false);
  const [activeReceiverInput, setActiveReceiverInput] =
    useState<boolean>(false);
  const [activeAreaInput, setActiveAreaInput] = useState<boolean>(false);
  const [activeInputDropdown, setActiveInputDropdown] =
    useState<boolean>(false);
  const [activeNavbar, setActiveNavbar] = useState<boolean>(true);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [inputError, setInputError] = useState<string>("");


  //Tabela de instrumentos inclusa no modal
  const [tableModalList, setTableModalList] = useState<
    InstrumentToModalTableUseOutput[]
  >([]);

  const [tableMainPage, setTableMainPage] = useState<InstrumentUseOutput[]>([])

  

  const [instrumentSelected, setInstrumentSelected] =
    useState<InstrumentToModalTableUseOutput>({
      code: "",
      description: "",
      family: "",
      calibrationFrequency: 0,
      nextCalibration: "",
      additionalReferences: []
    });

  //Seta se o modal está aberto ou não
  const [openModal, setOpenModal] = useState<boolean>(false);

  //Lista de instrumentos filtrados pelo input do modal
  const [instrumentsFiltered, setInstrumentsFiltered] =
    useState<GeneralInstrument[]>();

  //Opção selecionada do dropdown incluso no input do modal
  const [dropdownSelected, setDropdownSelected] =
    useState<string>("description");

  //Valor setado no input  do modal

  //Valida onde o usuario está clicando, para que feche os dropdowns dos inputs abertos

	function validInputActive(event: React.MouseEvent<HTMLDivElement>) {
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
	}

  //Abre o modal
  const handleModal = () => {
    setOpenModal(true);
  };



  //Hook de api, o qual busca o instrumento por algum parametro
  const getInstrumentBy = useGetInstrumentBy();
  const { data: allEmployees, isLoading, isError } = useAllEmployees();
	const { data: allAreas } = useAllAreas();

  //Função que de fato chama a api, e seta o resultado nos instrumentos filtrados
  const handleSearch: SubmitHandler<SearchPattern> = (data) => {
    getInstrumentBy.mutate(data, {
      onSettled: (data, error) => {
        if (error) {
          console.error("Ocorreu um erro:", error);
          return;
        }
        const instruments = data?.data;

        const instrumentsReloaded =
          instruments &&
          instruments.filter((item) => item.code !== instrumentSelected.code);

          
        setInstrumentsFiltered(instrumentsReloaded);

        if (instrumentsReloaded?.length == 0) {
          setInputError("Instrumento não encontrado.");
        }
      },
    });
  };

  //Função que valida se o input está vazio, e envia os parametros para a função que chama a api caso não esteja
  const handleSearchButton = () => {
    setInputError("")
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


  const resetInstrument = () => {
    setInstrumentSelected({
      code: "",
      description: "",
      family: "",
      calibrationFrequency: 0,
      nextCalibration: "",
      additionalReferences: []
    })
  }

  const resetAllModalData = () => {
    setInputError("")
    setInstrumentsFiltered([])
    setSearchTerm("")
    resetInstrument()
    setTableModalList([])
  }

  const handleAddButton = () => {
    setInputError("")
    if (searchTerm !== "" && instrumentSelected.code !== "") {
      const isCodeAlreadyInList = tableModalList.some(item => item.code === instrumentSelected.code);
      if (!isCodeAlreadyInList){
        setTableModalList([...tableModalList, instrumentSelected]);
        resetInstrument()
        setSearchTerm("");
        setInstrumentsFiltered([]);
      }else{
        setInputError("Instrumento já está adicionado")
        setSearchTerm("")
      }
    } else {
      setInputError("Nenhum instrumento selecionado");
    }
  };

  const handleButtonConfirmModal = () => {
    const repeatedItems: InstrumentToModalTableUseOutput[] = [];
    
    // Verifica se todos os itens em tableModalList são exclusivos em relação a tableMainPage
    tableModalList.forEach((item) => {
      const isUnique = !tableMainPage.some((existingItem) => {
        return existingItem.code === item.code && existingItem.description === item.description;
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
          code: item.code,
          description: item.description,
          additionalReferences: item.additionalReferences
        }))
      ]);
      setOpenModal(false)
      resetAllModalData()
    } else {
      // Trata a situação em que há itens repetidos
      console.log('Há itens repetidos em tableMainPage:', repeatedItems);
    }
  };

	if (isError) {
		return <ErrorPage />;
	}

	if (isLoading) {
		return <LoadingPage />;
	}

  return (
    <main>
      <NavBar activeNavbar={activeNavbar} setActiveNavbar={setActiveNavbar} />
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
              resetAllModalData()
              setOpenModal(!openModal);
            }}
          >
            <div>
              <h1 className="header-three">Selecionar instrumento(s)</h1>
              <p className="text-major">Buscar por</p>
            </div>
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
                />
              </div>
              <Button
                className="btn btn-sm btn-secondary search-btn"
                onClickFunction={handleSearchButton}
              >
                <PiMagnifyingGlassBold size={20} className="search-btn" onClick={handleSearchButton}/>
              </Button>
              <Button
                className="btn-sm btn-secondary"
                onClickFunction={handleAddButton}
              >
                Adicionar
              </Button>
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
                isReferencesPresent = {false}
              />
            </div>
            <div className="last-modal-section">
            <Button onClickFunction={handleButtonConfirmModal} className="btn btn-secondary">
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
            isReferencesPresent = {true}
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
								/>
							</div>
							<div>
								<p className="text-major">Responsavel Recebimento</p>
								<InputSearch
									options={allEmployees}
									placeholder="Busque por código ou nome"
									isActive={activeReceiverInput}
									title="resp-receb"
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
								/>
							</div>
							<div>
								<p className="text-major">Data de Saída</p>
								<DateInput />
							</div>
						</div>
					</section>
          <div>
            <Checkbox text="Instrumento com calibração vencida" />
            <Checkbox text="Instrumento reprovado" />
          </div>
        </div>

    
      </div>
    </main>
  );
};
