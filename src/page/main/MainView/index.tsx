import React, { useEffect, useState } from 'react';
import { Box, Container, Hidden, makeStyles, Theme, useMediaQuery } from '@material-ui/core';
// import { useHistory } from 'react-router-dom';
import { ProjectProps } from '../../../store/props/types';
import { useSelector } from '../../../hooks';
// import { modalName as signinModalName } from '../../signin';
import Alert, { AlertProps } from '../../../components/alert';
import dialogBackgroundImg from '../../../imgs/valio/background_2.jpg';
import mainImage from '../../../imgs/valio/main/main-image.png';
import mainImageMobile from '../../../imgs/valio/main/mobile_bg_2x.png';
import { BodyText, BodyTextBold } from '../../../components/typography';
import { colors } from '../../../theme/theme';

type Props = { isWait?: boolean };

const useStyles = makeStyles((theme) => ({
  container: {
    overflow: 'hidden',
    position: 'relative',
    backgroundImage: `url(${dialogBackgroundImg})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(3),
      backgroundImage: 'none',
      backgroundColor: '#64ACDC',
    },
  },
  btn: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
    },
  },
  content: {},
  image: {
    maxWidth: '100%',
  },
  mainTextContainer: {
    width: 400,
    position: 'absolute',
    top: theme.spacing(18.5),
    left: theme.spacing(47.5),
    [theme.breakpoints.only('md')]: {
      top: 120,
      left: 300,
      width: 350,
    },
    [theme.breakpoints.only('sm')]: {
      top: 76,
      left: 180,
      width: 240,
    },
  },
  secondTextContainer: {
    position: 'absolute',
    width: 380,
    left: 65,
    bottom: 70,
    [theme.breakpoints.only('md')]: {
      left: 60,
      bottom: 60,
    },
    [theme.breakpoints.only('sm')]: {
      left: 20,
      bottom: 35,
    },
  },
  imageMobile: {
    width: '100%',
  },
}));

const MainView: React.FC<Props> = () => {
  const { isDocPeriodEnd } = useSelector(
    (state: { propsReducer: ProjectProps }) => state.propsReducer,
  );

  // const { isAuth } = useSelector((state: { propsReducer: ProjectProps }) => state.propsReducer);
  // const history = useHistory();

  const classes = useStyles();
  const smOnly = useMediaQuery((theme: Theme) => theme.breakpoints.only('sm'));
  const mdOnly = useMediaQuery((theme: Theme) => theme.breakpoints.only('md'));

  // const handleOnClick = React.useCallback(() => {
  //   if (isAuth) history.push('/lk');
  //   else history.push({ search: `w=${signinModalName}` });
  // }, [isAuth, history]);

  const [alertProps, setAlertProps] = useState<AlertProps>({
    open: false,
    result: false,
    onClose: () => {
      setAlertProps({ ...alertProps, open: false });
    },
  });

  useEffect(() => {
    isDocPeriodEnd &&
      setAlertProps({
        open: true,
        message: 'Уважаемые участники! Регистрация в акции завершена 20 декабря 2020 года',
        result: true,
        onClose: () => {
          setAlertProps((prevState) => ({ ...prevState, open: false }));
        },
      });
  }, [isDocPeriodEnd]);

  return (
    <Box className={classes.container} mt={0} id="index">
      <Container>
        <Box
          pt={{
            xs: 2,
            sm: 8,
          }}
          pb={1}
        >
          <Hidden smUp>
            <Box ml={-2} mr={-2}>
              <img src={mainImageMobile} className={classes.imageMobile} />
            </Box>
            <Box>
              <BodyText color={colors.WHITE}>
                Valio запустила большой проект, в рамках которого мы обязательно посадим 30 000
                деревьев вместе с вами!
                <br />
                <br />
                Копите средства на своём эко-счёте и решайте сами: перевести их на посадку деревьев
                или на свой мобильный телефон. А также участвуйте в розыгрышах главных призов: 100
                000 рублей!
              </BodyText>
            </Box>
          </Hidden>
          <Hidden xsDown>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <Box
                width={{
                  sm: 580,
                  md: 900,
                  lg: 1100,
                }}
                position="relative"
              >
                <img src={mainImage} className={classes.image} />
                <Box className={classes.mainTextContainer}>
                  <BodyText
                    color={colors.DARK_BLUE}
                    lineHeight={1.2}
                    fontSize={smOnly ? 11 : mdOnly ? 16 : undefined}
                  >
                    Valio запустила большой проект, в рамках которого мы обязательно посадим 30 000
                    деревьев вместе с вами!
                    <br />
                    <br />
                    Копите средства на своём эко-счёте и решайте сами: перевести их на посадку
                    деревьев или на свой мобильный телефон.
                    <br /> А также участвуйте в розыгрышах главных призов: 100 000 рублей!
                  </BodyText>
                </Box>
                <Box className={classes.secondTextContainer}>
                  <BodyTextBold color={colors.DARK_BLUE} upper fontSize={smOnly ? 20 : undefined}>
                    Йогурты для вас.
                    <br />
                    Лес для всех нас
                  </BodyTextBold>
                </Box>
              </Box>
            </Box>
          </Hidden>
        </Box>
      </Container>
      <Alert {...alertProps} />
    </Box>
  );
};

export default MainView;
