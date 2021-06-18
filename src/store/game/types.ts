export const GAME_OPEN = 'GAME_OPEN';
export const GAME_CLOSE = 'GAME_CLOSE';
export const HIDE_MODAL = 'HIDE_MODAL';
export const HIDE_DIALOG = 'HIDE_DIALOG';
export type GameState = { open: boolean };

interface open {
  type: typeof GAME_OPEN;
}
interface close {
  type: typeof GAME_CLOSE;
}
export type GameAction = open | close;
