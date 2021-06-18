import React from 'react';
import Dialog, { Params as DialogParams } from '../../components/dialog';
import { DialogProps, makeStyles, Button, Box, Theme, useMediaQuery } from '@material-ui/core';
import { ga, CATEGORY, ACTION } from '../../components/ga';

import startImg from '../../img/start-background.jpg';
// import newImg from '../../img/new.png';
const newImg ='/new.png';
import sloganImg from '../../img/slogan.png';
// import bgImg from '../../img/bg.png';
const bgImg ='/new.png';

import zeroImg from '../../img/zero.png';
import packImg from '../../img/pack.png';

//
export const modalName = 'StartDialog';
interface Props {}
const useStyles = makeStyles((theme) => ({
  contentDesktop: {
    '& .MuiDialogContent-root': {
      backgroundColor: '#fff',
      backgroundImage: `url(${newImg}),url(${sloganImg}),url(${packImg}),url(${zeroImg}),url(${bgImg})`,
      backgroundPosition: 'top left, top right, top 150px left 33%, top 75px left 25%, top center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto',
      minHeight: 640,
      position: 'relative',
    },
    '& .MuiDialogTitle-root': {
      padding: 0,
    },
    '& .close-button-container': {
      //  left:0,
      //right:"auto",
      //transform:"translate(-50%,-25%)"
    },
  },
  contentMobile: {
    '& .MuiDialogContent-root': {
      backgroundColor: '#fff',
      backgroundImage: `url(${startImg})`,
      backgroundPosition: 'top center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      minHeight: 568,
      position: 'relative',
    },
    '& .MuiDialogTitle-root': {
      padding: 0,
    },
    '& .close-button-container': {
      //  left:0,
      //right:"auto",
      //transform:"translate(-50%,-25%)"
    },
  },
}));
export default (props: Props & DialogParams & DialogProps) => {
  const classes = useStyles();
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={false}
      closeButton={false}
      store={true}
      name={modalName}
      className={xs ? classes.contentMobile : classes.contentDesktop}
      {...props}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="=center"
        justifyContent="flex-end"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Box flex="0 0 auto" my={2} px={1}>
          <Button
            variant="contained"
            color="primary"
            href="/"
            onClick={() => {
              // ga.send(CATEGORY.StartPage, ACTION.button_site);
            }}
            fullWidth
            style={{
              maxWidth: xs ? '100%' : '75%',
              whiteSpace: 'nowrap',
            }}
          >
            Сайт акции
          </Button>
        </Box>
        <Box flex="0 0 auto" my={1} pb={3} px={1}>
          <Button
            variant="contained"
            color="primary"
            href="https://api.whatsapp.com/send?phone=79266674316&text="
            target="_blank"
            fullWidth
            onClick={() => {
              // ga.send(CATEGORY.StartPage, ACTION.button_whatsapp);
            }}
            style={{
              maxWidth: xs ? '100%' : '75%',
              whiteSpace: 'nowrap',
            }}
          >
            Регистрация чека в Whatsapp
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
