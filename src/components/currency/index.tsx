import React from 'react';
import CurrencyFormat from 'react-currency-format';

type Props = { value?: number | string };

const Currency: React.FC<Props> = ({ value }) =>
  value !== undefined ? (
    <CurrencyFormat value={value} displayType={'text'} thousandSeparator={' '} suffix={' руб.'} />
  ) : null;

export default Currency;
