import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import font from '../../../../theme/font';
import Moneta from '../../../../imgs/monetka/moneta.png';

type Props = { title: string; count: number };

const StatItem: React.FC<Props> = ({ title, count }) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.statItem}
      display="flex"
      flexDirection="row"
      flexWrap="nowrap"
      alignItems="center"
      justifyContent={{
        xs: 'flex-start',
        sm: 'center',
      }}
      mx={2}
      my={1}
      flexGrow={{
        xs: 1,
        sm: 0,
      }}
    >
      <Box>{title}</Box>
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Box mr={1} ml={2}>
          {count}
        </Box>
        <img src={Moneta} width={27} height={27} />
      </Box>
    </Box>
  );
};

export default StatItem;

const useStyles = makeStyles((theme) => ({
  statItem: {
    fontFamily: font.primary,
    fontWeight: 300,
    fontSize: '80%',
  },
}));
