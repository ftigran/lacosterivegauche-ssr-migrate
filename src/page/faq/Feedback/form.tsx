import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import SubmitButton from '../../../components/submit-button';
import RenderCheckBoxField from '../../../components/form-control/render-checkbox-field';
import RenderTextField from '../../../components/form-control/render-text-field';
import RenderSelectField from '../../../components/form-control/render-select-field';
import { email, required } from '../../../components/form-control/rules';
import { FeedbackRequest, FeedbackThemeType } from './types';

type Props = { loading: boolean; themes: Array<FeedbackThemeType> };

const Form: React.FC<Props & InjectedFormProps<FeedbackRequest, Props>> = ({
  handleSubmit,
  loading,
  submitting,
  themes,
}) => {
  return (
    <Box mt={4} mb={1}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid xs={12} item>
            <Field
              name="name"
              component={RenderTextField}
              label="Имя"
              disabled={submitting || loading}
              validate={[required]}
              autoComplete="off"
              inputProps={{
                maxLength: 20,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="email"
              component={RenderTextField}
              label="E-mail"
              disabled={submitting || loading}
              autoComplete="off"
              validate={[required, email]}
              inputProps={{ maxLength: 128 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="theme"
              component={RenderSelectField}
              label="Тема"
              disabled={submitting || loading}
              validate={[required]}
              inputProps={{
                items: themes,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="message"
              component={RenderTextField}
              label="Сообщение"
              disabled={submitting || loading}
              autoComplete="off"
              validate={[required]}
              inputProps={{ rows: 7 }}
            />
          </Grid>
          <Grid xs={12} item>
            <Field
              name="rules"
              component={RenderCheckBoxField}
              disabled={submitting || loading}
              validate={[required]}
              checkBoxLabel={'Согласие на обработку персональных данных'}
            />
          </Grid>

          <Grid xs={12} item>
            <Box display="flex" justifyContent="center">
              <SubmitButton
                processed={loading}
                color="secondary"
                type="submit"
                disabled={submitting}
                variant="contained"
                fullWidth
                size="large"
                className="button-dialog"
              >
                Задать вопрос
              </SubmitButton>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

const ReduxForm = reduxForm<FeedbackRequest, Props>({
  form: 'feedBackForm',
  // enableReinitialize: true,
})(Form);

export default ReduxForm;
