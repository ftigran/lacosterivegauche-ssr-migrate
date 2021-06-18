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
    width: 270,
    height: 375,
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: 240,
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
  },
  btn: {
    textTransform: 'none',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  imageStyle: {
    width: 230,
  },
  linkA: {
    outline: 'none',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const ProductItem: React.FC<Props> = ({ image, title, description, link }) => {
  const classes = useStyles();
  const handleOnClick = useCallback(() => {
    ga.send(CATEGORY.Products, ACTION.click_more, title);
  }, [title]);
  return (
    <Box
      display="flex"
      className={classes.container}
      boxSizing="border-box"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <a href={link} target="_blank" onClick={handleOnClick} className={classes.linkA}>
        <img src={image} className={classes.imageStyle} alt={title} />
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

export default ProductItem;
