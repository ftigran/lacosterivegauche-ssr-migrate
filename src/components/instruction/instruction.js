import React from 'react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './instruction.scss';

const Instruction = () => {
  const mob = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const list = [
    { title: 'Купи', text: 'Аромат lacoste pour femme' },
    { title: 'Получи', text: 'в подарок набор ароматов lacoste' },
    { title: 'Зарегистрируй', text: 'Чек на сайте' },
    {
      title: 'выиграй',
      text: (
        <>
          романтическую поездку на
          <br />
          двоих, модную сумку Lacoste
          <br />
          или подарочный
          {mob && <br />}
          сертификат рив гош
        </>
      ),
    },
  ];
  return (
    <Grid spacing={2} container className="instructionContainer">
      {list.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} className="instructionItem" key={index}>
          <h3 className="title">{index + 1}</h3>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </Grid>
      ))}
    </Grid>
  );
};
// let numb=1;

export default Instruction;
