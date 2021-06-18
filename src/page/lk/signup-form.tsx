import React, { useState, useEffect, FormEvent, useMemo } from "react";
import {
    Field,
    reduxForm,
    InjectedFormProps,
    isValid,
    getFormSyncErrors,
    getFormMeta,
    isDirty,
    isSubmitting,
} from "redux-form";
import { Box, Link, Grid } from "@material-ui/core";
import { updateUser as updateUserService } from "../../api/actions";
import PhoneMask from "../../components/form-control/mask/phone-mask";

import {
    cyrilicFIO as ruleCyrilicFIO,
    isTrue as isTrueRule,
    required,
    email,
    emailReduxUniqueAuth as emailReduxUniqueAuthRule,
} from "../../components/form-control/rules";
import RenderTextField from "../../components/form-control/render-text-field";
import RenderCheckBoxField from "../../components/form-control/render-checkbox-field";

import Snackbar, {
    SnackbarProps,
    SnackBarTypeMessage,
} from "../../components/snackbar";
import { ApiAnswerStatus } from "../../api/types";
import SubmitButton from "../../components/submit-button";
import { AlertProps } from "../../components/alert";
import { ga, ACTION, CATEGORY } from "../../components/ga";
import { useSelector } from "react-redux";
import theme from "../../theme/theme";
import NoBr from "../../components/nobr";
import Alert from "../../components/alert";

interface FormProps {
    initialValues?: {
        first_name?: string;
        last_name?: string;
        name?: string;
        phone?: string;
        email?: string;
        provider?: string;
        provider_user_id?: string;
    };
    docAgreementLink?: string;
    docRulesLink?: string;
    onSuccess?(): void;
    onProcessed?(r: boolean): void;
}

type Props = {
    processed: boolean; // the custom prop
    snackbarProps: SnackbarProps;
    docAgreementLink?: string;
    docRulesLink?: string;
    submitError: boolean;
    validFields?: string[];
    invalidFields?: string[];
};

