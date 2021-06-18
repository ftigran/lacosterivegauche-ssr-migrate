import {
  fetchPrivateAPIToken,
  withPrivateAPIToken,
  withPublicAPIToken,
  socialFetchPrivateAPIToken,
  signout as signoutService,
} from './service';
import { ApiAnswer, ApiAnswerStatus } from './types';

import { objectToFormData } from 'object-to-formdata';
import { FeedbackRequest } from '../page/faq/Feedback/types';

const ls = require('local-storage');

export const lkInfo = async () => {
  return await withPrivateAPIToken({ url: '/lk/get', method: 'get' });
};

export const getShopPrizes = async () => {
  return await withPrivateAPIToken({
    url: '/priz/shop/get',
    method: 'get',
  });
};

export const getWinners = async (page="1", data="") => {
  setTimeout(() =>{
    console.log("dataPaginate")
    console.log(page)
    console.log(data)
  },1000)
  const prop = data===""?{}:{login: data}
  return await withPublicAPIToken({
    // url: '/winners',
    url: `/winners/get?page=${page}`,
    method: 'post',
    data: prop,
  });
};
export const getTestGameSession = async () => {
  return await withPrivateAPIToken({
    url: '/game/test/get_session',
    method: 'get',
  });
};

export const getFaq = async () => {
  return await withPublicAPIToken({
    url: '/faq/get',
    method: 'get',
  });
};

export const getFeedbackTheme = async () => {
  return await withPublicAPIToken({
    url: '/feedback/theme/get',
    method: 'get',
  });
};

export const feedBackStore = async (data: FeedbackRequest) => {
  return await withPublicAPIToken({
    url: '/feedback/store',
    method: 'post',
    data,
  });
};

export const postTestGameSession = async (
  sessionId: string,
  data: { session: string; coin: number },
) => {
  return await withPrivateAPIToken({
    url: `/game/store_test/${sessionId}`,
    method: 'post',
    data,
  });
};

export const postRealGameSession = async (
  sessionId: string,
  data: { session: string; coin: number },
) => {
  return await withPrivateAPIToken({
    url: `/game/store_real/${sessionId}`,
    method: 'post',
    data,
  });
};

export const selectPrize = async (prizeId: number, data?: { priz_variant_id?: number }) => {
  return await withPrivateAPIToken({
    url: `/priz/${prizeId}/select${
      data?.priz_variant_id ? `?priz_variant_id=${data.priz_variant_id}` : ''
    }`,
    method: 'get',
  });
};

export const getRealGameSession = async (sessionId: string) => {
  return await withPrivateAPIToken({
    url: `/game/real/get_session?game_test_session=${sessionId}`,
    method: 'get',
  });
};

export const constants = async () => {
  return await withPublicAPIToken({ url: '/const', method: 'get' });
};
export const auth = async () => {
  return <ApiAnswer>await withPrivateAPIToken({ url: '/user/get', method: 'get' });
};

export const signin = async (username: string, password: string) => {
  return await fetchPrivateAPIToken(username, password);
};

export const create_bank_card_session = (data?: any) => {
  return withPrivateAPIToken({
    url: '/bank_card/create/session',
    method: 'post',
    data: data,
  });
};

