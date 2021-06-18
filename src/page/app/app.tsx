import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Fade, makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import Footer from '../../components/footer';
import Header from '../../components/header/header';
import { Top } from '../../components/top';
import { Instruction } from '../../components/instruction';
import { Prizes } from '../../components/prizes';
import { Winners } from '../../components/winners';
import Form from '../../page/lk/dialogCheck';
import Formq from '../../page/lk/dialogCheckAproved';

import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
// import LkPage from '../lk';
// import CodePage, { TypeCode } from '../code';
import Grid from '@material-ui/core/Grid';
// import SignupPage from '../signup';
import SigninDialog, { modalName as signinModalName } from '../signin';
import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
// import { useSelector as useSelectorType } from '../../hooks/useSelector';
import { ProjectProps, SET_PROPS, SET_DIALOG } from '../../store/props/types';
// import authAction from '../../store/auth/action';
import { ApiRequest } from '../../store/auth/types';
// import { bindActionCreators, Dispatch } from 'redux';
// import clsx from 'clsx';
// import MainPage from '../main';
import { parse } from 'query-string';
import { usePrevious } from 'react-use';
// import SignoutPage from '../signout';
// import Header from '../../components/header';
// import Footer from '../../components/footer';
import fl4 from 'src/img/fl4.png';
import {
  chainSocialToUser as chainSocialToUserAction,
  constants as projectConstantAction,
  socialUserToken as socialUserTokenAction,
} from '../../api/actions';
import { ApiAnswerStatus } from '../../api/types';
// import ForgotPasswordDialog from '../forgot-password';
// import { DefaultPageContainer } from '../page-container';
// import StartDialog, { modalName as StartDialogModalName } from '../start';
// import NotFoundPage from '../not-found';
// import FaqPage from '../faq';
// import themeMenu from '../../theme/themeMenu';
// import theme from '../../theme/theme';
// import { ThemeProvider } from '@material-ui/core/styles';
import Scroll from 'react-scroll';

//

const { REACT_APP_WAIT = 0 } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  offset: theme.mixins.toolbar,
}));

