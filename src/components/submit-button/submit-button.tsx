import React from 'react';
import { Button, makeStyles, ButtonProps } from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
interface Props {
  processed: boolean;
  progressColor?: 'primary' | 'secondary' | 'inherit';
}
const useStyles = makeStyles((theme) => ({
  actionSubmit: {},
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: theme.spacing(-3 / 2),
    marginLeft: theme.spacing(-3 / 2),
  },
}));
export default (params: Props & ButtonProps) => {
  const {
    progressColor = 'inherit',
    className,
    children,
    processed = false,
    disabled = false,
    title,
    ...props
  } = params;

  const classes = useStyles();
  return (
    <Button
      className={clsx(classes.actionSubmit, className)}
      type="submit"
      disabled={disabled || processed}
      {...props}
    >
      {title || children}
      {processed && (
        <CircularProgress color={progressColor} size={24} className={classes.buttonProgress} />
      )}
    </Button>
  );
};
