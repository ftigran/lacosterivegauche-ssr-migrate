import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import font from '../../../../theme/font';
import { BodyText, BodyTextBold } from '../../../../components/typography';
import { colors } from '../../../../theme/theme';

type Props = {
  title: string;
  subtitle: string | React.ReactNode;
  image: string;
  addContent?: React.ReactNode;
};

const PrizeItem: React.FC<Props> = ({ title, image, subtitle, addContent }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container} display="flex" flexDirection="row">
      <Box className={classes.imageContainer} width={{ xs: 100, sm: 100, md: 300 }} flexShrink={0}>
        <img src={image} alt={title} className={classes.image} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        ml={{
          xs: 0,
          sm: 3,
          md: 5,
        }}
        justifyContent="center"
      >
        <Box
          className={classes.title}
          my={{
            xs: 1 / 2,
            md: 1,
          }}
        >
          <BodyTextBold color={colors.WHITE} upper>
            {title}
          </BodyTextBold>
        </Box>
        <Box
          className={classes.subtitle}
          my={{
            xs: 1 / 2,
            md: 1,
          }}
        >
          <BodyText color={colors.WHITE}>{subtitle}</BodyText>
        </Box>
        {addContent !== undefined && (
          <Box
            my={{
              xs: 1 / 2,
              md: 1,
            }}
          >
            {addContent}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {},
  title: {},
  subtitle: {},
  image: {
    // maxWidth: '100%',
    // width: '100%',
    width: '100%',
    maxWidth: '100%',
  },
  imageContainer: {},
}));

export default PrizeItem;
