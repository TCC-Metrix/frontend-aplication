import React, { SetStateAction, useEffect, useState } from "react";
import "./Table.css";
import Pagination from "../Pagination/Pagination";
import { InstrumentToModalTableUseOutput } from "../../utils/interfaces/Interfaces";


interface TableProps {
  tableContent: any[]; // Lista de objetos com chaves variáveis
  tableHeaders: string[]; // Objeto representando os cabeçalhos da tabela
  setTableContent: (arg: InstrumentToModalTableUseOutput[]) => void;
  isReferencesPresent: boolean;
}

const Table: React.FC<TableProps> = ({
  tableContent,
  tableHeaders,
  setTableContent,
  isReferencesPresent,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const itemsPerPage = 3;

  // Atualiza currentItems sempre que tableContent ou currentPage mudar
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(tableContent.slice(indexOfFirstItem, indexOfLastItem));
  }, [tableContent, currentPage, itemsPerPage]);

// Função para remover um item da lista
const removeItem = (index: number) => {
  const updatedCurrentItems = [...currentItems];
  updatedCurrentItems.splice(index, 1); // Remove 1 elemento a partir do índice index
  setCurrentItems(updatedCurrentItems);

  const indexOfItemInTableContent = (currentPage - 1) * itemsPerPage + index;
  const updatedTableContent = [...tableContent];
  updatedTableContent.splice(indexOfItemInTableContent, 1); // Remove o item correspondente de tableContent

  // Verifica se a página atual é maior que o número total de páginas após a remoção
  const maxPagesAfterRemoval = Math.ceil(updatedTableContent.length / itemsPerPage);
  if (currentPage > maxPagesAfterRemoval) {
    // Se sim, ajusta a página atual para a última página disponível
    setCurrentPage(maxPagesAfterRemoval);
  }

  setTableContent(updatedTableContent);
};

  // Paginação
  const paginationNumbersList = Array.from(
    { length: Math.ceil(tableContent.length / itemsPerPage) },
    (_, i) => i + 1
  );
  const maxPages = paginationNumbersList.length;

  return (
    <div className="table-container-main">
      <table className="table-container">
        <thead>
          <tr className="first-line">
            {tableHeaders.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan={tableHeaders.length + 1} className="text">
                Nenhum instrumento selecionado
              </td>
            </tr>
          ) : (
            currentItems.map((item, index) => (
              <tr key={index}>
                {Object.keys(item).map((key, idx) => {
                  if (isReferencesPresent && key === "additionalReferences") {
                    return <td key={idx} className="text select-td">
                      {item.additionalReferences.length === 0 ? (
                        <span>--</span>
                      ) : (
                        <select
                          className="dropdown-select-ref"
                          value={item.reference}
                        >
                          {item.additionalReferences.map(
                            (option: string, idx: any) => (
                              <option key={idx} value={option}>
                                {option}
                              </option>
                            )
                          )}

                        </select>
                      )}
                    </td>;
                  } else if (
                    !isReferencesPresent &&
                    key === "additionalReferences"
                  ) {
                    return null; // Se as referências adicionais não estiverem presentes e a chave for "additionalReferences", não renderize nada
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
                <td
                  className="remove-item-list text"
                  onClick={() => removeItem(index)}
                >
                  Remover
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {tableContent.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          maxPages={maxPages}
        />
      )}
    </div>
  );
};

export default Table;
