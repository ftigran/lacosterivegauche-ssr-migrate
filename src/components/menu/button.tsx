import React from 'react';
import {
  Button,
  PropTypes,
  Box,
  createMuiTheme,
  makeStyles,
  Theme,
  useMediaQuery,
} from '@material-ui/core';
import { Link as LinkRoute, LinkProps as LinkRouteProps } from 'react-router-dom';
import clsx from 'clsx';
import { NavHashLink, NavHashLinkProps } from 'react-router-hash-link';
import { colors } from '../../theme/theme';

//
export enum IconPosition {
  COLUMN = 'column',
  ROW = 'row',
}

interface Props {
  icon?: any;
  label: string;
  onClick?: Function;
  color?: PropTypes.Color;
  disabled?: boolean;
  href?: string;
  to?: any;
  target?: string;
  title?: string;
  active?: boolean;
  isUserName?: boolean;
  scrollIntoView?: { block?: string; behavior?: string };
}

const theme = createMuiTheme();

const useStyles = makeStyles((theme: Theme) => ({
  menuBtn: {
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(1 / 4),
      marginRight: theme.spacing(1 / 4),
      fontSize: '60%',
      paddingLeft: theme.spacing(1 / 3),
      paddingRight: theme.spacing(1 / 3),
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '75%',
      marginLeft: theme.spacing(1 / 3),
      marginRight: theme.spacing(1 / 3),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '110%',
    },
    fontWeight: 400,
  },
  menuActive: {},
  menuUser: {
    backgroundColor: colors.WHITE,
    color: colors.DARK_BLUE,
    borderRadius: 8,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    [theme.breakpoints.down('sm')]: {
      backgroundColor: colors.DARK_BLUE,
      color: colors.WHITE,
      paddingBottom: 8,
    },
  },
}));

export default (props: Props) => {
  const {
    href,
    to,
    label,
    target = '_self',
    icon,
    disabled = false,
    onClick = () => {},
    color = 'inherit',
    title,
    active = false,
    scrollIntoView = {},
    isUserName = false,
  } = props;

  const classes = useStyles();
  const component = !!to?.hash
    ? {
        component: NavHashLink,
        to,
        activeClassName: '',
        scroll: (el: any) =>
          el?.scrollIntoView({ behavior: 'smooth', block: 'start', ...scrollIntoView }),
      }
    : !!to
    ? { component: LinkRoute, to }
    : { component: 'button', href, target };

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Button
      className={[
        classes.menuBtn,
        clsx(active && !isUserName ? 'active' : ''),
        isUserName ? classes.menuUser : '',
      ].join(' ')}
      title={title}
      disabled={disabled}
      variant="text"
      color="default"
      fullWidth={!smDown}
      style={{ minHeight: '100%', alignItems: 'center' }}
      onClick={(e: any) => onClick(e)}
      {...component}
    >
      {!!icon ? (
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
          <Box minWidth={theme.spacing(4)} flex="0 0 auto" pr={1}>
            {icon}
          </Box>
          <Box flex={'0 0 auto'}>{label}</Box>
        </Box>
      ) : (
        <>{label}</>
      )}
    </Button>
  );
};
