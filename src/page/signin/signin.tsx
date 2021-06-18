import React, { useState, useEffect } from 'react';
import Form from './form';
import Dialog, { Params as DialogParams } from '../../components/dialog';

import { Box, DialogProps, useMediaQuery, Theme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { SET_PROPS } from '../../store/props/types';
import SocialAuth from '../../components/social-auth2';
import { useLocation } from 'react-router-dom';
import { parse } from 'querystring';
import { ga, CATEGORY, ACTION } from '../../components/ga';

export const modalName: string = 'SigninDialog';

interface Props {
  isAuth: boolean;
  loading: boolean;
}

const Page = (params: DialogParams & DialogProps & Props) => {
  const location = useLocation();
  const query = parse(location.search.replace(/^\?/, ''));
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  const { onCloseDialog = (r: boolean) => {}, isAuth, loading, ...props } = params;
  const dispatch = useDispatch();
  const [processed, setProcessed] = useState(loading);
  function onSuccess(r?: boolean) {
    if (r) {
      new Promise((resolve) => {
        setTimeout(() => {
          dispatch({
            type: SET_PROPS,
            payload: { dialog: { [modalName]: { open: false } } },
          });
          resolve();
        }, 1000);
      }).then(() => onCloseDialog(r));
      if (query?.isSendConfirmCode !== undefined) {
        ga.send(CATEGORY.Registration, ACTION.reg_success);
      }
    }
  }

  return isAuth || loading ? (
    <></>
  ) : (
    <Dialog
      onOpen={() => {
        ga.send(CATEGORY.Authorization, ACTION.open_a_form);
      }}
      store={true}
      title="Авторизация"
      name={modalName}
      onCloseDialog={onCloseDialog}
      {...props}
    >
      <Box
        p={{
          xs: 0,
          sm: 2,
        }}
      >
        {query?.isSendConfirmCode === undefined && <SocialAuth title="Войти через соц.сеть" />}
        <Form
          onProcessed={setProcessed}
          onSuccess={(r?: boolean) => onSuccess(r)}
          initialValues={{ username: query?.username?.toString() }}
          isSendConfirmCode={query?.isSendConfirmCode !== undefined}
        />
      </Box>
    </Dialog>
  );
};

export default Page;
