import NavBar from "../../../components/Navbar/Navbar";
import "./MovSaidaUso.css";
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
  ModalInstrument,
  SearchPattern,
} from "../../../utils/interfaces/Interfaces";
import { useGetInstrumentBy } from "../../../services/mutation";
import { SubmitHandler } from "react-hook-form";


export const MovSaidaUso = () => {
  const options = [
    { label: "Option 1" },
    { label: "Option 2" },
    { label: "Option 3" },
    { label: "Option 4" },
    { label: "Option 5" },
    { label: "Option 3" },
    { label: "Option 4" },
    { label: "Option 5" },
  ];

  const filtersOptions = [
    { value: "Descrição" },
    { value: "Codigo" },
  ];

  const [activeEntrega, setActiveEntrega] = useState<boolean>(false);
  const [activeReceb, setActiveReceb] = useState<boolean>(false);
  const [activeArea, setActiveArea] = useState<boolean>(false);
  const [activeInputDropdown, setActiveInputDropdown] = useState<boolean>(false);
  const [activeNavbar, setActiveNavbar] = useState<boolean>(true);
  const [tableModalList, setTableModalList] = useState<ModalInstrument[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [instrumentsFiltered, setInstrumentsFiltered] = useState<GeneralInstrument[]>()
  const [dropdownSelected, setDropdownSelected] =
    useState<string>("description");
  const [inputSearchValue, setInputSearchValue] = useState<string>("");


  function validInputActive(event: any) {
    const name = event.target.name;
    setActiveArea(name === "area");
    setActiveEntrega(name === "resp-entrega");
    setActiveReceb(name === "resp-receb");
    if(event.target.classList.contains('search-btn')){
      setActiveInputDropdown(true)
    }else{
      setActiveInputDropdown(name === "search-instrument");
    }
    setActiveNavbar(false);
  }

  const handleAddButtonClick = () => {
    setOpenModal(true);
  };

  const itemRecebido = [
    {
      code: "1214-12",
      description: "Paquimetro Universal",
      references: ["50mm/0,10", "50mm/0,10"],
    },
  ];

  const addItemToTableModalList = (instrument: ModalInstrument) => {
    setTableModalList([...tableModalList, instrument]);
  };

  const getInstrumentBy = useGetInstrumentBy();

  const handleSearch: SubmitHandler<SearchPattern> = (data) => {
    getInstrumentBy.mutate(data, {
      onSettled: (data, error) => {
        if (error) {
          console.error("Ocorreu um erro:", error);
          return;
        }
        setInstrumentsFiltered(data?.data);
        console.log("Mutação concluída:", data?.data);
      },
    });
  };

  const handleSearchButton = () => {
    setActiveInputDropdown(true);
    console.log("is active?", activeInputDropdown)

    if (inputSearchValue !== "") {
      handleSearch({
        column: dropdownSelected,
        value: inputSearchValue,
        secondColumn: "status",
        secondValue: "disponivel",
      });
    } else{
      setInstrumentsFiltered([])
    }
  };


  return (
    <main>
      <NavBar activeNavbar={activeNavbar} setActiveNavbar={setActiveNavbar} />
      <div className="container-main" onClick={(e) => validInputActive(e)}>
        <div>
          <h1 className="header-three">Saída para uso</h1>
          <p className="text">Instrumento</p>
          <Button
            className="btn btn-tertiary "
            onClickFunction={handleAddButtonClick}
          >
            + Adicionar
          </Button>
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
            <div className="search-modal-area">
              <div className="input-filter">
                <InputSearchFilter
                  dropdownOptions={filtersOptions}
                  instrumentsFiltered={instrumentsFiltered}
                  setInstrumentsFiltered={setInstrumentsFiltered}
                  isActive={activeInputDropdown}
                  title="search-instrument"
                  setDropdownSelected={setDropdownSelected}
                  setInputSearchValue={setInputSearchValue}
                />
              </div>
              <Button
                className="btn btn-sm btn-secondary search-btn"
                onClickFunction={handleSearchButton}
              >
                <PiMagnifyingGlassBold size={20} className="search-btn"/>
              </Button>
              <Button
                className="btn-sm btn-secondary"
                onClickFunction={() => {
                  setTableModalList([
                    ...tableModalList,
                    {
                      code: "1214-11",
                      description: "Micrometro Externo",
                      familyId: "a",
                      calibrationFrequency: 12,
                      nextCalibration: "19/03/2025",
                    },
                  ]);
                }}
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
                  "Freq. Calibração",
                  "Próx. Calibração",
                ]}
              />
            </div>
          </Modal>
         
        </div>
        <div className="flex-center-table">
          <Table
            tableContent={itemRecebido}
            tableHeaders={["Codigo", "Descrição", "Referência Adicional"]}
          />
        </div>
        <div className="form-section-container">
          <section className="mov-info">
            <div className="form-column">
              <div>
                <p className="text-major">Responsável entrega</p>
                <InputSearch
                  options={options}
                  placeholder="Busque por código ou nome"
                  isActive={activeEntrega}
                  title="resp-entrega"
                />
              </div>
              <div>
                <p className="text-major">Responsavel Recebimento</p>
                <InputSearch
                  options={options}
                  placeholder="Busque por código ou nome"
                  isActive={activeReceb}
                  title="resp-receb"
                />
              </div>
            </div>
            <div className="form-column">
              <div>
                <p className="text-major">Área</p>
                <InputSearch
                  options={options}
                  placeholder="Busque por descrição"
                  isActive={activeArea}
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

        <div className="confirm-btn-center">
        </div>
      </div>
    </main>
  );
};
