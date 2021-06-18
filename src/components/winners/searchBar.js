import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Paper, InputBase, IconButton } from '@material-ui/core';
import Snackbar, { SnackbarProps, SnackBarTypeMessage } from '../snackbar';
import { ACTION, CATEGORY, ga } from '../ga';
import { getWinners as winnersAction } from '../../api/actions';
import { ApiAnswerStatus } from '../../api/types';

import PhoneMask from '../form-control/mask/phone-mask';
import RenderTextField from '../form-control/render-text-field';
import { required, phone as phoneRule } from '../form-control/rules';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import loop from 'src/img/search.svg';
import Scroll from 'react-scroll';
import './searchBar.scss';

const Bar = (props) => {
  const phone = useMemo(() => {
    return phoneRule('Укажите верный номер телефона или пустую строку');
  }, []);
  const { handleSubmit, processed, snackbarProps } = props;

  return (
    // <Paper component="form" className={'winnersForm'} >
    <form className={'winnersForm'} onSubmit={handleSubmit}>
      {/* <InputBase
            className={"winnersInput"}
            placeholder="e-mail"
            inputProps={{ "aria-label": "e-mail" }}
          /> */}
      <Field
        name="phone"
        component={RenderTextField}
        label="Телефон"
        disabled={processed}
        autoComplete="off"
        validate={[phone]}
        inputComponent={PhoneMask}
      />
      <button type="submit" aria-label="search" className={'winnersButton'}>
        <img src={loop} width="37" height="37" />
      </button>
      <Snackbar {...snackbarProps} mt={2} />
    </form>
    // </Paper>
  );
};

const ReduxForm = reduxForm({
  form: 'searchWinnerForm', // a unique identifier for this form
  initialValues: {
    phone: '',
  },
  // enableReinitialize: true,
})(Bar);

export default (props) => {
  const {
    onSuccess = () => {},
    onProcessed = () => {},
    initialValues,
    formDataRefund,
    loadWinners,
  } = props;
  const [processed, setProcessed] = useState(false);
  const scroller = Scroll.scroller;

  const [snackbarProps, setSbnackbarProps] = useState({
    show: false,
    message: undefined,
    showApiAnswerMessage: true,
    apiAnswerMessage: undefined,
    onClose: () => {
      setSbnackbarProps({ ...snackbarProps, show: false });
    },
  });

  async function onSubmit(data) {
    console.log('onSubmit', data);
    setSbnackbarProps({
      ...snackbarProps,
      type: SnackBarTypeMessage.ERROR,
      show: false,
      apiAnswerMessage: undefined,
    });
    setProcessed(true);
    console.log('send');

    const send = data.phone.slice(3).replace(/[ )]/g, '');

    console.log(send);
    const r = await winnersAction('1', send)
      .then((r) => {
        scroller.scrollTo('winners', {
          duration: 1500,
          delay: 100,
          smooth: true,
          offset: -50, // Scrolls to element + 50 pixels down the page
        });
        if (r.data.total > 0) {
          loadWinners({
            per_page: r.data?.per_page,
            total: r.data?.total,
            page: r.data?.page,
            prizes: r.data?.data,
          });
          // ga.send(CATEGORY.InvoiceReg, ACTION.reg_success);
          // winnersAction(1, r.data);

          console.log('a');
        } else {
          loadWinners({
            per_page: r.data?.per_page,
            total: r.data?.total,
            page: r.data?.page,
            prizes: true,
          });
          // setSbnackbarProps({
          //   ...snackbarProps,
          //   type: SnackBarTypeMessage.WARNING,
          //   show: true,
          //   apiAnswerMessage: r.data.message,
          //   showApiAnswerMessage: true,
          // });
        }
      })
      .finally(() => {
        setProcessed(false);
      });
  }

  function onSubmitFail(data) {
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
