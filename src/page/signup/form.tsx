import React, {FormEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    Field,
    getFormMeta,
    getFormSyncErrors,
    InjectedFormProps,
    isDirty,
    isSubmitting,
    isValid,
    reduxForm,
} from 'redux-form';
import {Box, Grid, Link, Theme, useMediaQuery} from '@material-ui/core';
import {signup as signupService} from '../../api/actions';
import ReCAPTCHA from 'react-google-recaptcha';

import {
    cyrilicFIO as ruleCyrilicFIO,
    email,
    emailReduxUnique as emailReduxUniqueRule,
    isTrue as isTrueRule,
    phone as phoneRule,
    phoneReduxUnique as phoneReduxUniqueRule,
    required,
} from '../../components/form-control/rules';
import RenderTextField from '../../components/form-control/render-text-field';
import RenderCheckBoxField from '../../components/form-control/render-checkbox-field';
import RenderRadioField from '../../components/form-control/render-radio-field';

import Snackbar, {SnackbarProps, SnackBarTypeMessage} from '../../components/snackbar';
import {ApiAnswerStatus} from '../../api/types';
import PhoneMask from '../../components/form-control/mask/phone-mask';
import SubmitButton from '../../components/submit-button';
import {AlertProps} from '../../components/alert';
import {ACTION, CATEGORY, ga} from '../../components/ga';
import {useSelector} from 'react-redux';
import NoBr from '../../components/nobr';
import makeStyles from '@material-ui/core/styles/makeStyles';
import font from '../../theme/font';
import {useConfirm} from '../../components/ConfirmDialog';
import {Phone} from '../../components/filter';
import {colors} from '../../theme/theme';
import {PageTitle} from '../../components/typography';
import {modalName as ForgotPasswordModalName} from '../forgot-password';
import {Link as LinkRoute} from 'react-router-dom';

interface FormProps {
    recaptchaSitekey: string;
    initialValues?: {
        first_name?: string;
        last_name?: string;
        name?: string;
        phone?: string;
        email?: string;
        provider?: string;
        provider_user_id?: string;
        token?: string;
    };
    docAgreementLink?: string;
    docRulesLink?: string;
    docCookiesLink?: string;
    docPeriodStart: string;
    docPeriodEnd: string;

    onSuccess?(alertProps: AlertProps): void;

    onProcessed?(r: boolean): void;
}

type Props = {
    processed: boolean; // the custom prop
    snackbarProps: SnackbarProps;
    docAgreementLink?: string;
    docRulesLink?: string;
    docCookiesLink?: string;
    submitError: boolean;
    validFields?: string[];
    invalidFields?: string[];
};
const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: font.secondary,
        color: colors.GREY2,
        fontSize: '150%',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
            fontSize: '130%',
        },
    },
    link: {
        color: colors.GREY2,
        fontSize: '70%',
        lineHeight: 1,
        textDecoration: 'none',
        textTransform: 'none',
        fontFamily: font.primary,
        '&:hover': {
            textDecoration: 'none',
        },
    },
}));

