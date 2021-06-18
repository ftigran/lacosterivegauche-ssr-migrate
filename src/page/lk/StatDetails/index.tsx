import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  createStyles,
  Fade,
  Grid,
  Grow,
  Tab,
  Tabs,
  Theme,
  WithStyles,
} from '@material-ui/core';
import theme, { colors } from '../../../theme/theme';
import DocList, { Doc } from './check-list';
import PrizList from './priz-list';
import BlockItem from '../BlockItem';
import font from '../../../theme/font';
import { BallAmount, Priz, PromoCode } from '../types';
import { withStyles } from '@material-ui/core/styles';
import CodeList from './code-list';
import BallList from './ball-list';

type Props = {
  loadLkInfo?: () => void;
  docList?: Doc[];
  prizList?: Priz[];
  promoCodeList?: PromoCode[];
  ballAmountList?: BallAmount[];
  processed: boolean;
} & WithStyles<typeof styles>;

const StatDetails: React.FC<Props> = ({ classes, promoCodeList, ballAmountList, processed }) => {
  const [tabState, setTabState] = useState<number>(0);

  return (
    <Box className={classes.listContainer}>
      <Container maxWidth="md">
        <Grid container spacing={1} alignItems="stretch">
          <Grid item xs={12} style={{ paddingBottom: theme.spacing(0) }}>
            <Tabs
              textColor="primary"
              value={tabState}
              variant="standard"
              indicatorColor="primary"
              onChange={(e, v) => setTabState(v)}
              centered
            >
              <Tab label="Мои коды" className={classes.tabButton} />
              <Tab label="Мой эко-счет" className={classes.tabButton} />
            </Tabs>
          </Grid>
          <BlockItem xs={12} item>
            <Fade in={processed} unmountOnExit>
              <Box py={4}>
                <CircularProgress color="primary" style={{ margin: 'auto', display: 'block' }} />
              </Box>
            </Fade>
            <Fade in={!processed} unmountOnExit>
              <Box>
                <Grow in={tabState === 0} unmountOnExit timeout={tabState !== 0 ? 0 : 500}>
                  <Box>
                    <CodeList data={promoCodeList} />
                  </Box>
                </Grow>
                <Grow in={tabState === 1} timeout={tabState !== 1 ? 0 : 500} unmountOnExit>
                  <Box>
                    <BallList data={ballAmountList} />
                  </Box>
                </Grow>
              </Box>
            </Fade>
          </BlockItem>
        </Grid>
      </Container>
    </Box>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    tabButton: {
      background: 'transparent',
      textTransform: 'none',
      '&.Mui-selected': {
        background: 'none',
      },
      fontSize: '100%',
      fontFamily: font.primary,
      fontWeight: 'normal',
      marginRight: 0,
      marginLeft: 0,
    },
    listContainer: {
      color: colors.GREY2,
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  });

export default withStyles(styles)(StatDetails);
