import React, { useState } from 'react';
import {
  Box,
  createStyles,
  Grid,
  Grow,
  Hidden,
  Tab,
  Tabs,
  Theme,
  WithStyles,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ImageProd1 from '../../../../imgs/valio/rules/product_botle.png';
import ImageProd2 from '../../../../imgs/valio/rules/product_lozhka.png';
import { colors } from '../../../../theme/theme';
import font from '../../../../theme/font';
import CodeList from '../../../lk/StatDetails/code-list';
import BallList from '../../../lk/StatDetails/ball-list';

type Props = {} & WithStyles<typeof styles>;

const ProductAction: React.FC<Props> = ({ classes }) => {
  const [tabState, setTabState] = useState<number>(0);

  const leftComp = (
    <React.Fragment>
      <Box className={classes.imageContainer}>
        <img src={ImageProd1} className={classes.image} />
      </Box>
      <Box className={classes.text}>
        Йогурт питьевой Valio с малиной и злаками <br />
        Сlean label®, 0.4 %, 330 г.
        <br />
        <br />
        Йогурт питьевой Valio с черешней <br />
        Сlean label®, 0.4 %, 330 г.
        <br />
        <br />
        Йогурт питьевой Valio с малиной и черникой <br />
        Сlean label®, 0.4 %, 330 г.
        <br />
        <br />
        Йогурт питьевой Valio с клубникой <br />
        Сlean label®, 0.4 %, 330 г.
        <br />
        <br />
        Йогурт питьевой Valio с бананом <br />
        Сlean label®, 0.4 %, 330 г.
        <br />
        <br />
        Йогурт питьевой Valio с манго <br />
        Сlean label®, 0.4 %, 330 г.
      </Box>
    </React.Fragment>
  );

  const rightComp = (
    <React.Fragment>
      <Box className={classes.imageContainer}>
        <img src={ImageProd2} className={classes.image} />
      </Box>
      <Box className={classes.text}>
        Йогурт Valio с черникой и клубникой <br />
        Сlean label®, 2.6 %, 180 г.
        <br />
        <br />
        Йогурт Valio с малиной <br />
        Сlean label®, 2.6 %, 180 г.
        <br />
        <br />
        Йогурт Valio с клубникой <br />
        Сlean label®, 2.6 %, 180 г.
        <br />
        <br />
        Йогурт Valio с вишней <br />
        Сlean label®, 2.6 %, 180 г.
        <br />
        <br />
        Йогурт Valio с персиком <br />
        Сlean label®, 2.6 %, 180 г.
        <br />
        <br />
        Йогурт Valio с манго <br />
        Сlean label®, 2.6 %, 180 г.
      </Box>
    </React.Fragment>
  );

  return (
    <Box className={classes.root}>
      <Grid container spacing={1} justify={'center'}>
        <Grid item xs={12}>
          <Box className={classes.title} mb={2} textAlign="center">
            В акции принимает участие следующая продукция с специальным промо-дизайном
          </Box>
        </Grid>
      </Grid>
      <Hidden mdUp>
        <Grid container spacing={1} justify={'center'}>
          <Grid item xs={12}>
            <Tabs
              textColor="primary"
              value={tabState}
              variant="standard"
              indicatorColor="primary"
              onChange={(e, v) => setTabState(v)}
              centered
            >
              <Tab label="Питьевой" className={classes.tabButton} />
              <Tab label="Ложковый" className={classes.tabButton} />
            </Tabs>
          </Grid>
          <Grid item>
            <Box mt={2}>
              <Grow in={tabState === 0} unmountOnExit timeout={tabState !== 0 ? 0 : 500}>
                <Box>{leftComp}</Box>
              </Grow>
              <Grow in={tabState === 1} timeout={tabState !== 1 ? 0 : 500} unmountOnExit>
                {rightComp}
              </Grow>
            </Box>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden smDown>
        <Grid container spacing={2} justify="center">
          <Grid item xs={6}>
            {leftComp}
          </Grid>
          <Grid item xs={6}>
            <Box className={classes.right}>{rightComp}</Box>
          </Grid>
        </Grid>
      </Hidden>
    </Box>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    title: {
      color: colors.GREY1,
      fontSize: 18,
      fontFamily: font.primary,
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },

    text: {
      color: colors.GREY2,
      fontSize: 16,
      fontFamily: font.primary,
      textAlign: 'left',
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
    },
    imageContainer: {
      height: 180,
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(3),
    },
    image: {
      maxWidth: '100%',
    },
    right: {
      paddingLeft: theme.spacing(4),
    },
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
  });

export default withStyles(styles)(ProductAction);
