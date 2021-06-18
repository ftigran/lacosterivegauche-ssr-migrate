import { AUTH, FETCH_AUTH_REQUEST, FETCH_AUTH_FAILURE, FETCH_AUTH_SUCCESS } from './types';
import { auth as authService } from '../../api/actions';
import { Dispatch } from 'redux';
import { ApiAnswer, ApiAnswerStatus } from '../../api/types';

const requested = () => {
  return {
    type: FETCH_AUTH_REQUEST,
    payload: {},
  };
};

const loaded = (newData: ApiAnswer) => {
  return {
    type: FETCH_AUTH_SUCCESS,
    payload: newData,
  };
};

const error = (error: any) => {
  return {
    type: FETCH_AUTH_SUCCESS,
    payload: error,
  };
};

export default (onSuccess = () => {}, onError = () => {}) => async (dispatch: Dispatch) => {
  dispatch(requested());
  return await authService()
    .then((data: ApiAnswer) => {
      dispatch(loaded(data));
      onSuccess();
      return data;
    })
    .catch((e) => {
      dispatch(error(e.response?.data?.error ?? 'undefined error'));
      onError();
    });
};
