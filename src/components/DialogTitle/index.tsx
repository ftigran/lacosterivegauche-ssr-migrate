import React from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { Box, makeStyles } from '@material-ui/core';
import { DialogTitleProps } from '@material-ui/core/DialogTitle/DialogTitle';

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
  dialogTitleProps?: DialogTitleProps;
};

const DialogTitle: React.FC<Props> = ({ children, onClose, dialogTitleProps }) => {
  const classes = useStyles();
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...dialogTitleProps}>
      <Box flex="1 1 auto">{children}</Box>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

export default DialogTitle;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0),
    top: theme.spacing(0),
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0.75),
    },
  },
}));
