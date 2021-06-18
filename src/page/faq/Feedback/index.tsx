import React, { useCallback, useEffect, useRef, useState } from 'react';
import Form from './form';
import { FeedbackRequest, FeedbackThemeType, OnSubmitHandleType } from './types';
import { feedBackStore, getFeedbackTheme } from '../../../api/actions';
import { ApiAnswerStatus } from '../../../api/types';
import { useConfirm } from '../../../components/ConfirmDialog';
import { useDispatch } from '../../../hooks';
import { reset } from 'redux-form';
import ReCAPTCHA from 'react-google-recaptcha';

type Props = { recaptchaSitekey: string | undefined };

const FeedBack: React.FC<Props> = ({ recaptchaSitekey }) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [themes, setThemes] = useState<Array<FeedbackThemeType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<FeedbackRequest | undefined>(undefined);

  const confirm = useConfirm();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { status, data } = await getFeedbackTheme();
        if (status === ApiAnswerStatus.SUCCESS && data && Array.isArray(data)) {
          setThemes(data);
        }
      } catch (err) {
        console.log('@@@getFeedbackTheme err: ', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onRecaptchaExpired = useCallback(() => {
    console.log('feedback onRecaptchaExpired');
    setLoading(false);
  }, []);

  const onRecaptchaErrored = useCallback(() => {
    console.log('feedback onRecaptchaErrored');
    setLoading(false);
  }, []);

  const onRecaptchaChange = useCallback(
    async (recaptchaToken: string | null) => {
      if (formData) {
        let message;
        try {
          const formWithCaptcha = { ...formData, recaptcha: recaptchaToken ?? '' };
          console.log('@@@onRecaptchaChange formWithCaptcha: ', formWithCaptcha);
          const response = await feedBackStore(formWithCaptcha);
          console.log('@@@handleOnSubmit response: ', response);
          if (response.status === ApiAnswerStatus.SUCCESS && response?.message?.alert?.length) {
            message = response.message.alert[0];
          } else {
            message = 'Ошибка обработки формы';
            recaptchaRef.current?.reset();
          }
          confirm &&
            confirm({
              title: 'Информация',
              body: message,
              alert: true,
              confirmationText: 'ok',
            }).then(() => {
              dispatch(reset('feedBackForm'));
            });
        } catch (err) {
          console.log('@@@handleOnSubmit err: ', err);
        } finally {
          setLoading(false);
        }
      }
    },
    [confirm, dispatch, formData],
  );

  const handleOnSubmit = useCallback<OnSubmitHandleType>(
    async (form) => {
      if (!loading) {
        setLoading(true);
        setFormData(form);
        recaptchaRef?.current?.execute();
      }
    },
    [loading],
  );

  return (
    <>
      {!!recaptchaSitekey && (
        <ReCAPTCHA
          key="feedback"
          ref={recaptchaRef}
          size="invisible"
          sitekey={recaptchaSitekey}
          onExpired={onRecaptchaExpired}
          onChange={onRecaptchaChange}
          onErrored={onRecaptchaErrored}
        />
      )}
      <Form loading={loading} onSubmit={handleOnSubmit} themes={themes} />
    </>
  );
};

export default FeedBack;
