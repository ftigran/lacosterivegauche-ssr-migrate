import React from 'react';
import { Container, Box, makeStyles } from '@material-ui/core';
import font from '../../theme/font';
import WhiteGradientFooterImg from '../../img/white-gradient-footer.png';
//
interface Props {
  title?: string;
  children: React.ReactNode;
}
const useStyles = makeStyles((theme) => ({
  background: {
    // backgroundImage: `url(${WhiteGradientFooterImg}),linear-gradient(0deg, #1D92C0 75%, rgba(255, 255, 255, 0.0001) 100%)`,
    flex: '1 0 auto',
    position: 'relative',
    backgroundPosition: 'bottom -33% center,top center',
    backgroundRepeat: 'repeat-x,no-repeat',
  },

  container: {
    backgroundColor: 'transparent',
    flex: '0 0 auto',
    zIndex: 2,
  },
  title: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: '130%',
    color: '#fff',
    fontFamily: font.primary,
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
      pt={9}
      pb={8}
    >
      <Box className={classes.blur}></Box>
      <Container maxWidth="lg" className={classes.container} {...props}>
        {!!title && (
          <Box className={classes.title} pt={3} pb={2}>
            {title}
          </Box>
        )}
        {children}
      </Container>
    </Box>
  );
};
