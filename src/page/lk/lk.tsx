import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Container, Fade, Grid } from '@material-ui/core';
import {
  codeRegister as codeRegisterAction,
  getSubscribe,
  lkInfo as lkInfoAction,
  orderPrize,
  PrizeValiant,
  updateSubscribe,
} from '../../api/actions';
import BlockItem from './BlockItem';
import Alert, { AlertProps } from '../../components/alert';
import { modalName as signinModalName } from '../signin';
import DialogGuidCheck, { DialogGuidCheckProps } from './dialog-guid-check';
import DialogUploadCheckWizard from './dialog-upload-check-wizard';
import dialogUploadCheckWizard, {
  DialogUploadCheckWizardProps,
} from './dialog-upload-check-wizard';
import SignupForm from './signup-form';
import { TransitionProps } from '@material-ui/core/transitions';
import { useDispatch, useSelector } from '../../hooks';
import { UserDataLkType } from './types';
import { BodyText, PageTitle } from '../../components/typography';
import StatSummary from './StatSummary';
import ActionPanel, { PrizeOrderFunc } from './ActionPanel';
import StatDetails from './StatDetails';
import useStyles from './lk.styles';
import { colors } from '../../theme/theme';
import Subscribes from './Subscribes';
import { useConfirm } from '../../components/ConfirmDialog';
import { getMessageString } from '../../utils/message';
import { resetCodeAction } from '../../store/code/action';
import { ACTION, CATEGORY, ga } from '../../components/ga';
import { TypeCode } from '../code';

interface Props {
  isAuth: boolean;
  loading: boolean;
  authData: any;
}

