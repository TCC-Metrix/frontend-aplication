import React, { useState } from 'react';
import { Button } from "../../..";
import BasicInput from "../BasicInput/BasicInput";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import "./ExpandableInput.css";

interface ExpandableInputProps {}

function ExpandableInput(props: ExpandableInputProps) {
    const [inputs, setInputs] = useState<number[]>([1]); // Estado para manter a lista de inputs adicionais

    const addInput = () => {
        if (inputs.length < 3) {
            setInputs([...inputs, inputs.length + 1]); // Adiciona um novo input
        }
    };

    const removeInput = (index: number) => {
      console.log(index)
      if (inputs.length > 1) {
        const newInputs = [...inputs.slice(0, index), ...inputs.slice(index + 1)]; // Remove o input com o índice especificado
        setInputs(newInputs);
    }
    };

    return (
        <div className="expandable-input-wrapper">
            {/* Renderiza os inputs existentes */}
            {inputs.map((index) => (
                <div key={index} className="input-wrapper">
                    <BasicInput
                        inputPlaceholder="referência adicional"
                        inputStyle="large-input"
                        key={index}
                    />
                    {/* Botão para remover o input */}
                    {inputs.length > 1 && (
                        <Button
                            onClickFunction={(e: Event) => {
                              e.preventDefault()
                              removeInput(index-1)}}
                            className="btn btn-add"
                        >
                            <HiOutlineMinus color="#506e81" size={20} />
                        </Button>
                    )}
                </div>
            ))}
            <div className="expandable-input-container">
                {/* Botão para adicionar mais inputs */}
                {inputs.length < 3 && (
                    <Button
                        onClickFunction={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            addInput();
                        }}
                        className="btn btn-add"
                    >
                        <HiOutlinePlus color="#506e81" size={30} />
                    </Button>
                )}
            </div>
        </div>
    );
}

export default ExpandableInput;
