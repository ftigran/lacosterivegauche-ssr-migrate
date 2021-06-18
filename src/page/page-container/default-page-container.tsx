import React from 'react';
import { Container, Box, makeStyles } from '@material-ui/core';
import font from '../../theme/font';
interface Props {
  title?: string;
  children: React.ReactNode;
}
const useStyles = makeStyles((theme) => ({
  background: {
    flex: '1 0 auto',
    position: 'relative',
  },
  container: {
    backgroundColor: 'transparent',
    flex: '0 0 auto',
    zIndex: 2,
  },
  title: {
    textTransform: 'none',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '150%',
    color: '#fff',
    fontFamily: font.other,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
}));

export default ({ title, children, ...props }: Props) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.background}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      pt={8}
      pb={2}
    >
      <Box className={classes.blur}></Box>
      <Container maxWidth="md" className={classes.container} {...props}>
        {!!title && (
          <Box className={classes.title} py={4}>
            {title}
          </Box>
        )}
        {children}
      </Container>
    </Box>
  );
};
