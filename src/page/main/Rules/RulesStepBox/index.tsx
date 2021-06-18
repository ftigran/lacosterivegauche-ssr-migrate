import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { BodyText, BodyTextBold } from '../../../../components/typography';

type Props = {
  title: string;
  body: string | React.ReactNode;
  image: string;
  addContent?: React.ReactNode;
  onClick?: () => void;
};

const RulesStepBox: React.FC<Props> = ({ title, body, image, addContent, onClick }) => {
  const classes = useStyles();
  return (
    <Box
      px={0.5}
      boxSizing="border-box"
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      my={{
        xs: 2,
        sm: 4,
        md: 6,
      }}
      onClick={onClick}
    >
      <Box className={classes.imageContainer}>
        <img src={image} alt={title} className={classes.image} />
      </Box>
      <Box ml={2}>
        <BodyTextBold>{title}</BodyTextBold>
        <BodyText>{body}</BodyText>
        {addContent !== undefined && <Box>{addContent}</Box>}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: '100%',
  },
  imageContainer: {
    width: 100,
    flexBasis: 100,
    flexShrink: 0,
    justifyContent: 'center',
    display: 'flex',
    alignSelf: 'self-start',
  },
}));

export default RulesStepBox;
