import { SelectItemBasicType } from '../../../components/form-control/types';

export type FeedbackRequest = {
  name: string;
  email: string;
  message: string;
  theme: number;
  rules: boolean;
  recaptcha?: string;
};

export type FeedbackThemeType = SelectItemBasicType & {
  order?: number;
};

export type OnSubmitHandleType = (form: FeedbackRequest) => void;
