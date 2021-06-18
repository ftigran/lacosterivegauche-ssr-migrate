import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '../../../../components/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { PrizeVariant } from '../type';
import { Box } from '@material-ui/core';

type Props = {
  onSelectVariant: (prizeVariantId: number) => void;
  onCancel: () => void;
  prizeVariants: Array<PrizeVariant>;
  open: boolean;
};

const ModalSelectSize: React.FC<Props> = ({ onSelectVariant, onCancel, prizeVariants, open }) => {
  const classes = useStyles();

  const [variantId, setVariantId] = useState<number | undefined>(undefined);

  const handleOk = useCallback(() => {
    variantId && setVariantId(undefined);
    variantId && onSelectVariant(variantId);
  }, [onSelectVariant, variantId]);

  const handleClickVariant = useCallback((id: number) => {
    setVariantId(id);
  }, []);

  return (
    <Dialog maxWidth={'sm'} fullWidth open={open} onClose={onCancel}>
      <DialogTitle onClose={onCancel}>Информация</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Box>Выбери размер футболки</Box>
        <Box display="flex" flexDirection="row" justifyContent="center" my={2}>
          {prizeVariants.map((prizeVariant, index) => (
            <Box
              key={`${index}_${prizeVariant.id}`}
              className={[
                classes.variant,
                variantId === prizeVariant.id ? classes.variantSel : '',
              ].join(' ')}
              onClick={() => handleClickVariant(prizeVariant.id)}
              m={1.5}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box className={classes.text}>{prizeVariant.title}</Box>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant={'contained'}
          onClick={handleOk}
          disabled={variantId === undefined}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    marginTop: theme.spacing(3),
  },
  variant: {
    width: 140,
    height: 140,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0)',
  },
  variantSel: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    border: '1px solid rgba(255,255,255,0.8)',
  },
  text: {
    fontSize: '200%',
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bold',
  },
}));

export default ModalSelectSize;
