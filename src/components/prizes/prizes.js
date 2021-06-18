import React from 'react';
import Grid from '@material-ui/core/Grid';
import json2mq from 'json2mq';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import priz1 from 'src/img/priz1.jpg';
import priz2 from 'src/img/priz2.jpg';
import priz3 from 'src/img/priz3.jpg';
import priz4 from 'src/img/priz4.jpg';

import fl1 from 'src/img/fl1.png';
import fl2 from 'src/img/fl2.png';
import fl3 from 'src/img/fl3.png';
import fl1m from 'src/img/fl1_mob.png';
import fl2m from 'src/img/fl2_mob.png';
import fl3m from 'src/img/fl3_mob.png';

import './prizes.scss';

const Prizes = () => {
  const mob = useMediaQuery(
    json2mq({
      minWidth: 780,
    }),
  );
  return (
    <div className="prizWrap">
      <img src={mob ? fl1m : fl1} width="885" height="889" className="bgimg img1" />
      <img src={mob ? fl2m : fl2} width="873" height="873" className="bgimg img2" />
      <img src={mob ? fl3m : fl3} width="927" height="927" className="bgimg img3" />
      <div className="prizContainer">
        <div className="priz priz1">
          <img src={priz1} width="268" height="285" className="imgBG" />
          <h4>Главный приз</h4>
          <p>
            Романтические выходные
            <br />в городе санкт-петербург
          </p>
        </div>
        <div className="priz priz2">
          <img src={priz2} width="198" height="149" className="imgBG" />
          <h4>Подарок при покупке*</h4>
          <p>
            Наборы ароматов: <br />
            Lacoste Pour Femme
          </p>
        </div>
        <div className="priz priz3">
          <img src={priz3} width="198" height="211" className="imgBG" />
          <h4>призы </h4>
          <p>Модные сумки Lacoste</p>
        </div>
        <div className="priz priz4">
          <img src={priz4} width="198" height="205" className="imgBG" />
          <h4>призы</h4>
          <p>сертификаты рив гош</p>
        </div>
      </div>
    </div>
  );
};
// let numb=1;

export default Prizes;
