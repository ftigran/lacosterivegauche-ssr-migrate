import React, { useCallback, useMemo, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import font from '../../../../theme/font';
import Moneta from '../../../../imgs/monetka/moneta.png';
import SubmitButton from '../../../../components/submit-button';
import { useConfirm } from '../../../../components/ConfirmDialog';
import { Prize, TOnOrder } from '../type';
import ModalSelectSize from '../ModalSelectSize';

type Props = {
  image: string;
  prize: Prize;
  onOrder?: TOnOrder;
  balance: number;
  loading: boolean;
  countGamePrize: number;
};

const PrizItem: React.FC<Props> = ({ image, prize, onOrder, balance, loading, countGamePrize }) => {
  const [openModalVariant, setOpenModalVariant] = useState<boolean>(false);

  const { title, coin: cost, residue: amount } = prize;

  const classes = useStyles();

  const confirm = useConfirm();

  const isNotAvailable = useMemo<boolean>(() => balance < cost || amount === 0, [
    amount,
    cost,
    balance,
  ]);

  const handleClick = useCallback(() => {
    if (!isNotAvailable && confirm) {
      if (countGamePrize < 5) {
        confirm({
          title: 'Внимание',
          body: `Ты уверен, что хочешь заказать приз ${prize.title}?`,
        })
          .then((result) => {
            // console.log(result);
            if (result > 0) {
              if (prize.priz_variant && prize.priz_variant.length > 0) {
                setOpenModalVariant(true);
              } else {
                onOrder && onOrder(prize);
              }
            }
          })
          .catch(() => null);
      } else {
        confirm({
          title: 'Внимание',
          body: `За весь период акции ты можешь заказать не более 5 дополнительных призов`,
          alert: true,
          confirmationText: 'OK',
        }).then(() => null);
      }
    }
  }, [confirm, onOrder, prize, isNotAvailable, countGamePrize]);

  const onSelectVariant = useCallback(
    (prizeVariantId: number) => {
      setOpenModalVariant(false);
      onOrder && onOrder(prize, prizeVariantId);
    },
    [onOrder, prize],
  );

  return (
    <Box className={classes.container} m={1} display="flex" flexDirection="column">
      <Box className={classes.title}>{title}</Box>
      <Box
        className={classes.body}
        display="flex"
        flex={1}
        flexDirection="column"
        justifyContent="flex-end"
      >
        <Box display="flex" flex={1} flexGrow={1} alignItems="center" justifyContent="center">
          <img src={image} alt="" className={classes.image} />
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" py={1}>
          <Box className={classes.cost} mr={1 / 2}>
            {cost}
          </Box>
          <img src={Moneta} width={22} height={22} className={classes.imageMonet} />
        </Box>
        <SubmitButton
          processed={loading}
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Заказать
        </SubmitButton>
        <Box className={classes.amount} mt={1.25}>
          Осталось {amount}
        </Box>
      </Box>
      {isNotAvailable && (
        <Box
          className={classes.overlay}
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="#BBB"
        >
          недостаточно монет
        </Box>
      )}
      {prize.priz_variant && prize.priz_variant.length > 0 && (
        <ModalSelectSize
          onSelectVariant={onSelectVariant}
          onCancel={() => setOpenModalVariant(false)}
          prizeVariants={prize.priz_variant}
          open={openModalVariant}
        />
      )}
    </Box>
  );
};

export default PrizItem;

const BORDER_RADIUS = 8;

const useStyles = makeStyles((theme) => ({
  overlay: {
    width: 260,
    height: 390,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: BORDER_RADIUS,
  },
  container: {
    width: 260,
    height: 390,
    textAlign: 'center',
    position: 'relative',
  },
  title: {
    padding: theme.spacing(1),
    backgroundColor: '#ca060b',
    border: '1px solid rgba(202,6,11,0.2)',
    borderBottomWidth: 0,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    fontSize: '90%',
    fontFamily: font.secondary,
  },
  body: {
    backgroundColor: '#5084B7',
    paddingLeft: theme.spacing(1.75),
    paddingRight: theme.spacing(1.75),
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    paddingBottom: theme.spacing(1),
  },
  image: {
    width: '90%',
  },
  imageMonet: {
    width: 22,
    height: 22,
  },
  cost: {
    fontWeight: 300,
    fontSize: '60%',
  },
  amount: {
    fontSize: '50%',
    fontWeight: 300,
  },
}));