//
const Form = (props: InjectedFormProps & Props) => {
    const {
        handleSubmit,
        processed,
        snackbarProps,
        docAgreementLink,
        docRulesLink,
        form,
    } = props;
    const [] = useState<FormEvent | undefined>(undefined);

    const submitting = useSelector((state) => isSubmitting(form)(state));
    const dirty = useSelector((state) => isDirty(form)(state));
    const error = useSelector((state) => getFormSyncErrors(form)(state));
    const fields = useSelector((state) => getFormMeta(form)(state));

    const isTrue = useMemo(() => {
        return isTrueRule();
    }, []);
    const cyrilicFIO = useMemo(() => ruleCyrilicFIO(), []);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Field
                    type="hidden"
                    name="provider_user_id"
                    component="input"
                />
                <Field type="hidden" name="provider" component="input" />
                <Box
                    px={4}
                    pt={4}
                    pb={4}
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: theme.spacing(1 / 2),
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Field
                                name="first_name"
                                component={RenderTextField}
                                label="Имя"
                                disabled={submitting || processed}
                                validate={[required, cyrilicFIO]}
                                autoComplete="off"
                                inputProps={{
                                    maxLength: 64,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                name="last_name"
                                component={RenderTextField}
                                label="Фамилия"
                                disabled={submitting || processed}
                                validate={[required, cyrilicFIO]}
                                autoComplete="off"
                                inputProps={{
                                    maxLength: 64,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                inputProps={{ readOnly: true }}
                                name="phone"
                                component={RenderTextField}
                                label="Телефон"
                                disabled={submitting || processed}
                                autoComplete="off"
                                inputComponent={PhoneMask}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                name="email"
                                component={RenderTextField}
                                label="E-mail"
                                disabled={submitting || processed}
                                autoComplete="off"
                                validate={[required, email]}
                                inputProps={{ maxLength: 128 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                name="age"
                                component={RenderCheckBoxField}
                                disabled={submitting || processed}
                                validate={[isTrue]}
                                checkBoxLabel={
                                    <>
                                        Я соглашаюсь, что мне более 18&nbsp;лет
                                    </>
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                name="subscribe_email"
                                component={RenderCheckBoxField}
                                disabled={submitting || processed}
                                checkBoxLabel={
                                    <>
                                        Я согласен получать информацию об акции
                                        по <NoBr>E-mail</NoBr>
                                    </>
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                name="rules"
                                component={RenderCheckBoxField}
                                disabled={submitting || processed}
                                validate={[isTrue]}
                                checkBoxLabel={
                                    <>
                                        Я прочитал и согласен с{" "}
                                        <Link
                                            href={docRulesLink}
                                            target="_blank"
                                        >
                                            Правилами акции
                                        </Link>{" "}
                                        и{" "}
                                        <Link
                                            href={docAgreementLink}
                                            target="_blank"
                                        >
                                            Пользовательским соглашением
                                        </Link>
                                    </>
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                name="subscribe_sms"
                                component={RenderCheckBoxField}
                                disabled={submitting || processed}
                                checkBoxLabel={
                                    <>
                                        Я согласен получать информацию об акции
                                        по смс
                                    </>
                                }
                            />
                        </Grid>
                    </Grid>
                    <Snackbar {...snackbarProps} />
                </Box>
                <Box px={2} pb={2} textAlign="center">
                    <SubmitButton
                        processed={processed}
                        color="primary"
                        type="submit"
                        disabled={submitting}
                        variant="contained"
                        size="small"
                    >
                        Сохранить
                    </SubmitButton>
                </Box>
            </form>
        </>
    );
};

const ReduxForm = reduxForm<{}, Props>({
    form: "lkSignupForm", // a unique identifier for this form
    enableReinitialize: true,
    asyncValidate: (values: any) => {
        return Promise.all([emailReduxUniqueAuthRule(values.email)]);
    },
    asyncBlurFields: ["email"],
})(Form);

export default ({
    initialValues,
    onSuccess = () => {},
    onProcessed = () => {},
    docAgreementLink,
    docRulesLink,
}: FormProps) => {
    const [alertProps, setAlertProps] = useState<AlertProps>({
        open: false,
        result: false,
        onClose: () => {
            setAlertProps({ ...alertProps, open: false });
        },
    });

    const [submitError, setSubmitError] = useState(false);
    const [processed, setProcessed] = useState(false);
    const [snackbarProps, setSbnackbarProps] = useState<SnackbarProps>({
        show: false,
        message: undefined,
        showApiAnswerMessage: true,
        apiAnswerMessage: undefined,
        onClose: () => {
            setSbnackbarProps({ ...snackbarProps, show: false });
        },
    });

    async function onSubmit(data: any) {
        console.log("onSubmit", data);

        setSbnackbarProps({
            ...snackbarProps,
            type: SnackBarTypeMessage.ERROR,
            show: false,
            apiAnswerMessage: undefined,
        });

        setProcessed(true);
        setSubmitError(false);
        const r = await updateUserService({
            ...data,
        });

        //    ga.send(CATEGORY.Registration, ACTION.send_r_form, r.status.toString());

        if (r.status === ApiAnswerStatus.SUCCESS) {
            console.info("signupService success", r);

            setSubmitError(false);
            setAlertProps({
                ...alertProps,
                open: true,
                result: true,
                messages: r.message,
                onClose: () => {
                    onSuccess();
                    document.location.reload();
                },
            });
        } else {
            setProcessed(false);
            console.info("signupService error", r);
            setSubmitError(true);
            setSbnackbarProps({
                ...snackbarProps,
                type: SnackBarTypeMessage.ERROR,
                show: true,
                apiAnswerMessage: r.message,
            });
        }

        //return true;//to sent onSubmitSuccess
    }

    function onSubmitFail(data: any) {
        console.log("onSubmitFail", data);
        setSbnackbarProps({
            ...snackbarProps,
            type: SnackBarTypeMessage.WARNING,
            show: true,
            message: "Некоторые поля не заполнены или заполнены неверно",
            apiAnswerMessage: undefined,
        });
    }

    useEffect(() => {
        onProcessed(processed);
    }, [processed]);
    return (
        <>
            <ReduxForm
                submitError={submitError}
                initialValues={initialValues}
                processed={processed}
                onSubmit={onSubmit}
                onSubmitFail={onSubmitFail}
                snackbarProps={snackbarProps}
                docAgreementLink={docAgreementLink}
                docRulesLink={docRulesLink}
            />
            <Alert {...alertProps} />
        </>
    );
};