export default (props: Props) => {
  // const { isDocPeriodEnd } = useSelector(
  //   (state: { propsReducer: ProjectProps }) => state.propsReducer,
  // );
  const classes = useStyles();
  const { isAuth = false, loading = false, authData = {} } = props;
  const [processed, setProcessed] = useState(loading);
  const { open: openGame = false } = useSelector((state) => state.gameReducer);

  const codeStore = useSelector((state) => state.codeReducer.code);
  const typeCodeStore = useSelector((state) => state.codeReducer.typeCode);
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const history = useHistory();

  const loadSubscribe = useCallback(async () => {
    try {
      const r = await getSubscribe();
      const subscribeId = r.data?.data?.subscribeId;
      const message = getMessageString(r.data?.message);
      // console.log({ subscribeId, message });
      if (subscribeId && message) {
        confirm &&
          (await confirm({
            title: 'Информация',
            body: message,
            alert: true,
            confirmationText: 'Ok',
          }));
        await updateSubscribe(subscribeId);
        await loadSubscribe();
      }
    } catch (e) {}
  }, [confirm]);

  useEffect(() => {
    loadSubscribe().then(() => null);
  }, [loadSubscribe]);

  const [alertProps, setAlertProps] = useState<AlertProps>({
    open: false,
    result: false,
    onClose: () => {
      setAlertProps({ ...alertProps, open: false });
    },
  });

  // для однократного открытия диалога
  const [loadingLkInfo, setLoadingLkInfo] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [userDataLk, setUserDataLk] = useState<UserDataLkType | undefined>(undefined);

  const [dialogGuidCheckProps, setDialogGuidCheckProps] = useState<DialogGuidCheckProps>({
    open: false,
    onCloseDialog: () => {
      setDialogGuidCheckProps({ ...dialogGuidCheckProps, open: false });
    },
  });
  const [dialogUploadCheckWizardProps, setDialogUploadCheckWizard] = useState<
    DialogUploadCheckWizardProps
  >({
    open: false,
    onCloseDialog: () => {
      setDialogUploadCheckWizard({ ...dialogUploadCheckWizardProps, open: false });
    },
  });

  const [registerCodeProcess, setRegisterCodeProcess] = useState<boolean>(false);

  const loadLkInfo = useCallback(() => {
    setLoadingLkInfo(true);
    lkInfoAction().then((r) => {
      // setDocList(r.data?.doc || []);
      // setPrizList(r.data?.prizes || []);
      setLoadingLkInfo(false);
      setUserDataLk({
        needPerson: r?.data?.person_need,
        docs: r.data?.doc,
        prizes: r.data?.prizes,
        codes: r.data?.code,
        balls: r.data?.ball,
        ballBalance: r.data?.ball_sum,
        woods: r.data?.woods,
      });
    });
  }, []);

  useEffect(() => {
    if (codeStore && !registerCodeProcess) {
      // регистрирем код
      setRegisterCodeProcess(true);

      console.log({ codeStore, typeCodeStore });
      (async () => {
        try {
          const r = await codeRegisterAction(codeStore);
          const responseMessage = await getMessageString(r.data?.message);
          try {
            ga.send(CATEGORY.Qr, ACTION.register_check, responseMessage);
          } catch (ex) {}

          if (r.data?.data?.prefix === 'AR') {
            loadSubscribe().then(() => null);
          } else {
            typeCodeStore !== TypeCode.AR &&
              confirm &&
              confirm({
                title: 'Внимание',
                body: responseMessage,
                alert: true,
                confirmationText: 'OK',
              }).then(() => null);
          }
          loadLkInfo();
        } catch (e) {
        } finally {
          dispatch(resetCodeAction());
          setRegisterCodeProcess(false);
        }
      })();
    }
  }, [codeStore, typeCodeStore, confirm, dispatch, registerCodeProcess, loadLkInfo, loadSubscribe]);

  useEffect(() => {
    console.log('init');
    loadLkInfo();
  }, [loadLkInfo]);

  useEffect(() => {
    setProcessed(loadingLkInfo);
  }, [loadingLkInfo]);

  const handleDocInfo = useCallback(() => {
    setDialogGuidCheckProps({
      ...dialogGuidCheckProps,
      open: true,
    });
  }, [dialogGuidCheckProps]);

  const handlePrizeOrder = useCallback<PrizeOrderFunc>(
    async (prize) => {
      try {
        confirm &&
          (await confirm({
            body: 'После подтверждения списания средств, отменить операцию будет невозможно',
          }));
        setProcessed(true);
        const resp = await orderPrize(prize);
        if (resp.data?.status === 1) {
          await loadLkInfo();
          confirm &&
            confirm(
              prize === PrizeValiant.CERT
                ? {
                    title: 'Спасибо',
                    body: (
                      <Box>
                        Денежные средства будут направлены на посадку деревьев. Скачайте Ваш
                        сертификат, подтверждающий посадку дерева, в таблице "Мой эко-счет"
                      </Box>
                    ),
                    alert: true,
                    confirmationText: 'OK',
                  }
                : {
                    title: 'Денежные средства',
                    body: `Денежные средства будут направлены на номер телефона, 
                    указанный при регистрации, в течение 10 дней`,
                    alert: true,
                    confirmationText: 'OK',
                  },
            );
        }
      } catch (e) {
      } finally {
        setProcessed(false);
      }
    },
    [confirm, loadLkInfo],
  );

  return (
    <Box
      pt={openGame ? 0 : 10}
      pb={openGame ? 0 : 8}
      display={openGame ? 'flex' : 'block'}
      flex={'1 1 auto'}
      flexDirection={'column'}
      justifyContent={'center'}
    >
      <Box mt={2} pb={3} className={classes.lkPageContainer}>
        <PageTitle>Личный кабинет</PageTitle>
        <Transition in={!isAuth}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100%"
          >
            <Box flex="0 0 auto">
              <Button
                color="primary"
                variant="contained"
                onClick={() =>
                  history.push({
                    pathname: '/',
                    search: `w=${signinModalName}`,
                  })
                }
              >
                Авторизация
              </Button>
            </Box>
          </Box>
        </Transition>
        <Transition in={isAuth && !!authData?.needFullRegister}>
          <Grid container spacing={2} alignItems="stretch">
            <BlockItem xs={12} item title="Заполните личные данные">
              <SignupForm initialValues={authData?.user} />
            </BlockItem>
          </Grid>
        </Transition>

        <Transition in={isAuth && !authData?.needFullRegister}>
          <Container>
            <Box textAlign="center" my={4}>
              <BodyText color={colors.GREY2} fontSize={16}>
                Срок регистрации кодов: с 01.04.2021 по 30.06.2021
              </BodyText>
            </Box>

            {/* КНОПКИ ЗАПОЛНИТЬ ПДН */}
            {/* <PersonButtons userDataLk={userDataLk} /> */}

            <Grid container justify={'center'}>
              <Grid xs={12} sm={12} md={9} lg={9} item>
                <Grid container spacing={2}>
                  <Grid xs={12} sm={6} item>
                    {/* СВОДНАЯ СТАТИСТИКА */}
                    <StatSummary
                      code={userDataLk?.codes?.length ?? 0}
                      tree={userDataLk?.woods ?? 0}
                      amount={userDataLk?.ballBalance ?? 0}
                    />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    {/* КНОПКИ ДЕЙСТВИЯ */}
                    <ActionPanel
                      processed={processed}
                      amountSum={userDataLk?.ballBalance ?? 0}
                      onButtonThirdClick={() => {
                        setDialogUploadCheckWizard({
                          ...dialogUploadCheckWizardProps,
                          open: true,
                        });
                      }}
                      onButtonFirstClick={handlePrizeOrder}
                      onButtonSecondClick={handlePrizeOrder}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Transition>
      </Box>

      {/* ДЕТАЛЬНАЯ СТАТИСТИКА */}
      <Transition in={isAuth && !authData?.needFullRegister}>
        <StatDetails
          prizList={userDataLk?.prizes}
          docList={userDataLk?.docs}
          promoCodeList={userDataLk?.codes}
          ballAmountList={userDataLk?.balls}
          loadLkInfo={loadLkInfo}
          processed={processed}
        />
      </Transition>
      <Transition in={isAuth && !authData?.needFullRegister}>
        <Container>
          <Box mt={3} display="flex" justifyContent="center">
            <Subscribes authData={authData} />
          </Box>
        </Container>
      </Transition>
      <DialogGuidCheck {...dialogGuidCheckProps} />
      <DialogUploadCheckWizard
        onRegister={() => {
          setDialogUploadCheckWizard({
            ...dialogUploadCheckWizard,
            open: false,
          });
          loadLkInfo();
        }}
        {...dialogUploadCheckWizardProps}
        onCloseDialog={() => {
          setDialogUploadCheckWizard({
            ...dialogUploadCheckWizard,
            open: false,
          });
        }}
        handleDocInfo={handleDocInfo}
      />
      <Alert {...alertProps} />
    </Box>
  );
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Fade ref={ref} unmountOnExit timeout={500} {...props} />;
});
