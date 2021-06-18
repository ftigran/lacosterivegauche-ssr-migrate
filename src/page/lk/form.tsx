import React, { useEffect, useState } from 'react';
import { Box, Theme, useMediaQuery } from '@material-ui/core';

import Snackbar, { SnackbarProps, SnackBarTypeMessage } from '../../components/snackbar';

import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import RenderTextField from '../../components/form-control/render-text-field';
import DateMask from '../../components/form-control/mask/date-mask';
import TimeMask from '../../components/form-control/mask/time-mask';
import SummaMask from '../../components/form-control/mask/summa-mask';
import FdMask from '../../components/form-control/mask/fd-mask';
import FpdMask from '../../components/form-control/mask/fpd-mask';
import FnMask from '../../components/form-control/mask/fn-mask';

import {
  digitsFd as ruleDigitsFd,
  digitsFn as ruledigitsFn,
  digitsFpd as ruleDigitsFpd,
  required,
  summa as ruleSumma,
  time,
} from '../../components/form-control/rules';
import SubmitButton from '../../components/submit-button';
import { chekRegister as chekRegisterAction } from '../../api/actions';
import moment from 'moment';
import Money from '../../components/filter/money';
import { AlertProps } from '../../components/alert';
import { ApiAnswerStatus } from '../../api/types';
import { FormData as FormDataRefund } from './RefundForm/type';
import { ACTION, CATEGORY, ga } from '../../components/ga';
//

const digitsFn = ruledigitsFn();
const summa = ruleSumma();
const digitsFd = ruleDigitsFd();
const digitsFpd = ruleDigitsFpd();
interface FormProps {
  onSuccess?(alertProps: AlertProps): void;
  onProcessed?(r: boolean): void;
  initialValues?: {
    upload_file?: { id?: number; hash: string } | undefined | null;
    check_fd?: string | undefined;
    check_fn?: string | undefined;
    check_fpd?: string | undefined;
    check_date?: string | undefined;
    check_time?: string | undefined;
    check_summa?: string | undefined;
  };
  formDataRefund?: FormDataRefund;
}

interface Props {
  processed: boolean; // the custom prop
  snackbarProps: SnackbarProps;
}

const Form = (props: InjectedFormProps & Props) => {
  const { handleSubmit, processed, snackbarProps } = props;

  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  // const checkDate = useMemo(() => {
  //     return ruleCheckDate(
  //         retailer?.start,
  //         retailer?.end,
  //         "Дата чека не в интервале акции"
  //     );
  // }, [retailer]);

  return (
    <form onSubmit={handleSubmit}>
      <Field
        disabled={processed}
        component="input"
        name="upload_file"
        type="hidden"
        validate={[required]}
      />
      <Box p={2}>
        <Box
          flexDirection={sm ? 'column' : 'row'}
          display="flex"
          alignItems={sm ? 'stretch' : 'space-between'}
        >
          <Box flex={sm ? '1 1 auto' : '1 1 50%'} px={sm ? 0 : 1} py={1}>
            <Field
              disabled={processed}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              name="check_date"
              component={RenderTextField}
              inputComponent={DateMask}
              label="Дата чека"
              validate={[required]}
              fullWidth={true}
            />
          </Box>
          <Box flex={sm ? '1 1 auto' : '1 1 50%'} px={sm ? 0 : 1} py={1}>
            <Field
              disabled={processed}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              name="check_time"
              component={RenderTextField}
              label="Время чека"
              inputComponent={TimeMask}
              validate={[required, time]}
              fullWidth={true}
            />
          </Box>
        </Box>
        <Box
          flexDirection={sm ? 'column' : 'row'}
          display="flex"
          alignItems={sm ? 'stretch' : 'space-between'}
        >
          <Box flex={sm ? '1 1 auto' : '1 1 50%'} px={sm ? 0 : 1} py={1}>
            <Field
              disabled={processed}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              name="check_summa"
              component={RenderTextField}
              label="Сумма чека"
              inputComponent={SummaMask}
              validate={[required, summa]}
              fullWidth={true}
            />
          </Box>
          <Box flex={sm ? '1 1 auto' : '1 1 50%'} px={sm ? 0 : 1} py={1}>
            <Field
              disabled={processed}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              name="check_fn"
              component={RenderTextField}
              label="ФН"
              inputComponent={FnMask}
              validate={[required, digitsFn]}
              fullWidth={true}
            />
          </Box>
        </Box>
        <Box
          flexDirection={sm ? 'column' : 'row'}
          display="flex"
          alignItems={sm ? 'stretch' : 'space-between'}
        >
          <Box flex={sm ? '1 1 auto' : '1 1 50%'} px={sm ? 0 : 1} py={1}>
            <Field
              disabled={processed}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              name="check_fd"
              component={RenderTextField}
              label="ФД"
              inputComponent={FdMask}
              validate={[required, digitsFd]}
              fullWidth={true}
            />
          </Box>
          <Box flex={sm ? '1 1 auto' : '1 1 50%'} px={sm ? 0 : 1} py={1}>
            <Field
              disabled={processed}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              name="check_fpd"
              component={RenderTextField}
              label="ФП"
              inputComponent={FpdMask}
              validate={[required, digitsFpd]}
              fullWidth={true}
            />
          </Box>
        </Box>
        <Box px={sm ? 0 : 1}>
          <Snackbar {...snackbarProps} mt={2} />
        </Box>
      </Box>

      <Box
        mt={2}
        className="actions"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box flex="0 0 auto">
          <SubmitButton
            processed={processed}
            color="primary"
            variant="contained"
            title="Зарегистрировать чек"
          />
        </Box>
      </Box>
    </form>
  );
};

