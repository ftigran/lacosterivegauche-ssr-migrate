import React from 'react';
import { Box, Container, makeStyles, Theme, useMediaQuery, Grid, Hidden } from '@material-ui/core';
import { BodyText, BodyTextBold, PageTitle } from '../../../components/typography';
import mapImage from '../../../imgs/valio/about/map2.png';
import treeBg from '../../../imgs/valio/about/tree.png';
import mapMobile from '../../../imgs/valio/about/map_mobile.png';
import { colors } from '../../../theme/theme';
import { useSelector } from '../../../hooks';

type Props = {};

const useStyles = makeStyles((theme) => ({
  container: {},
  mapContainer: {
    position: 'relative',
    maxWidth: 1920,
    // margin: 'auto',
  },
  mapImage: {
    maxWidth: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  treeContent: {
    width: 512,
    height: 640,
    backgroundImage: `url(${treeBg})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    boxSizing: 'border-box',
    [theme.breakpoints.down('md')]: {
      width: 350,
      height: 435,
    },
    [theme.breakpoints.down('sm')]: {
      width: 250,
      height: 310,
    },
  },
  wrap: {
    position: 'absolute',
    width: '100%',
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      bottom: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      bottom: theme.spacing(8),
    },
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(-10),
    },
  },
}));

const About: React.FC<Props> = () => {
  const classes = useStyles();
  const xsDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const woods = useSelector((state) => state.propsReducer.woods);

  return (
    <Box className={classes.container} py={{ xs: 3, sm: 3 }} id="about">
      <Container>
        <PageTitle>О проекте</PageTitle>
      </Container>
      <Hidden smUp>
        <Box px={2} pt={4} pb={12}>
          <BodyText fontSize={14}>
            Наша цель — посадить 30 000 деревьев!
            <br />
            <br />
            Посадить дерево — легко. Три упаковки йогурта Valio® — это один новый саженец в нашем
            лесу.
            <br />
            <br />
            А вы знали, что 30 000 деревьев — это настоящий зеленый лес и дом для множества видов
            животных и птиц?
            <br />
            <br />
            Деревья от Valio будут высажены в Одинцовском районе Московской области, а поможет нам
            партнер «
            <a
              href="https://rusclimatefund.ru/"
              target="_blank"
              style={{ color: colors.DARK_BLUE }}
            >
              РусКлиматФонд
            </a>
            ».
            <br />
            <br />
            Присоединяйтесь, давайте посадим лес вместе!
          </BodyText>
        </Box>
      </Hidden>
      <Box className={classes.mapContainer} mt={{ sm: 30, md: 45, lg: 66 }} ml="auto" mr="auto">
        <img
          src={xsDown ? mapMobile : mapImage}
          className={classes.mapImage}
          alt="карта деревьев"
        />
        <Box className={classes.wrap}>
          <Container>
            <Grid container spacing={1} justify="center">
              <Hidden xsDown>
                <Grid item xs={3} sm={4} md={3}>
                  <Box pt={4}>
                    <BodyText fontSize={mdDown ? (smDown ? 12 : 14) : undefined}>
                      Наша цель — посадить 30 000 деревьев!
                      <br />
                      <br />
                      Посадить дерево — легко. Три упаковки йогурта Valio® — это один новый саженец
                      в нашем лесу.
                      <br />
                      <br />А вы знали, что 30 000 деревьев — это настоящий зеленый лес и дом для
                      множества видов животных и птиц?
                    </BodyText>
                  </Box>
                </Grid>
              </Hidden>
              <Grid item xs={12} sm={4} md={6}>
                <Box justifyContent="center" display="flex" flexShrink={1}>
                  <Box
                    className={classes.treeContent}
                    pt={{
                      xs: 10,
                      sm: 10,
                      md: 14,
                      lg: 21,
                    }}
                    pr={{
                      xs: 2,
                      lg: 4,
                    }}
                  >
                    <BodyText
                      color={colors.GREY1}
                      fontSize={mdDown ? (smDown ? 11 : 14) : undefined}
                    >
                      Уже собраны <br />
                      средства на посадку
                    </BodyText>
                    <BodyTextBold
                      fontSize={mdDown ? (smDown ? 32 : 42) : 82}
                      color={colors.DARK_BLUE}
                    >
                      {woods ?? 0}
                    </BodyTextBold>
                    <BodyTextBold
                      fontSize={mdDown ? (smDown ? 14 : 18) : 24}
                      upper
                      color={colors.DARK_BLUE}
                    >
                      деревьев
                    </BodyTextBold>
                  </Box>
                </Box>
              </Grid>
              <Hidden xsDown>
                <Grid item xs={3} sm={4} md={3}>
                  <Box pt={4}>
                    <BodyText fontSize={mdDown ? (smDown ? 12 : 14) : undefined}>
                      Присоединяйтесь, давайте посадим лес вместе!
                      <br />
                      <br />
                      Деревья от Valio будут высажены в Одинцовском районе Московской области, а
                      поможет нам партнер «
                      <a
                        href="https://rusclimatefund.ru/"
                        target="_blank"
                        style={{ color: colors.DARK_BLUE }}
                      >
                        РусКлиматФонд
                      </a>
                      ».
                    </BodyText>
                  </Box>
                </Grid>
              </Hidden>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};
export default About;
