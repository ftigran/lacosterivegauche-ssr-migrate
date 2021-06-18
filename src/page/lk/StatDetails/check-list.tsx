import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  useMediaQuery,
  Theme,
  makeStyles,
} from '@material-ui/core';
import Moment from 'react-moment';
import Pagination from '../../../components/pagination';
import { useSelector } from 'react-redux';
import { ProjectProps } from '../../../store/props/types';
import font from '../../../theme/font';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';

export interface Doc {
  id: number;
  created_at: string;
  doc_status: { title: string; name: string };
  moderate_reason?: { title: string; name: string } | null;
  check_fd: string;
  check_fpd: string;
  check_fn: string;
  check_date: string;
  check_time: string;
  check_summa: string;
  cache_summa: string;
  cache: {
    id: number;
    value: string;
    created_at: string;
    cache_status: {
      name: string;
      title: string;
    };
  } | null;
  user_priz?: { priz: Priz }[];
}
interface Props {
  data?: Doc[];
}
interface Priz {
  name: string;
  title: string;
}

const useStylesPersonalLineItem = makeStyles(() => ({
  boxQuestion: {
    width: 20,
    height: 20,
    borderRadius: 11,
    border: '1px solid #FCF297',
    color: '#FCF297',
    fontSize: 14,
    lineHeight: 1,
    fontFamily: font.arial,
    marginLeft: 10,
    cursor: 'pointer',
  },
  popoverText: {
    fontSize: '80%',
    color: '#3E3E3E',
    maxWidth: 300,
  },
  status: {},
}));

function Row(props: { index: number; row: Doc; xs: boolean }) {
  const { index, row, xs } = props;
  const { user_priz = [] } = row;
  const classes = useStylesPersonalLineItem();
  return xs ? (
    <TableRow>
      <TableCell align={'left'}>
        Дата: <Moment>{row?.created_at}</Moment>
        <br />
        Промокод: {row?.check_fpd}
      </TableCell>
      <TableCell>10 ₽</TableCell>
    </TableRow>
  ) : (
    <TableRow>
      <TableCell>
        <Moment>{row?.created_at}</Moment>
      </TableCell>
      <TableCell>{row?.check_fpd}</TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box>10 ₽</Box>
          {/* row?.doc_status?.name === 'cancel' && (
            <PopupState variant="popover" popupId={`popup-popover-moderate-${row.id}`}>
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
                      {row.moderate_reason?.title}
                    </Box>
                  </Popover>
                </>
              )}
            </PopupState>
          ) */}
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default (props: Props) => {
  const { data = [] } = props;
  const [dataPaginate, setDataPaginate] = useState<Doc[]>([]);
  const { pickpointIkn, paginate = 10 } = useSelector(
    (state: { propsReducer: ProjectProps }) => state.propsReducer,
  );

  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  return (
    <>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            {xs ? (
              <TableRow>
                <TableCell style={{ width: '65%' }} align={'left'}>
                  Данные кода
                </TableCell>
                <TableCell style={{ width: '35%' }}>Начислено</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell style={{ width: '33%' }}>Дата</TableCell>
                <TableCell style={{ width: '33%' }}>Промокод</TableCell>
                <TableCell style={{ width: '33%' }}>Начислено</TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {dataPaginate.map((row, index) => (
              <Row key={index} index={index} row={row} xs={xs} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination data={data} pageSize={paginate} onChange={setDataPaginate} />
    </>
  );
};
