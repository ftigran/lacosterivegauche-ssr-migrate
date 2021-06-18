import React, { useCallback, useEffect, useState } from 'react';
import Dialog, { Params as DialogParams } from '../../../components/dialog';
import { Box, makeStyles, CircularProgress } from '@material-ui/core';
import SubmitButton from '../../../components/submit-button';
import font from '../../../theme/font';
import { create_bank_card_session } from '../../../api/actions';
import { ApiAnswerStatus } from '../../../api/types';
import Currency from '../../../components/currency';
import phoneFilter from '../../../components/filter/phone';

export interface DialogGuidCheckProps extends DialogParams {}

const useStyles = makeStyles(() => ({
  text: {
    fontSize: '80%',
  },
  phoneText: {
    fontSize: '110%',
    fontWeight: 'bold',
  },
}));

type Props = DialogParams & {
  processed: boolean;
  amount: number;
  bankCardNeed: boolean;
  accessBankCard: boolean;
  bankCardNumber?: string | null;
  onConfirm: () => void;
};

const DialogYandexCardBinding: React.FC<Props> = ({
  open = false,
  processed,
  amount,
  onConfirm,
  ...props
}) => {
  const [processedCreateSession, setProcessedCreateSession] = useState<boolean>(false);
  const [link, setLink] = useState<string | undefined>(undefined);
  const classes = useStyles();

  const handleCreateCardSession = useCallback(async () => {
    setProcessedCreateSession(true);
    try {
      const resp = await create_bank_card_session();
      console.log('@@@create_bank_card_session resp: ', resp);
      if (resp.status === ApiAnswerStatus.SUCCESS) {
        setLink(resp.data.url_src);
      }
    } catch (err) {
      console.log('@@@create_bank_card_session err: ', err);
    } finally {
      setProcessedCreateSession(false);
    }
  }, []);

  useEffect(() => {
    link === undefined &&
      props.bankCardNeed &&
      open &&
      (async () => {
        await handleCreateCardSession();
      })();
  }, [link, handleCreateCardSession, open, props.bankCardNeed]);

  return (
    <Dialog
      open={open}
      title={props.bankCardNeed ? 'Привязка карты' : 'Зачисление на банковскую карту'}
      {...props}
      maxWidth={'xl'}
    >
      {props.accessBankCard && (
        <Box>
          <Box
            color="#616161"
            textAlign="center"
            lineHeight={1.3}
            mt={4}
            fontWeight="normal"
            fontFamily={font.arial}
          >
            <Box className={classes.text}>
              Кэшбэк в размере <Currency value={amount} /> будет зачислен на карту.
            </Box>
            <Box className={classes.phoneText} my={3}>
              {props.bankCardNumber}
            </Box>
            <Box className={classes.text}>Пожалуйста, подтвердите перевод</Box>
          </Box>
          <Box mt={4}>
            <SubmitButton
              variant="contained"
              color="primary"
              size="large"
              fullWidth={false}
              onClick={onConfirm}
              processed={processed}
            >
              Перевести на карту
            </SubmitButton>
          </Box>
        </Box>
      )}
      {props.bankCardNeed && (
        <Box>
          {link === undefined && processedCreateSession && (
            <>
              <Box m={4} alignItems="center" justifyContent="center">
                <CircularProgress color="primary" />
              </Box>
            </>
          )}
          {link !== undefined && !processedCreateSession && (
            <Box>
              <iframe
                src={link}
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                scrolling={'yes'}
                width="100%"
                height="600"
              />
            </Box>
          )}
        </Box>
      )}
    </Dialog>
  );
};

export default DialogYandexCardBinding;
