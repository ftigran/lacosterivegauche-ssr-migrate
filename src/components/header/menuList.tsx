import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { Link, Element, Events, animateScroll as scroll } from 'react-scroll';

const Menu = (props:any) => {
  const { reg=false, closeMenu=false }=props
  const menuItems = [
    { title: 'Главная', push: '/#index', to: 'index' },
    { title: 'Призы', push: '/#prizes', to: 'prizes' },
    { title: 'Победители', push: '/#winners', to: 'winners' },
    // { title: "Регистрация чека", push: "/reg" },
    // { title: "Правила", push: "/rules" },
  ];
  const history = useHistory();

  return (
    <>
      {menuItems.map((item, key) => (
        <Link
          key={key}
          // className={`${classes.navItem} ${key === 0 && classMain}`}
          activeClass="active"
          offset={-60}
          to={item.to}
          isDynamic
          onClick={() => {
            if (closeMenu) closeMenu();
            const a = item.push;
            console.log(a);
            history.push(a);
          }}
          spy
          title={item.title}
          smooth="easeInOutQuint"
          ignoreCancelEvents
          duration={700}
        >
          {item.title}
        </Link>
      ))}
      {reg && (
        <a className="bordered" onClick={reg}>
          Регистрация чека
        </a>
      )}
      <a href="/backend/files/rules.pdf" target="_blank">
        Правила
      </a>
    </>
  );
};
export default Menu;
