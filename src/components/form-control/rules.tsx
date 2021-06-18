import React from 'react';
import { checkUniqEmail, checkUniqPhone, checkUniqEmailAuth } from '../../api/actions';
import moment from 'moment';
import { Link } from '@material-ui/core';
import { Link as LinkRoute } from 'react-router-dom';
import { ApiAnswerStatus } from '../../api/types';
import { modalName as signinModalName } from '../../page/signin';
import NoBr from '../../components/nobr';

type Value = string | boolean | number | undefined | null;
type Error = string | undefined | null;

export const isTrue = (error?: Error) => (value: Value) => {
  return value === true ? undefined : error || 'Вы должны согласиться с условиями';
};

export const required = (value?: Value) => {
  return !!value ? undefined : 'Поле не заполнено';
};

export const minTextSize = (min: number, error: Error) => (value: Value) => {
  if (value && value.toString().length < min) return error || `Минимальная длинна поля ${min}`;
};
export const maxTextSize = (max: number, error: Error) => (value: Value) => {
  if (value && value.toString().length > max) return error || `Максимальная длинна поля ${max}`;
};

export const email = (value: Value) =>
  value && value.toString().match(/^\s*([\w.%+-]+)@([\w-]+\.)+([\w]{2,})\s*$/i) ? undefined : (
    <>
      Вы указали некорректный <NoBr>e-mail</NoBr>
    </>
  );

export const email2 = (error?: Error) => (value: Value) =>
  value && value.toString().match(/^\s*([\w.%+-]+)@([\w-]+\.)+([\w]{2,})\s*$/i)
    ? undefined
    : error || 'Вы указали некорректный e-mail';

export const digitsFn = (error?: Error) => (value: Value) =>
  value && value.toString().match(/^\d{16}$/)
    ? undefined
    : error || 'ФН должен состоять из 16 цифр';

export const digitsFd = (error?: Error) => (value: Value) =>
  value && value.toString().match(/^\d{1,10}$/)
    ? undefined
    : error || 'ФД должен состоять из 1-10 цифр';

export const digitsFpd = (error?: Error) => (value: Value) =>
  value && value.toString().match(/^\d{1,10}$/)
    ? undefined
    : error || 'ФП должен состоять из 1-10 цифр';

export const digits = (error?: Error) => (value: Value) =>
  value && value.toString().match(/^\d+$/i) ? undefined : error || 'Только цифры';

export const rusname = (error?: Error) => (value: Value) =>
  value && value.toString().match(/^[а-яёa-z\s\-]*$/i) ? undefined : error || 'Некорректное имя';

export const card = (error?: Error) => (value: Value) =>
  value && value.toString().match(/^\d{22}$/)
    ? undefined
    : error || "Номер карты 'Metro' должен состоять из 22 цифр";

export const cardMetro = (error?: Error) => (value: Value) =>
  value && value.toString().match(/^643\d{19}$/)
    ? undefined
    : error || "Неверно указан номер карты 'Metro'";

export const phone = (error?: Error) => (value: Value) => {
  if (!value) return undefined;
  let cleanValue = value.toString().replace(/\s|\(|\)|\-|\+7/g, '');
  const test = ()=>(
  /^\9\d{9}$/.test(cleanValue) ? undefined : `Укажите верный номер телефона, начинающийся с "+7(9"`
  )
  return /^\d{10}$/.test(cleanValue) ? test() : error || `Укажите верный номер телефона`;
  
};

export const dateRule = (min:number, max:number,error?: Error) => (value: string) => {
  // console.log('min',value)
  if (!value) return undefined;
  let a = value.split('.')
  let now =new Date()
  // now.setFullYear(arr[0],(arr[1] - 1 ),arr[2])
  // console.log(now)
  now.setFullYear(parseInt(a[2]),(parseInt(a[1]) - 1 ),parseInt(a[0]));
  // console.log(now)

  const nowTimestamp =+now
  if(isNaN(nowTimestamp)) return "Введите действительную дату"
  // console.log(nowTimestamp<min,min,nowTimestamp)
  return nowTimestamp<min || nowTimestamp>max ? error || `Введите верную дату в рамках акции`: undefined;
};

