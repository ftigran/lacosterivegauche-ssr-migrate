import { CODE_SET, CODE_RESET, CODE_TYPE_SET } from './types';
import { TypeCode } from '../../page/code';

export const setCodeAction = (code: string) => {
  return {
    type: CODE_SET,
    payload: code,
  };
};

export const setCodeTypeAction = (typeCode: TypeCode) => {
  return {
    type: CODE_TYPE_SET,
    payload: typeCode,
  };
};

export const resetCodeAction = () => {
  return {
    type: CODE_RESET,
  };
};
