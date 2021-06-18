import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Image from '../../../../imgs/woolite/main-page-arrow.png';

type Props = {
  down?: boolean;
};

const Arrow: React.FC<Props> = ({ down = false }) => {
  const classes = useStyles();
  return (
    <Box
      className={down ? classes.containerDown : classes.container}
      mt={down ? 0 : 3}
      mb={down ? 4 : 0}
      mx={down ? 0 : 2}
    >
      <img src={Image} className={[classes.image, down && classes.imageDown].join(' ')} alt="" />
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  image: {
    width: 24,
    height: 24,
  },
  imageDown: {
    transform: 'rotate(90deg)',
  },
  container: {},
  containerDown: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

export default Arrow;
