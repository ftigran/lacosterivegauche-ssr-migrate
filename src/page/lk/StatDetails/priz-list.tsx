import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  useMediaQuery,
  Theme,
  Box,
  Link,
} from '@material-ui/core';
import Pagination from '../../../components/pagination';
import Moment from 'react-moment';
import { ProjectProps } from '../../../store/props/types';
import { useSelector } from '../../../hooks';
import SelectPostomatDialog from '../../../components/select-postomat/select-postomat';
import { Priz } from '../types';

interface Props {
  processed?: boolean;
  refresh?: () => void;
  setNeedPrizVariant?(id: number | undefined): void;
  data?: Priz[];
}
const useStylesRow = makeStyles((theme) => ({}));

function Row(props: { index: number; row: Priz; xs: boolean; openPickpoint: () => void }) {
  const { row, xs, openPickpoint = () => {} } = props;
  const classes = useStyles();
  return xs ? (
    <TableRow>
      <TableCell align={'left'}>
        Дата: <Moment>{row.createDatetime}</Moment>
        <br />
        Наименование {row.name}
      </TableCell>
      <TableCell>
        <Box>{row.status}</Box>
        {row.sertcodelink !== null && (
          <Box>
            <Link
              href={`#`}
              onClick={(e: any) => {
                openPickpoint();
                e.preventDefault();
              }}
              className={classes.btnSelectPost}
            >
              Выбрать постамат
            </Link>
          </Box>
        )}
      </TableCell>
    </TableRow>
  ) : (
    <TableRow>
      <TableCell>
        <Moment>{row?.createDatetime}</Moment>
      </TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>
        <Box>{row.status}</Box>
        {row.sertcodelink !== null && (
          <Box>
            <Link
              href={`#`}
              onClick={(e: any) => {
                openPickpoint();
                e.preventDefault();
              }}
              className={classes.btnSelectPost}
            >
              Выбрать постамат
            </Link>
          </Box>
        )}
      </TableCell>
    </TableRow>
  );
}

export default (props: Props) => {
  const { data = [], refresh } = props;
  const [dataPaginate, setDataPaginate] = useState<Priz[]>([]);

  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  const paginate = 10;

  const [openPickpointDialog, setOpenPickpointDialog] = useState<{
    open: boolean;
    pickpointIkn?: number;
    userPrizId: number;
  }>({ open: false, userPrizId: 0 });

  const { pickpointIkn } = useSelector(
    (state: { propsReducer: ProjectProps }) => state.propsReducer,
  );

  return (
    <>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            {xs ? (
              <TableRow>
                <TableCell style={{ width: '65%' }} align="left">
                  Данные приза
                </TableCell>
                <TableCell style={{ width: '35%' }}>Статус</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell style={{ width: '25%' }}>Дата</TableCell>
                <TableCell style={{ width: '25%' }}>Наименование</TableCell>
                <TableCell style={{ width: '25%' }}>Статус</TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {Array.isArray(dataPaginate) &&
              dataPaginate.map((row, index) => {
                return !!row?.id ? (
                  <Row
                    xs={xs}
                    key={index}
                    index={index}
                    row={row}
                    openPickpoint={() =>
                      setOpenPickpointDialog({
                        open: true,
                        userPrizId: row?.id,
                        pickpointIkn,
                      })
                    }
                  />
                ) : (
                  <></>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination data={data} pageSize={paginate} onChange={setDataPaginate} />
      <SelectPostomatDialog
        {...openPickpointDialog}
        onClose={(r: boolean) => {
          setOpenPickpointDialog({ ...openPickpointDialog, open: false });
          if (r) {
            refresh && refresh();
          }
        }}
      />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  btnSelectPost: {
    fontSize: '80%',
    textDecoration: 'underline',
  },
}));
