import React, { useEffect, useState, FC } from 'react';
import { Box } from '@material-ui/core';
import DesktopPage from './main-desktop';
import { WinnerItem } from './winners';
import { winners as winnersAction } from '../../api/actions';
type Props = { isWait: boolean };

const Main: FC<Props> = (props) => {
  const [winners, setWinners] = useState<WinnerItem[]>([]);

  const [winnersInit, setWinnersInit] = useState<boolean>(false);

  useEffect(() => {
    winnersAction()
      .then((r) => {
        setWinners(r.data?.data);
        // setWinners(mockWinner);
        setWinnersInit(true);
      })
      .catch((e) => {
        console.log('@winners error: ', e);
      });
  }, []);

  async function searchWinners(email: string) {
    const r = await winnersAction({ email });

    console.log(r);

    setWinners(r.data);
    // setWinners(mockWinner);
    setWinnersInit(true);
  }

  return (
    <Box flex="1 0 auto" display="flex" flexDirection="column" justifyContent="center">
      <DesktopPage {...props} winners={winners} search={searchWinners} init={winnersInit} />
    </Box>
  );
};

export default Main;
