import { GAME_OPEN, GAME_CLOSE, GameState, GameAction } from './types';

const initialState: GameState = {
  open: false,
};
export default (state = initialState, action: GameAction) => {
  switch (action.type) {
    case GAME_OPEN:
      return {
        ...state,
        open: true,
      };

    case GAME_CLOSE:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};
