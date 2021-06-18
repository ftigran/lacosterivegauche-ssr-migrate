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
  Link,
} from '@material-ui/core';
import Moment from 'react-moment';
import Pagination from '../../../components/pagination';
import { BallAmount } from '../types';
import { BodyTextBold } from '../../../components/typography';
import { colors } from '../../../theme/theme';

interface Props {
  data?: BallAmount[];
}

const paginate = 10;

const BallList: React.FC<Props> = ({ data = [] }) => {
  const [dataPaginate, setDataPaginate] = useState<BallAmount[]>([]);
  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  return (
    <>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <RowHeader xs={xs} />
          </TableHead>
          <TableBody>
            {dataPaginate.map((row, index) => (
              <RowBody key={index} index={index} row={row} xs={xs} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {dataPaginate.length == 0 && (
        <Box mt={3}>
          <BodyTextBold color={colors.GREY3} align="center">
            У вас не было списания средств
          </BodyTextBold>
        </Box>
      )}
      <Pagination data={data} pageSize={paginate} onChange={setDataPaginate} />
    </>
  );
};

type RowProps = { xs: boolean };

const RowHeader: React.FC<RowProps> = ({ xs }) =>
  xs ? (
    <TableRow>
      <TableCell style={{ width: '65%' }} align={'left'}>
        Данные
      </TableCell>
      <TableCell style={{ width: '35%' }}>Статус</TableCell>
    </TableRow>
  ) : (
    <TableRow>
      <TableCell style={{ width: '25%' }}>Дата</TableCell>
      <TableCell style={{ width: '25%' }}>Наименование</TableCell>
      <TableCell style={{ width: '25%' }}>Сумма</TableCell>
      <TableCell style={{ width: '25%' }}>Статус</TableCell>
    </TableRow>
  );

type RowBodyProps = { index: number; row: BallAmount } & RowProps;

const RowBody: React.FC<RowBodyProps> = ({ xs, row }) =>
  xs ? (
    <TableRow>
      <TableCell align={'left'}>
        Дата: <Moment>{row.createDatetime}</Moment>
        <br />
        Наименование: {row.name}
        <br />
        Сумма: {`${row.amount} ₽`}
      </TableCell>
      <TableCell>
        <StatusCell ball={row} />
      </TableCell>
    </TableRow>
  ) : (
    <TableRow>
      <TableCell>
        <Moment>{row.createDatetime}</Moment>
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box>{`${row.amount} ₽`}</Box>
        </Box>
      </TableCell>
      <TableCell>
        <StatusCell ball={row} />
      </TableCell>
    </TableRow>
  );

type StatusCellProps = { ball: BallAmount };

const StatusCell: React.FC<StatusCellProps> = ({ ball }) =>
  ball.prize ? (
    ball.prize.sertcodelink ? (
      <Link href={ball.prize.sertcodelink} target="_blank">
        Скачать сертификат
      </Link>
    ) : (
      <Box>{ball.prize.status}</Box>
    )
  ) : (
    <Box>{ball.status}</Box>
  );

export default BallList;
