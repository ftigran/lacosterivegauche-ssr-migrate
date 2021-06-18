import React, { useEffect, useState } from 'react';
// import { Top } from "../components/top";
// import { Prizes } from "../components/prizes";
// import { Winners } from "../components/winners";
// import { Header } from "../components/header";
import Grid from '@material-ui/core/Grid';
import { SET_PROPS } from '../../store/props/types';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { usePrevious } from 'react-use';

import Footer from '../../components/footer';
import Header from '../../components/header';
import { Top } from '../../components/top';
import { Instruction } from '../../components/instruction';
import { Prizes } from '../../components/prizes';
import { Winners } from '../../components/winners';
import {
  chainSocialToUser as chainSocialToUserAction,
  constants as projectConstantAction,
  socialUserToken as socialUserTokenAction,
} from '../../api/actions';
import fl4 from 'src/img/fl4.png';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../../page/lk/dialogCheck';
import Formq from '../../page/lk/dialogCheckAproved';
import { gameDialog } from '../../store/game/action';
const PageContainer = (props) => {
  // const mobile = useMediaQuery(
  //   json2mq({
  //     maxWidth: 759,
  //   }),
  // );
  const dispatch = useDispatch();
  const {
    recaptchaSitekey,
    isAuth,
    init,
    appBarHeight,
    docAgreementLink = '#',
    docRulesLink = '#',
    docCookiesLink = '#',
    docCookies2Link = '#',
    email,
    dialog,
    isDocPeriodEnd,
  } = useSelector((state) => state.propsReducer);
  async function requestProjectConstant() {
    const resp = await projectConstantAction().then(() => {
      console.log('resp');
      console.log(resp);
    });

    // console.log('@@@requestProjectConstant: ', resp);
    console.log('resp');
    console.log(resp);
    if (resp.status === 200) {
      const {
        DOC_PERIOD_START: docPeriodStart,
        DOC_PERIOD_END: docPeriodEnd,
        EMAIL: email,
        DOC_RULES: docRulesLink,
        DOC_AGREEMENT: docAgreementLink,
        DOC_PERSONAL: docCookiesLink,
        DOC_COOKIES: docCookies2Link,
        CAPTCHA_SITEKEY: recaptchaSitekey,
        PICKPOINT_IKN: pickpointIkn,
        PAGINATE: paginate,
        IS_DOC_PERIOD_END: isDocPeriodEnd,
        WOODS: woods,
      } = resp.data || {};

      dispatch({
        type: SET_PROPS,
        payload: {
          email,
          docAgreementLink,
          docRulesLink,
          recaptchaSitekey,
          docCookiesLink,
          docCookies2Link,
          docPeriodStart,
          docPeriodEnd,
          pickpointIkn,
          paginate,
          isDocPeriodEnd,
          woods,
        },
      });
    }
  }
  const location = useLocation();
  const prevLocation = usePrevious(location);
  const [processed, setProcessed] = useState(false);
  const { pathname, search, hash } = location;
  const { pathname: prevPathname, search: prevSearch } = prevLocation || {};
  const { testAuth } = props;
  
  function validateAuth() {
    return testAuth(
      () => {
        console.log('auth resolve');
        dispatch({
          type: SET_PROPS,
          payload: { isAuth: true },
        });
      },
      () => {
        console.log('auth reject');
        dispatch({
          type: SET_PROPS,
          payload: { isAuth: false },
        });
      },
    );
  }
  useEffect(() => {
    if (!processed && prevPathname !== pathname) {
      setProcessed(true);
      dispatch({ type: SET_PROPS, payload: { init: false } });
      const p = Promise.all([requestProjectConstant(), , validateAuth()]);

      p.then((r) => {
        setProcessed(false);
        dispatch({ type: SET_PROPS, payload: { init: true } });
        return r;
      });
    }
  }, [pathname, processed, prevPathname]);
  return (
    <Grid container justify="center" className="pageWrapper">
      <Header />
      <Top />
      <Form recaptchaSitekey={recaptchaSitekey} />
      <Formq />
      <Grid container className="gradientBG" justify="center">
        <Grid item xs={12} style={{ maxWidth: 1200 }}>
          <img src={fl4} width="904" height="831" className="bgimg img4" />
          <Grid container direction="column" style={{ position: 'relative' }}>
            <h2 className="mobTitle">Правила</h2>
            <Instruction />
            <h2 id="prizes">Призы</h2>
            <Prizes />
            <h2 id="winners">Победители</h2>
            <Winners />
          </Grid>
        </Grid>
      </Grid>
      <Footer />
      {/* <Grid item className="contentWrapper" xs={12}></Grid> */}
    </Grid>
  );
};

export default PageContainer;
