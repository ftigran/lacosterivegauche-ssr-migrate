export interface Message {
  [name: string]: [string];
}
export enum ApiAnswerStatus {
  ERROR = -1,
  BREAK = 0,
  SUCCESS = 1,
  UNAUTHENTICATED = 401,
  NEED_FULL_REGISTER = -402,
}

export interface ApiAnswer {
  status: ApiAnswerStatus;
  message: Message;
  data?: any;
}
