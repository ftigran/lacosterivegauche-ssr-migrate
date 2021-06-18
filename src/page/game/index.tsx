import React from 'react';
import { DefaultPageContainer } from '../page-container';
import { Box, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  container: {},
}));

type Props = {};

/*
*
  getPrize = (score) => { },
  exit = (score) => { },
  realGameStarts = () => { },
  realGameEnds = (score) => { },
*
* */

const Game: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <DefaultPageContainer>
        <Box>Игра</Box>
    </DefaultPageContainer>
  );
};

export default Game;
