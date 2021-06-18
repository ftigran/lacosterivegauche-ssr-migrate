import React, { useEffect } from 'react';

import {
  DialogProps,
  Box,Button,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  Theme,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { SET_DIALOG, ProjectProps } from '../../store/props/types';
import CloseButton from './close-button';
//
export interface Params {
  processed?: boolean;
  store?: boolean;
  open?: boolean;
  name?: string;
  closeButton?: boolean;
  okButton?: boolean;
  classN?:string
  onCloseDialog?: (r: boolean) => void;
  dialogContentClassName?: string;
  onOpen?: () => void;
}

const Modal = (params: Params & DialogProps) => {
  const {
    processed = false,
    onOpen = () => {},
    store = false,
    name = 'default',
    closeButton = true,
    okButton=false,
    onCloseDialog = (e: boolean) => {},
    dialogContentClassName = '',
    open,
    classN,
    fullScreen = false,
    ...props
  } = params;
  const dispatch = useDispatch();
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  const { dialog } = useSelector((state: { propsReducer: ProjectProps }) => state.propsReducer);

  const dialogTitleId = `${name}-dialog-title`;

  function close(r: boolean) {
    if (!!store) {
      // console.log(
      //   { dialog: { [name]: { open: false } } }
      // )
      // console.log(
      //   "{ dialog: { [name]: { open: false } } }"
      // )
      dispatch({
        type: SET_DIALOG,
        payload:  { [name]: { open: false } } ,
      });
    }
    onCloseDialog(r);
  }

  useEffect(() => {
    if (!!dialog?.[name]?.open || open) {
      onOpen();
    }
  }, [dialog?.[name], open]);

  return (
    <>
      <Dialog
        disableBackdropClick={true}
        aria-labelledby={dialogTitleId}
        fullScreen={fullScreen || xs}
        open={open}
        {...props}
        {...(!!store ? dialog?.[name] : {})}
        className={classN}
      >
        <DialogTitle id={dialogTitleId} disableTypography={true}>
          {!!props.title && <Box flex="1 1 auto">{props.title}</Box>}
          {closeButton && (
            <Box
              p={1}
              flex="0 0 auto"
              position="absolute"
              className="close-button-container"
              style={{
                top: 0,
                right: 0,
                color: 'white',
              }}
            >
              <CloseButton close={() => close(false)} disabled={processed} />
            </Box>
          )}
        </DialogTitle>

        <DialogContent className={dialogContentClassName}>{props.children}
        {okButton && <Button onClick={() => close(false)} disabled={processed}             variant="contained"

            color="primary"
            >ОК</Button>
        }
        
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Modal;
