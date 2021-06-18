import { ButtonProps, DialogProps } from '@material-ui/core';
import React from 'react';

export type ConfirmDialogOptions = {
  title?: string;
  body?: string | React.ReactNode;
  confirmationText?: string;
  cancellationText?: string;
  dialogProps?: DialogProps;
  confirmationButtonProps?: ButtonProps;
  cancellationButtonProps?: ButtonProps;
  alert?: boolean;
  btnHide?: boolean;
};

export type ConfirmType = (options?: ConfirmDialogOptions) => Promise<number>;
