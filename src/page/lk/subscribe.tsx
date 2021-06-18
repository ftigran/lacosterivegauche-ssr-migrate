import React, { useState, ChangeEvent, ReactNode } from 'react';
import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core';
import { subscribeChange as subscribeChangeAction } from '../../api/actions';
import { ApiAnswerStatus } from '../../api/types';
import { darkFormTheme } from '../../theme';
import { ThemeProvider } from '@material-ui/core/styles';
import Alert, { AlertProps } from '../../components/alert';
interface Props {
  label: ReactNode | string;
  value: boolean;
  processed?: boolean;
  name: string;
}

const messageSms =
  'Обращаем внимание, что вы отписались от получения информационных материалов акции через смс. ' +
  'Оповещения связанные с кэшбэком будут в любом случае отправлены Вам в смс или e-mail сообщении.';

const messageEmail =
  'Обращаем внимание, что вы отписались от получения информационных материалов акции через e-mail.' +
  'Оповещения связанные с кэшбэком будут в любом случае отправлены Вам в смс или e-mail сообщении.';

export default (props: Props) => {
  const { label, value, processed = false, name } = props;
  const [checked, setChecked] = useState(value);
  const [subscribeProcessed, setSubscribeProcessed] = useState(false);
  const [alertProps, setAlertProps] = useState<AlertProps>({ open: false, result: false });

  function handleChange(el: ChangeEvent<HTMLInputElement>) {
    const { checked, name } = el.target;
    setSubscribeProcessed(true);
    setChecked(checked);
    console.log('handleChange name: ', name);
    console.log('handleChange checked: ', checked);
    !checked &&
      setAlertProps({
        open: true,
        title: 'Внимание',
        message: name === 'subscribe_email' ? messageEmail : messageSms,
        result: false,
      });
    subscribeChangeAction({ [name]: checked })
      .then((r) => {
        if (r.status === ApiAnswerStatus.SUCCESS) {
          setChecked(r.data[name]);
        }
      })
      .finally(() => {
        setSubscribeProcessed(false);
      });
  }

  return (
    <FormControl component="fieldset">
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            disabled={processed || subscribeProcessed}
            color="primary"
            onChange={(e) => handleChange(e)}
            checked={checked}
          />
        }
        label={label}
      />
      <Alert {...alertProps} onClose={() => setAlertProps({ ...alertProps, open: false })} />
    </FormControl>
  );
};
