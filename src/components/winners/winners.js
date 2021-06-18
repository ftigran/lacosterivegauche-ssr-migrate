import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Table from './table';
import SearchBar from './searchBar';
import { getWinners as winnersAction } from '../../api/actions';

import './winners.scss';

const Winners = (props) => {
  const [winners, setWinners] = useState(undefined);

  const loadWinners = useCallback((page, data) => {
    // setLoadingLkInfo(true);
    winnersAction(page, data).then((r) => {
      console.log('r.data?.data', r.data?.data);
      setWinners({
        per_page: r.data?.per_page,
        total: r.data?.total,
        page: r.data?.page,
        prizes: r.data?.data,
      });
    });
  }, []);

  useEffect(() => {
    try {
      loadWinners();
    } catch (e) {
      console.log(e);
    }
  }, [loadWinners]);

  return (
    <div className="winnersContainer">
      {/* {winners?.total > 0 ? ( */}
        {/* <> */}
          <p className="titleWinners">Поиск победителей по Телефону</p>
          <SearchBar loadWinners={setWinners} />

          <Table winners={winners} loadWinners={loadWinners} />
        {/* </> */}
      {/* ) : (
        <h3>Победители ещё не определены</h3>
      )} */}
    </div>
  );
};

export default Winners;
  