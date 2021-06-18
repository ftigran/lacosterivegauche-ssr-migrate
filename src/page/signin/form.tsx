import React, { useState, useEffect, useMemo } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Box, Button, makeStyles, Link, Grid, useMediaQuery, Theme } from '@material-ui/core';
import { signin as signinService } from '../../api/actions';
import { Link as LinkRoute, useHistory } from 'react-router-dom';
import { modalName as ForgotPasswordModalName } from '../forgot-password';
import { modalName as SignupModalName } from '../signup';

import { required, phone as phoneRule } from '../../components/form-control/rules';
import RenderTextField from '../../components/form-control/render-text-field';
import Snackbar, { SnackbarProps } from '../../components/snackbar';
import { ApiAnswer, ApiAnswerStatus } from '../../api/types';
import { SnackBarTypeMessage } from '../../components/snackbar/snackbar';
import SubmitButton from '../../components/submit-button';
import { ga, CATEGORY, ACTION } from '../../components/ga';
import theme, { colors } from '../../theme/theme';
import font from '../../theme/font';
import PhoneMask from '../../components/form-control/mask/phone-mask';
import { useSelector } from 'react-redux';
import { ProjectProps } from '../../store/props/types';

interface FormProps {
  initialValues?: {
    username?: string;
  };
  onProcessed?(r: boolean): void;
  onSuccess?(r: boolean): void;
  isSendConfirmCode?: boolean;
}

interface Props {
  processed: boolean; // the custom prop
  snackbarProps: SnackbarProps;
  isSendConfirmCode?: boolean;
}

