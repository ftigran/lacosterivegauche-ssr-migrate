import React, { useState, useEffect, useMemo } from 'react';
import { Field, reduxForm, InjectedFormProps, isSubmitting } from 'redux-form';
import { Box, Grid } from '@material-ui/core';

import { phone as phoneRule, email2 as emailRules } from '../../components/form-control/rules';
import RenderTextField from '../../components/form-control/render-text-field';

// import PhoneMask from '../../components/form-control/mask/phone-mask';
import SubmitButton from '../../components/submit-button';
import { useSelector } from 'react-redux';
import { winnerSearchFieldTheme } from '../../theme';
import { ThemeProvider } from '@material-ui/core/styles';

interface FormProps {
  initialValues?: {
    phone?: string;
  };
  handleSubmit(search: string): Promise<void>;
}

type Props = {
  processed: boolean; // the custom prop
};

//
const Form = (props: InjectedFormProps & Props) => {
  const {
    handleSubmit,
    processed,

    form,
  } = props;

  const submitting = useSelector((state) => isSubmitting(form)(state));

  const email = useMemo(() => {
    return emailRules();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          pt={4}
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          flexDirection="row"
        >
          <Box mx={1 / 2} flexBasis={300}>
            <ThemeProvider theme={winnerSearchFieldTheme}>
              <Field
                name="email"
                component={RenderTextField}
                label="E-mail"
                disabled={submitting || processed}
                validate={[email]}
                autoComplete="off"
                InputProps={{}}
              />
            </ThemeProvider>
          </Box>
          <Box mx={1 / 2} mt={1 / 2}>
            <SubmitButton
              processed={processed}
              color="secondary"
              type="submit"
              disabled={submitting}
              variant="contained"
              fullWidth={false}
              // size="small"
              className="button-dialog"
            >
              Поиск
            </SubmitButton>
          </Box>
        </Box>
      </form>
    </>
  );
};

const ReduxForm = reduxForm<{}, Props>({
  form: 'winnersFindForm', // a unique identifier for this form
  enableReinitialize: true,
})(Form);

export default ({ initialValues, handleSubmit }: FormProps) => {
  const [processed, setProcessed] = useState(false);

  function onSubmit(data: any) {
    console.log('onSubmit', data);

    // let { phone = '' } = data;
    // phone = phone.replace(/\D/g, '').substr(-10);

    const { email } = data;

    setProcessed(true);
    handleSubmit(email).finally(() => {
      setProcessed(false);
    });
  }

  function onSubmitFail(data: any) {
    console.log('onSubmitFail', data);
  }

  return (
    <ReduxForm
      initialValues={initialValues}
      processed={processed}
      onSubmit={onSubmit}
      onSubmitFail={onSubmitFail}
    />
  );
};