const ReduxForm = reduxForm<{}, Props>({
  form: 'checkRegisterForm', // a unique identifier for this form
  // enableReinitialize: true,
})(Form);

export default (props: FormProps) => {
  const {
    onSuccess = (alertPros: AlertProps) => {},
    onProcessed = (r: boolean) => {},
    initialValues,
    formDataRefund,
  } = props;

  const [snackbarProps, setSbnackbarProps] = useState<SnackbarProps>({
    show: false,
    message: undefined,
    showApiAnswerMessage: true,
    apiAnswerMessage: undefined,
    onClose: () => {
      setSbnackbarProps({ ...snackbarProps, show: false });
    },
  });

  const [processed, setProcessed] = useState(false);

  async function onSubmit(data: any) {
    console.log('onSubmit', data);
    setSbnackbarProps({
      ...snackbarProps,
      type: SnackBarTypeMessage.ERROR,
      show: false,
      apiAnswerMessage: undefined,
    });
    setProcessed(true);
    const r = await chekRegisterAction({
      ...data,
      check_date: moment(data?.check_date, 'DD.MM.YYYY').format('YYYY-MM-DD'),
      check_summa: Money(data?.check_summa),
      questionary: formDataRefund,
    }).finally(() => {
      setProcessed(false);
    });
    try {
      ga.send(
        CATEGORY.Check,
        ACTION.register_check,
        r.status.toString(),
        Object.values(r.message).join(','),
      );
    } catch (err) {
      console.log('CATEGORY.Check ACTION.register_check err: ', err);
    }
    if (r.status === ApiAnswerStatus.SUCCESS) {
      // ga.send(CATEGORY.InvoiceReg, ACTION.reg_success);
      onSuccess({
        result: r.status === ApiAnswerStatus.SUCCESS,
        open: r.status === ApiAnswerStatus.SUCCESS,
        messages: r.message,
        data: r.data,
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
  useEffect(() => {
    onProcessed(processed);
  }, [processed]);

  return (
    <>
      <ReduxForm
        processed={processed}
        onSubmit={onSubmit}
        onSubmitFail={onSubmitFail}
        snackbarProps={snackbarProps}
        initialValues={initialValues}
      />
    </>
  );
};
