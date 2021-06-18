import React, { useMemo } from 'react';
import { Box, makeStyles, Container, useMediaQuery, Theme, Grid } from '@material-ui/core';
import font from '../../../theme/font';
import PrizeItem from './PrizeItem';
import Prize1 from '../../../imgs/valio/prize/prize-1.png';
import Prize2 from '../../../imgs/valio/prize/prize-2.png';
import Tree from '../../../imgs/valio/prize/prize-tree.png';
import { PageTitle } from '../../../components/typography';
import { colors } from '../../../theme/theme';
import SmallLink from '../Rules/RulesStepBox/SmallLink';
import { useSelector } from 'react-redux';
import { ProjectProps } from '../../../store/props/types';
import { useHistory } from 'react-router-dom';
import { modalName } from '../../signin';

type Props = {};

const Prizes: React.FC<Props> = () => {
  const classes = useStyles();

  const xsDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  const { isAuth } = useSelector((state: { propsReducer: ProjectProps }) => state.propsReducer);

  const history = useHistory();

  const handleOnClick = React.useCallback(() => {
    if (isAuth) history.push('/lk');
    else history.push({ search: `w=${modalName}` });
  }, [isAuth, history]);

  return (
    <Box className={classes.container} id="prizes">
      <Container className={classes.secondContainer}>
        <Box
          pt={{
            xs: 4,
            sm: 6,
          }}
          pb={{
            xs: 28,
            sm: 32,
            md: 26,
          }}
        >
          <PageTitle color={colors.WHITE}>Призы</PageTitle>
          <Box pt={2} pb={{ xs: 3, sm: 0 }}>
            <Grid container spacing={1} justify={xsDown ? 'flex-start' : 'center'}>
              <Grid item xs={12} sm={9} md={9}>
                <PrizeItem
                  title="Гарантированные призы"
                  image={Prize1}
                  subtitle={
                    <>
                      Деньги на эко-счёте. <br />
                      Только вы решаете, что с ними делать:
                    </>
                  }
                  addContent={
                    <Box>
                      <SmallLink onClick={handleOnClick} color={colors.WHITE}>
                        Вывести на телефон
                      </SmallLink>
                      <SmallLink onClick={handleOnClick} color={colors.WHITE}>
                        Отправить на посадку деревьев
                      </SmallLink>
                    </Box>
                  }
                />
              </Grid>
              <Grid item xs={12} sm={9} md={9}>
                <PrizeItem
                  title="ГЛАВНЫЕ ПРИЗЫ"
                  image={Prize2}
                  subtitle={
                    <>
                      По 100 000 Р каждому из 5 победителей, которые будут определены среди
                      участников, зарегистрировавших минимум 1 уникальный QR-код по итогу акции.
                      <br />
                      Порядок определения победителей приведен в п.3.5 Правил акции
                    </>
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: colors.LIGHT_BLUE,
  },
  secondContainer: {
    backgroundImage: `url(${Tree})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right bottom',
    [theme.breakpoints.down('sm')]: {
      backgroundSize: '400px',
    },
    [theme.breakpoints.down('xs')]: {
      backgroundPosition: 'center bottom',
      backgroundSize: '360px',
    },
  },
}));

export default Prizes;
