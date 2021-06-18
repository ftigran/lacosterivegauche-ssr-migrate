import React from 'react';
import Dialog, { Params as DialogParams } from '../../../components/dialog';
import { Box, makeStyles, Button } from '@material-ui/core';
import SubmitButton from '../../../components/submit-button';
import font from '../../../theme/font';
import phoneFilter from '../../../components/filter/phone';
import Currency from '../../../components/currency';

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
  onConfirm: () => void;
  phone: string;
  processed: boolean;
  amount: number;
};

const DialogPhoneOutCash: React.FC<Props> = ({
  open = false,
  phone,
  onConfirm,
  processed,
  amount,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Dialog open={open} title="Зачисления на телефон" {...props}>
      <Box
        color="#616161"
        textAlign="center"
        lineHeight={1.3}
        mt={4}
        fontWeight="normal"
        fontFamily={font.arial}
      >
        <Box className={classes.text}>
          Кэшбэк в размере <Currency value={amount} /> будет зачислен на номер телефона:
        </Box>
        <Box className={classes.phoneText} my={3}>
          {phoneFilter(phone)}
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
          Перевести на телефон
        </SubmitButton>
      </Box>
    </Dialog>
  );
};

export default DialogPhoneOutCash;