export const signout = async () => {
  return await signoutService();
};
export const uploadGuest = async (props: any) => {
  const formData = objectToFormData(props);

  const res = withPublicAPIToken({
    url: '/upload/guest',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
  return res;
};

export const checkUniqEmail = (props: any) => {
  return withPublicAPIToken({
    url: '/user/exists',
    method: 'post',
    data: props,
  });
};
export const checkUniqEmailAuth = (props: any) => {
  return withPrivateAPIToken({
    url: '/user/exists/auth',
    method: 'post',
    data: props,
  });
};

export const checkUniqPhone = (props: any) => {
  return withPublicAPIToken({
    url: '/user/exists',
    method: 'post',
    data: props,
  });
};

export const projectConstant = (props: any) => {
  return withPublicAPIToken({
    url: '/constant',
    method: 'get',
    data: props,
  });
};

export const signup = (props: any) => {
  //const invite = ls.get("invite");
  return withPublicAPIToken({
    url: '/user/register',
    method: 'post',
    data: { ...props },
  });
};

export const retailer = (data?: any) => {
  return withPublicAPIToken({
    url: '/retailer/get',
    method: 'post',
    data: data,
  });
};

export const retailerPrizCategory = (retailer_id: number) => {
  return withPublicAPIToken({
    url: `/retailer/${retailer_id}/priz-category/get`,
    method: 'get',
  });
};

export const forgotPasswordEmail = async (data: any) => {
  return await withPublicAPIToken({
    url: '/user/forgot/password/email',
    method: 'post',
    data,
  });
};
export const forgotPasswordPhone = async (data: any) => {
  return await withPublicAPIToken({
    url: '/user/forgot/password/phone',
    method: 'post',
    data,
  });
};
export const socialUserToken = async (provider: string, access_token: string) => {
  return await socialFetchPrivateAPIToken(provider, access_token);
};

export const chainSocialToUser = async (provider: string, provider_user_id: string) => {
  return await withPrivateAPIToken({
    data: { provider, provider_user_id },
    method: 'post',
    url: '/user/social/update',
  });
};

export const upload = async (props: any) => {
  const formData = new FormData();
  Object.keys(props).map((key) => {
    const value = props[key];
    formData.append(key, value);
  });
  const res = withPrivateAPIToken({
    // url: '/upload',
    url: '/upload/code',
    method: 'post',
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
    // data: formData,
    data: props.base64,
  });
  return res;
};

export const codeRegister = async (promocode: string) => {
  return await withPrivateAPIToken({
    url: '/code/register',
    method: 'post',
    data: { promocode },
  });
};

export const chekRegister = async (data: any) => {
  return await withPrivateAPIToken({
    url: '/lacoste/register',
    method: 'post',
    data,
  });
};

export const subscribeChange = async (props: any) => {
  return await withPrivateAPIToken({
    url: '/user/subscribe/change',
    method: 'post',
    data: props,
  });
};

export const setPrizVariant = async (user_priz_id: number, priz_variant_id: number) => {
  return await withPrivateAPIToken({
    url: `/user/priz_variant/set/${user_priz_id}/${priz_variant_id}`,
    method: 'post',
  });
};
export const setPickpointResult = async (id: number, pickpoint_result: any) => {
  return await withPrivateAPIToken({
    url: `/user/priz/pickpoint/${id}`,
    method: 'post',
    data: { pickpoint_result },
  });
};

export const getPersonal = async (person_need: number) => {
  return await withPrivateAPIToken({
    url: `/user/personal/request?type=${person_need}`,
    method: 'get',
  });
};

export const updateUser = async (data: any) => {
  return await withPrivateAPIToken({
    url: `/user/update`,
    method: 'post',
    data,
  });
};

export const winners = async (data?: any) => {
  return await withPublicAPIToken({
    // url: '/winners',
    url: '/winners/get?page=1',
    method: 'post',
    data: {},
  });
};

export const registerSocialUser = async (token: string) => {
  return await withPrivateAPIToken({
    // url: '/winners',
    url: `/register/social/${token}`,
    method: 'post',
    data: {},
  });
};

export type RequestCashbackCreate = {
  cache_type: 'bank_card' | 'phone';
};

export const cashbackCreate = async (data: RequestCashbackCreate) => {
  return await withPrivateAPIToken({
    url: '/cacheback/create',
    method: 'post',
    data,
  });
};

export enum PrizeValiant {
  CERT = 11,
  CASH_BACK = 12,
}

export type OrderPrizeType = PrizeValiant.CERT | PrizeValiant.CASH_BACK;

export const orderPrize = async (prize: OrderPrizeType) => {
  return await withPrivateAPIToken({
    url: `/prize/order/${prize}`,
    method: 'post',
    data: {},
  });
};

export const getSubscribe = async () => {
  return await withPrivateAPIToken({
    url: '/user/subscribe/get',
    method: 'get',
  });
};

export const updateSubscribe = async (id: number) => {
  return await withPrivateAPIToken({
    url: `/user/subscribe/update/${id}`,
    method: 'post',
  });
};