const useStyles = makeStyles((theme) => ({
  linkForgotPassword: {
    color: colors.GREY2,
    fontSize: '70%',
    lineHeight: 1,
    textDecoration: 'none',
    textTransform: 'none',
    fontFamily: font.primary,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  textRegisterInfo: {
    color: colors.GREY2,
    textAlign: 'center',
    fontFamily: font.primary,
    fontSize: '100%',
    lineHeight: 1.3,
    marginBottom: theme.spacing(3),
  },
  textRegisterTitle: {
    color: colors.GREY2,
    textAlign: 'center',
    fontFamily: font.primary,
    fontSize: '100%',
    lineHeight: 1.3,
    marginBottom: theme.spacing(2),
  },
}));
//
const Form = (props: InjectedFormProps & Props) => {
  const { handleSubmit, submitting, processed, snackbarProps, isSendConfirmCode } = props;
  const classes = useStyles();
  const phone = useMemo(() => {
    return phoneRule();
  }, []);

  const { isDocPeriodEnd } = useSelector(
    (state: { propsReducer: ProjectProps }) => state.propsReducer,
  );

  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  return (
    <form onSubmit={handleSubmit}>
      <Box
        px={{
          xs: 0,
          sm: 4,
        }}
        pt={4}
        pb={{
          xs: 0,
          sm: 3,
        }}
      >
        {isSendConfirmCode && (
          <Box py={2}>
            <Box className={classes.textRegisterTitle}>Уважаемый участник!</Box>
            <Box className={classes.textRegisterInfo}>
              На указанный номер телефона отправлен пароль. Для завершения регистрации в Акции
              войдите в личный кабинет, указав полученный в смс пароль. Если смс к Вам так и не
              пришло, обратитесь в службу поддержки Акции.
            </Box>
          </Box>
        )}
        {!isSendConfirmCode && (
          <Box pt={1} pb={2}>
            <Field
              name="username"
              component={RenderTextField}
              label="Телефон"
              disabled={submitting}
              validate={[required]}
              autoComplete="off"
              inputComponent={PhoneMask}
            />
          </Box>
        )}
        <Box py={1}>
          <Field
            name="password"
            component={RenderTextField}
            label="Пароль"
            disabled={submitting}
            type="password"
            autoComplete="off"
            validate={[required]}
            inputProps={{ maxLength: 6 }}
          />
          {/*<Box pb={1} className={classes.textRegisterInfo}>*/}
          {/*  Пароль должен состоять из 6 символов*/}
          {/*</Box>*/}
        </Box>
        <Snackbar {...snackbarProps} />
      </Box>
      <Box px={2} pt={1} pb={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Box pb={2}>
              <SubmitButton
                fullWidth={false}
                size="large"
                color="primary"
                type="submit"
                disabled={submitting}
                variant="contained"
                processed={processed}
                className="button-dialog"
              >
                Войти
              </SubmitButton>
            </Box>
          </Grid>
          {!isSendConfirmCode && (
            <Grid item xs={12} sm={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {!isDocPeriodEnd && (
                    <Box textAlign={xs ? 'center' : 'left'}>
                      <LinkRoute className={classes.linkForgotPassword} to={`/signup`}>
                        Зарегистрироваться
                      </LinkRoute>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {!isSendConfirmCode && (
                    <Box textAlign={xs ? 'center' : 'right'}>
                      <LinkRoute
                        className={classes.linkForgotPassword}
                        to={`?w=${ForgotPasswordModalName}`}
                      >
                        Забыли пароль?
                      </LinkRoute>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </form>
  );
};

const ReduxForm = reduxForm<{}, Props>({
  form: 'signinForm', // a unique identifier for this form
  enableReinitialize: true,
})(Form);

export default ({
  initialValues,
  onProcessed = (r?: boolean) => {},
  onSuccess = (r?: boolean) => {},
  isSendConfirmCode = false,
}: FormProps) => {
  const [processed, setProcessed] = useState(false);
  const [snackbarProps, setSbnackbarProps] = useState<SnackbarProps>({
    show: false,
    message: undefined,
    apiAnswerMessage: undefined,
    onClose: () => {
      setSbnackbarProps({ ...snackbarProps, show: false });
    },
  });

  function onSubmitSuccess(res: ApiAnswer) {
    console.log('onSubmitSuccess', res);
    if (res.status === 200) {
      setSbnackbarProps({
        ...snackbarProps,
        type: SnackBarTypeMessage.SUCCESS,
        show: true,
        showApiAnswerMessage: false,
        // apiAnswerMessage: res.data.message,
        message: 'Успешная авторизация',
      });
    } else {
      setSbnackbarProps({
        ...snackbarProps,
        type: SnackBarTypeMessage.ERROR,
        show: true,
        message: 'Неверный логин или пароль',
        apiAnswerMessage: undefined,
      });
    }

    onSuccess(res.status === 200);
  }

  async function onSubmit(data: any) {
    console.log('onSubmit', data);
    setSbnackbarProps({
      ...snackbarProps,
      type: SnackBarTypeMessage.ERROR,
      show: false,
      message: undefined,
      apiAnswerMessage: undefined,
    });

    const { username = '', password = '' } = data;
    setProcessed(true);

    try {
      // const r = await signinService(username.replace(/\s/g, ''), password);
      const r = await signinService(username.replace(/\D/g, '').substr(-10), password);
      ga.send(CATEGORY.Authorization, ACTION.send_a_form, r.status.toString());
      console.info('signinService', r);
      // if (r.status !== ApiAnswerStatus.SUCCESS) {
      //   setProcessed(false);
      // }
      return r;
    } catch (e) {
      setProcessed(false);
      return e;
    }
  }

  function onSubmitFail(data: any) {
    console.log('onSubmitFail', data);
    setSbnackbarProps({
      ...snackbarProps,
      type: SnackBarTypeMessage.WARNING,
      show: true,
      message: 'Некоторые поля не заполнены или заполнены неверно',
      apiAnswerMessage: undefined,
    });
    setProcessed(false);
  }

  useEffect(() => {
    onProcessed(processed);
  }, [processed]);
  return (
    <ReduxForm
      initialValues={initialValues}
      processed={processed}
      onSubmit={onSubmit}
      onSubmitFail={onSubmitFail}
      snackbarProps={snackbarProps}
      onSubmitSuccess={onSubmitSuccess}
      isSendConfirmCode={isSendConfirmCode}
    />
  );
};
