import React from 'react';
import Dialog, { Params as DialogParams } from '../../components/dialog';
import { Box, makeStyles, useMediaQuery, Theme } from '@material-ui/core';
import imgGuidCheck from '../../imgs/guid-check.png';
import font from '../../theme/font';
import theme, { colors } from '../../theme/theme';

export interface DialogGuidCheckProps extends DialogParams {}

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: `url(${imgGuidCheck})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    backgroundPosition: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));

export default (props: DialogGuidCheckProps) => {
  const { open = false, ...other } = props;
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  const classes = useStyles();

  return (
    <Dialog {...other} open={open} title="Требования к кассовому чеку">
      <Box
        display="flex"
        flexDirection={xs ? 'column' : 'row'}
        alignItems="stretch"
        justifyContent={xs ? 'center' : 'flex-start'}
        py={2}
        color={colors.GREY2}
        style={{
          // backgroundColor: '#fff',
          borderRadius: theme.spacing(3 / 4),
        }}
        fontWeight="300"
        fontFamily={font.primary}
      >
        <Box flex={xs ? '0 0 auto' : '1 1 65%'} position="relative" minHeight={500}>
          <Box className={classes.image}></Box>
        </Box>
        <Box
          flex={xs ? '0 0 auto' : '1 1 35%'}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          textAlign="left"
        >
          <Box flex="0 0 auto" lineHeight={1.5} px={xs ? 2 : 0}>
            <Box fontSize="60%">
              На чеке должно быть:
              <br />
              <br />
              - Наименование магазина
              <br />
              <br />
              - Номер чека
              <br />
              <br />
              - Дата и время покупки <br />
              <br />
              - Наличие минимум 2-х акционных продуктов
              <br />
              <br />
              - Итоговая сумма покупки
              <br />
              <br />
              -QR-код, а в его отсутствие - номера ФН, ФД, ФП/ФПД
            </Box>
          </Box>
          <Box flex=" 0 0 auto" fontSize="50%" mt={2} mb={xs ? 2 : 4} px={xs ? 2 : 0}>
            * При отсутствии в чеке любого из перечисленных пунктов чек будет отклонен
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};
