import { GAME_OPEN, GAME_CLOSE, HIDE_MODAL, HIDE_DIALOG } from './types';

export const gameOpenAction = () => {
  return {
    type: GAME_OPEN,
  };
};

export const gameCloseAction = () => {
  return {
    type: GAME_CLOSE,
  };
};

export const gameDialog = (val:boolean) => {
  return {
    type: HIDE_DIALOG,
    payload: false
  };
};
