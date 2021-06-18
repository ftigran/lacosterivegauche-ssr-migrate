import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
// import Pagination from '../Pagination/Pagination';
import Pagination from '@material-ui/lab/Pagination';
import { IconButton } from '@material-ui/core';
import { usePagination } from '@material-ui/lab/Pagination';
import arrow from 'src/img/arrow.svg';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './table.scss';
import moment from 'moment';

export default function StickyHeadTable({ winners, loadWinners }) {
  const mob = useMediaQuery((theme) => theme.breakpoints.down('xs'));

  const tableHead = useMemo(
    () => (
      <TableHead>
        <TableRow className={'tableHeader'}>
          {mob ? (
            <>
              <TableCell style={{ width: '41%' }}>Дата</TableCell>
              <TableCell style={{ width: '59%' }}>Победитель</TableCell>
            </>
          ) : (
            <>
              <TableCell style={{ width: '33%' }}>Дата</TableCell>
              <TableCell style={{ width: '33%' }}>телефон</TableCell>
              <TableCell style={{ width: '33%' }}>приз</TableCell>
            </>
          )}
        </TableRow>
      </TableHead>
    ),
    [mob],
  );

  // const RowBody = ({ xs, row }) =>
  //   xs ? (
  //     <TableRow>
  //       <TableCell align={'left'}>
  //         Дата: <Moment>{row.createDatetime}</Moment>
  //         <br />
  //         Наименование: {row.name}
  //         <br />
  //         Сумма: {`${row.amount} ₽`}
  //       </TableCell>
  //       <TableCell>
  //         <StatusCell ball={row} />
  //       </TableCell>
  //     </TableRow>
  //   ) : (
  //     <TableRow>
  //       <TableCell>
  //         <Moment>{row.createDatetime}</Moment>
  //       </TableCell>
  //       <TableCell>{row.name}</TableCell>
  //       <TableCell>
  //         <Box display="flex" alignItems="center" justifyContent="center">
  //           <Box>{`${row.amount} ₽`}</Box>
  //         </Box>
  //       </TableCell>
  //       <TableCell>
  //         <StatusCell ball={row} />
  //       </TableCell>
  //     </TableRow>
  //   );

  const handleChangePage = (event, newPage) => {
    console.log('newPage');
    console.log(newPage);
    try {
      loadWinners(newPage);
    } catch (e) {
      console.log(e);
    }
  };
  const pages = Math.ceil(winners?.total / winners?.per_page);
  const { items } = usePagination({
    count: pages,
    onChange: handleChangePage,
  });
  console.log('render');
  return (
    <Paper className={'table'}>
      {winners?.total > 0 ? (
        <>
          <div className="bg">
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                {tableHead}
                <TableBody>
                  {winners?.prizes.map((priz) => (
                    <TableRow tabIndex={-1} key={priz.priz.id}>
                      <TableCell className={'tableCell'}>
                        {moment(priz.createDatetime, '').format('DD.MM.YYYY')}
                      </TableCell>
                      {mob ? (
                        <TableCell className={'tableCell tableCellMob'}>
                          <p>{priz.user.phone}</p>
                          <p>{priz.priz.name}</p>
                        </TableCell>
                      ) : (
                        <>
                          <TableCell className={'tableCell'}>{priz.user.phone}</TableCell>
                          <TableCell className={'tableCell'}>{priz.priz.name}</TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          {pages > 1 && (
            <nav className={'pagination '}>
              <ul>
                {items.map(({ page, type, selected, ...item }, index) => {
                  let children = null;

                  if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                    children = '…';
                  } else if (type === 'page') {
                    children = (
                      <IconButton
                        style={{
                          fontWeight: selected ? 'bold !important' : undefined,
                          backgroundColor: selected ? '#FAEEE2' : 'transparent',
                          width: 50,
                          height: 50,
                        }}
                        {...item}
                      >
                        {page}
                      </IconButton>
                    );
                  } else {
                    children = (
                      <IconButton {...item} className={type === 'next' ? 'rotated arrow' : 'arrow'}>
                        <img src={arrow} />
                      </IconButton>
                    );
                  }
                  return (
                    <li
                      key={index}
                      style={{ margin: 'auto 0' }}
                      className={type === 'next' || type === 'previous' ? 'arrowWrap' : null}
                    >
                      {children}
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </>
      ) : (
        <h3>Победитель с таким номером телефона не найден</h3>
      )}
    </Paper>
  );
}
