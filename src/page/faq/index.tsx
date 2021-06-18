import React, { useCallback, useEffect, useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import dialogBackgroundImg from '../../imgs/monetka/background_2.jpg';
import font from '../../theme/font';
import { getFaq } from '../../api/actions';
import { FaqItemType } from './types';
import { ApiAnswerStatus } from '../../api/types';
import FeedBack from './Feedback';

type Props = { recaptchaSitekey: string | undefined };

const Faq: React.FC<Props> = ({ recaptchaSitekey }) => {
  const [faqItems, setFaqItems] = useState<Array<FaqItemType>>([]);

  const classes = useStyles();

  const loadFaq = useCallback(async () => {
    const resp = await getFaq();
    if (resp.status === ApiAnswerStatus.SUCCESS) {
      setFaqItems(resp.data);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await loadFaq();
    })();
  }, [loadFaq]);

  return (
    <Box
      className={classes.container}
      mt={12}
      py={4}
      display="flex"
      flex="1 0 auto"
      flexDirection="column"
    >
      <Container>
        <Grid spacing={2} container>
          <Grid xs={12} sm={12} md={7} item>
            <Box className={classes.faqContainer} px={2} py={2}>
              <Box className={classes.faqTitle}>Часто задаваемые вопросы</Box>
              {faqItems.map((f) => (
                <Accordion key={f.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel1a-content_${f.id}`}
                    id={`panel1a-header_${f.id}`}
                  >
                    <Typography className={classes.heading}>{f.heading}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className={classes.content}>{f.content}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={5} item>
            <Box
              className={[classes.faqContainer, classes.feedBackContainer].join(' ')}
              px={2}
              py={2}
            >
              <Box className={classes.feedbackTitle}>Не нашел ответ на свой вопрос?</Box>
              <Box className={classes.feedbackBody}>
                Задай его нам и мы обязательно тебе ответим!
              </Box>
              <FeedBack recaptchaSitekey={recaptchaSitekey} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Faq;

const useStyles = makeStyles((theme) => ({
  container: {
    overflow: 'hidden',
    position: 'relative',
    backgroundImage: `url(${dialogBackgroundImg})`,
    backgroundPosition: 'top center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(3),
    },
    color: '#ffffff',
  },
  faqContainer: {
    backgroundColor: '#1E2A58',
    borderRadius: 10,
  },
  feedBackContainer: {
    backgroundColor: '#061346',
  },
  faqTitle: {
    fontSize: '120%',
    textTransform: 'uppercase',
    fontWeight: 400,
    fontFamily: font.secondary,
  },
  heading: {
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: font.secondary,
    color: 'white',
    fontSize: '90%',
  },
  content: {
    color: 'white',
    fontSize: '60%',
    fontFamily: font.primary,
    fontWeight: 300,
    lineHeight: 1.3,
  },
  feedbackTitle: {
    fontSize: '100%',
    textTransform: 'uppercase',
    fontWeight: 400,
    fontFamily: font.secondary,
    marginBottom: theme.spacing(2),
  },
  feedbackBody: {
    fontSize: '60%',
    fontWeight: 300,
    lineHeight: 1.2,
    fontFamily: font.primary,
  },
}));
