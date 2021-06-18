import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import font from '../../../../theme/font';

type Props = {
  image: string;
  title: string;
  subTitle: string;
  variant?: boolean;
};

const RulesBox: React.FC<Props> = ({ image, title, subTitle, variant = false }) => {
  const classes = useStyles();
  return (
    <Box
      className={[classes.rulesBox, variant && classes.rulesBoxVariant].join(' ')}
      px={0.5}
      boxSizing="border-box"
      m={0}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Box>
        <img src={image} alt="" />
      </Box>
      <Box className={classes.rulesBoxTitle} mt={1} mb={0}>
        {title}
      </Box>
      <Box className={classes.rulesBoxSubTitle}>{subTitle}</Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  rulesBox: {
    textTransform: 'uppercase',
    fontWeight: 600,
    fontFamily: font.primary,
    height: 170,
    width: 260,
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      width: 260,
      height: 170,
    },
  },
  rulesBoxVariant: {
    width: 175,
    [theme.breakpoints.down('xs')]: {
      width: 175,
    },
  },
  rulesBoxTitle: {
    color: '#f4d48c',
    fontSize: '110%',
    [theme.breakpoints.down('xs')]: {
      fontSize: '100%',
    },
    textAlign: 'center',
  },
  rulesBoxSubTitle: {
    fontSize: '80%',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: '60%',
    },
  },
}));

export default RulesBox;