//
const Form = (props: InjectedFormProps & Props) => {
    const {
        handleSubmit,
        processed,
        snackbarProps,
        docAgreementLink,
        docRulesLink,
        docCookiesLink,
        submitError,
        form,
    } = props;
    const classes = useStyles();
    const [formEvent, setFormEvent] = useState<FormEvent | undefined>(undefined);

    const submitting = useSelector((state) => isSubmitting(form)(state));
    const valid = useSelector((state) => isValid(form)(state));
    const dirty = useSelector((state) => isDirty(form)(state));
    const error = useSelector((state) => getFormSyncErrors(form)(state));
    const fields = useSelector((state) => getFormMeta(form)(state));

    const phone = useMemo(() => {
        return phoneRule();
    }, []);
    const isTrue = useMemo(() => {
        return isTrueRule();
    }, []);

    const cyrilicFIO = useMemo(() => ruleCyrilicFIO(), []);

    useEffect(() => {
        ga.send(CATEGORY.Registration, ACTION.open_r_form);
    }, []);

    useEffect(() => {
        return () => {
            if (dirty) {
                const errorField = Object.keys(error)
                    .map((key: string) => key)
                    .join(',');
                console.log(errorField, fields);
                ga.send(CATEGORY.Registration, ACTION.leave_registartion, errorField);
            }
        };
    }, [dirty]);

    const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Field type="hidden" name="provider_user_id" component="input"/>
                <Field type="hidden" name="provider" component="input"/>
                <Box
                    px={sm ? (xs ? 1 : 4) : 28}
                    pt={4}
                    pb={2}
                    style={
                        {
                            // backgroundColor: "#fff",
                            // borderRadius: theme.spacing(1 / 2),
                        }
                    }
                >
                    <Grid container spacing={3}>
                        {/*<Grid item xs={12} sm={12}>*/}
                        {/*  <Field*/}
                        {/*    name="last_name"*/}
                        {/*    component={RenderTextField}*/}
                        {/*    label="Фамилия"*/}
                        {/*    disabled={submitting || processed}*/}
                        {/*    validate={[required, cyrilicFIO]}*/}
                        {/*    autoComplete="off"*/}
                        {/*    inputProps={{*/}
                        {/*      maxLength: 63,*/}
                        {/*    }}*/}
                        {/*  />*/}
                        {/*</Grid>*/}
                        <Grid item xs={12} sm={12}>
                            <Field
                                name="first_name"
                                component={RenderTextField}
                                label="Имя"
                                disabled={submitting || processed}
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
                                disabled={submitting || processed}
                                autoComplete="off"
                                validate={[required, phone]}
                                inputComponent={PhoneMask}
                                // popover={
                                //   'Просим Вас указать \n' +
                                //   'правильный номер телефона, \n' +
                                //   'на него будут возвращены \n' +
                                //   'деньги за покупку Woolite, \n' +
                                //   'в случае одобрения заявки '
                                // }
                                color="primary"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Field
                                name="email"
                                component={RenderTextField}
                                label="E-mail"
                                disabled={submitting || processed}
                                autoComplete="off"
                                validate={[required, email]}
                                inputProps={{maxLength: 128}}
                            />
                        </Grid>

                        {/* <Grid item xs={12} sm={12}>*/}
                        {/*  <Field*/}
                        {/*    name="middle_name"*/}
                        {/*    component={RenderTextField}*/}
                        {/*    label="Отчество"*/}
                        {/*    disabled={submitting || processed}*/}
                        {/*    validate={[cyrilicFIO]}*/}
                        {/*    autoComplete="off"*/}
                        {/*    inputProps={{*/}
                        {/*      maxLength: 20,*/}
                        {/*    }}*/}
                        {/*  />*/}
                        {/* </Grid>*/}
                        {/* <Grid item xs={12} sm={12}>*/}
                        {/*  <Field*/}
                        {/*    name="last_name"*/}
                        {/*    component={RenderTextField}*/}
                        {/*    label="Фамилия *"*/}
                        {/*    disabled={submitting || processed}*/}
                        {/*    validate={[required, cyrilicFIO]}*/}
                        {/*    autoComplete="off"*/}
                        {/*    inputProps={{*/}
                        {/*      maxLength: 20,*/}
                        {/*    }}*/}
                        {/*  />*/}
                        {/* </Grid>*/}

                        {/* <Grid item xs={12} sm={6}>*/}
                        {/*  <Field*/}
                        {/*    name="gender"*/}
                        {/*    label={'Пол'}*/}
                        {/*    validate={[required]}*/}
                        {/*    component={RenderRadioField}*/}
                        {/*    data={[*/}
                        {/*      { label: 'Мужской', value: 'male' },*/}
                        {/*      { label: 'Женский', value: 'female' },*/}
                        {/*    ]}*/}
                        {/*    disabled={submitting || processed}*/}
                        {/*  />*/}
                        {/* </Grid>*/}
                        {/* <Grid item xs={12} sm={6}>*/}
                        {/*  <Field*/}
                        {/*    name="paint"*/}
                        {/*    label={'Вы купили TIKKURILA для…'}*/}
                        {/*    validate={[required]}*/}
                        {/*    component={RenderRadioField}*/}
                        {/*    data={[*/}
                        {/*      { label: 'личных целей ', value: 'one' },*/}
                        {/*      { label: 'работы', value: 'many' },*/}
                        {/*    ]}*/}
                        {/*    disabled={submitting || processed}*/}
                        {/*  />*/}
                        {/* </Grid>*/}
                        <Grid item xs={12} sm={12}>
                            <Grid container>
                                <Grid item xs={12} sm={12}>
                                    {' '}
                                    <Field
                                        name="rules"
                                        component={RenderCheckBoxField}
                                        disabled={submitting || processed}
                                        validate={[isTrue]}
                                        checkBoxLabel={
                                            <>
                                                Я прочитал и согласен с{' '}
                                                <Link
                                                    href={'/backend/files/rules.pdf'}
                                                    onClick={() => {
                                                        // ga.send(CATEGORY.InteractionDoc, ACTION.rules);
                                                    }}
                                                    target="_blank"
                                                >
                                                    Правилами акции
                                                </Link>{' '}
                                                и{' '}
                                                <Link href={'/backend/files/agreement.pdf'} target="_blank">
                                                    Пользовательским соглашением
                                                </Link>
                                                {', '}
                                                Согласен на обработку персональных данных
                                            </>
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Field
                                        name="subscribe_email"
                                        component={RenderCheckBoxField}
                                        disabled={submitting || processed}
                                        checkBoxLabel={
                                            <>
                                                Я согласен получать информацию об акции по <NoBr>E-mail</NoBr>
                                            </>
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <Field
                                        name="subscribe_sms"
                                        component={RenderCheckBoxField}
                                        disabled={submitting || processed}
                                        checkBoxLabel="Я согласен получать информацию об акции по смс"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Snackbar {...snackbarProps} />
                </Box>
                <Box px={2} py={2}>
                    <Grid container spacing={2} justify={'center'}>
                        <Grid item>
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
                                Зарегистрироваться
                            </SubmitButton>
                        </Grid>
                    </Grid>
                </Box>
                <Box px={2} pt={2} textAlign="center">
                    <LinkRoute to={'?w=SigninDialog'} className={classes.link}>
                        Уже зарегистрированы?
                    </LinkRoute>
                </Box>
            </form>
        </>
    );
};

const ReduxForm = reduxForm<{}, Props>({
    form: 'signupForm', // a unique identifier for this form
    enableReinitialize: true,
    asyncValidate: (values: any) =>
        Promise.all([
            phoneReduxUniqueRule(values.phone),
            //  , emailReduxUniqueRule(values.email)
        ]),
    asyncBlurFields: [
        // 'email',
        'phone',
    ],
})(Form);

export default ({
                    recaptchaSitekey,
                    initialValues,
                    onSuccess = (alertPros: AlertProps) => {
                    },
                    onProcessed = (r: boolean) => {
                    },
                    docAgreementLink,
                    docRulesLink,
                    docCookiesLink,
                }: FormProps) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [formData, setFormData] = useState({});
    const [submitError, setSubmitError] = useState(false);
    const [processed, setProcessed] = useState(false);
    const [snackbarProps, setSbnackbarProps] = useState<SnackbarProps>({
        show: false,
        message: undefined,
        showApiAnswerMessage: true,
        apiAnswerMessage: undefined,
        onClose: () => {
            setSbnackbarProps({...snackbarProps, show: false});
        },
    });

    const confirm = useConfirm();

    const onSubmit = useCallback(
        (data: any) => {
            console.log('onSubmit', data);

            setSbnackbarProps({
                ...snackbarProps,
                type: SnackBarTypeMessage.ERROR,
                show: false,
                apiAnswerMessage: undefined,
            });

            let {phone = ''} = data;
            phone = phone.replace(/\D/g, '').substr(-10);

            setProcessed(true);
            setSubmitError(false);
            setFormData({...data, phone});
            recaptchaRef?.current?.execute();

            // confirm &&
            //   confirm({
            //     title: 'Внимание',
            //     body: (
            //       <Box fontFamily={font.primary} fontWeight={300}>
            //         <Box mb={4} fontSize={'70%'}>
            //           Если выиграешь зачисление на телефон, приз будет отправлен на этот номер телефона
            //         </Box>
            //         <Box mb={4} fontWeight={500} fontSize={'100%'}>
            //           {Phone(phone)}
            //         </Box>
            //         <Box fontSize={'60%'}>Номер указан верно?</Box>
            //       </Box>
            //     ),
            //     cancellationText: 'Исправить',
            //     confirmationText: 'Верно',
            //   }).then((resp) => {
            //     if (resp === 1) {
            //       setProcessed(true);
            //       setSubmitError(false);
            //       setFormData({ ...data, phone });
            //       recaptchaRef?.current?.execute();
            //     }
            //   });
        },
        [confirm],
    );

    function onSubmitFail(data: any) {
        console.log('onSubmitFail', data);
        setSbnackbarProps({
            ...snackbarProps,
            type: SnackBarTypeMessage.WARNING,
            show: true,
            message: 'Некоторые поля не заполнены или заполнены неверно',
            apiAnswerMessage: undefined,
        });
    }

    function onRecaptchaExpired() {
        console.log('signup onRecaptchaExpired');
        setProcessed(false);
    }

    async function onRecaptchaChange(recaptchaToken: any) {
        const r = await signupService({
            ...formData,
            recaptcha: recaptchaToken,
        });

        ga.send(CATEGORY.Registration, ACTION.send_r_form, r.status.toString());

        if (r.data?.status === ApiAnswerStatus.SUCCESS) {
            console.info('signupService success', r);

            setSubmitError(false);
            onSuccess({
                result: r.data?.status === ApiAnswerStatus.SUCCESS,
                open: r.data?.status === ApiAnswerStatus.SUCCESS,
                messages: r.data?.message,
                data: r.data?.data,
            });
        } else {
            setProcessed(false);
            console.info('signupService error', r);
            setSubmitError(true);
            setSbnackbarProps({
                ...snackbarProps,
                type: SnackBarTypeMessage.ERROR,
                show: true,
                apiAnswerMessage: r.data?.message,
            });
            recaptchaRef.current?.reset();
        }
    }

    function onRecaptchaErrored() {
        console.log('signup onRecaptchaErrored');
        setProcessed(false);
    }

    useEffect(() => {
        onProcessed(processed);
    }, [processed]);

    return (
        <>
            {!!recaptchaSitekey.length && (
                <ReCAPTCHA
                    key="signup"
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={recaptchaSitekey}
                    onExpired={onRecaptchaExpired}
                    onChange={onRecaptchaChange}
                    onErrored={onRecaptchaErrored}
                />
            )}
            <ReduxForm
                submitError={submitError}
                initialValues={initialValues}
                processed={processed}
                onSubmit={onSubmit}
                onSubmitFail={onSubmitFail}
                snackbarProps={snackbarProps}
                docAgreementLink={docAgreementLink}
                docRulesLink={docRulesLink}
                docCookiesLink={docCookiesLink}
            />
        </>
    );
};
