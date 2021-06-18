import React, { ReactElement } from 'react';
import { Box, Theme, useMediaQuery, makeStyles } from '@material-ui/core';

import Button, { IconPosition } from './button';

import { useLocation } from 'react-router-dom';
import { LocationDescriptorObject } from 'history';
import { modalName as SigninModalNameDialog } from '../../page/signin';
import { ReactComponent as SigninIco } from '../../imgs/signin.svg';
// import { ReactComponent as SignoutIco } from '../../imgs/signout.svg';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import ButtonCore from '@material-ui/core/Button';
import { colors } from '../../theme/theme';
import font from '../../theme/font';
import ButtonAdd from './ButtonAdd';

export interface Props {
  onClick?: Function;
  processed: boolean;
  isAuth: boolean;
  user?: any;
  direction: IconPosition;
  className?: string;
  isDocPeriodEnd?: boolean;
}
//
export enum Role {
  GUEST = 'guest',
  AUTH = 'auth',
}

interface Menu {
  [name: string]: {
    label: string;
    to?: LocationDescriptorObject;
    href?: string;
    offset?: number;
    role?: Role;
    name: string;
    target?: string;
    icon?: ReactElement;
    isLocation?: boolean;
    scrollIntoView?: { block?: string; behavior?: string };
  };
}

const menu: Menu = {
  main: {
    label: 'Главная',
    name: 'index',
    to: { pathname: '/', hash: '#index' },
    scrollIntoView: { block: 'start' },
  },
  rules: {
    label: 'Правила',
    name: 'rules',
    // href: '/backend/documents/rules/pdf',
    // target: '_blank',
    to: { pathname: '/', hash: '#rules' },
  },
  where: {
    label: 'Призы',
    name: 'prizes',
    to: { pathname: '/', hash: '#prizes' },
  },
  winners: {
    label: 'Победители',
    name: 'winners',
    to: { pathname: '/', hash: '#winners' },
  },
  signup: {
    label: 'Регистрация',
    name: 'signup',
    role: Role.GUEST,
    to: { pathname: '/signup' },
  },

  add: {
    label: 'Valio и устойчивое развитие',
    name: 'add2',
    target: '_blank',
    href: 'https://www.valio.ru/about/social_responsibility/',
  },

  signin: {
    label: 'Войти',
    name: 'signin',
    to: { search: `w=${SigninModalNameDialog}` },
    role: Role.GUEST,
    icon: <SigninIco />,
  },
  lk: {
    label: 'Личный кабинет',
    name: 'lk',
    to: { pathname: '/lk', hash: '#index' },
    role: Role.AUTH,
    // isLocation: true,
  },
  // signout: {
  //   label: 'Выход',
  //   name: 'signout',
  //   to: { pathname: '/signout' },
  //   role: Role.AUTH,
  //   isLocation: true,
  //   icon: <SignoutIco />,
  // },
};

