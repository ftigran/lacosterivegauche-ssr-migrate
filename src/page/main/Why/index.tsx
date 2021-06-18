import React from 'react';
import { Box, Container, makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import WhyBox from './WhyBox';
import Img1 from '../../../imgs/tikkurila/why/why_logo1.png';
import Img2 from '../../../imgs/tikkurila/why/why_logo2.png';
import Img3 from '../../../imgs/tikkurila/why/why_logo3.png';
import font from '../../../theme/font';

type Props = {};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#46596B',
  },
  title: {
    color: '#fff',
    fontSize: '180%',
    textTransform: 'uppercase',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: '130%',
      marginTop: theme.spacing(3),
    },
    fontFamily: font.tikkurila,
  },
}));

const Why: React.FC<Props> = () => {
  const classes = useStyles();
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  return (
    <Box className={classes.container} py={xs ? 4 : 6} id="why">
      <Container>
        <Box className={classes.title}>Почему выбирают Tikkurila</Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          flexWrap="wrap"
          mt={xs ? 3 : 6}
          mb={2}
        >
          <WhyBox image={Img1} title={'финское качество'} />
          <WhyBox image={Img2} title={'Экологичность и безопасность'} />
          <WhyBox image={Img3} title={'Более 50 000 цветов'} />
        </Box>
      </Container>
    </Box>
  );
};

export default Why;
