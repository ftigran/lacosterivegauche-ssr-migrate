import React, { useMemo, useEffect } from 'react';
import { Box, Grid, makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import font from '../../../theme/font';
import { Field } from 'redux-form';
import { reduxForm, InjectedFormProps } from 'redux-form';
import RenderTextField from '../../../components/form-control/render-text-field';
import RenderRatingField from '../../../components/form-control/render-rating-field';
import PhoneMask from '../../../components/form-control/mask/phone-mask';
import {
  cyrilicFIO as ruleCyrilicFIO,
  email,
  phone as phoneRule,
  required,
} from '../../../components/form-control/rules';
import SubmitButton from '../../../components/submit-button';
import { PropsComponent, FormData } from './type';
import { useSelector } from '../../../hooks';
import { ApiRequest } from '../../../store/types';

type Props = PropsComponent & InjectedFormProps<FormData, PropsComponent>;

const RefundForm: React.FC<Props> = ({ submitting, processed, handleSubmit, initialize }) => {
  const cyrilicFIO = useMemo(() => ruleCyrilicFIO(), []);
  const phone = useMemo(() => phoneRule(), []);
  const classes = useStyles();
  const { data: authData } = useSelector((state: { authReducer: ApiRequest }) => state.authReducer);
  const user = authData?.data?.user ?? {};

  const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

  useEffect(() => {
    const { first_name, last_name, middle_name, phone, email } = user;
    initialize({
      first_name,
      last_name,
      middle_name,
      phone,
      email,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box className={classes.box}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Field
              name="first_name"
              component={RenderTextField}
              label="Имя"
              disabled={true}
              validate={[required, cyrilicFIO]}
              autoComplete="off"
              inputProps={{
                maxLength: 20,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Field
              name="middle_name"
              component={RenderTextField}
              label="Отчество"
              disabled={false}
              validate={[cyrilicFIO]}
              autoComplete="off"
              inputProps={{
                maxLength: 20,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Field
              name="last_name"
              component={RenderTextField}
              label="Фамилия"
              disabled={true}
              validate={[required, cyrilicFIO]}
              autoComplete="off"
              inputProps={{
                maxLength: 20,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Field
              name="phone"
              component={RenderTextField}
              label="Телефон"
              disabled={true}
              autoComplete="off"
              validate={[required, phone]}
              inputComponent={PhoneMask}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Field
              name="email"
              component={RenderTextField}
              label="E-mail"
              disabled={true}
              autoComplete="off"
              validate={[required, email]}
              inputProps={{ maxLength: 128 }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Box mt={xs ? 3 : 0}>
              <Field
                name="reason"
                component={RenderTextField}
                label="Укажите причину возврата товара, что Вам не понравилось? "
                disabled={submitting || processed}
                validate={[required]}
                autoComplete="off"
                inputProps={{
                  maxLength: 300,
                  rows: 4,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box mt={xs ? 3 : 0}>
              <Field
                name="analog"
                component={RenderTextField}
                label="Укажите аналогичный товар, который вы использовали ранее"
                disabled={submitting || processed}
                validate={[required]}
                autoComplete="off"
                inputProps={{
                  maxLength: 100,
                  rows: 4,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box className={classes.title2}>Оцените товар по пятибальной шкале</Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Field
              name="rating1"
              component={RenderRatingField}
              label="Эффективность использования"
              disabled={submitting || processed}
              validate={[required]}
              inputProps={{
                nameRating: 'rating1',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Field
              name="rating2"
              component={RenderRatingField}
              label="Удобство использования"
              disabled={submitting || processed}
              validate={[required]}
              inputProps={{
                nameRating: 'rating2',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Field
              name="rating3"
              component={RenderRatingField}
              label="Соответствие качества товара его цене "
              disabled={submitting || processed}
              validate={[required]}
              inputProps={{
                nameRating: 'rating3',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Field
              name="rating4"
              component={RenderRatingField}
              label="Дизайн товара"
              disabled={submitting || processed}
              validate={[required]}
              inputProps={{
                nameRating: 'rating4',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Field
              name="rating5"
              component={RenderRatingField}
              label="Общая оценка товара"
              disabled={submitting || processed}
              validate={[required]}
              inputProps={{
                nameRating: 'rating5',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton
              processed={processed}
              color="primary"
              type="submit"
              disabled={submitting}
              variant="contained"
              fullWidth={false}
              size="large"
              className="button-dialog"
            >
              Далее
            </SubmitButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  box: {
    color: '#fff',
    paddingTop: 25,
  },
  title: {
    fontFamily: font.primary,
  },
  title2: {
    fontFamily: font.primary,
    fontWeight: 'bold',
    textAlign: 'left',
  },
}));

export default reduxForm<FormData, PropsComponent>({
  form: 'RefundForm',
})(RefundForm);
