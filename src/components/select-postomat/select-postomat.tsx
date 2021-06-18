import React, { useState } from "react";
import Dialog from "../dialog";
import { setPickpointResult as setPickpointResultAction } from "../../api/actions";
import Form from "./form";

interface Props {
  pickpointIkn?: number;
  userPrizId: number;
  open: boolean;
  onClose?(r:boolean): void;
}

// function onSelectPostomat(pickpointIkn?:number){
//     if (!!window.PickPoint && !!window.PickPoint.open)
//     window?.PickPoint?.open(
//       (r: any) => onSelectPickpoint(row.id, r),
//       !!pickpointIkn ? { ikn: pickpointIkn } : undefined
//     );
//   }

export default (props: Props) => {
  const { open = false, onClose = () => {}, userPrizId, pickpointIkn } = props;
  const [processed, setProcessed] = useState(false);

  return (
    <Dialog open={open} onCloseDialog={onClose} title="Заполни форму">
      <Form
        userPrizId={userPrizId}
        pickpointIkn={pickpointIkn}
        onProcessed={setProcessed}
        onSuccess={onClose}
      />
    </Dialog>
  );
};
