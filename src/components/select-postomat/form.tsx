import React, { useState, useEffect } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Box, Button, makeStyles, Link } from '@material-ui/core';
import { setPickpointResult as setPickpointResultAction } from '../../api/actions';
import { required } from '../../components/form-control/rules';
import RenderTextField from '../../components/form-control/render-text-field';
import Snackbar, { SnackbarProps } from '../../components/snackbar';
import { ApiAnswer, ApiAnswerStatus } from '../../api/types';
import { SnackBarTypeMessage } from '../../components/snackbar/snackbar';
import SubmitButton from '../../components/submit-button';
import Alert, { AlertProps } from '../../components/alert';

interface ErrorField {
  [key: string]: string;
}
interface FormProps {
  pickpointIkn?: number;
  userPrizId: number;
  initialValues?: {
    username?: string;
  };
  onProcessed?(r: boolean): void;
  onSuccess?(r: boolean): void;
}

interface Props {
  onSelectPostomat?(): void;
  pickpointResult?: any;
  pickpointIkn?: number;
  processed: boolean; // the custom prop
  snackbarProps: SnackbarProps;
}

const useStyles = makeStyles((theme) => ({
  linkSelectPostomat: {
    fontSize: '80%',
    textDecoration: 'underline',
  },
  address: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '80%',
    '&>*': {
      fontWeight: 'normal',
    },
  },
}));
//
const Form = (props: InjectedFormProps & Props) => {
  const {
    onSelectPostomat = () => {},
    pickpointResult,
    handleSubmit,
    submitting,
    processed,
    snackbarProps,
    submitFailed,
  } = props;
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <Box py={1} pt={3}>
        <Field
          name="last_name"
          component={RenderTextField}
          label="Фамилия"
          disabled={submitting}
          validate={[required]}
          autoComplete="off"
        />
      </Box>
      <Box py={1}>
        <Field
          name="first_name"
          component={RenderTextField}
          label="Имя"
          disabled={submitting}
          validate={[required]}
          autoComplete="off"
        />
      </Box>
      <Box py={1}>
        <Field
          name="middle_name"
          component={RenderTextField}
          label="Отчество"
          disabled={submitting}
          validate={[required]}
          autoComplete="off"
        />
      </Box>
      <Box py={1} textAlign="left" className={classes.address}>
        Адрес&nbsp;доставки:&nbsp;<span>{pickpointResult?.name}</span>
        <br />
        <span>{pickpointResult?.address}</span>
      </Box>
      <Box py={1} textAlign="left">
        <Link
          className={classes.linkSelectPostomat}
          href="#"
          style={{
            color: submitFailed && !pickpointResult ? '#E6001F' : '#fff',
          }}
          onClick={(e: any) => {
            onSelectPostomat();
            e?.preventDefault();
          }}
        >
          Выбрать постамат
        </Link>
      </Box>

      <Snackbar {...snackbarProps} />
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" p={1}>
        <Box flex="0 0 auto" px={1 / 2} my={4}>
          <SubmitButton
            color="secondary"
            type="submit"
            disabled={submitting}
            variant="contained"
            processed={processed}
          >
            Подтвердить
          </SubmitButton>
        </Box>
      </Box>
    </form>
  );
};

const ReduxForm = reduxForm<{}, Props>({
  form: 'selectPostomatForm', // a unique identifier for this form
  enableReinitialize: true,
})(Form);

export default ({
  initialValues,
  pickpointIkn,
  userPrizId,
  onProcessed = (r?: boolean) => {},
  onSuccess = (r?: boolean) => {},
}: FormProps) => {
  console.log({ pickpointIkn });

  const [pickpointResult, setPickpointResult] = useState<any>(undefined);
  const [processed, setProcessed] = useState(false);
  const [snackbarProps, setSbnackbarProps] = useState<SnackbarProps>({
    show: false,
    message: undefined,
    apiAnswerMessage: undefined,
    onClose: () => {
      setSbnackbarProps({ ...snackbarProps, show: false });
    },
  });
  const [alertProps, setAlertProps] = useState<AlertProps>({
    open: false,
    result: false,
    onClose: () => {
      setAlertProps({ ...alertProps, open: false });
      onSuccess(true);
    },
  });

  async function onSubmit(data: any) {
    console.log('onSubmit', data);
    setSbnackbarProps({
      ...snackbarProps,
      type: SnackBarTypeMessage.ERROR,
      show: false,
      message: undefined,
      apiAnswerMessage: undefined,
      showApiAnswerMessage: false,
    });

    setProcessed(true);

    const r = await setPickpointResultAction(userPrizId, {
      ...data,
      postomat: pickpointResult,
    }).finally(() => setProcessed(false));

    if (r.status == ApiAnswerStatus.SUCCESS) {
      setAlertProps({
        ...alertProps,
        open: true,
        messages: r.message,
      });
    } else {
      setSbnackbarProps({
        ...snackbarProps,
        type: SnackBarTypeMessage.WARNING,
        show: true,
        apiAnswerMessage: r.message,
        showApiAnswerMessage: true,
      });
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
  }

  function onSelectPostomat() {
    if (!!window.PickPoint && !!window.PickPoint.open)
      window?.PickPoint?.open(
        (r: any) => setPickpointResult(r),
        !!pickpointIkn ? { ikn: pickpointIkn } : undefined,
      );
  }

  useEffect(() => {
    onProcessed(processed);
  }, [processed]);
  return (
    <>
      <ReduxForm
        onSelectPostomat={onSelectPostomat}
        pickpointResult={pickpointResult}
        pickpointIkn={pickpointIkn}
        initialValues={initialValues}
        processed={processed}
        onSubmit={onSubmit}
        onSubmitFail={onSubmitFail}
        snackbarProps={snackbarProps}
      />
      <Alert {...alertProps} />
    </>
  );
};
