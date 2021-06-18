import { CODE_RESET, CODE_SET, CODE_TYPE_SET, CodeAction, CodeState } from './types';

const initialState: CodeState = {
  code: undefined,
  typeCode: undefined,
};
export default (state = initialState, action: CodeAction) => {
  switch (action.type) {
    case CODE_SET:
      return {
        ...state,
        code: action.payload,
      };
    case CODE_TYPE_SET:
      return {
        ...state,
        typeCode: action.payload,
      };
    case CODE_RESET:
      return {
        ...state,
        code: undefined,
        typeCode: undefined,
      };
    default:
      return state;
  }
};
