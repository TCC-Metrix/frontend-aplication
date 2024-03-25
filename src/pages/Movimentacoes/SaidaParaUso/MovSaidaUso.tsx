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
  InstrumentToModalTableUseOutput,
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

  const dropdownOptions = [
    { value: "Descrição" },
    { value: "Codigo" },
  ];

  //Sessão de validação de inputs/navbar, se estão em foco ou não
  const [activeShippingInput, setActiveShippingInput] = useState<boolean>(false);
  const [activeReceiverInput, setActiveReceiverInput] = useState<boolean>(false);
  const [activeAreaInput, setActiveAreaInput] = useState<boolean>(false);
  const [activeInputDropdown, setActiveInputDropdown] = useState<boolean>(false);
  const [activeNavbar, setActiveNavbar] = useState<boolean>(true);


  //Tabela de instrumentos inclusa no modal
  const [tableModalList, setTableModalList] = useState<InstrumentToModalTableUseOutput[]>([]);

  const [instrumentSelected, setInstrumentSelected] = useState<InstrumentToModalTableUseOutput>({
    code: "",
    description: "",
    family: "",
    calibrationFrequency: 0,
    nextCalibration: ""
  })

  //Seta se o modal está aberto ou não
  const [openModal, setOpenModal] = useState<boolean>(false);

  //Lista de instrumentos filtrados pelo input do modal
  const [instrumentsFiltered, setInstrumentsFiltered] = useState<GeneralInstrument[]>()

  //Opção selecionada do dropdown incluso no input do modal
  const [dropdownSelected, setDropdownSelected] =
    useState<string>("description");

  //Valor setado no input  do modal  
  const [inputSearchValue, setInputSearchValue] = useState<string>("");


  //Valida onde o usuario está clicando, para que feche os dropdowns dos inputs abertos
  function validInputActive(event: any) {
    const name = event.target.name;
    setActiveAreaInput(name === "area");
    setActiveShippingInput(name === "resp-entrega");
    setActiveReceiverInput(name === "resp-receb");
    setActiveNavbar(false);


    //Se o usuário clicar no botão de search, então ele seta o dropdown do modal como true, para abrir ao pesquisar algo
    if(event.target.classList.contains('search-btn')){
      setActiveInputDropdown(true)
    }else{
      setActiveInputDropdown(name === "search-instrument");
    }
  }


  //Abre o modal
  const handleModal = () => {
    setOpenModal(true);
  };

  const itemRecebido = [
    {
      code: "1214-12",
      description: "Paquimetro Universal",
      references: ["50mm/0,10", "50mm/0,10"],
    },
  ];


  //Adiciona o instrumento na lista do modal
  // const addItemToTableModalList = (instrument: ModalInstrument) => {
  //   setTableModalList([...tableModalList, instrument]);
  // };


  //Hook de api, o qual busca o instrumento por algum parametro
  const getInstrumentBy = useGetInstrumentBy();


  //Função que de fato chama a api, e seta o resultado nos instrumentos filtrados
  const handleSearch: SubmitHandler<SearchPattern> = (data) => {
    getInstrumentBy.mutate(data, {
      onSettled: (data, error) => {
        if (error) {
          console.error("Ocorreu um erro:", error);
          return;
        }
        setInstrumentsFiltered(data?.data);
        
      },
    });
  };

  //Função que valida se o input está vazio, e envia os parametros para a função que chama a api caso não esteja
  const handleSearchButton = () => {
    setActiveInputDropdown(true);

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
            onClickFunction={handleModal}
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
                  dropdownOptions={dropdownOptions} //Opções que aparecerão no dropdown
                  instrumentsFiltered={instrumentsFiltered} //Instrumentos filtrados
                  setInstrumentsFiltered={setInstrumentsFiltered}
                  isActive={activeInputDropdown} // Define de está ativo ou inativo o dropdown de instrumentos
                  title="search-instrument"
                  setDropdownSelected={setDropdownSelected} //Seta a opção selecionada do dropdown de opções
                  setInputSearchValue={setInputSearchValue}//Seta o valor do input do modal
                  setInstrumentSelected={setInstrumentSelected}
                  instrumentSelected={instrumentSelected}
                  tableModalList={tableModalList}
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
                  const hasInstrumentInTableList = tableModalList.some(item => item.code === instrumentSelected.code)
                  if(!hasInstrumentInTableList){
                    setTableModalList([
                      ...tableModalList,
                      instrumentSelected
                    ]);

                  }
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
                  "Próx. Calibração",
                  "Freq. Calibração",
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
                  isActive={activeShippingInput}
                  title="resp-entrega"
                />
              </div>
              <div>
                <p className="text-major">Responsavel Recebimento</p>
                <InputSearch
                  options={options}
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
                  options={options}
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

        <div className="confirm-btn-center">
        </div>
      </div>
    </main>
  );
};