export const summa = (error?: Error) => (value: Value) => {
  if (!value) return undefined;
  let cleanValue = value.toString().replace(/\s/g, '');
  return cleanValue.match(/^\d+[,.]\d{2}$/) ? undefined : error || `Введите сумму с копейками`;
};

export const cyrilicFIO = (error?: Error) => (value: Value) => {
  if (!value) return undefined;
  let cleanValue = value.toString().trim();
  return cleanValue.match(
    /^[абвгдеёжзийклмнопрстуфхцчшщьыъэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ]+(?:-[абвгдеёжзийклмнопрстуфхцчшщьыъэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ]+)?$/,
  )
    ? undefined
    : error || `Используйте русскую раскладку`;
};

export const date = (error?: Error) => (value: Value) =>
  value && moment(value.toString(), 'DD.MM.YYYY', true).isValid()
    ? undefined
    : error || 'Неверная дата';

export const time = (value: Value) =>
  value && moment(value.toString(), 'HH:mm', true).isValid() ? undefined : 'Неверное время';

export const checkDate = (
  DOC_PERIOD_START: string | undefined,
  DOC_PERIOD_END: string | undefined,
  error?: Error,
) => (value: Value) => {
  const date = moment(value?.toString(), 'DD.MM.YYYY', true);
  const start = moment(DOC_PERIOD_START, 'YYYY-MM-DD HH:mm:ss', true);
  const end = moment(DOC_PERIOD_END, 'YYYY-MM-DD HH:mm:ss', true);

  if (!date.isValid()) return error || 'Неверная дата';
  if (!start.isValid() || !end.isValid()) return error || 'Неверный период проведения акции';

  if (date.isSameOrAfter(start) && date.isSameOrBefore(end)) {
    return undefined;
  }
  return error || 'Дата чека не в интервале акции';
};

export const birthday = (error: Error) => (value: Value) => {
  const date = moment(value?.toString(), 'DD.MM.YYYY', true);
  const now = moment();
  if (date.isValid()) {
    if (date.isSameOrBefore(moment().subtract(18, 'years'))) {
      return undefined;
    }
    return error || 'Вам еще нет 18 лет';
  }
  return error || 'Неверная дата';
};

export function emailReduxUniqueAuth(val: Value) {
  return checkUniqEmailAuth({ email: val }).then((answer) => {
    if (answer.status === ApiAnswerStatus.BREAK)
      throw {
        email: (
          <>
            Данный <NoBr>e-mail</NoBr> зарегистрирован в акции
          </>
        ),
      };
  });
}

export function emailReduxUnique(val: Value) {
  return checkUniqEmail({ email: val }).then((answer) => {
    if (answer.status === ApiAnswerStatus.BREAK)
      throw {
        email: (
          <>
            Ты уже зарегистрирован в акции.{' '}
            <Link
              style={{
                // color: "#fff",
                textDecoration: 'underline',
              }}
              className="link"
              to={`?w=${signinModalName}&username=${answer?.data?.user?.email}`}
              component={LinkRoute}
            >
              Авторизуйся
            </Link>
          </>
        ),
      };
  });
}

export function phoneReduxUnique(val: Value) {
  let cleanValue = val?.toString().replace(/\s|\(|\)|\-|\+7/g, '') ?? '';

  return checkUniqPhone({ phone: cleanValue }).then((answer) => {
    if (answer.data?.data?.user?.register === true) {
      throw {
        phone: (
          <>
            Ты уже зарегистрирован в акции.{' '}
            <Link
              style={{
                // color: "#fff",
                textDecoration: 'underline',
              }}
              className="link"
              to={`?w=${signinModalName}&username=${cleanValue}`}
              component={LinkRoute}
            >
              Авторизуйся
            </Link>
          </>
        ),
      };
    }
  });
}

export const day = (error: Error) => (value: Value) => {
  const _value = Number.parseInt(value?.toString() || '0');
  return _value > 0 && _value < 32 ? undefined : error || 'Неверный день';
};

export const month = (error: Error) => (value: Value) => {
  const _value = Number.parseInt(value?.toString() || '0');
  return _value > 0 && _value < 13 ? undefined : error || 'Неверный месяц';
};
export const year = (error: Error) => (value: Value) => {
  const _value = Number.parseInt(value?.toString() || '0');
  return _value >= 1900 && _value <= 2100 ? undefined : error || 'Неверный год';
};
