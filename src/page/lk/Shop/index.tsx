import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, Container, Fade, makeStyles } from '@material-ui/core';
import font from '../../../theme/font';
import StatItem from './StatItem';
import PrizItem from './PrizItem';
import PrizeMonet1 from '../../../imgs/monetka/prize/Jacket_2.png';
import PrizeMonet2 from '../../../imgs/monetka/prize/Bag_2.png';
import PrizeMonet3 from '../../../imgs/monetka/prize/Frame_458.png';
import PrizeMonet4 from '../../../imgs/monetka/prize/Frame_459.png';
import { getShopPrizes, selectPrize } from '../../../api/actions';
import { Prize, TOnOrder } from './type';
import { ApiAnswerStatus } from '../../../api/types';
import clsx from 'clsx';
import { BalanceType } from '../types';
import { useConfirm } from '../../../components/ConfirmDialog';

type Props = {
  gameBalance?: BalanceType;
  countGamePrize: number;
  orderSuccess?: () => void;
};

const Shop: React.FC<Props> = ({ gameBalance, orderSuccess, countGamePrize }) => {
  const classes = useStyles();
  const confirm = useConfirm();

  const [shopPrizes, setShopPrizes] = useState<Array<Prize>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [orderLoading, setOrderLoading] = useState<boolean>(false);

  const { cost = 0, balance = 0 } = gameBalance ?? {};

  const loadPrizes = useCallback(async () => {
    setShopPrizes(await getPrize());
  }, []);

  const residue = useMemo<number>(() => balance - cost, [cost, balance]);

  // загрузка призов
  useEffect(() => {
    (async () => {
      await loadPrizes();
      setLoading(false);
    })();
  }, [loadPrizes]);

  const handleOnOrder = useCallback<TOnOrder>(
    async (prize, priz_variant_id) => {
      if (!orderLoading) {
        setOrderLoading(true);
        try {
          const responseOrder = await selectPrize(prize.id, { priz_variant_id });
          if (responseOrder.status === ApiAnswerStatus.SUCCESS) {
            orderSuccess && orderSuccess();

            confirm &&
              confirm({
                title: 'Поздравляем!',
                alert: true,
                body:
                  `Ты заказал приз «${prize.title}»! ` +
                  'Приз будет доставлен в постомат сервиса PickPoint. ' +
                  'Для получения приза в течение следующих 3-х рабочих дней ' +
                  'тебе необходимо выбрать адрес удобного для тебя постоамата Личном Кабинете.',
                confirmationText: 'Ок',
              }).then(() => null);

            await loadPrizes();
          } else {
            confirm &&
              confirm({
                title: 'Ошибка',
                alert: true,
                body: 'Ошибка заказа приза',
                confirmationText: 'Ок',
              }).then(() => null);
          }
          console.log('@@@selectPrize responseOrder: ', responseOrder);
        } catch (err) {
          console.log('@@@selectPrize err: ', err);
        } finally {
          setOrderLoading(false);
        }
      }
      console.log('@@@handleOnOrder: ', prize);
    },
    [loadPrizes, orderLoading, orderSuccess, confirm],
  );

  return (
    <Box className={classes.container} pt={4} pb={4}>
      <Container>
        <Box className={classes.title} mb={4}>
          Каталог призов
        </Box>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center" my={2}>
          <StatItem title="Начислено" count={balance} />
          <StatItem title="Использовано" count={cost} />
          <StatItem title="Остаток" count={residue} />
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="center" flexWrap="wrap" pt={2}>
          {loading ? (
            <Fade in={loading} unmountOnExit>
              <CircularProgress color="primary" size={64} className={clsx('animated fadeIn')} />
            </Fade>
          ) : (
            <>
              {shopPrizes.map((prize) => (
                <PrizItem
                  onOrder={handleOnOrder}
                  prize={prize}
                  image={getImage(prize.name)}
                  key={prize.name}
                  balance={residue}
                  loading={orderLoading}
                  countGamePrize={countGamePrize}
                />
              ))}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Shop;

const getImage = (name: string): string => {
  switch (name) {
    case 'shirt':
      return PrizeMonet1;
    case 'backpack':
      return PrizeMonet2;
    case 'hoody':
      return PrizeMonet3;
    case 't-shirt':
      return PrizeMonet4;
    default:
      return PrizeMonet1;
  }
};

const getPrize = async (): Promise<Array<Prize>> => {
  const resp = await getShopPrizes();
  if (resp.status === ApiAnswerStatus.SUCCESS && resp.data?.priz) {
    return resp.data?.priz;
  }
  return [];
};

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#061347',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 400,
  },
  title: {
    fontFamily: font.secondary,
    fontSize: '130%',
    fontWeight: 600,
    textAlign: 'center',
  },
}));
