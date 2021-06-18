import { makeStyles } from '@material-ui/core';
import font from '../../theme/font';
import { colors } from '../../theme/theme';

const useStyles = makeStyles((theme) => ({
  personButton: {
    fontSize: '75%',
  },

  casheBackInfo: {
    fontSize: '80%',
    color: 'white',
  },
  lkPageContainer: {
    // backgroundImage: `url(${dialogBackgroundImg})`,
    // backgroundPosition: 'top center',
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: 'cover',
    color: colors.GREY2,
  },
  checkRequeryBtn: {
    textTransform: 'uppercase',
    textDecoration: 'underline',
    fontWeight: 300,
  },

  gameTitle: {
    fontFamily: font.secondary,
    textTransform: 'uppercase',
    fontWeight: 300,
    fontSize: '90%',
    textAlign: 'center',
    marginBottom: theme.spacing(1.5),
  },
  gameStat: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',

    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
  },
  gameStatItem: {
    fontFamily: font.primary,
    textTransform: 'uppercase',
    fontWeight: 300,
    fontSize: '60%',
    textAlign: 'center',
  },
  gateStatCount: {
    marginTop: theme.spacing(1),
    fontFamily: font.primary,
    fontWeight: 600,
    fontSize: '130%',
  },
}));

export default useStyles;
