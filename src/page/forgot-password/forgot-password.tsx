import React, { useState, useEffect } from 'react';
import Form from './form';
import Dialog, { Params as DialogParams } from '../../components/dialog';

import { Box, DialogProps } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { SET_PROPS, ProjectProps } from '../../store/props/types';
import SocialAuth from '../../components/social-auth';
import { useLocation, useHistory } from 'react-router-dom';
import { parse } from 'querystring';
import Alert, { AlertProps } from '../../components/alert';
import { modalName as signinModalName } from '../signin';

export const modalName: string = 'ForgotPasswordDialog';

interface Props {
  recaptchaSitekey: string | undefined;
  isAuth: boolean;
  loading: boolean;
}

const Page = (params: DialogParams & DialogProps & Props) => {
  const [alertProps, setAlertProps] = useState<AlertProps>({
    open: false,
    result: false,
  });
  const location = useLocation();
  const query = parse(location.search.replace(/^\?/, ''));

  const history = useHistory();
  const {
    onCloseDialog = (r: boolean) => {},
    isAuth,
    recaptchaSitekey,
    loading,
    ...props
  } = params;

  const [processed, setProcessed] = useState(loading);

  const dispatch = useDispatch();

  function onSuccess(ap: AlertProps) {
    if (ap.result) {
      new Promise((resolve) => {
        setTimeout(() => {
          dispatch({
            type: SET_PROPS,
            payload: { dialog: { [modalName]: { open: false } } },
          });
          resolve();
        }, 1000);
      })
        .then(() => onCloseDialog(ap.result))
        .then(() => {
          setAlertProps(ap);
        });
    }
  }
  function onCloseAlert(r: boolean, data: any) {
    if (r) {
      history.push({
        search: `w=${signinModalName}&username=${data?.phone}`,
      });
      setAlertProps({ open: false, result: false });
    }
  }
  return isAuth || loading ? (
    <></>
  ) : (
    <>
      <Dialog
        store={true}
        title="Восстановить пароль"
        name={modalName}
        onCloseDialog={onCloseDialog}
        {...props}
      >
        <Box p={2}>
          <Form
            onProcessed={setProcessed}
            recaptchaSitekey={recaptchaSitekey}
            onSuccess={onSuccess}
            initialValues={{
              username: query?.username?.toString(),
            }}
          />
        </Box>
      </Dialog>
      <Alert {...alertProps} onClose={onCloseAlert} />
    </>
  );
};

export default Page;
