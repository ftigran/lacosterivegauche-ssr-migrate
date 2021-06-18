import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import { ReactComponent as CloseDialog } from "../../img/close.svg";
import clsx from "clsx";

//
interface Props {
  disabled?: boolean;
  close?: Function;
}

export default ({ close = () => {}, disabled = false }: Props) => {
  const [classCloseHover, setClassCloseHover] = useState("");

  return (
    <IconButton
      color="primary"
      onClick={(e) => close()}
      size="small"
      disabled={disabled}
      style={{    padding: "22px"      }}
    >
      <CloseDialog
        className={classCloseHover}
        onMouseOver={() => {
          setClassCloseHover("animate__animated animate__heartBeat");
        }}
        onMouseOut={() => setClassCloseHover("")}
      />
    </IconButton>
  );
};
