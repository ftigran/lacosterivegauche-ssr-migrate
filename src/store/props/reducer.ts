import { PROPS, SET_PROPS, SET_DIALOG, ProjectProps } from './types';
import { Action } from 'redux';

const initialState: ProjectProps = {
  isAuth: false,
  init: false,
  appBarHeight: 0,
  woods: 0,
  isDocPeriodEnd: true,
  dialog: {
    checkReg:{
      open:false
    },
    checkRegApprove:{
      open:false
    }
  },
};
export interface DispatchAction extends Action {
  payload: Partial<ProjectProps>;
}
export default (state = initialState, action: PROPS) => {
  switch (action.type) {
    case SET_PROPS:
      return {
        ...state,
        ...action.payload,
      };
      case SET_DIALOG:
        return {
          ...state,
          dialog: {
            ...state.dialog,
            ...action.payload,
          }
        };
    // case HIDE_MODAL:
    //     const {modal} = state[action.payload];
    //     if (modal) {
    //         return {
    //             ...state,
    //             [modal]: { show: false }
    //         };
    //     } else {
    //         return state;
    //     }
    default:
      return state;
  }
};
