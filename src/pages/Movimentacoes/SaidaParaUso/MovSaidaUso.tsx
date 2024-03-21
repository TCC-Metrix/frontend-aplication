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
import { Instruments, ModalInstrument } from "../../../utils/interfaces/Interfaces";

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
  ]; // será alimentado pela API provavelmente em outro arquivo

  const optionsInstrument = [
    { value: "Option 1" },
    { value: "Option 2" },
    { value: "Option 3" },
    { value: "Option 4" },
    { value: "Option 5" },
    { value: "Option 3" },
    { value: "Option 4" },
    { value: "Option 5" },
  ]; // será alimentado pela API provavelmente em outro arquivo

  const filtersOptions = [
    { value: "Descrição" },
    { value: "Nome" },
    { value: "Outro nome" },
    { value: "Exemplo" },
  ]; // será alimentado pela API provavelmente em outro arquivo

  const [activeEntrega, setActiveEntrega] = useState<boolean>(false);
  const [activeReceb, setActiveReceb] = useState<boolean>(false);
  const [activeArea, setActiveArea] = useState<boolean>(false);
  const [activeInstrument, setActiveInstrument] = useState<boolean>(false);
  const [activeNavbar, setActiveNavbar] = useState<boolean>(true);
  const [tableModalList, setTableModalList] = useState<ModalInstrument[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  // const [openErrorModal, setOpenErrorModal] = useState<boolean>(false)

  function validInputActive(event: any) {
    const name = event.target.name;
    setActiveArea(name === "area");
    setActiveEntrega(name === "resp-entrega");
    setActiveReceb(name === "resp-receb");
    setActiveInstrument(name === "search-instrument");
    setActiveNavbar(false);
  }

  const handleAddButtonClick = () => {
    setOpenModal(true);
  };

  const itemRecebido = [
    {
      code: "1214-11",
      description: "Micrômetro Externo",
      references: ["50mm/0,10", "50mm/0,10"],
    },
    {
      code: "1214-12",
      description: "Paquimetro Universal",
      references: ["50mm/0,10", "50mm/0,10"],
    },
    {
      code: "1212-32",
      description: "Calibrador Tampão Roscado",

      references: ["50mm/0,10", "50mm/0,10"],
    },
    {
      code: "1212-22",
      description: "Multimetro Digital",
      references: ["50mm/0,10", "50mm/0,10"],
    },
    {
      code: "1214-12",
      description: "Paquimetro Universal",
      references: ["50mm/0,10", "50mm/0,10"],
    },

    {
      code: "1214-12",
      description: "Paquimetro Universal",
      references: ["50mm/0,10", "50mm/0,10"],
    },

    {
      code: "1214-12",
      description: "Paquimetro Universal",
      references: ["50mm/0,10", "50mm/0,10"],
    },

    {
      code: "1214-12",
      description: "Paquimetro Universal",
      references: ["50mm/0,10", "50mm/0,10", "50mm/0,10", "50mm/0,10"],
    },

    {
      code: "1214-12",
      description: "Paquimetro Universal",
      references: ["50mm/0,10", "50mm/0,10"],
    },
  ];

  const addItemToTableModalList = (instrument: ModalInstrument) => {
    setTableModalList([...tableModalList, instrument]);
  }

  return (
    <main>
      <NavBar activeNavbar={activeNavbar} setActiveNavbar={setActiveNavbar} />
      <div className="container-main" onClick={(e) => validInputActive(e)}>
        <div>
          <h1 className="header-three">Saída para uso</h1>
          <p className="text">Instrumento</p>
          <Button
            name="+ Adicionar"
            className="btn btn-tertiary"
            onClickFunction={handleAddButtonClick}
          />

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
                  searchOptions={optionsInstrument}
                  placeholder="Buscar por descrição do instrumento"
                  placeholderOption="Descrição"
                  isActive={activeInstrument}
                  title="search-instrument"
                />
              </div>
              <Button
                name="Adicionar"
                className="btn-sm btn-secondary"
                onClickFunction={() => {
                  setTableModalList([...tableModalList, {
                    code: '1214-11',
                    description: 'Micrometro Externo',
                    familyId: 'a',
                    calibrationFrequency: 12,
                    nextCalibration: '19/03/2025',
                  }])
                }}
              ></Button>
            </div>
            <div className="modal-content">
                <Table tableContent={tableModalList} tableHeaders={['Código', 'Descrição', 'Família', 'Freq. Calibração', 'Próx. Calibração']}/>
             
            </div>
          </Modal>
          {/* FECHOU MODAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL */}
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
          {/* <Button name="Confirmar" className="main-blue-1" onClickFunction={setOpenErrorModal} /> */}
          {/* <ModalErro
						isOpen={openErrorModal}
						setModalErrorOpen={() => {
							setOpenErrorModal(!openErrorModal)
						}}
					>
						<div className="alert">
							<IoMdAlert 
								size={250}
								color="#ff0000"
							/>
							<h1 className="alertText">Campo "responsável recebimento" ou "área" precisa ser informado.</h1>
						</div>
					</ModalErro> */}
        </div>
      </div>
    </main>
  );
};