const Page = (props: any) => {
  const [isWait] = useState<boolean>(parseInt(`${REACT_APP_WAIT}`) === 1);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const prevLocation = usePrevious(location);
  const { pathname, search, hash } = location;
  const { pathname: prevPathname, search: prevSearch } = prevLocation || {};

  const query = parse(search);

  const [processed, setProcessed] = useState(false);
  const dispatch = useDispatch();
  const {
    recaptchaSitekey,
    docPeriodStart,
    docPeriodEnd,
    isAuth,
    init,
    appBarHeight,
    docAgreementLink = '#',
    docRulesLink = '#',
    docCookiesLink = '#',
    docCookies2Link = '#',
    email,
    
    isDocPeriodEnd,
    now
  } = useSelector((state: { propsReducer: ProjectProps }) => state.propsReducer);
  const scroller = Scroll.scroller;
  let dialog = useSelector((state: { propsReducer: ProjectProps }) => state.propsReducer.dialog);
  // const { open: openGame = false } = useSelectorType((state) => state.gameReducer);

  const { loading, data: authData } = useSelector(
    (state: { authReducer: ApiRequest }) => state.authReducer,
  );

  // const { testAuth } = props;

  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  // function validateAuth() {
  //   return testAuth(
  //     () => {
  //       console.log('auth resolve');
  //       dispatch({
  //         type: SET_PROPS,
  //         payload: { isAuth: true },
  //       });
  //     },
  //     () => {
  //       console.log('auth reject');
  //       dispatch({
  //         type: SET_PROPS,
  //         payload: { isAuth: false },
  //       });
  //     },
  //   );
  // }

  async function requestProjectConstant() {
    const resp = await projectConstantAction();

    // console.log('@@@requestProjectConstant: ', resp);
    // console.log("recaptchaSitekey ",recaptchaSitekey)
    
    // try{
    //   console.log("resp.data ",resp.data)
    // }catch{
    //   console.log('error')
    // }
    
    if (resp.status === 200) {
      const {
        DOC_PERIOD_START: docPeriodStart,
        DOC_PERIOD_END: docPeriodEnd,
        // EMAIL: email,
        // DOC_RULES: docRulesLink,
        // DOC_AGREEMENT: docAgreementLink,
        // DOC_PERSONAL: docCookiesLink,
        // DOC_COOKIES: docCookies2Link,
        CAPTCHA_SITEKEY: recaptchaSitekey,
        // PICKPOINT_IKN: pickpointIkn,
        // PAGINATE: paginate,
        IS_DOC_PERIOD_END: isDocPeriodEnd,
        NOW: now,
        // WOODS: woods,
      } = resp.data || {};

// const dialog = {
//   checkReg:{open:false},

//   checkRegApprove:{open:false},
// }
      dispatch({
        type: SET_PROPS,
        payload: {
          // email,
          // docAgreementLink,
          // docRulesLink,
          recaptchaSitekey,
          // docCookiesLink,
          // docCookies2Link,
          docPeriodStart,
          docPeriodEnd,
          // pickpointIkn,
          // paginate,
          isDocPeriodEnd,
          now,
          // woods,
          dialog
        },
      });
    }
  }

  // gtm
  useEffect(() => {
    // ga.send(CATEGORY.Pageview, ACTION.open_page, `${pathname}`);
  }, [pathname]);

  useEffect(() => {
    setProcessed(loading);
  }, [loading]);

  useEffect(() => {
    if (!processed && prevPathname !== pathname) {
      setProcessed(true);
      dispatch({ type: SET_PROPS, payload: { init: false } });
      const p = Promise.all([requestProjectConstant()/*, validateAuth()*/]);

      p.then((r) => {
        setProcessed(false);
        dispatch({ type: SET_PROPS, payload: { init: true } });
        return r;
      });
    }
  }, [pathname, processed, prevPathname]);

  useEffect(() => {
    if (!processed && (prevSearch !== search || prevPathname !== pathname)) {
      // window
      if (!!query.w) {
        dispatch({
          type: SET_PROPS,
          payload: {
            dialog: { [query.w.toString()]: { open: true } },
          },
        });
      } else {
        if (!!dialog) {
          // закрытие всех дилогов открытых через store
          Object.keys(dialog).map((key) => {
            dispatch({
              type: SET_PROPS,
              payload: {
                dialog: { [key]: { open: false } },
              },
            });
          });
        }
      }

      if ('access_token' in query && 'provider' in query) {
        const { access_token, provider } = query;
        if (!!access_token && !!provider) {
          console.log('socialUserTokenAction');
          setProcessed(true);
          socialUserTokenAction(provider.toString(), access_token.toString())
            .then((r) => {
              if (r.status === ApiAnswerStatus.SUCCESS) document.location.href = '/lk';
            })
            .finally(() => {
              setProcessed(false);
            });
        }
      } else if ('/signin' === pathname) {
        document.location.href = `/?w=${signinModalName}&username=${query.username ?? ''}`;
      }
    }
    if (!hash && !search) {
      history.push({ ...location, hash: 'index' });
    }
  }, [processed, pathname, prevPathname, search, prevSearch, query, hash]);

  useEffect(() => {
    if (
      !processed &&
      'provider' in query &&
      'provider_user_id' in query &&
      init &&
      !('redirect' in query)
    ) {
      if (isAuth) {
        const { provider, provider_user_id, first_name, last_name, email } = query;

        console.log('social redirect with auth');
        if (!!provider && !!provider_user_id)
          chainSocialToUserAction(provider?.toString(), provider_user_id?.toString()).then((r) => {
            console.log('chainSocialToUser', r);
            if ((r.status = ApiAnswerStatus.SUCCESS)) {
              // setProcessed(true);
              history.push({
                pathname: '/lk',
                search: `first_name=${first_name}&last_name=${last_name}&email=${email}`,
              });
              history.push(`/lk?first_name=${first_name}&last_name=${last_name}&email=${email}`);
            }
          });
      } else {
        console.log('social redirect with not auth');
        history.push({
          pathname: '/signup',
          search: `redirect=&${location.search}`,
        });
      }
    }
  }, [isAuth, init, query, processed]);

  useEffect(() => {
    console.log('pappapa', history.location.hash.slice(1))
    const location = history.location.hash.slice(1);
    console.log("location")
    console.log(location)
      if(location=='reg'){
        console.log(location)
        dispatch({
          type: SET_DIALOG,
          payload:  { checkReg: { open: true },
          checkRegApprove: { open: false }, } ,
        });
        dialog=  {checkReg: { open: true },
        checkRegApprove: { open: false }, }
      }else{
        scroller.scrollTo(location,{
          duration: 1500,
          delay: 100,
          smooth: true,
          offset: -50, // Scrolls to element + 50 pixels down the page
        })
      }


  }, []);

  function signinClose(r?: boolean) {
    console.log('sigin close', r);

    if (r === undefined) {
      return;
    }
    if (r) {
      history.push({ pathname: '/lk' });
    } else {
      history.push({ search: '' });
    }
  }
  // useEffect(() => {
  //   if (pathname === '/start') {
  //     document.location.href = `/?w=${StartDialogModalName}`;
  //   }
  // }, [pathname]);

  return (
    <>
        <Grid container justify="center" className="pageWrapper">
      <Header />
      <Top />
      <Form recaptchaSitekey={recaptchaSitekey}  docPeriodStart={docPeriodStart} docPeriodEnd={docPeriodEnd} now={now}/>
      <Formq />
      <Grid container className="gradientBG" justify="center">
        <Grid item xs={12} style={{ maxWidth: 1200 }}>
          <img src={fl4} width="904" height="831" className="bgimg img4" />
          <Grid container direction="column" style={{ position: 'relative' }}>
            <h2 className="mobTitle">Правила</h2>
            <Instruction />
            <Grid item id="prizes">
              <h2 >Призы</h2>
              <Prizes />
            </Grid>
            <Grid item id="winners">
              <h2 >Победители</h2>
              <Winners />
          </Grid>
          <Grid container justify="center" className="disclaimer">
            <h3>*Количество гарантированных призов (приз за покупку) ограничено. Гарантированные призы выдаются, пока они есть в наличии в конкретном магазине. </h3>
          </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer 
                rulesLink={docRulesLink}
                agreementLink={docAgreementLink}
                docCookiesLink={docCookies2Link}
      />
    </Grid>
      {/* {!openGame && (
        <ThemeProvider theme={sm ? themeMenu : theme}>
          <Header
            processed={processed}
            isAuth={isAuth}
            user={authData?.data?.user}
            isWait={isWait}
            isDocPeriodEnd={isDocPeriodEnd}
          />
        </ThemeProvider>
      )}
      {init && !processed ? (
        <Switch>
          <Route path="/" render={() => <MainPage isWait={isWait} />} exact />
          <Route path="/c/:code" render={() => <CodePage type={TypeCode.C} />} exact />
          <Route path="/ar/:code" render={() => <CodePage type={TypeCode.AR} />} exact />
          <Route path="/code/:code" render={() => <CodePage type={TypeCode.CODE} />} exact />
          {!isWait && (
            <>
              <Route
                path="/lk"
                render={() => (
                  <LkPage isAuth={isAuth} loading={processed} authData={authData?.data} />
                )}
                exact
              />
              <Route
                path="/faq"
                exact
                render={() => <FaqPage recaptchaSitekey={recaptchaSitekey} />}
              />

              <Route path="/signout" render={() => <SignoutPage />} exact />
              {!isDocPeriodEnd && (
                <Route
                  path="/signup"
                  render={() => (
                    <SignupPage
                      loading={processed}
                      isAuth={isAuth}
                      docRulesLink={docRulesLink}
                      docAgreementLink={docAgreementLink}
                      recaptchaSitekey={recaptchaSitekey}
                      docCookiesLink={docCookiesLink}
                    />
                  )}
                  exact
                />
              )}
            </>
          )}
          <Route component={() => <NotFoundPage />} />
        </Switch>
      ) : (
        <DefaultPageContainer>
          <Box
            className="content"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100%"
          >
            <Box flex="0 0 auto" textAlign="center">
              <Fade in={processed} unmountOnExit>
                <CircularProgress color="primary" size={64} className={clsx('animated fadeIn')} />
              </Fade>
            </Box>
          </Box>
        </DefaultPageContainer>
      )}
      {!isWait && !openGame && (
        <Footer
          flex="0 0 auto"
          rulesLink={docRulesLink}
          agreementLink={docAgreementLink}
          docCookiesLink={docCookies2Link}
          email={email}
        />
      )}
      <StartDialog open={false} />
      <SigninDialog
        loading={processed}
        isAuth={isAuth}
        open={false}
        onCloseDialog={(r?: boolean) => signinClose(r)}
      />

      <ForgotPasswordDialog
        recaptchaSitekey={recaptchaSitekey}
        loading={processed}
        isAuth={isAuth}
        open={false}
        onCloseDialog={(r?: boolean) => history.push({ search: '' })}
      /> */}
    </>
  );
};

// const mapDispatchToProps = (dispath: Dispatch) => ({
//   testAuth: bindActionCreators(authAction, dispath),
// });

// const connector = connect(undefined, undefined);
// type PropsFromRedux = ConnectedProps<typeof connector>;

export default Page;
