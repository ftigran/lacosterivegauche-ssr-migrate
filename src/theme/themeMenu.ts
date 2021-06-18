import theme, { colors, defaultTheme } from './theme';
import { createMuiTheme } from '@material-ui/core';

const themeMenu = createMuiTheme({
  breakpoints: {
    ...theme.breakpoints,
  },
  typography: {
    ...theme.typography,
  },
  overrides: {
    ...theme.overrides,
    MuiDrawer: {
      paper: {
        backgroundColor: colors.WHITE,
      },
    },
    MuiButton: {
      ...theme.overrides?.MuiButton,
      text: {
        color: colors.DARK_BLUE,
        textTransform: 'none',
        borderRadius: 0,
        paddingBottom: defaultTheme.spacing(0.3),
        '&.active': {
          backgroundColor: 'transparent',
          borderBottom: `1px solid ${colors.DARK_BLUE}`,
          color: colors.DARK_BLUE_o70,
          [defaultTheme.breakpoints.down('sm')]: {
            borderBottomWidth: 0,
          },
        },
        '&:hover:not(.active)': {
          backgroundColor: 'transparent',
          color: colors.DARK_BLUE_o70,
        },

        '&.Mui-disabled': {
          opacity: 0.5,
          color: colors.DARK_BLUE_o70,
        },
        '& .MuiButton-label': {
          display: 'inline-block',
          textAlign: 'center',
        },
      },
    },
    MuiAccordionSummary: {
      expandIcon: {
        color: colors.DARK_BLUE,
        padding: 4,
      },
      root: {
        '&$expanded': {
          color: colors.DARK_BLUE_o70,
        },
      },
    },
  },
});

export default themeMenu;