const useStyles = makeStyles((theme: Theme) => ({
  navDesktopItem: {
    // fontSize: "60%",
    padding: theme.spacing(1 / 2),
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(1.25),
      marginRight: theme.spacing(1.25),
    },
  },
  navMobileItem: {
    fontSize: '120%',
    padding: theme.spacing(1 / 2),
    // borderTop: "1px solid #205C83",
    // borderBottom: "1px solid #205C83",
    // "&:first-child": {
    //   borderTop: "2px solid #205C83",
    // },
    // "&:last-child": {
    //   borderBottom: "0 none",
    // },
  },
  popoverText: {
    color: colors.GREY2,
    fontSize: '90%',
    fontWeight: 400,
    fontFamily: font.primary,
  },
  popoverTextBold: {
    color: colors.GREY1,
  },
  popoverBtn: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const PhoneFormat = (phone?: string): string =>
  phone !== undefined && phone.length > 9
    ? '+7 ' +
      phone.substring(0, 3) +
      ' ' +
      phone.substring(3, 6) +
      ' ' +
      phone.substring(6, 8) +
      ' ' +
      phone.substring(8)
    : '';

export default ({
  processed,
  isAuth,
  onClick = () => {},
  direction,
  className,
  user,
  isDocPeriodEnd,
}: Props) => {
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const classes = useStyles();
  const location = useLocation();

  const userName = user?.firstname ?? 'Гость';
  const userEmail = user?.email ?? '-';
  const userPhone = user?.phone ?? '-';

  menu.lk.label = userName;

  return (
    <Box
      component="nav"
      display="flex"
      alignItems="stretch"
      justifyContent="center"
      flexDirection={direction}
      pb={sm ? 3 : 0}
      pt={sm ? 5 : 0}
      className={className}
    >
      {Object.keys(menu).map((key) => {
        const value = menu[key];

        const { role, label, target, to, href, icon, isLocation, scrollIntoView, name } = value;

        const _toHash = to?.hash || '#index';

        const current =
          !!_toHash && location.hash === _toHash && location.pathname === to?.pathname;

        if (name === 'add') {
          return <ButtonAdd />;
        } else {
          return (
            (!role ||
              ((isLocation === undefined || isLocation === !current) &&
                ((isAuth && role === Role.AUTH) || (!isAuth && role === Role.GUEST)))) && (
              <Box key={key} className={md ? classes.navMobileItem : classes.navDesktopItem}>
                {name === 'lk' && current ? (
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <>
                        <Button
                          // onClick={() => {
                          //   onClick();
                          // }}
                          disabled={processed}
                          label={label}
                          href={href}
                          to={to}
                          icon={icon}
                          target={target}
                          active={current}
                          isUserName
                          scrollIntoView={scrollIntoView}
                          {...bindTrigger(popupState)}
                        />
                        <Popover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                        >
                          <Box p={2}>
                            <Grid container spacing={2} style={{ maxWidth: 300 }}>
                              <Grid item xs={5}>
                                <Box className={classes.popoverText}>Имя:</Box>
                              </Grid>
                              <Grid item xs={7}>
                                <Box
                                  className={[classes.popoverText, classes.popoverTextBold].join(
                                    ' ',
                                  )}
                                >
                                  {userName}
                                </Box>
                              </Grid>
                              <Grid item xs={5}>
                                <Box className={classes.popoverText}>E-mail:</Box>
                              </Grid>
                              <Grid item xs={7}>
                                <Box
                                  className={[classes.popoverText, classes.popoverTextBold].join(
                                    ' ',
                                  )}
                                >
                                  {userEmail}
                                </Box>
                              </Grid>
                              <Grid item xs={5}>
                                <Box className={classes.popoverText}>Телефон:</Box>
                              </Grid>
                              <Grid item xs={7}>
                                <Box
                                  className={[classes.popoverText, classes.popoverTextBold].join(
                                    ' ',
                                  )}
                                >
                                  {PhoneFormat(userPhone)}
                                </Box>
                              </Grid>
                              <Grid item xs={12}>
                                <Box
                                  alignItems="center"
                                  justifyContent="center"
                                  display="flex"
                                  pt={2}
                                  pb={1}
                                >
                                  <ButtonCore
                                    size="large"
                                    fullWidth={false}
                                    className={classes.popoverBtn}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                      document.location.href = '/signout';
                                    }}
                                  >
                                    Выход
                                  </ButtonCore>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Popover>
                      </>
                    )}
                  </PopupState>
                ) : (
                  <>
                    {name === 'signup' ? (
                      <>
                        {!isDocPeriodEnd && (
                          <Button
                            onClick={() => {
                              onClick();
                            }}
                            disabled={processed}
                            label={label}
                            href={href}
                            to={to}
                            icon={icon}
                            target={target}
                            active={current}
                            scrollIntoView={scrollIntoView}
                          />
                        )}
                      </>
                    ) : (
                      <Button
                        onClick={() => {
                          onClick();
                        }}
                        disabled={processed}
                        label={label}
                        href={href}
                        to={to}
                        icon={icon}
                        target={target}
                        active={current}
                        scrollIntoView={scrollIntoView}
                      />
                    )}
                  </>
                )}
              </Box>
            )
          );
        }
      })}
      {/* {isAuth && !isMobile && location.pathname === "/lk" && (
                <Box flex="0 0 auto">
                    <AuthPopup user={user} processed={processed} />
                </Box>
            )} */}
    </Box>
  );
};
