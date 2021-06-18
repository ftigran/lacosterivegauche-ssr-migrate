import React, { useCallback } from 'react';
import { Box, makeStyles, Container, useMediaQuery, Theme, Grid } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { ProjectProps } from '../../../store/props/types';
import RulesStepBox from './RulesStepBox';
import { PageTitle } from '../../../components/typography';
import Step1 from '../../../imgs/valio/rules/step1.png';
import Step2 from '../../../imgs/valio/rules/step2.png';
import Step3 from '../../../imgs/valio/rules/step3.png';
import Step4 from '../../../imgs/valio/rules/step4.png';
import Step5 from '../../../imgs/valio/rules/step5.png';
import { colors } from '../../../theme/theme';
import SmallLink from './RulesStepBox/SmallLink';
import { modalName } from '../../signin';
import { useHistory } from 'react-router-dom';
import { useConfirm } from '../../../components/ConfirmDialog';
import ProductAction from './ProductAction';

type Props = {};

const useStyles = makeStyles((theme) => ({
  mainContainer: {},
  linkFullRules: {
    fontSize: 14,
    lineHeight: 1,
    color: colors.GREY1,
    textDecoration: 'none',
  },
  imgT: {
    marginBottom: theme.spacing(-1),
  },
  linkRules: {
    display: 'inline-block',
    paddingTop: 12,
    paddingBottom: 13,
    paddingLeft: 20,
    paddingRight: 20,
    color: colors.WHITE,
    textDecoration: 'none',
    fontSize: 14,
    lineHeight: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: theme.spacing(1.5),
    backgroundColor: 'rgba(0,72,140,1)',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0,72,140,0.8)',
    },
  },
  activeItem: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
}));

const Rules: React.FC<Props> = () => {
  const xsDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  // const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { isAuth } = useSelector((state: { propsReducer: ProjectProps }) => state.propsReducer);
  const classes = useStyles();

  const history = useHistory();

  const handleOnClick = React.useCallback(() => {
    if (isAuth) history.push('/lk');
    else history.push({ search: `w=${modalName}` });
  }, [isAuth, history]);

  const confirm = useConfirm();

  const handleOnProductModal = useCallback(() => {
    confirm &&
      confirm({
        title: 'Продукция, участвующая в акции',
        body: <ProductAction />,
        alert: true,
        confirmationText: 'OK',
        btnHide: true,
      });
  }, [confirm]);

  return (
    <Box
      className={classes.mainContainer}
      pb={{
        xs: 2,
      }}
      id="rules"
    >
      <Container>
        <PageTitle>Правила</PageTitle>
        <Box
          mt={{
            xs: 0,
          }}
        >
          <Grid container spacing={1} justify={xsDown ? 'flex-start' : 'center'}>
            <Grid item sm={6} md={4} lg={4}>
              <RulesStepBox
                onClick={handleOnProductModal}
                title="Покупайте"
                body={
                  <>
                    <Box className={classes.activeItem}>
                      йогурты
                      <br />
                      Valio Clean Label в специальной
                      <br />
                      промо-упаковке
                    </Box>
                  </>
                }
                image={Step1}
              />
            </Grid>
            <Grid item sm={6} md={4} lg={4}>
              <RulesStepBox
                title="Регистрируйте"
                body="уникальный QR-код под крышкой на сайте"
                image={Step2}
              />
            </Grid>
            <Grid item sm={6} md={4} lg={4}>
              <RulesStepBox
                title="Получайте"
                body="10₽ с каждого йогурта на свой эко-счёт"
                image={Step3}
              />
            </Grid>
            <Grid item sm={12} md={6} lg={6}>
              <RulesStepBox
                title="Накопите"
                body="не менее 30 ₽ и решайте сами, вывести их на телефон или отправить на посадку деревьев"
                image={Step4}
                addContent={
                  <Box
                    display="flex"
                    flexDirection={{
                      xs: 'column',
                      lg: 'row',
                    }}
                  >
                    <Box>
                      <SmallLink onClick={handleOnClick}>Вывести на телефон</SmallLink>
                    </Box>
                    <Box>
                      <SmallLink onClick={handleOnClick}>Отправить на посадку деревьев</SmallLink>
                    </Box>
                  </Box>
                }
              />
            </Grid>
            <Grid item sm={12} md={6} lg={6}>
              <RulesStepBox
                title="Выигрывайте 100 000 ₽"
                body={`которые можно также распределить на своё усмотрение 
                — оставить себе или отправить на посадку деревьев. 
                Каждый зарегистрированный уникальный QR-код – дополнительный шанс на победу.`}
                image={Step5}
              />
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <a href={'/backend/files/rules.pdf'} target="_blank" className={classes.linkRules}>
            Прочитать полные правила акции
          </a>
        </Box>
      </Container>
    </Box>
  );
};

export default Rules;
