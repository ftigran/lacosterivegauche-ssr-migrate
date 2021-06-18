import React, { useCallback } from 'react';
import { Box, createStyles, Link, Theme, WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SubmitButton from '../../../components/submit-button';
import { OrderPrizeType, PrizeValiant } from '../../../api/actions';
import { useConfirm } from '../../../components/ConfirmDialog';
import { ACTION, CATEGORY, ga } from '../../../components/ga';
import { colors } from '../../../theme/theme';

export type PrizeOrderFunc = (prize: OrderPrizeType) => void;

const LIMIT_ORDER = 30;

type Props = {
  processed: boolean;
  onButtonFirstClick?: PrizeOrderFunc;
  onButtonSecondClick?: PrizeOrderFunc;
  onButtonThirdClick?: () => void;
  amountSum: number;
} & WithStyles<typeof styles>;

const defaultOptions = {
  title: 'Информация',
  body: 'Для совершения операции накопите не менее 30 рублей',
  confirmationText: 'OK',
  alert: true,
};

const ActionPanel: React.FC<Props> = ({
  classes,
  processed,
  onButtonFirstClick,
  onButtonSecondClick,
  onButtonThirdClick,
  amountSum,
}) => {
  const confirm = useConfirm();

  const handleClickManual = useCallback(() => {
    confirm &&
      confirm({
        title: 'Как загрузить QR-код?',
        body: (
          <Box fontSize={14} textAlign="left">
            <ul className={classes.ul}>
              <li className={classes.li}>
                Для участия в Акции требуется отсканировать код под крышкой акционного продукта
                Valio, это можно сделать 2 способами:
                <br /> 1. С помощью камеры своего телефона: если есть встроенный сканер QR-кодов или
                установлено приложение для скана;
                <br />
                2. С помощью камеры на сайте акции: она доступна при нажатии кнопки
                «Зарегистрировать QR-код» в Личном кабинете.
                <br />
              </li>

              <li className={classes.li}>
                Положить крышку на ровную поверхность и постараться держать камеру строго перед
                QR-кодом.
              </li>
              <li className={classes.li}>
                Необходимо обеспечить хорошее равномерное освещение по всей поверхности крышки без
                бликов, стараясь не засвечивать код и стремясь к максимальной контрастности кода и
                крышки.
                <br />
                Для обеспечения лучшей контрастности, избегайте направления прямого яркого света на
                сканируемую поверхность; Вы можете затемнить сканируемую поверхность, создав на пути
                рассеянного света легкую тень. Если камера автоматически повышает яркость –
                попробуйте увеличить расстояние между кодом и камерой, таким образом сохраняя
                затемнение.
              </li>
              <li className={classes.li}>QR-код должен быть без искажений, ровный квадрат.</li>
              <li className={classes.li}>
                В случае, если отсканировать QR-код не удается, загрузите его фото, соблюдая
                указанные выше рекомендации.
              </li>
            </ul>
            Не получается? Не переживайте, пришлите фото кода нам на{' '}
            <a href="mailto:support@les.valio.ru">support@les.valio.ru</a> и мы Вам обязательно
            поможем!
          </Box>
        ),
        alert: true,
        confirmationText: 'Ok',
      });
  }, [confirm]);

  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height={'100%'}
      ml={{
        xs: 0,
        sm: 4,
        md: 8,
        lg: 10,
      }}
    >
      <SubmitButton
        processed={processed}
        variant="contained"
        color="secondary"
        fullWidth
        onClick={(e) => {
          e.stopPropagation();
          try {
            ga.send(CATEGORY.Cash_fee, ACTION.tree_charity, 'Личный кабинет');
          } catch (ex) {}
          if (amountSum < LIMIT_ORDER) {
            confirm && confirm(defaultOptions);
          } else {
            onButtonFirstClick && onButtonFirstClick(PrizeValiant.CERT);
          }
        }}
        // disabled={amountSum < LIMIT_ORDER}
      >
        Посадить дерево
      </SubmitButton>
      <Box my={2}>
        <SubmitButton
          processed={processed}
          variant="contained"
          color="secondary"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            try {
              ga.send(CATEGORY.Cash_fee, ACTION.receive_on_phone, 'Личный кабинет');
            } catch (ex) {}
            if (amountSum < LIMIT_ORDER) {
              confirm && confirm(defaultOptions);
            } else {
              onButtonSecondClick && onButtonSecondClick(PrizeValiant.CASH_BACK);
            }
          }}
          // disabled={amountSum < LIMIT_ORDER}
        >
          Вывести деньги
        </SubmitButton>
      </Box>
      <SubmitButton
        processed={processed}
        variant="contained"
        color="primary"
        fullWidth
        onClick={(e) => {
          e.stopPropagation();
          try {
            ga.send(CATEGORY.Qr, ACTION.click_button, 'Личный кабинет');
          } catch (ex) {}
          onButtonThirdClick && onButtonThirdClick();
        }}
      >
        Зарегистрировать QR-код
      </SubmitButton>
      <Box textAlign="center" mt={1 / 2}>
        <Link onClick={handleClickManual} className={classes.link1}>
          Как загрузить QR-код?
        </Link>
      </Box>
    </Box>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    link1: {
      color: colors.GREY2,
      textDecoration: 'underline',
      fontSize: 14,
      cursor: 'pointer',
    },
    li: {
      marginTop: 8,
      marginBottom: 8,
      lineHeight: 1.5,
      marginLeft: 0,
      paddingLeft: 0,
    },
    ul: {
      paddingLeft: 0,
    },
  });

export default withStyles(styles)(ActionPanel);
