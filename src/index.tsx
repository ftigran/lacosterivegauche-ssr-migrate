import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './page/app';

import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider } from '@material-ui/core';
import { themeDefault } from './theme';
import { Provider } from 'react-redux';
import store from './store';
import Moment from 'react-moment';
import { BrowserRouter } from 'react-router-dom';
import moment from 'moment-timezone';
import 'moment/locale/ru';
import 'animate.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './scss/app.scss';
import { ConfirmProvider } from './components/ConfirmDialog';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

moment.locale('ru');
moment.tz.setDefault('Europe/Moscow');
moment.defaultFormat = 'DD.MM.YYYY';
Moment.globalLocale = 'ru';
Moment.globalFormat = 'DD.MM.YYYY';
Moment.globalTimezone = 'Europe/Moscow';

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

declare global {
  interface Window {
    dataLayer?: any;
    PickPoint?: { open?(r: any, p?: { ikn: number }): void };
  }
}
window.dataLayer = window.dataLayer || [];
window.PickPoint = window.PickPoint || {
  open: (r: any, p: { ikn: number }) => {},
};

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MuiThemeProvider theme={themeDefault}>
        <ConfirmProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfirmProvider>
      </MuiThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
