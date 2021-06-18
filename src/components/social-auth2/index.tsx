import React from 'react';
import { Box, createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import VKImage from '../../imgs/valio/soc/Logo/VK/Normal.png';
import OKImage from '../../imgs/valio/soc/Logo/OK/Normal.png';
import FBImage from '../../imgs/valio/soc/Logo/FB/Normal.png';
import font from '../../theme/font';
import { colors } from '../../theme/theme';
import { BodyText } from '../typography';
import { ACTION, CATEGORY, ga } from '../ga';

type Props = { title: string } & WithStyles<typeof styles>;

const { REACT_APP_API_URL } = process.env;

const SocialAuth: React.FC<Props> = ({ title, classes }) => {
  return (
    <Box>
      <BodyText color={colors.GREY2}>{title}</BodyText>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Box my={1} mx={1}>
          <form action={`${REACT_APP_API_URL}/signin/vkontakte`} method="POST">
            <button
              type={'submit'}
              className={classes.button}
              onClick={() => {
                ga.send(CATEGORY.Authorization, ACTION.over_social_a, 'vkontakte');
              }}
            >
              <img src={VKImage} width={26} height={26} />
            </button>
          </form>
        </Box>
        <Box my={1} mx={1}>
          <form action={`${REACT_APP_API_URL}/signin/odnoklassniki`} method="POST">
            <button
              type={'submit'}
              className={classes.button}
              onClick={() => {
                ga.send(CATEGORY.Authorization, ACTION.over_social_a, 'odnoklassniki');
              }}
            >
              <img src={OKImage} width={26} height={26} />
            </button>
          </form>
        </Box>
        <Box my={1} mx={1}>
          <form action={`${REACT_APP_API_URL}/signin/facebook`} method="POST">
            <button
              type={'submit'}
              className={classes.button}
              onClick={() => {
                ga.send(CATEGORY.Authorization, ACTION.over_social_a, 'facebook');
              }}
            >
              <img src={FBImage} width={26} height={26} />
            </button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    button: {
      borderWidth: 0,
      background: 'none',
      cursor: 'pointer',
      height: 26,
      width: 26,
      padding: 0,
      margin: 0,
      borderRadius: 13,
      '&:hover': {
        boxShadow: '0px 0px 8px 2px rgba(0,0,0,.2)',
      },
      '&:focus': {
        outline: 'none',
      },
    },
  });

export default withStyles(styles)(SocialAuth);
