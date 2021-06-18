import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import MenuList from './menuList';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/';
import menu from 'src/img/menu.svg';
import close from 'src/img/close.svg';
import { useDispatch, useSelector } from 'react-redux';
import { SET_DIALOG } from '../../store/props/types';

import './header.scss';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState('');
  const trigger = useScrollTrigger({ target: window });

  const [state, setState] = React.useState(false);
  const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const sm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };
  const dispatch = useDispatch();
  const reg = () =>
    dispatch({
      type: SET_DIALOG,
      payload: { checkReg: { open: true } },
    });
  const slideReg = () => {
    setState(false);
    reg();
  };
  React.useEffect(() => {
    window.addEventListener('scroll', (e) => {
      e.preventDefault();

      if (window.pageYOffset > 95) {
        if (isScrolled == '') {
          setIsScrolled('scrolled');
        }
      } else {
        setIsScrolled('');
      }
    });
  }, []);
  console.log(trigger);
  return (
    <>
      {sm && (
        <SwipeableDrawer
          anchor={'right'}
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          className="slideMenu"
        >
          <MenuList closeMenu={() => setState(false)} />
          <Grid item className={'toReg'}>
            <Button onClick={slideReg} variant="outlined">
              Регистрация чека
            </Button>
          </Grid>
        </SwipeableDrawer>
      )}

      <Slide appear={false} direction="down" in={!trigger || state}>
        <AppBar className={`${isScrolled} header ${state ? 'transparentBG' : ''}`}>
          <Grid className="headerContainer" container justify="space-between" alignItems="center">
            <Grid item>
              <Grid container alignItems="center" className="logoContainer">
                <Grid item className="logo_RG" />
                <Grid item className="logo_Lacoste">
                  {/* <a href="https://vk.com/liptonrussia" target="_blank" className="logoLink logo_lipton">
            Липтон
            </a> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="list">
              {sm ? (
                <Button onClick={toggleDrawer(!state)} className={'headerMenu'}>
                  <img src={state ? close : menu} />
                </Button>
              ) : (
                <MenuList reg={reg} />
              )}
            </Grid>
          </Grid>
        </AppBar>
      </Slide>
    </>
  );
};

export default Header;
