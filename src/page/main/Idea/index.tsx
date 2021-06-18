import React from 'react';
import { Box, Container, makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import IdeaItem from './IdeaItem';
import { data } from './data';
import Slider from 'react-slick';
import ArrowNextWhiteImg from '../../../imgs/tikkurila/arrow_next.png';
import ArrowPrevWhiteImg from '../../../imgs/tikkurila/arrow_prev.png';
import font from '../../../theme/font';

type Props = {};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#ffffff',
  },
  title: {
    color: '#4E6276',
    fontSize: '180%',
    textTransform: 'uppercase',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3),
      fontSize: '130%',
    },
    fontFamily: font.tikkurila,
  },
}));

const Idea: React.FC<Props> = () => {
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const classes = useStyles();
  return (
    <Box className={classes.container} py={xs ? 6 : 15} id="idea">
      <Container>
        <Box className={classes.title}>Идеи для вашего интерьера</Box>
        <Box mt={xs ? 3 : 6} mb={2}>
          <Slider
            dots={false}
            infinite={true}
            speed={500}
            slidesToShow={sm ? 1 : 3}
            slidesToScroll={1}
            nextArrow={<img src={ArrowNextWhiteImg} />}
            prevArrow={<img src={ArrowPrevWhiteImg} />}
          >
            {data.map(({ image, title, description, link, id }) => (
              <IdeaItem
                image={image}
                title={title}
                description={description}
                link={link}
                key={id}
              />
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default Idea;
