import React, { useCallback } from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { ACTION, CATEGORY, ga } from '../../../../components/ga';

type Props = {
  image: string;
  title: string;
  description: string;
  link: string;
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: 271,
    height: 430,
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: 220,
    },
  },
  subtitle1: {
    color: '#3E3E3E',
    textTransform: 'uppercase',
    fontSize: '80%',
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
  },
  subtitle2: {
    color: '#3E3E3E',
    fontWeight: 'normal',
    fontSize: '75%',
    marginTop: theme.spacing(1),
    lineHeight: 1.2,
    height: 105,
  },
  btn: {
    textTransform: 'none',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  linkA: {
    outline: 'none',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const IdeaItem: React.FC<Props> = ({ image, title, description, link }) => {
  const classes = useStyles();

  const handleOnClick = useCallback(() => {
    ga.send(CATEGORY.Ideas, ACTION.click_more, title);
  }, [title]);

  return (
    <Box
      display="flex"
      className={classes.container}
      boxSizing="border-box"
      justifyContent="center"
      flexDirection="column"
    >
      <a href={link} target="_blank" onClick={handleOnClick} className={classes.linkA}>
        <img src={image} style={{ maxWidth: '100%' }} />
        <Typography variant="subtitle1" className={classes.subtitle1} align="center">
          {title}
        </Typography>
        <Typography variant="subtitle2" className={classes.subtitle2} align="center">
          {description}
        </Typography>
      </a>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          size={'large'}
          className={classes.btn}
          href={link}
          target="_blank"
          onClick={handleOnClick}
        >
          Подробнее
        </Button>
      </Box>
    </Box>
  );
};

export default IdeaItem;
