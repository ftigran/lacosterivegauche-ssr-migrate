import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Box, Button, Grid } from '@material-ui/core';
import { forgotPasswordPhone as forgotPasswordService } from '../../api/actions';

import { required, phone as phoneRule, email } from '../../components/form-control/rules';
import PhoneMask from '../../components/form-control/mask/phone-mask';

import RenderTextField from '../../components/form-control/render-text-field';
import Snackbar, { SnackbarProps } from '../../components/snackbar';
import { ApiAnswer, ApiAnswerStatus } from '../../api/types';
import { SnackBarTypeMessage } from '../../components/snackbar/snackbar';
import SubmitButton from '../../components/submit-button';
import ReCAPTCHA from 'react-google-recaptcha';
import { AlertProps } from '../../components/alert';
import theme, { colors } from '../../theme/theme';
import { modalName as signinModalName } from '../signin';
import { Link as LinkRoute } from 'react-router-dom';
import font from '../../theme/font';

interface FormProps {
  recaptchaSitekey?: string | undefined;

  initialValues?: {
    username?: string;
  };
  onSuccess?(alertProps: AlertProps): void;
  onProcessed?(r: boolean): void;
}

interface Props {
  processed?: boolean; // the custom prop
  snackbarProps: SnackbarProps;
}

//

const Form = (props: InjectedFormProps & Props) => {
  const { handleSubmit, submitting, processed = false, snackbarProps } = props;
  const phone = useMemo(() => {
    return phoneRule();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        px={{ xs: 0, sm: 4 }}
        pt={0}
        pb={1}
        style={{
          borderRadius: theme.spacing(1 / 2),
        }}
      >
        <Box mb={3} color={colors.GREY2} fontFamily={font.primary} fontSize={'85%'}>
          Укажите телефон, с которым вы зарегистрированы в Акции. Пароль к Личному кабинету будет
          отправлен  на указанный телефон.
        </Box>
        <Box py={1}>
          <Field
            name="phone"
            component={RenderTextField}
            label="Телефон"
            disabled={submitting || processed}
            autoComplete="off"
            validate={[required, phone]}
            inputComponent={PhoneMask}
          />
          {/*<Field*/}
          {/*  name="email"*/}
          {/*  component={RenderTextField}*/}
          {/*  label="E-mail"*/}
          {/*  disabled={submitting || processed}*/}
          {/*  autoComplete="off"*/}
          {/*  validate={[required, email]}*/}
          {/*  inputProps={{ maxLength: 128 }}*/}
          {/*/>*/}
        </Box>

        <Snackbar {...snackbarProps} />
      </Box>
      <Box px={2} py={0}>
        <Grid container spacing={2} alignItems={'center'} justify={'center'}>
          <Grid item xs={9} sm={6}>
            <SubmitButton
              size="large"
              color="primary"
              type="submit"
              disabled={submitting}
              variant="contained"
              processed={processed}
              fullWidth
              className="button-dialog"
            >
              Восстановить
            </SubmitButton>
          </Grid>
          {/*  <Grid item xs={12} sm={6}>*/}
          {/*    <Button*/}
          {/*      fullWidth*/}
          {/*      size="large"*/}
          {/*      color="primary"*/}
          {/*      disabled={submitting || processed}*/}
          {/*      to={{ search: `w=${signinModalName}` }}*/}
          {/*      variant="contained"*/}
          {/*      component={LinkRoute}*/}
          {/*      className="button-dialog"*/}
          {/*    >*/}
          {/*      Войти*/}
          {/*    </Button>*/}
          {/*  </Grid>*/}
        </Grid>
      </Box>
    </form>
  );
};

const ReduxForm = reduxForm<{}, Props>({
  form: 'forgotPasswordForm', // a unique identifier for this form
  enableReinitialize: true,
})(Form);

export default ({
  recaptchaSitekey = '',
  onProcessed = (r: boolean) => {},
  initialValues,
  onSuccess = (alertProps: AlertProps) => {},
}: FormProps) => {
  const [formData, setFormData] = useState({});
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [processed, setProcessed] = useState(false);
  const [snackbarProps, setSbnackbarProps] = useState<SnackbarProps>({
    show: false,
    message: undefined,
    apiAnswerMessage: undefined,
    onClose: () => {
      setSbnackbarProps({ ...snackbarProps, show: false });
    },
  });

  function onSubmit(data: any) {
    console.log('onSubmit', data);
    setSbnackbarProps({
      ...snackbarProps,
      type: SnackBarTypeMessage.ERROR,
      show: false,
      message: undefined,
      apiAnswerMessage: undefined,
    });

    setProcessed(true);
    let { phone = '' } = data;
    phone = phone.replace(/\D/g, '').substr(-10);
    setFormData({ ...data, phone });
    // setFormData(data);
    recaptchaRef?.current?.execute();
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
  }

  function onRecaptchaExpired() {
    console.log('forgot-password onRecaptchaExpired');
    setProcessed(false);
  }

  async function onRecaptchaChange(recaptchaToken: any) {
    const r = await forgotPasswordService({
      ...formData,

      recaptcha: recaptchaToken,
    });
    if (r.data?.status === ApiAnswerStatus.SUCCESS) {
      console.info('forgotPasswordService success', r);
      onSuccess({
        result: true,
        open: true,
        data: formData,
        messages: r.data?.message,
      });
    } else {
      setProcessed(false);
      console.info('forgotPasswordService error', r);
      setSbnackbarProps({
        ...snackbarProps,
        type: SnackBarTypeMessage.ERROR,
        show: true,
        apiAnswerMessage: r.data?.message,
        showApiAnswerMessage: true,
      });
      recaptchaRef.current?.reset();
    }
  }
  function onRecaptchaErrored() {
    console.log('forgot-password onRecaptchaErrored');
    setProcessed(false);
  }

  useEffect(() => {
    onProcessed(processed);
  }, [processed]);

  return (
    <>
      {!!recaptchaSitekey.length && (
        <ReCAPTCHA
          key="forgot-password"
          ref={recaptchaRef}
          size="invisible"
          sitekey={recaptchaSitekey}
          onExpired={onRecaptchaExpired}
          onChange={onRecaptchaChange}
          onErrored={onRecaptchaErrored}
        />
      )}
      <ReduxForm
        initialValues={initialValues}
        processed={processed}
        onSubmit={onSubmit}
        onSubmitFail={onSubmitFail}
        snackbarProps={snackbarProps}
      />
    </>
  );
};
