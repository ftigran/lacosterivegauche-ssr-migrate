import { Doc } from './StatDetails/check-list';

export type BalanceType = {
  cost: number;
  balance: number;
  gameAvialable: number;
  gameSpent: number;
  gameAll: number;
};

export type CashBackDataType = {
  all: number;
  current: number;
  ostatok: number;
};

export type UserDataLkType = {
  accessBankCard?: boolean;
  bankCardNeed?: boolean;
  bankCardNumber?: string | null;
  cashBackData?: CashBackDataType;
  needPerson?: number;
  prizes?: Priz[];
  docs?: Doc[];
  codes?: PromoCode[];
  balls?: BallAmount[];
  ballBalance?: number;
  woods?: number;
};

export interface Priz {
  id: number;
  prizId: number;
  createDatetime: number;
  deliveryDatetime: number | null;
  group: string;
  name: string;
  status: string;
  sertcode: string | null;
  sertcodelink: string | null;
}

export type BallAmount = {
  amount: number;
  createDatetime: number;
  name: string;
  prize: Priz | null;
  status: string | null;
};

export type PromoCode = {
  amount?: number;
  id: number;
  code: string;
  path?: string;
  status: string;
  createDatetime: number;
};
