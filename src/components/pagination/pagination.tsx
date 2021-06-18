import React, { useState, useEffect, useMemo } from 'react';
import { Pagination } from '@material-ui/lab';
import { makeStyles, Box } from '@material-ui/core';
import { colors } from '../../theme/theme';

interface Props {
  data: any[];
  pageSize: number;
  onChange(d: any[]): void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPagination-ul': {
      justifyContent: 'center',
      '& .MuiPaginationItem-root': {
        fontSize: '70%',
        fontWeight: 'bold',
      },
      '& .MuiPaginationItem-page': {
        color: colors.GREY1,
        backgroundColor: 'transparent',
        '&.Mui-selected': {
          backgroundColor: '#fff',
          color: colors.DARK_BLUE,
        },
      },
    },
  },
}));

export default (props: Props) => {
  const { data, pageSize, onChange } = props;
  const [page, setPage] = useState(1);
  const count = useMemo(() => Math.ceil(data.length / pageSize), [data, pageSize]);
  const classes = useStyles();

  useEffect(() => {
    if (!!data.length) onChange(data.slice((page - 1) * pageSize, page * pageSize));
  }, [page, data]);
  return count > 1 ? (
    <Box p={2}>
      <Pagination className={classes.root} count={count} onChange={(e, page) => setPage(page)} />
    </Box>
  ) : (
    <></>
  );
};
