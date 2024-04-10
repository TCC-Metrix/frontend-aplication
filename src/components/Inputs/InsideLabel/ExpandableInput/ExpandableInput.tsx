import React, {  useState } from 'react';
import { Button } from "../../..";
import BasicInput from "../BasicInput/BasicInput";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import "./ExpandableInput.css";
import {  FieldValues, UseFormRegister } from 'react-hook-form';

interface ExpandableInputProps {
  register: UseFormRegister<FieldValues>;
  errors: any;
  resetField: any
}

function ExpandableInput(props: ExpandableInputProps) {
    const [inputs, setInputs] = useState<number[]>([0]); // Estado para manter a lista de inputs adicionais

    const addInput = () => {
        if (inputs.length < 3) {
          const lastValue = inputs[inputs.length - 1]; // Último valor presente na lista
          setInputs([...inputs, lastValue + 1]);
        }
    };

    const removeInput = (index: number) => {
      if (inputs.length > 1) {
        const newInputs = [...inputs]
        newInputs.splice(index, 1)
        setInputs(newInputs);
        props.resetField(`additionalReference${index}`)
    }
    };


    return (
        <div className="expandable-input-wrapper">
            {inputs.map((item, index) => (
                <div key={item} className="input-wrapper">
                    <BasicInput
                        inputPlaceholder="referência adicional"
                        inputStyle="large-input"
                        isRequired={false}
                        register={props.register}
                        inputName={`additionalReference${index}`}
                        key={item}
                        errors={props.errors}
                        inputType='text'
                    />
                    {/* Botão para remover o input */}
                    {inputs.length > 1 && (
                        <Button
                            onClickFunction={(e: Event) => {
                              e.preventDefault()
                              removeInput(index)}}
                            className="btn btn-add"
                        >
                            <HiOutlineMinus color="#506e81" size={20} />
                        </Button>
                    )}
                </div>
            ))}
            <div className="expandable-input-container">
                {inputs.length < 3 ? (
                    <Button
                        onClickFunction={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            addInput();
                        }}
                        className="btn btn-add"
                    >
                        <HiOutlinePlus color="#506e81" size={30} />
                    </Button>
                ) : (
                  <>
                  </>
                )}
            </div>
        </div>
    );
}

export default ExpandableInput;
