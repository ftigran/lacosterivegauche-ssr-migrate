import { Message } from '../api/types';

export const getMessageString = (apiAnswerMessage: Message): string => {
  const messages = Object.keys(apiAnswerMessage || {});
  return messages
    .map((key, index) => {
      const value = apiAnswerMessage[key];
      return Array.isArray(value) ? value.join(', ') : value;
    })
    .join(', ');
};
