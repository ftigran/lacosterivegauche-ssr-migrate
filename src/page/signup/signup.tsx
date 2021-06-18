import React, { useState, useEffect } from 'react';
import { DefaultPageContainer } from '../page-container';
import { Theme, useMediaQuery, Box } from '@material-ui/core';
import Form from './form';
import { useLocation, useHistory } from 'react-router-dom';
import { parse } from 'querystring';
import Alert, { AlertProps } from '../../components/alert';
import { modalName as signinModalName } from '../signin';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SocialAuth from '../../components/social-auth2';
import { colors } from '../../theme/theme';
import { PageTitle } from '../../components/typography';
import { registerSocialUser } from '../../api/actions';

// import { ga, CATEGORY, ACTION } from '../../components/ga';
// import { Params as DialogParams } from '../../components/dialog';
// import { darkFormTheme } from '../../theme';
//

export const modalName: string = 'SignupDialog';

interface Props {
  isAuth: boolean;
  recaptchaSitekey: string | undefined;
  docPeriodStart: string | undefined;
  docPeriodEnd: string | undefined;
  docAgreementLink: string;
  docRulesLink: string;
  docCookiesLink: string;
  loading: boolean;
}

// type SignupProps = DialogParams & DialogProps & Props;

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    // backgroundImage: `url(${dialogBackgroundImg})`,
    backgroundPosition: 'top center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  formContainer: {
    [theme.breakpoints.down('xs')]: {
      // fontSize: '150%',
    },
    // backgroundColor: '#061346',
    borderRadius: 10,
    marginTop: theme.spacing(5),
  },
}));

const Page: React.FC<Props> = (params) => {
  const history = useHistory();
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const [alertProps, setAlertProps] = useState<AlertProps>({
    open: false,
    result: false,
  });
  const {
    isAuth,
    recaptchaSitekey = '',
    docPeriodEnd= '',
    docPeriodStart= '',
    docAgreementLink = '#',
    docRulesLink = '#',
    docCookiesLink = '#',
    loading,
    // onCloseDialog = (r: boolean) => {},
    ...props
  } = params;
  const [socialProvider, setSocialProvider] = useState<string | undefined>(undefined);
  const [processed, setProcessed] = useState(loading);
  const [socProcessed, setSocProcessed] = useState<boolean>(false);
  const location = useLocation();
  const query = parse(location.search.replace(/^\?/, ''));

  function onSuccess(alertProps: AlertProps) {
    // console.log('signup onSuccess', alertProps);
    // setAlertProps(alertProps);
    // сразу окно авторизации без сообщения
    history.push({
      search: `w=${signinModalName}&username=${alertProps.data?.username}&isSendConfirmCode=1`,
    });
  }
  function onCloseAlert(r: boolean, data: any) {
    if (r) {
      history.push({
        search: `w=${signinModalName}&username=${data?.username}&isSendConfirmCode=1`,
      });
      setAlertProps({ open: false, result: false });
    }
  }
  useEffect(() => {
    if (!!socialProvider) {
      // ga.send(CATEGORY.Registration, ACTION.over_social_r, socialProvider);
    }
  }, [socialProvider]);

  const classes = useStyles();

  useEffect(() => {
    if (isAuth && !socProcessed && query.token) {
      setSocProcessed(true);
      (async () => {
        try {
          const r = await registerSocialUser(`${query.token}`);
          if (r.status === 200) {
            document.location.href = '/lk';
          }
        } catch (e) {
          document.location.href = '/';
        } finally {
          setSocProcessed(false);
        }
      })();
    }
  }, [isAuth, query.token, socProcessed]);

  return isAuth ? (
    <></>
  ) : (
    <Box className={classes.pageContainer}>
      <DefaultPageContainer>
        <Box pb={2} px={2} className={classes.formContainer}>
          <Box pt={2} pb={2}>
            <PageTitle color={colors.DARK_BLUE}>Регистрация</PageTitle>
          </Box>
          <Box display="flex" justifyContent="center">
            <SocialAuth title="Зарегистрироваться через соц.сеть" />
          </Box>
          <Form
            onProcessed={setProcessed}
            docPeriodEnd={docPeriodEnd}
            docPeriodStart={docPeriodStart}
            recaptchaSitekey={recaptchaSitekey}
            onSuccess={onSuccess}
            docAgreementLink={docAgreementLink}
            docRulesLink={docRulesLink}
            docCookiesLink={docCookiesLink}
            initialValues={{
              first_name: query?.first_name?.toString(),
              token: query?.token?.toString(),
              email: query?.email?.toString(),
              phone: query?.phone?.toString(),
              provider: query?.provider?.toString(),
              provider_user_id: query?.provider_user_id?.toString(),
            }}
          />
        </Box>
        <Alert {...alertProps} onClose={onCloseAlert} />
      </DefaultPageContainer>
    </Box>
  );
};

export default Page;
