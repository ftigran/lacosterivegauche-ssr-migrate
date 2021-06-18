import React, { useEffect, useState } from 'react';
import MainView from './MainView';
import Rules from './Rules';
import Prizes from './Prizes';
import About from './About';
import { makeStyles, Box, Container } from '@material-ui/core';
import Winners, { Props as WinnersProps } from './winners';
import { useLocation } from 'react-router-dom';
import { parse } from 'querystring';
import { fetchPrivateAPITokenBySocToken } from '../../api/service';

type Props = WinnersProps & { isWait: boolean };

const Page: React.FC<Props> = ({ isWait = false, ...props }) => {
  const classes = useStyles();
  const { winners: data = [], search, init } = props;

  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const location = useLocation();
  const query = parse(location.search.replace(/^\?/, ''));

  useEffect(() => {
    if (!authLoading && query.signin !== undefined && query.token !== undefined) {
      setAuthLoading(true);
      (async () => {
        try {
          const r = await fetchPrivateAPITokenBySocToken(`${query.token ?? ''}`);
          if (r.status === 200) {
            document.location.href = '/lk';
          } else {
            document.location.href = '/';
          }
        } catch (e) {
          document.location.href = '/';
        } finally {
          setAuthLoading(false);
        }
      })();
    }
  }, [query, authLoading]);

  return (
    <Box className={classes.bgContainer}>
      <MainView isWait={isWait} />
      <About />
      {!isWait && <Rules />}
      {!isWait && <Prizes />}
      {!isWait && (
        <Box
          id="winners"
          pb={2}
          pt={2}
          style={{
            // backgroundImage: `url(${dialogBackgroundImg})`,
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <Container>
            <Winners winners={data} search={search} init={init} />
          </Container>
        </Box>
      )}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  bgContainer: {
    // backgroundImage: `url(${dialogBackgroundImg})`,
    // backgroundPosition: 'top center',
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: 'cover',
    // [theme.breakpoints.down('md')]: {
    //   backgroundSize: 1920,
    //   backgroundPosition: 'center 30px',
    // },
    // [theme.breakpoints.down('sm')]: {
    //   backgroundSize: 1600,
    //   backgroundPosition: 'center 30px',
    // },
    // [theme.breakpoints.down('xs')]: {
    //   backgroundImage: `url(${dialogBackgroundMobileImg})`,
    //   backgroundSize: 'contain',
    //   backgroundPosition: 'center 50px',
    // },
  },
}));

export default Page;
