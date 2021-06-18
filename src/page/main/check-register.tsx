import React, { useCallback } from 'react';
import { Button, useMediaQuery, Theme } from '@material-ui/core';
import { modalName as signinModalName } from '../../page/signin';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProjectProps } from '../../store/props/types';
import { ga, CATEGORY, ACTION } from '../../components/ga';
//
interface Props {
  onClickCheckRegister?(): void;
  page?: string;
}

export default (props: Props) => {
  const { onClickCheckRegister = () => {}, page } = props;
  const { isAuth, init } = useSelector(
    (state: { propsReducer: ProjectProps }) => state.propsReducer,
  );
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  const history = useHistory();

  const handleOnClick = useCallback(() => {
    onClickCheckRegister();
    // console.log('handleOnClick: page = ', page);
    if (page === 'rules') {
      ga.send(CATEGORY.InvoiceReg, ACTION.click_main);
    }
    // if (!!page) ga.send(CATEGORY.Check, ACTION.click_button, page);
    if (isAuth) history.push('/lk');
    else history.push({ search: `w=${signinModalName}` });
  }, [onClickCheckRegister, isAuth, page, history]);

  return (
    <Button
      disabled={!init}
      variant="contained"
      color="primary"
      size={xs ? 'small' : 'medium'}
      onClick={handleOnClick}
    >
      Зарегистрировать чек
    </Button>
  );
};
