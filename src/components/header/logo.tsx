import React from 'react';
import { Box, BoxProps, makeStyles } from '@material-ui/core';

type Props = {
  children: React.ReactNode;
};

const useStyles = makeStyles((theme) => ({
  box: {
    [theme.breakpoints.down('sm')]: {
      left: theme.spacing(7),
    },
    position: 'relative',
  },
}));

const Logo: React.FC<Props & BoxProps> = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Box className={classes.box} flex="1 0 auto" p={1} textAlign="center" {...props}>
      {children}
    </Box>
  );
};

export default Logo;
