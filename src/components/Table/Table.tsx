import React, { useState } from "react";
import "./Table.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
}

interface Item {
  code: string;
  description: string;
  reference: string;
}

const Table = (props: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const item = [
    {
      code: "09237",
      description: "Paquimetro",
      reference: "50mm",
    },
    {
      code: "09237",
      description: "Paquimetro",
      reference: "50mm",
    },
    {
      code: "09237",
      description: "Paquimetro",
      reference: "50mm",
    },
    {
      code: "09237",
      description: "paginationNumbersList",
      reference: "50mm",
    },
    {
      code: "09237",
      description: "Paquimetro",
      reference: "50mm",
    },
    {
      code: "09237",
      description: "Paquimetro",
      reference: "50mm",
    },
    {
      code: "09237",
      description: "Paquimetro",
      reference: "50mm",
    },
    {
      code: "09237",
      description: "paginationNumbersList",
      reference: "50mm",
    },
    {
      code: "09237",
      description: "Paquimetro",
      reference: "50mm",
    },
    {
      code: "09237",
      description: "Paquimetro",
      reference: "50mm",
    },
    {
      code: "09237",
      description: "Paquimetro",
      reference: "50mm",
    },


  ];

  const tableOne = ["Codigo", "Descrição", "Ref Adicional"];


  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = item.slice(indexOfFirstItem, indexOfLastItem);
  const paginationNumbersList = Array.from({ length: Math.ceil(item.length / itemsPerPage) }, (_, i) => i + 1)
  const maxPages = paginationNumbersList.length;


  return (
    <div className="table-container-main">
      <table className="table-container">
        <thead>
          <tr className="first-line">
            {tableOne.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
            {tableOne.length === 3 && <th></th>}
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan={tableOne.length + 1} className="text">
                Nenhum instrumento selecionado
              </td>
            </tr>
          ) : (
            currentItems.map((item, index) => (
              <tr key={index}>
                {Object.keys(item).map((key, idx) => {
                  if (key === "reference") {
                    return (
                      <td key={idx} className="text">
                        <select className="dropdown-select-ref" value={item.reference}>
                          {props.options.map((option, idx) => (
                            <option key={idx} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                    );
                  } else {
                    return (
                      <td key={idx} className="text">
                        {item[key as keyof typeof item]}
                      </td>
                    );
                  }
                })}
                <td className="remove-item-list text">
                  Remover
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <ul className="pagination">
        {!(currentPage == 1) && <li onClick={() => {setCurrentPage(currentPage - 1)}}> <IoIosArrowBack/> </li>}
        {((currentPage + 2 > maxPages) && currentPage + 2 != maxPages + 1) && <li onClick={() => {setCurrentPage(currentPage - 2 )}}>{!(maxPages < currentPage - 2) && currentPage - 2}</li>}
        {((currentPage + 1 > maxPages) || currentPage == maxPages -1 ) && <li onClick={() => {setCurrentPage(currentPage - 1)}}>{!(maxPages < currentPage - 1) && currentPage - 1}</li>}
        <li onClick={() => {setCurrentPage(currentPage)}} className="active-page">{currentPage}</li>
       {!((currentPage + 2 > maxPages) && currentPage + 2 != maxPages + 1) && <li onClick={() => {setCurrentPage(currentPage + 1)}}>{!(maxPages < currentPage + 1) && currentPage + 1}</li>}
        {!((currentPage + 1 > maxPages) || currentPage == maxPages -1 ) && <li onClick={() => {setCurrentPage(currentPage + 2)}}>{!(maxPages < currentPage + 2) && currentPage + 2}</li>}
        {!(currentPage == maxPages) && <li onClick={() => {setCurrentPage(currentPage + 1)}}> <IoIosArrowForward/> </li>}
      </ul>


    </div>
  );
};

export default Table;
