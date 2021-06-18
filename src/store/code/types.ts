import { TypeCode } from '../../page/code';

export const CODE_SET = 'CODE_SET';
export const CODE_TYPE_SET = 'CODE_TYPE_SET';
export const CODE_RESET = 'CODE_RESET';
export type CodeState = { code?: string; typeCode?: TypeCode };

const literal = <T extends string>(arg: T): T => arg;

const actionResetCreator = () => ({ type: literal(CODE_RESET) });

const actionSetCreator = () => ({
  type: literal(CODE_SET),
  payload: '1234',
});

const actionSetTypeCreator = () => ({
  type: literal(CODE_TYPE_SET),
  payload: TypeCode.AR,
});

export type CodeAction =
  | ReturnType<typeof actionSetCreator>
  | ReturnType<typeof actionSetTypeCreator>
  | ReturnType<typeof actionResetCreator>;
