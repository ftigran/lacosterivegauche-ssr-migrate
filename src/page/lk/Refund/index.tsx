import React, { useCallback, useMemo } from 'react';
import {
  Box,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  useMediaQuery,
} from '@material-ui/core';
import font from '../../../theme/font';
import { RefundType } from './type';
import Currency from '../../../components/currency';
import Moment from 'react-moment';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';

type Props = {
  data?: Array<RefundType>;
};

const useStyles = makeStyles(() => ({
  title: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: '130%',
    color: '#fff',
    fontFamily: font.primary,
  },
  boxQuestion: {
    width: 20,
    height: 20,
    borderRadius: 11,
    border: '1px solid #FCF297',
    color: '#fff',
    fontSize: 14,
    lineHeight: 1,
    fontFamily: font.arial,
    marginLeft: 10,
    cursor: 'pointer',
  },
  popoverText: {
    fontSize: '90%',
    color: '#7f3168',
    maxWidth: 300,
  },
}));

const Refund: React.FC<Props> = ({ data }) => {
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  const classes = useStyles();

  const popoverStateRender = useCallback(
    (it: RefundType) => (
      <PopupState variant="popover" popupId={`popup-popover-moderate-${it.id}`}>
        {(popupState) => (
          <>
            <Box
              className={classes.boxQuestion}
              display="flex"
              alignItems="center"
              justifyContent="center"
              {...bindTrigger(popupState)}
            >
              <Box>?</Box>
            </Box>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Box p={2} className={classes.popoverText}>
                {it.moderateReason}
              </Box>
            </Popover>
          </>
        )}
      </PopupState>
    ),
    [classes],
  );

  const renderTableData = useCallback(
    (it: RefundType, index) =>
      xs ? (
        <TableRow key={`refund-mob-${index}`}>
          <TableCell style={{ width: '50%' }}>
            <Box mt={1}>
              <Box component="span" fontWeight={900}>
                Дата заявки
              </Box>
              <br />
              <Moment>{it.date}</Moment>
            </Box>
            <Box mt={1}>
              <Box component="span" fontWeight={900}>
                Статус заявки
              </Box>
              <br />

              <Box display="flex" alignItems="center" justifyContent="center">
                <Box>{it.status}</Box>
                {it.docStatusName === 'cancel' && popoverStateRender(it)}
              </Box>
            </Box>
            <Box mt={1} mb={1}>
              <Box component="span" fontWeight={900}>
                Сумма возврата
              </Box>
              <br />
              {it.refund ? <Currency value={it.refund} /> : '-'}
            </Box>
          </TableCell>
          <TableCell style={{ width: '50%' }} valign={'middle'}>
            <Box component="span" fontWeight={900}>
              Статус возврата
            </Box>
            <br />
            {it.refundStatus ? it.refundStatus : '-'}
          </TableCell>
        </TableRow>
      ) : (
        <TableRow key={`refund-mob-${index}`}>
          <TableCell>
            <Moment>{it.date}</Moment>
          </TableCell>
          <TableCell>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box>{it.status}</Box>
              {it.docStatusName === 'cancel' && popoverStateRender(it)}
            </Box>
          </TableCell>
          <TableCell>{it.refund ? <Currency value={it.refund} /> : '-'}</TableCell>
          <TableCell>{it.refundStatus ? it.refundStatus : '-'}</TableCell>
        </TableRow>
      ),
    [popoverStateRender, xs],
  );

  const tableBody = useMemo(() => <TableBody>{data?.map(renderTableData)}</TableBody>, [
    data,
    renderTableData,
  ]);

  const tableHead = useMemo(
    () => (
      <TableHead>
        {!xs && (
          <TableRow>
            <TableCell style={{ width: '25%' }}>Дата заявки</TableCell>
            <TableCell style={{ width: '25%' }}>Статус заявки</TableCell>
            <TableCell style={{ width: '25%' }}>Сумма возврата</TableCell>
            <TableCell style={{ width: '25%' }}>Статус возврата</TableCell>
          </TableRow>
        )}
      </TableHead>
    ),
    [xs],
  );

  return (
    <>
      <Box py={2} className={classes.title}>
        Мои заявки
      </Box>
      <TableContainer>
        <Table aria-label="collapsible table">
          {tableHead}
          {tableBody}
        </Table>
      </TableContainer>
    </>
  );
};

export default Refund;
