import React, { useState } from 'react';
import Dialog, { Params as DialogParams } from '../../components/dialog';
import { Box, makeStyles, useMediaQuery, Theme, Button, Fade } from '@material-ui/core';
import { ga, CATEGORY, ACTION } from '../../components/ga';
import UploadWizard from './upload-wizard';

//
export interface DialogUploadCheckWizardProps extends DialogParams {
  processed?: boolean;
  onRegister?: () => void;
  handleDocInfo?: () => void;
}

const useStyles = makeStyles((theme) => ({}));

export default (params: DialogUploadCheckWizardProps) => {
  const {
    open = false,
    processed: parentProcessed,
    onRegister = () => {},
    handleDocInfo,
    ...props
  } = params;
  //prettier-ignore
  const [processed, setProcessed] = useState(parentProcessed);

  //
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  const classes = useStyles();

  return (
    <Dialog {...props} open={open} title="Регистрация кода">
      <Box>
        <UploadWizard
          onProcessed={setProcessed}
          onRegister={onRegister}
          handleDocInfo={handleDocInfo}
        />
      </Box>
    </Dialog>
  );
};
