import { createMuiTheme } from '@material-ui/core';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import font from './font';

export const colors = {
  DARK_BLUE: '#00488C',
  DARK_BLUE_o70: 'rgba(0, 72, 140, 0.7)',
  LIGHT_BLUE: '#6EB4E4',
  LIGHT_BLUE_o70: 'rgba(110, 180, 228, 0.7)',
  LIGHT_CYAN: '#C0E8FF',
  LIGHT_CYAN_o70: 'rgba(192, 232, 255, 0.7)',
  WHITE: '#FFFFFF',
  ERROR: '#E6001F',
  BLACK: '#000000',
  GREY1: '#5C5C5C',
  GREY2: '#858585',
  GREY2_o70: 'rgba(133, 133, 133, 0.7)',
  GREY3: '#ADADAD',
  GREY4: '#DFDEDE',
  GREY5: '#E5E5E5',
  DARK: "#363636"
};

const fontSize = {
  default: 22,
  md: 20,
  sm: 18,
  xs: 20,
};

const breakpoints = createBreakpoints({
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1200,
    xl: 1600,
  },
});
export const defaultTheme = createMuiTheme();

const darkFormThemeColor = 'rgba(255,255,255,1)';

const theme = createMuiTheme({
  breakpoints,

  typography: {
    fontSize: 12,
    fontFamily: font.primary,
    h1: {
      textTransform: 'uppercase',
      color: colors.BLACK,
      fontWeight: 500,
      fontSize: 44,
      lineHeight: 1.4,
      [breakpoints.down('xs')]: {
        fontSize: 24,
      },
    },
    h2: {
      color: colors.BLACK,
      textTransform: 'uppercase',
      fontWeight: 500,
      fontSize: '30px',
      lineHeight: 1.4,
    },
    h3: {
      color: colors.BLACK,
      textTransform: 'none',
      fontWeight: 400,
      fontSize: '28px',
      lineHeight: 1.4,
    },
    h4: {
      color: colors.BLACK,
      textTransform: 'uppercase',
      fontWeight: 500,
      fontSize: '24px',
      lineHeight: 1.4,
    },
    h5: {
      color: colors.BLACK,
      textTransform: 'none',
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: 1.4,
    },
    body1: {
      color: colors.GREY2,
      fontSize: 20,
      fontWeight: 400,
      lineHeight: 1.4,
      [breakpoints.down('md')]: {
        fontSize: 18,
      },
      [breakpoints.down('sm')]: {
        fontSize: 16,
      },
      [breakpoints.down('xs')]: {
        fontSize: 14,
      },
    },
    subtitle1: {
      color: colors.GREY1,
      fontSize: 30,
      fontWeight: 500,
      lineHeight: 1.4,
      [breakpoints.down('md')]: {
        fontSize: 28,
      },
      [breakpoints.down('sm')]: {
        fontSize: 22,
      },
      [breakpoints.down('xs')]: {
        fontSize: 20,
      },
    },
  },

  overrides: {
    MuiMenuItem: {
      root: {
        fontSize: 16,
        fontFamily: font.primary,
        color: colors.GREY1,
        borderBottom: `1px solid ${colors.GREY4}`,
        '&:last-child': {
          borderBottomWidth: 0,
        },
        paddingTop: 12,
        paddingBottom: 12,
        '&:hover': {
          backgroundColor: colors.LIGHT_BLUE,
          color: colors.WHITE,
        },
      },
    },
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    MuiMenu: {
      paper: {
        borderRadius: 16,
      },
    },

    MuiSelect: {
      iconOutlined: {
        color: 'white',
        top: 'calc(50% - 18px)',
        '&$disabled': {
          color: 'rgba(255,255,255,0.5)',
        },
      },
    },

    MuiDialogActions: {
      root: {
        justifyContent: 'center',
        marginBottom: defaultTheme.spacing(1),
      },
    },
    MuiToolbar: {
      root: {
        justifyContent: 'space-between',
        alignItems: 'stretch',
      },
    },

    MuiAccordion: {
      root: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        '&::before': {
          opacity: 0,
        },
        borderBottom: '1px solid white',
      },
    },
    MuiAccordionSummary: {
      expandIcon: {
        color: '#ffffff',
      },
    },
    MuiAccordionDetails: {
      root: {
        paddingLeft: defaultTheme.spacing(4),
      },
    },

    MuiAppBar: {
      root: {
        fontSize: fontSize.default,
        [breakpoints.only('md')]: {
          fontSize: fontSize.md,
        },
        [breakpoints.only('sm')]: {
          fontSize: fontSize.sm,
        },
        [breakpoints.only('xs')]: {
          fontSize: fontSize.xs,
        },
      },
      colorPrimary: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    },
    MuiPopover: {
      root: {
        fontFamily: font.primary,
        fontWeight: 'normal',
      },
    },

    MuiContainer: {
      root: {
        fontFamily: font.primary,
        fontWeight: 'normal',
        fontSize: fontSize.default,
        [breakpoints.only('md')]: {
          fontSize: fontSize.md,
        },
        [breakpoints.only('sm')]: {
          fontSize: fontSize.sm,
        },
        [breakpoints.only('xs')]: {
          fontSize: fontSize.xs,
        },
      },
    },
    MuiFormControl: {
      root: {
        // paddingTop:defaultTheme.spacing(1),
        paddingBottom: defaultTheme.spacing(1),
        maxWidth: '100%',
      },
    },

    MuiInputBase: {
      root: {
        fontFamily: font.primary,
      },
    },
    MuiOutlinedInput: {
      root: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        color: colors.GREY2,
        fontSize: '80%',
        borderRadius: 16,
        '&$focused $notchedOutline': {
          borderWidth: 1,
          borderColor: colors.DARK_BLUE,
          color: colors.DARK_BLUE,
        },
        '&:hover $notchedOutline': {
          borderColor: colors.DARK_BLUE,
          color: colors.DARK_BLUE,
        },
        '&$error': {
          color: colors.ERROR,
          borderColor: colors.ERROR,
        },
        '&$error $notchedOutline': {
          color: colors.ERROR,
          borderColor: 'transparent',
          boxShadow: '0 0 10px 2px rgba(255,54,54,0.5)',
        },
        '&$disabled': {
          color: colors.GREY2_o70,
          borderColor: colors.GREY2_o70,
        },
        '&$disabled $notchedOutline': {
          borderColor: colors.GREY2_o70,
        },
        '&$focused': {
          color: colors.DARK_BLUE,
        },
      },
      notchedOutline: {
        borderWidth: 1,
        borderColor: colors.GREY2,
        '&$error': {
          color: colors.ERROR,
          borderColor: colors.ERROR,
        },
      },

      adornedEnd: {
        paddingRight: 0,
      },
      input: {
        padding: `16px 14px`,
        height: 22,
      },
    },

    MuiFormControlLabel: {
      label: {
        color: colors.GREY2,
        fontFamily: font.primary,
        '&$disabled': {
          color: colors.GREY2,
        },
        fontSize: 14,
      },
    },
    MuiCheckbox: {
      root: {
        color: colors.GREY2,
      },
      colorPrimary: {
        '&$checked': {
          color: colors.GREY2,
        },
        '&$disabled': {
          color: 'rgba(85,85,85,0.5)',
        },
      },
    },
    MuiRadio: {
      root: {
        color: darkFormThemeColor,
      },
      colorPrimary: {
        '&$checked': {
          color: '#ebd38f',
        },
      },
    },

    MuiFormLabel: {
      root: {
        color: colors.GREY2,
        fontSize: '100%',
        '&$focused': {
          color: colors.DARK_BLUE,
        },
        '&$error': {
          color: colors.ERROR,
        },
        '&$disabled': {
          color: 'rgba(255,255,255,0.5)',
        },
      },
    },
    MuiLink: {
      root: {
        color: colors.GREY1,
      },
    },
    MuiInputLabel: {
      root: {
        fontFamily: font.primary,
        fontSize: '80%',
        color: colors.GREY2,
      },
      outlined: {
        '&$shrink': {
          transform: 'translate(0, -125%) scale(1)',
          color: colors.GREY2,
          fontSize: '70%',
          '&$focused': {
            color: colors.DARK_BLUE,
          },
          '&$error': {
            color: colors.ERROR,
          },
        },
        fontSize: '80%',
      },
    },
    MuiFormHelperText: {
      root: {
        fontFamily: font.primary,
        textAlign: 'left',
        fontSize: '65%',
        lineHeight: 1,
        '&$error': {
          color: 'rgb(255,54,54)',
        },
        marginTop: 4,
      },
      contained: {
        marginLeft: 0,
        marginRight: 0,
      },
    },

    MuiButton: {
      root: {
        borderRadius: defaultTheme.spacing(0),
        fontFamily: font.secondary,
        fontSize: '80%',
        lineHeight: 1,
        paddingTop: defaultTheme.spacing(2),
        paddingBottom: defaultTheme.spacing(2),
      },
      sizeSmall: {
        fontSize: '60%',
        paddingTop: defaultTheme.spacing(1),
        paddingBottom: defaultTheme.spacing(1),
        paddingLeft: defaultTheme.spacing(2),
        paddingRight: defaultTheme.spacing(2),
      },
      sizeLarge: {
        fontSize: '90%',
        fontWeight: 500,
        paddingTop: defaultTheme.spacing(2),
        paddingBottom: defaultTheme.spacing(2),
        paddingLeft: defaultTheme.spacing(5),
        paddingRight: defaultTheme.spacing(5),
      },
      contained: {
        textTransform: 'none',
        fontWeight: 'normal',
        paddingLeft: defaultTheme.spacing(5),
        paddingRight: defaultTheme.spacing(5),
      },
      containedPrimary: {
        backgroundColor: colors.DARK_BLUE,
        fontWeight: 'bold',
        color: '#ffffff',
        border: '0px solid #ebd38f',
        borderRadius: 16,

        '&:focus': {
          backgroundColor: colors.DARK_BLUE,
          border: `0px solid ${colors.DARK_BLUE}`,
          color: '#fff',
          '&:hover': {
            color: '#fff',
            backgroundColor: `${colors.LIGHT_BLUE}!important`,
          },
        },
        '&:hover': {
          backgroundColor: `${colors.LIGHT_BLUE}!important`,
          border: '0px solid #8d245e',
          color: colors.WHITE,
        },

        '&.Mui-disabled': {
          border: '0px solid #f0d471',
          color: 'rgba(255,255,255,0.7)',
          backgroundColor: colors.DARK_BLUE_o70,
        },
      },
      label: {
        // transform: 'skew(20deg, 0)',
      },

      containedSecondary: {
        backgroundColor: colors.WHITE,
        fontWeight: 'normal',
        color: colors.DARK_BLUE,
        border: `1px solid ${colors.DARK_BLUE}`,
        borderRadius: 16,

        '&:focus': {
          backgroundColor: colors.WHITE,
          border: `1px solid ${colors.DARK_BLUE}`,
          color: colors.DARK_BLUE,
          '&:hover': {
            border: `1px solid ${colors.LIGHT_CYAN}`,
            color: colors.LIGHT_CYAN,
            backgroundColor: `${colors.WHITE}!important`,
          },
        },
        '&:hover': {
          backgroundColor: `${colors.WHITE}!important`,
          border: `1px solid ${colors.LIGHT_CYAN}`,
          color: colors.LIGHT_CYAN,
        },

        '&.Mui-disabled': {
          border: `1px solid ${colors.DARK_BLUE_o70}`,
          backgroundColor: colors.WHITE,
          color: colors.DARK_BLUE_o70,
        },
      },
      containedSizeSmall: {
        borderRadius: 4,
      },

      text: {
        fontWeight: 'normal',
        fontFamily: font.primary,
        fontSize: '75%',
        color: colors.LIGHT_CYAN,
        textTransform: 'none',
        borderRadius: 0,
        paddingBottom: defaultTheme.spacing(0.3),
        '&.active': {
          backgroundColor: 'transparent',
          borderBottom: `1px solid ${colors.WHITE}`,
          color: colors.WHITE,
          [defaultTheme.breakpoints.down('sm')]: {
            borderBottomWidth: 0,
          },
        },

        '&:hover:not(.active)': {
          backgroundColor: 'transparent',
          color: colors.WHITE,
          // textShadow: '0 0 4px rgba(255,255,255,.5)',
        },

        '&.Mui-disabled': {
          opacity: 0.5,
          color: '#FFF',
        },
        '& .MuiButton-label': {
          display: 'inline-block',
          textAlign: 'center',
        },
      },
    },

    MuiDialog: {
      root: {
        fontFamily: font.primary,
      },

      paper: {
        borderRadius: 10,
        backgroundPosition: 'top center',
        backgroundRepeat: 'repeat-x',
        backgroundColor: colors.WHITE,
        // backgroundImage: `url(${dialogBackgroundImg})`,
        [breakpoints.up('sm')]: {
          width: 600,
        },
        [breakpoints.up('md')]: {
          width: 720,
        },
      },
      container: {
        fontSize: fontSize.default,
        [breakpoints.only('md')]: {
          fontSize: fontSize.md,
        },
        [breakpoints.only('sm')]: {
          fontSize: fontSize.sm,
        },
        [breakpoints.only('xs')]: {
          fontSize: fontSize.xs,
        },
      },
    },

    MuiDialogContent: {
      root: {
        position: 'relative',
        paddingLeft: defaultTheme.spacing(4),
        paddingRight: defaultTheme.spacing(4),
        paddingBottom: defaultTheme.spacing(4),
        paddingTop: defaultTheme.spacing(2),
        textAlign: 'center',
        [breakpoints.down('sm')]: {
          paddingLeft: defaultTheme.spacing(2),
          paddingRight: defaultTheme.spacing(2),
          paddingBottom: defaultTheme.spacing(2),
        },
        '&.no-padding': {
          padding: 0,
        },
        color: colors.GREY2,
      },
    },

    MuiDialogTitle: {
      root: {
        color: '#fff',
        position: 'relative',
        backgroundColor: colors.DARK_BLUE,
        textAlign: 'center',
        fontSize: '110%',
        fontWeight: 'normal',
        fontFamily: font.primary,
        textTransform: 'none',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 2,
        [breakpoints.down('xs')]: {
          fontSize: '60%',
        },
      },
    },
    MuiDrawer: {
      root: {},
      paper: {
        backgroundColor: colors.DARK_BLUE,
        width: '100%',
        height: 'auto',
      },
    },
    MuiSvgIcon: {
      colorSecondary: {
        color: '#044F8D',
      },
      root: {
        fontSize: '2.5rem',
      },
    },
    MuiIconButton: {
      colorPrimary: {
        color: '#ffffff',
      },
    },
    MuiSnackbarContent: {
      root: {
        borderRadius: 0,
        backgroundColor: '#fff',
        color: '#E51523',
        fontFamily: font.other,
        fontSize: '60%',
      },
      message: {
        flex: '1 1 auto',
      },
    },
    MuiBackdrop: {
      root: {
        backdropFilter: 'blur(2px)',
      },
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: '#1D92C0',
      },
      colorSecondary: {
        color: '#fff',
      },
    },
    MuiTableHead: {
      root: {
        backgroundColor: 'transparent',
      },
    },
    MuiTableRow: {
      root: {
        // borderTop: '1px solid #e3c170',
        '&:nth-child(even)': {
          '&>.MuiTableCell-body': {
            backgroundColor: colors.GREY5,
            '&:last-child': {
              borderTopRightRadius: 16,
              borderBottomRightRadius: 16,
            },
            '&:first-child': {
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
            },
          },
        },
        // borderRadius: 16,
      },
      head: {
        '&:nth-child(odd)': {
          // backgroundColor: colors.DARK_BLUE,
        },
      },
    },

    MuiTable: {
      root: {
        // border: '2px solid #e3c170',
      },
    },
    MuiTableContainer: {
      root: {
        borderRadius: 0,
        boxShadow: 'none',
      },
    },

    MuiTableCell: {
      root: { borderBottom: '0 none' },
      head: {
        fontWeight: 400,
        color: '#fff',
        fontSize: '100%',
        textAlign: 'center',

        textTransform: 'none',
        fontFamily: font.primary,
        padding: defaultTheme.spacing(1),
        paddingBottom: defaultTheme.spacing(2),
        paddingTop: defaultTheme.spacing(2),
        [defaultTheme.breakpoints.down('xs')]: {
          fontSize: '70%',
          lineHeight: 1.2,
        },
        backgroundColor: colors.DARK_BLUE,
        '&:last-child': {
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        },
        '&:first-child': {
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
        },
      },
      body: {
        color: colors.GREY1,
        fontSize: '75%',
        textAlign: 'center',
        textTransform: 'none',
        [defaultTheme.breakpoints.down('xs')]: {
          fontSize: '60%',
          lineHeight: 1.3,
          padding: defaultTheme.spacing(0.5),
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: defaultTheme.spacing(-1 / 2),
        marginRight: defaultTheme.spacing(-1 / 2),
      },
      indicator: {
        backgroundColor: 'transparent',
        // background:
        //   'linear-gradient(270deg, #BF953D 0%, #FCF297 25%, #D6A53D 50%, #FAF5B7 75%, #AA771B 100%);',
        // height: 3,
      },
    },
    MuiTab: {
      root: {
        fontSize: '80%',
        fontWeight: 'bold',
        marginLeft: defaultTheme.spacing(1 / 2),
        marginRight: defaultTheme.spacing(1 / 2),
      },
      textColorPrimary: {
        backgroundColor: 'transparent',
        color: colors.GREY3,
        borderBottom: `2px solid ${colors.GREY3}`,
        '&$selected': {
          backgroundColor: '#044F8D',
          color: colors.DARK_BLUE,
          borderBottom: `2px solid ${colors.DARK_BLUE}`,
        },
      },
    },
    MuiPaper: {
      root: {
        boxShadow: 'none',
      },
    },
  },
});

