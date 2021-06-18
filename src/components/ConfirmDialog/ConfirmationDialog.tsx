import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '../DialogTitle';
import { ConfirmDialogOptions } from './types';
import { makeStyles } from '@material-ui/core/styles';
import { Theme, useMediaQuery } from '@material-ui/core';

type Props = {
  open: boolean;
  options: ConfirmDialogOptions;
  onCancel: () => void;
  onConfirm: () => void;
};

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      fontSize: 14,
    },
  },
}));

const ConfirmationDialog: React.FC<Props> = ({ open, options, onCancel, onConfirm }) => {
  const {
    title,
    body,
    confirmationText,
    cancellationText,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
    alert,
    btnHide = false,
  } = options;

  const classes = useStyles();

  const xsDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  return (
    <Dialog maxWidth={'sm'} fullWidth {...dialogProps} open={open} onClose={onCancel}>
      {!!title && <DialogTitle onClose={onCancel}>{title}</DialogTitle>}
      {!!body && <DialogContent className={classes.dialogContent}>{body}</DialogContent>}
      {!btnHide && (
        <DialogActions>
          {!alert && (
            <Button
              color="primary"
              variant={'contained'}
              size={xsDown ? 'small' : undefined}
              {...cancellationButtonProps}
              onClick={onCancel}
            >
              {cancellationText}
            </Button>
          )}
          <Button
            color="primary"
            variant={'contained'}
            size={xsDown ? 'small' : undefined}
            {...confirmationButtonProps}
            onClick={onConfirm}
          >
            {confirmationText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ConfirmationDialog;
