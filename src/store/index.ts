import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './auth/reducer';
import propsReducer from './props/reducer';
import gameReducer from './game/reducer';
import codeReducer from './code/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['codeReducer'],
};

const reducer = combineReducers({
  form: formReducer,
  propsReducer,
  authReducer,
  gameReducer,
  codeReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export type RootState = ReturnType<typeof reducer>;

export type AppDispatch = typeof store.dispatch;

export default store;
