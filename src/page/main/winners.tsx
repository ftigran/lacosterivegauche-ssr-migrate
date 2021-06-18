import React, { useState } from 'react';
import {
  Box,
  Table,
  TableRow,
  TableCell,
  TableHead,
  makeStyles,
  TableBody,
  TableContainer,
  Paper,
  Fade,
  useMediaQuery,
  Theme,
} from '@material-ui/core';

import Pagination from '../../components/pagination';
import font from '../../theme/font';
import theme, { colors } from '../../theme/theme';
import Moment from 'react-moment';
import WinnersFindForm from './winners-find-form';
import NoBr from '../../components/nobr';
import { BodyText, PageTitle } from '../../components/typography';
import { Priz } from '../lk/types';
//
export interface WinnerItem {
  createDatetime: string;
  priz?: Priz;
  user: {
    email: string;
    firstname: string;
    phone: string;
  };
}

export interface Props {
  init: boolean;
  winners: WinnerItem[];
  search: (phone: string) => Promise<void>;
}
const useStyles = makeStyles(() => ({
  row: {
    // '&:not(:last-child)': {
    //   '& .MuiTableCell-root': {
    //     borderBottom: '1px solid #E5E5E5',
    //   },
    // },
  },
  table: {
    width: '100%',
  },
}));

const WinnerList = (props: Props) => {
  const classes = useStyles();

  const [dataPaginate, setDataPaginate] = useState<WinnerItem[]>([]);
  const { init, winners = [], search = () => new Promise(() => {}) } = props;

  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Box style={{ borderRadius: theme.spacing(3 / 4) }}>
      <Box
        textAlign="center"
        pt={4}
        pb={2}
        px={2}
        style={{
          color: '#fff',
          fontFamily: font.secondary,
        }}
      >
        <PageTitle>Победители</PageTitle>

        {/* <WinnersFindForm handleSubmit={search} /> */}
      </Box>

      <TableContainer
        style={
          {
            // borderTopLeftRadius: 0,
            // borderTopRightRadius: 0,
            // borderBottomLeftRadius: theme.spacing(2 / 3),
            // borderBottomRightRadius: theme.spacing(2 / 3),
            // boxShadow: '0px 8px 8px -5px rgba(0,0,0,.5)',
          }
        }
      >
        <Fade in={!!winners.length} unmountOnExit>
          <Box
            p={{
              sm: 2,
              md: 4,
            }}
            textAlign="center"
          >
            <Table aria-label="collapsible table" className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '25%' }}>Дата</TableCell>
                  {xs ? (
                    <TableCell style={{ width: '75%' }}>Победитель</TableCell>
                  ) : (
                    <>
                      <TableCell style={{ width: '25%' }}>E-mail</TableCell>
                      <TableCell style={{ width: '25%' }}>Имя</TableCell>
                      <TableCell style={{ width: '25%' }}>Приз</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataPaginate?.map(
                  (
                    {
                      createDatetime,
                      user: { firstname, email, phone },
                      priz: { name: prizTitle = '' } = {},
                    },
                    index,
                  ) => {
                    return (
                      <TableRow key={index} className={classes.row}>
                        <TableCell>
                          <Moment>{createDatetime}</Moment>
                        </TableCell>
                        {xs ? (
                          <TableCell>
                            <Box>
                              <NoBr>E-mail: {email}</NoBr>
                            </Box>
                            <Box>Имя: {firstname}</Box>
                            <Box>Приз: {prizTitle}</Box>
                          </TableCell>
                        ) : (
                          <>
                            <TableCell>
                              <NoBr>{email}</NoBr>
                            </TableCell>
                            <TableCell>{firstname}</TableCell>
                            <TableCell>{prizTitle}</TableCell>
                          </>
                        )}
                      </TableRow>
                    );
                  },
                )}
              </TableBody>
            </Table>
          </Box>
        </Fade>
        <Fade in={!winners.length} unmountOnExit>
          <Box p={4} textAlign="center" fontFamily={font.secondary} color={colors.GREY2}>
            {init ? (
              <>
                {' '}
                5 обладателей Главных призов будут определены 2 июля 2021 года.
                <br />
                Каждый зарегистрированный код – еще один шанс на победу. Участвуй!
              </>
            ) : (
              <>Поиск победителей...</>
            )}
          </Box>
        </Fade>
      </TableContainer>
      <Box p={2}>
        <Pagination data={winners} pageSize={10} onChange={setDataPaginate} />
      </Box>
    </Box>
    //
  );
};

export default WinnerList;
