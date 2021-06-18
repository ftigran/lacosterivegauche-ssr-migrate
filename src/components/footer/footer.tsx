import React from 'react';
import {
  useMediaQuery,
  Theme,
  makeStyles,
  Box,
  BoxProps,
  Grid,
  Container,
} from '@material-ui/core';
import font from '../../theme/font';
import ImageIconPdf from '../../imgs/woolite/pdf-icon.png';
import { ACTION, CATEGORY, ga } from '../ga';
import { colors } from '../../theme/theme';
// import SocialGroup from '../social-group';
// import { ga, CATEGORY, ACTION } from '../ga';
interface Props {
  rulesLink: string;
  agreementLink: string;
  docCookiesLink: string;
  email?: string;
}

const footerTextColor = colors.DARK;

const useStyles = makeStyles((theme) => ({
  containerBox: {
    // backgroundColor: '#00488C',
    // background:  'rgb(166,123,2)',
    // background: 'linear-gradient(180deg, rgba(166,123,2,1) 0%, rgba(246,214,120,1) 100%)',
    color: footerTextColor,
    textAlign: 'center',
    padding:"13px 0 20px",
    width:"100%",
    background: "#E7DACA",
    // height:105
    marginTop:-1,
    [theme.breakpoints.down('xs')]: {
      paddingBottom: 34
    }

  },
  container: {
    fontFamily: font.primary,
    fontSize: '80%',
    lineHeight: 1.15,
    fontWeight: 'normal',
    padding: "0 25px",
    [theme.breakpoints.down('xs')]: {
    padding: "0 15px",
    }
    
  },
  docLink: {
    color: footerTextColor,
    textDecoration: 'none',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(1 / 2),
    marginTop: theme.spacing(3 / 4),
    fontSize: 16,
    fontWeight: "bold",
    [theme.breakpoints.down('xs')]: {
    marginBottom: theme.spacing(3/2),

    fontSize: 14,
    }
  },
  emailLink: {
    color: footerTextColor,
    textDecoration: 'none',

  },
}));

const Footer = ({
  rulesLink,
  agreementLink,
  docCookiesLink,
  email = 'support@pepsimonetka.ru',
  ...props
}: Props & BoxProps) => {
  const classes = useStyles();
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Box className={classes.containerBox} p={2} component={"footer"}>
      <Container className={classes.container}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item xs={12} sm={12} md={5}>
            <Box
              textAlign={smDown ? 'center' : 'left'}
              my={1}
              justifyContent={smDown ? 'center' : 'space-between'}
              display="flex"
              flexDirection={'column'}
            >
              <a
                target="_blank"
                href={'/backend/files/rules.pdf'}
                className={classes.docLink}
                onClick={() => {
                  ga.send(CATEGORY.InteractionDoc, ACTION.rules);
                }}
              >
                Правила акции
              </a>
              <a
                target="_blank"
                href={'/backend/files/useragreem.pdf'}
                className={classes.docLink}
                onClick={() => {
                  ga.send(CATEGORY.InteractionDoc, ACTION.agreement);
                }}
              >
                Пользовательское соглашение
              </a>
            </Box>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={4}> */}
          {/*  <a*/}
          {/*    target="_blank"*/}
          {/*    href={docCookiesLink}*/}
          {/*    className={classes.docLink}*/}
          {/*    onClick={() => {*/}
          {/*      // ga.send(CATEGORY.InteractionDoc, ACTION.rules);*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    Политика по использованию файлов cookies*/}
          {/*  </a>*/}
          {/* </Grid> */}
          <Grid item xs={12} sm={12} md={7}>
    
            <Box textAlign={smDown ? 'center' : 'right'} my={1} fontSize={{xs:14,sm:16}} style={{opacity: "0.7",}} >
              Пишите нам на{' '}
              <a className={"emailLink "+classes.emailLink} href={`mailto:support@spb-holidays.com `}>
              support@spb-holidays.com 
              </a>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
