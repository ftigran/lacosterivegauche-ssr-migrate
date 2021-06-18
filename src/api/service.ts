import axios, { AxiosRequestConfig } from 'axios';
import { ApiAnswer, ApiAnswerStatus } from './types';
import { objectToFormData } from 'object-to-formdata';

const ls = require('local-storage');
enum TOKEN {
  PUBLIC = 'token_public',
  PRIVATE = 'token_private',
}
const { REACT_APP_API_URL = '/', REACT_APP_API_AUTH } = process.env;
const axiosClient = axios.create({
  baseURL: `${REACT_APP_API_URL.replace(/^\/+/, '')}/`,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Access-Token': `Basic ${REACT_APP_API_AUTH}`,
    Authorization: `Basic ${REACT_APP_API_AUTH}`,
  },
});

const apiFetchData = async (config: AxiosRequestConfig): Promise<ApiAnswer> => {
  try {
    return await axiosClient.request(config);
  } catch (e) {
    throw e.response
      ? {
          data: e.response.data,
          status: e.response.status ?? 0,
          message:
            (e.response.data?.error_description || e.response.data?.error) ?? 'untitled error',
        }
      : {
          data: {},
          status: ApiAnswerStatus.ERROR,
          message: 'undefined error',
        };
  }
};

const reFetchPrivateAPIToken = async (refresh_token: string) => {
  return await apiFetchData({
    url: '/oauth/token',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    data: objectToFormData({
      refresh_token,
      grant_type: 'refresh_token',
    }),
  });
};

const fetchPrivateAPIToken = async (username: string, password: string) => {
  try {
    const result = await apiFetchData({
      url: '/oauth/token',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      data: objectToFormData({
        // scope: '*',
        grant_type: 'password',
        username,
        password,
      }),
    });

    // if (result.status === ApiAnswerStatus.SUCCESS) {
    // save token to localstorage
    ls.set(TOKEN.PRIVATE, result.data);
    // }
    return result;
  } catch (e) {
    console.error('ошибка запроса токена аторизации', e);
    throw e;
  }
};

const fetchPrivateAPITokenBySocToken = async (token: string) => {
  try {
    const result = await apiFetchData({
      url: '/oauth/token',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      data: objectToFormData({
        // scope: '*',
        grant_type: 'password',
        token,
      }),
    });

    // if (result.status === ApiAnswerStatus.SUCCESS) {
    // save token to localstorage
    ls.set(TOKEN.PRIVATE, result.data);
    // }
    return result;
  } catch (e) {
    console.error('ошибка запроса токена аторизации', e);
    throw e;
  }
};

const withPrivateAPIToken = async (config: AxiosRequestConfig) => {
  // get token and refresh token from localstorage
  const token = ls.get(TOKEN.PRIVATE);
  // check public token
  if (token && token.access_token) {
    // make request
    const test = apiFetchData({
      ...config,
      headers: {
        'X-Access-Token': `Bearer ${token.access_token}`,
        Authorization: `Bearer ${token.access_token}`,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        if (e.status === ApiAnswerStatus.UNAUTHENTICATED) {
          return reFetchPrivateAPIToken(token.refresh_token)
            .then((result) => {
              // if (result.status !== ApiAnswerStatus.SUCCESS) {
              //   console.log('неудачный перезапрос access-токена');
              //   ls.remove(TOKEN.PRIVATE);
              //   return result;
              // }
              ls.set(TOKEN.PRIVATE, result.data);
              return apiFetchData({
                ...config,
                headers: {
                  'X-Access-Token': `Bearer ${result.data.access_token}`,
                  Authorization: `Bearer ${result.data.access_token}`,
                },
              });
            })
            .catch((e) => {
              ls.remove(TOKEN.PRIVATE);
              throw e;
            });
        } else {
          throw e;
        }
      });
    return test;
  } else {
    // пользователь не логинится и не авторизован - делаем запрос и возвращаем ошибку
    const resp = await apiFetchData(config);
    return resp;
  }
};

const fetchPublicAPIToken = async () => {
  try {
    const result = await apiFetchData({
      url: '/oauth/token',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      data: objectToFormData({
        grant_type: 'client_credentials',
      }),
    });

    console.log('fetchPublicAPIToken result: ', result);

    // save token to localstorage
    ls.set(TOKEN.PUBLIC, result.data);

    return result;
  } catch (e) {
    console.error('ошибка запроса токена', e);
    throw e;
  }
};

const withPublicAPIToken = async (config: AxiosRequestConfig) => {
  // get token and refresh token from localstorage
  const token = ls.get(TOKEN.PUBLIC);
  // check public token
  if (token && token.access_token) {
    // make request
    const test = apiFetchData({
      ...config,
      headers: {
        'X-Access-Token': `Bearer ${token.access_token}`,
        Authorization: `Bearer ${token.access_token}`,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        if (e.status === ApiAnswerStatus.UNAUTHENTICATED) {
          return fetchPublicAPIToken()
            .then((res) => {
              return apiFetchData({
                ...config,
                headers: {
                  'X-Access-Token': `Bearer ${res.data.access_token}`,
                  Authorization: `Bearer ${res.data.access_token}`,
                },
              });
            })
            .catch((er) => {
              throw er;
            });
        } else {
          throw e;
        }
      });
    return test;
  } else {
    return fetchPublicAPIToken().then((res) => {
      return apiFetchData({
        ...config,
        headers: {
          'X-Access-Token': `Bearer ${res.data.access_token}`,
          Authorization: `Bearer ${res.data.access_token}`,
        },
      });
    });
  }
};

const socialFetchPrivateAPIToken = async (provider: string, access_token: string) => {
  const res = await apiFetchData({
    url: '/oauth/token',
    method: 'post',
    data: {
      access_token: access_token,
      grant_type: 'social',
      provider: provider,
    },
  }).then((r) => {
    if (r.status === ApiAnswerStatus.SUCCESS) {
      ls.set(TOKEN.PRIVATE, r.data);
    }
    return r;
  });
  return res;
};

const signout = async () => {
  return await withPrivateAPIToken({
    url: '/user/logout',
    method: 'post',
  }).then((r) => {
    if (r.status === 200) ls.remove(TOKEN.PRIVATE);
  });
};

export {
  withPrivateAPIToken,
  withPublicAPIToken,
  fetchPrivateAPIToken,
  socialFetchPrivateAPIToken,
  signout,
  fetchPrivateAPITokenBySocToken,
};
