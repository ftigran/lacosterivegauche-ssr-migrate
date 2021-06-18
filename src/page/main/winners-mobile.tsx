import React, { useState } from 'react';
import {
  Box,
  Table,
  TableRow,
  TableCell,
  makeStyles,
  TableBody,
  TableContainer,
  Paper,
  Fade,
} from '@material-ui/core';

import Pagination from '../../components/pagination';
import font from '../../theme/font';
import theme from '../../theme/theme';
import Moment from 'react-moment';
import { WinnerItem } from './winners';

interface Props {
  data: WinnerItem[];
}
const useStyles = makeStyles((theme) => ({
  headCell: {
    fontWeight: 'bold',
    textAlign: 'left',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  bodyCell: {
    textAlign: 'left',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    width: '75%',
  },
  table: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    // width: "auto",
    '&:not(:last-child)': {
      borderBottom: '1px solid #E5E5E5',
    },
  },
  tableContainer: {
    borderBottomLeftRadius: theme.spacing(2 / 3),
    borderBottomRightRadius: theme.spacing(2 / 3),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: 'auto',
  },
}));

const WinnerList = (props: Props) => {
  const classes = useStyles();

  const [dataPaginate, setDataPaginate] = useState<WinnerItem[]>([]);
  const { data: winners = [] } = props;

  return (
    <Fade in={!!winners.length} unmountOnExit>
      <Box style={{ borderRadius: theme.spacing(3 / 4) }}>
        <Box
          py={4}
          px={2}
          style={{
            background: 'linear-gradient(270deg, #E8BB62 0%, #ECBF86 100%)',
            color: '#FFF',
            fontSize: '150%',
            fontWeight: 'bold',
            fontFamily: font.secondary,
            borderTopLeftRadius: theme.spacing(2 / 3),
            borderTopRightRadius: theme.spacing(2 / 3),
          }}
        >
          Победители
        </Box>

        <TableContainer component={Paper} className={classes.tableContainer}>
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
                <Table aria-label="collapsible table" className={classes.table} key={index}>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.headCell}>Дата</TableCell>
                      <TableCell className={classes.bodyCell}>
                        <Moment>{createDatetime}</Moment>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.headCell}>Телефон</TableCell>
                      <TableCell className={classes.bodyCell}>{phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.headCell}>Имя</TableCell>
                      <TableCell className={classes.bodyCell}>{firstname}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.headCell}>Приз</TableCell>
                      <TableCell className={classes.bodyCell}>{prizTitle}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              );
            },
          )}
        </TableContainer>
        <Box p={2}>
          <Pagination data={winners} pageSize={10} onChange={setDataPaginate} />
        </Box>
      </Box>
    </Fade>
  );
};

export default WinnerList;
