import React, { useState } from "react";
import "./Table.css";
import Pagination from "../Pagination/Pagination";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
}

interface TableProps {
  tableContent: any[]; // Lista de objetos com chaves variáveis
  tableHeaders: string[]; // Objeto representando os cabeçalhos da tabela
}

const Table: React.FC<TableProps> = ({ tableContent, tableHeaders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;



  const tableOne = ["Codigo", "Descrição", "Ref Adicional", "teste", "teste"];


  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableContent.slice(indexOfFirstItem, indexOfLastItem);
  const paginationNumbersList = Array.from({ length: Math.ceil(tableContent.length / itemsPerPage) }, (_, i) => i + 1)
  const maxPages = paginationNumbersList.length;


  return (
    <div className="table-container-main">
      <table className="table-container">
        <thead>
          <tr className="first-line">
            {tableHeaders.map((item, index) => (
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
                  if (key === "references") {
                    return (
                      <td key={idx} className="text select-td">
                        <select className="dropdown-select-ref" value={item.reference}>
                          
                          {item[key].map((option: string, idx: any) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                      
                    );
                  } else {
                    return (
                      <td key={idx} className="text">
                       <p className="td-text">
                        {item[key as keyof typeof item]}
                        
                      </p>
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
      {tableContent.length > itemsPerPage && (
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages} />

      )}


    </div>
  );
};

export default Table;
