import React, { useState } from "react";
import { Button } from "../../..";
import BasicInput from "../BasicInput/BasicInput";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import "./ExpandableInput.css";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface ExpandableInputProps {
  register: UseFormRegister<FieldValues>;
  errors: any;
  resetField: any;
}

function ExpandableInput(props: ExpandableInputProps) {
  const [isVisibleFirst, setIsVisibleFirst] = useState<boolean>(true);
  const [isVisibleSecond, setIsVisibleSecond] = useState<boolean>(false);
  const [isVisibleThird, setIsVisibleThird] = useState<boolean>(false);

  return (
    <div className="expandable-input-wrapper">
      <div className={` ${isVisibleFirst ? "input-wrapper" : "input-hidden"}`}>
        <BasicInput
          inputPlaceholder={`referência adicional`}
          inputStyle="large-input"
          isRequired={false}
          register={props.register}
          inputName={`additionalReference1`}
          errors={props.errors}
          inputType="text"
        />
      </div>
      <div className={` ${isVisibleSecond ? "input-wrapper" : "input-hidden"}`}>
        <BasicInput
          inputPlaceholder={`referência adicional`}
          inputStyle="large-input"
          isRequired={false}
          register={props.register}
          inputName={`additionalReference2`}
          errors={props.errors}
          inputType="text"
        />
      </div>
      <div className={` ${isVisibleThird ? "input-wrapper" : "input-hidden"}`}>
        <BasicInput
          inputPlaceholder={`referência adicional`}
          inputStyle="large-input"
          isRequired={false}
          register={props.register}
          inputName={`additionalReference3`}
          errors={props.errors}
          inputType="text"
        />
        <input type="hidden" {...props.register("additionalReferences")} />

      </div>

      <div className="expandable-input-container">
        <div className="flex-expandable-buttons">
          <Button
            className="btn btn-add"
            onClickFunction={(event: React.ChangeEvent<HTMLInputElement>) => {
              event.preventDefault();
              if (!isVisibleFirst) {
                setIsVisibleFirst(true);
              } else if (!isVisibleSecond) {
                setIsVisibleSecond(true);
              } else if (!isVisibleThird) {
                setIsVisibleThird(true);
              } else {
              }
            }}
          >
            <HiOutlinePlus color="#506e81" size={30} />
          </Button>

          <Button
            className="btn btn-add"
            onClickFunction={(event: React.ChangeEvent<HTMLInputElement>) => {
              event.preventDefault();
              if (isVisibleThird) {
                setIsVisibleThird(false);
                props.resetField("additionalReference3");
              } else if (isVisibleSecond) {
                setIsVisibleSecond(false);
                props.resetField("additionalReference2");
              } else if (isVisibleFirst) {
                setIsVisibleFirst(false);
                props.resetField("additionalReference1");
              } else {
              }
            }}
          >
            <HiOutlineMinus color="#506e81" size={30} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExpandableInput;