export const winnerSearchFieldTheme = createMuiTheme({
  breakpoints,
  overrides: {
    MuiInputBase: {
      root: {
        fontFamily: font.primary,
      },
    },
    MuiOutlinedInput: {
      root: {
        backgroundColor: 'rgba(255,255,255,1)',
        color: '#333',
        fontSize: '80%',
        borderRadius: 4,
        '&$focused $notchedOutline': {
          borderWidth: 1,
          borderColor: 'transparent',
        },
        '&:hover $notchedOutline': {
          borderColor: 'transparent',
        },
        '&$error': {
          color: '#333',
          borderColor: '#333',
        },
        '&$error $notchedOutline': {
          color: darkFormThemeColor,
          borderColor: 'transparent',
          boxShadow: '0 0 10px 2px rgba(255,54,54,0.5)',
        },
        '&$disabled': {
          color: '#333',
        },
        '&$disabled $notchedOutline': {
          borderColor: 'transparent',
        },
      },
      notchedOutline: {
        borderWidth: 1,
        borderColor: 'transparent',
        '&$error': {
          color: '#fff',
          borderColor: '#fff',
        },
      },

      adornedEnd: {
        paddingRight: 0,
      },
    },

    MuiFormLabel: {
      root: {
        color: '#333',
        fontSize: '100%',
        '&$focused': {
          color: '#333',
        },
        '&$error': {
          color: '#333',
        },
        '&$disabled': {
          color: 'rgba(255,255,255,0.5)',
        },
      },
    },
    MuiLink: {
      root: {
        color: darkFormThemeColor,
      },
    },
    MuiInputLabel: {
      root: {
        fontFamily: font.primary,
        fontSize: '80%',
        color: '#333',
      },
      outlined: {
        '&$shrink': {
          transform: 'translate(0, -125%) scale(1)',
          color: '#fff',
          fontSize: '80%',
        },
        fontSize: '100%',
      },
    },
    MuiFormHelperText: {
      root: {
        fontFamily: font.primary,
        textAlign: 'left',
        fontSize: '65%',
        lineHeight: 1,
        '&$error': {
          color: 'rgb(255,54,54)',
        },
        marginTop: 4,
      },
      contained: {
        marginLeft: 0,
        marginRight: 0,
      },
    },
  },
});

