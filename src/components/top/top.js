import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { SET_DIALOG } from '../../store/props/types';
import fl from 'src/img/fl.png';
import { useHistory } from 'react-router-dom';
import { ACTION, CATEGORY, ga } from '../ga';

import './top.scss';

const Top = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const reg = () => {
    history.push('/#reg');
    dispatch({
      type: SET_DIALOG,
      payload: { checkReg: { open: true } },
    });
    ga.send(CATEGORY.BtnClick, ACTION.mainPage,'Check');

  };
  return (
    <div className="topBg" id="index">
      <div className="floor" />
      <Grid container className="top" justify="space-between">
        <Grid item xs={2} className="bottle">
          <img src={fl} width="600" height="1264" />
        </Grid>
        <Grid item xs={8} sm={10}>
          <Grid container align="center" className="pageWrapper" direction="column">
            <Grid item className="textWrapper">
              <h1 className="shadow">Романтический июнь</h1>
              <h1>Романтический июнь</h1>

              <h2>С Lacoste в РИВ ГОШ</h2>
            </Grid>

            <Grid item className="regBtn">
              <div>
                <Button variant="contained" onClick={reg}>
                  Зарегистрировать чек
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Top;
