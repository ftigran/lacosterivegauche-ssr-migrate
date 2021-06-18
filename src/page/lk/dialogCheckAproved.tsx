import React from 'react';
import Dialog, { Params as DialogParams } from '../../components/dialog';
import CheckForm from './check';
import { Box, makeStyles, useMediaQuery, Theme } from '@material-ui/core';
import imgGuidCheck from '../../imgs/guid-check.png';
import font from '../../theme/font';
import theme, { colors } from '../../theme/theme';
import "./dialogCheck.scss";
import { useDispatch, useSelector } from 'react-redux';
import { SET_PROPS, ProjectProps } from '../../store/props/types';

export interface DialogGuidCheckProps extends DialogParams {}

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: `url(${imgGuidCheck})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    backgroundPosition: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));

export default (props: DialogGuidCheckProps) => {
  const { ...other } = props;
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const open = useSelector((state: { propsReducer: ProjectProps }) =>state.propsReducer.dialog.checkRegApprove?.open || false)
  const classes = useStyles();

  return (
    <Dialog {...other} open={open} store name={"checkRegApprove"} title="Регистрация чека " okButton classN="reg regApp">
      <p>
      Спасибо, Ваш чек зарегистрирован и будет принимать участие в розыгрыше призов. Победители будут опубликованы на сайте.
      </p>
    </Dialog>
  );
};