export const darkFormTheme = createMuiTheme({
  breakpoints,
  overrides: {
    MuiSnackbarContent: {
      root: {
        borderRadius: 0,
        backgroundColor: '#fff',
        color: '#E51523',
        fontFamily: font.other,
        fontSize: '60%',
      },
      message: {
        flex: '1 1 auto',
      },
    },

    MuiSvgIcon: {
      root: {
        fontSize: '2.5rem',
      },
    },
    MuiButton: {
      sizeSmall: {
        fontSize: '60%',
        paddingTop: defaultTheme.spacing(1),
        paddingBottom: defaultTheme.spacing(1),
        paddingLeft: defaultTheme.spacing(2),
        paddingRight: defaultTheme.spacing(2),
      },
      sizeLarge: {
        fontSize: '100%',
        fontWeight: 'bold',
        paddingTop: defaultTheme.spacing(2),
        paddingBottom: defaultTheme.spacing(2),
        paddingLeft: defaultTheme.spacing(5),
        paddingRight: defaultTheme.spacing(5),
      },
      root: {
        borderRadius: defaultTheme.spacing(0),
        fontFamily: font.secondary,
        fontSize: '90%',
        lineHeight: 1,
        paddingTop: defaultTheme.spacing(2),
        paddingBottom: defaultTheme.spacing(2),
        transform: 'skew(-30deg, 0)',
      },
      contained: {
        textTransform: 'uppercase',
        fontWeight: 'normal',
        paddingLeft: defaultTheme.spacing(5),
        paddingRight: defaultTheme.spacing(5),
      },
      containedPrimary: {
        backgroundColor: '#FFFFFF',
        fontWeight: 'bold',
        color: '#7f3168',
        border: '3px solid #ebd38f',

        '&:focus': {
          backgroundColor: '#8d245e',
          border: '3px solid #f0d471',
          color: '#fff',
          '&:hover': {
            color: '#fff',
            backgroundColor: '#8d245e!important',
          },
        },
        '&:hover': {
          backgroundColor: '#FFFFFF!important',
          border: '3px solid #8d245e',
          color: '#7f3168',
        },

        '&.Mui-disabled': {
          border: '3px solid #f0d471',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
      },
      label: {
        // transform: 'skew(30deg, 0)',
      },
    },
    MuiInputBase: {
      root: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        fontFamily: font.primary,
      },
    },
    MuiOutlinedInput: {
      root: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        color: colors.GREY2,
        fontSize: '80%',
        borderRadius: 16,
        '&$focused $notchedOutline': {
          borderWidth: 1,
          borderColor: 'transparent',
        },
        '&:hover $notchedOutline': {
          borderColor: 'transparent',
        },
        '&$error': {
          color: colors.GREY2,
          borderColor: '#fff',
        },
        '&$error $notchedOutline': {
          color: darkFormThemeColor,
          borderColor: '#darkFormThemeColor',
          boxShadow: '0 0 10px 2px rgba(209,136,116,1)',
        },
      },
      notchedOutline: {
        borderWidth: 1,
        borderColor: 'transparent',
        '&$error': {
          color: '#fff',
          borderColor: '#fff',
        },
      },

      adornedEnd: {
        paddingRight: 0,
      },
    },
    MuiFormControlLabel: {
      label: {
        // color: darkFormThemeColor,
        color: '#fff',
      },
    },
    MuiCheckbox: {
      root: {
        color: darkFormThemeColor,
      },
      colorPrimary: {
        '&$checked': {
          color: '#ebd38f',
        },
      },
    },
    MuiRadio: {
      root: {
        color: darkFormThemeColor,
      },
      colorPrimary: {
        '&$checked': {
          color: '#ebd38f',
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: darkFormThemeColor,
        fontSize: '100%',
        '&$focused': {
          color: darkFormThemeColor,
        },
        '&$error': {
          color: '#fff',
        },
      },
    },
    MuiLink: {
      root: {
        color: darkFormThemeColor,
      },
    },
    MuiInputLabel: {
      root: {
        fontFamily: font.tikkurila,
        fontSize: '80%',
        color: darkFormThemeColor,
      },
      outlined: {
        '&$shrink': {
          transform: 'translate(0, -125%) scale(1)',
          color: darkFormThemeColor,
          fontSize: '80%',
        },
        fontSize: '100%',
      },
    },
    MuiFormHelperText: {
      root: {
        fontFamily: font.tikkurila,
        textAlign: 'left',
        fontSize: '65%',
        lineHeight: 1,
        '&$error': {
          color: '#fff',
        },
        marginTop: 4,
      },
      contained: {
        marginLeft: 0,
        marginRight: 0,
      },
    },
  },
});

export default theme;
