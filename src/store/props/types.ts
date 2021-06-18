export const SET_PROPS = 'SET_PROPS';
export const SET_DIALOG = 'SET_DIALOG';

export interface DialogProps {
  checkReg: { open: boolean };
  checkRegApprove: { open: boolean };
  [name: string]: { open: boolean };
}

export interface ProjectProps {
  isAuth: boolean;
  init: boolean;
  dialog: DialogProps;
  appBarHeight: number;
  woods: number;
  docRulesLink?: string;
  docAgreementLink?: string;
  email?: string;
  recaptchaSitekey?: string;
  docPeriodStart?: number;
  docPeriodEnd?: number;
  now?: number;

  docCookiesLink?: string;
  docCookies2Link?: string;
  pickpointIkn?: number;
  paginate?: number;
  isDocPeriodEnd?: boolean;
}
interface SetProps {
  type: typeof SET_PROPS;
  payload: ProjectProps;
}
interface dialog {
  type: typeof SET_DIALOG;
  payload: DialogProps;

}
export type PROPS = SetProps|dialog;
