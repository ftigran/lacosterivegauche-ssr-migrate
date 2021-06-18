import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

type Props = {
  image: string;
  title: string;
};

const useStyles = makeStyles((theme) => ({
  box: {
    height: 170,
    width: 370,
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderStyle: 'solid',
    [theme.breakpoints.down('xs')]: {
      height: 140,
    },
  },
  title: {
    textTransform: 'uppercase',
    fontSize: '80%',
    [theme.breakpoints.down('xs')]: {
      fontSize: '65%',
    },
  },
}));

const WhyBox: React.FC<Props> = ({ image, title }) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      className={classes.box}
      px={4}
      boxSizing="border-box"
      m={1.5}
    >
      <Box mr={4}>
        <img src={image} style={{ maxWidth: '100%' }} />
      </Box>
      <Box className={classes.title} mt={2} mb={2}>
        {title}
      </Box>
    </Box>
  );
};

export default WhyBox;
