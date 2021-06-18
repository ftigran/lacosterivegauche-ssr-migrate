import React, {useEffect, useState, useMemo} from 'react';
import {Box, Theme, useMediaQuery, TextField} from '@material-ui/core';
// import { DatePickerCustom } from '../../components/datepicker/date-picker';

import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import RenderTextField from '../../components/form-control/render-text-field';
import DateMask from '../../components/form-control/mask/date-mask';
import FdMask from '../../components/form-control/mask/fd-mask';
import FnMask from '../../components/form-control/mask/fn-mask';
import Snackbar, {SnackbarProps, SnackBarTypeMessage} from '../../components/snackbar';
import RenderCheckBoxField from '../../components/form-control/render-checkbox-field';
import ReCAPTCHA from 'react-google-recaptcha';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import ru from 'date-fns/locale/ru';

import {
    digitsFd as ruleDigitsFd,
    digitsFn as ruledigitsFn,
    phone as phoneRule,
    required,
    dateRule
} from '../../components/form-control/rules';
import SubmitButton from '../../components/submit-button';
import {chekRegister as chekRegisterAction, retailer} from '../../api/actions';
import moment from 'moment';
import Money from '../../components/filter/money';
import {AlertProps} from '../../components/alert';
import {ApiAnswerStatus} from '../../api/types';
import {FormData as FormDataRefund} from './RefundForm/type';
import {ACTION, CATEGORY, ga} from '../../components/ga';
import PhoneMask from '../../components/form-control/mask/phone-mask';
import {makeStyles} from "@material-ui/core/styles";


import DatePicker from "react-datepicker";
import InputAdornment from '@material-ui/core/InputAdornment';
import EventIcon from '@material-ui/icons/Event';

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
const Example = (props:any) => {
    return (


            <RenderTextField
            // disabled={true}
            {...props}
            // disabledCustom={true}
            InputProps={{
                endAdornment: (
      
                  <InputAdornment position="start">
                        <DatePicker 
                    // datetime: moment(data?.datetime, 'DD.MM.YYYY').format('YYYY-MM-DD') + " 00:00:00",
                
                            // selected={props.input.value}
                            // moment(props.input.value, 'DD.MM.YYYY').format('YYYY-MM-DD')} 
                            {... props.input}
                            onChange={(date:Date) => {
                                props.input.onChange(moment(date).format('DD.MM.YYYY'))
                            }}

                            // popperPlacement="bottom"
                            // value={"moment(input.value, 'MM/DD/YYYY').format('DD.MM.YYYY')"}
                            dateFormat="dd.MM.yyyy"
                            minDate={props.mindate.setSeconds(props.mindate.getSeconds() + 1)}
                            maxDate={props.maxdate}
                            locale={ru}
                            calendarStartDay={1}
                            customInput={
                    <EventIcon />
                }/>

                  </InputAdornment>
                ),
              }}

            // variant="outlined"
    />

  );
};
//

const digitsFn = ruledigitsFn();
const digitsFd = ruleDigitsFd();

interface FormProps {
    recaptchaSitekey?: string | undefined;
    docPeriodStart: number | undefined;
    docPeriodEnd: number | undefined;
    now: number | undefined;

    onSuccess?(alertProps: AlertProps): void;

    onProcessed?(r: boolean): void;

    initialValues?: {
        phone?: string | undefined;
        check_fd?: string | undefined;
        check_fn?: string | undefined;
        check_date?: string | undefined;
    };
    formDataRefund?: FormDataRefund;
}

interface Props {
    processed: boolean; // the custom prop
    snackbarProps: SnackbarProps;
    docPeriodStart: number | undefined;
    docPeriodEnd: number | undefined;
    now: number | undefined;
}



const useStyles = makeStyles((theme) => ({
    root: {
        // color: '#000!important',
    },
    shrink: {
        color: '#000!important',
    },

    error: {
        color: 'red!important',
    },
}));




const Form = (props: InjectedFormProps & Props) => {
    const {handleSubmit, processed, snackbarProps, docPeriodEnd=0, docPeriodStart=0, now=0} = props;
    const classes = useStyles();
    const end = docPeriodEnd<now?docPeriodEnd:now
    const maxDate = moment(end).toDate();
    const minDate = moment(docPeriodStart).toDate();
    const dateValidChecker = dateRule(docPeriodStart,end+86400000)

    // console.log('minDate',minDate.toString())
    // console.log('maxDate',maxDate)

    const phone = useMemo(() => {
        return phoneRule();
    }, []);
    const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    // const checkDate = useMemo(() => {
    //     return ruleCheckDate(
    //         retailer?.start,
    //         retailer?.end,
    //         "Дата чека не в интервале акции"
    //     );
    // }, [retailer]);

    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    // };

    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="phone"
                component={RenderTextField}
                label="Телефон"
                disabled={processed}
                autoComplete="off"
                validate={[required, phone]}
                inputComponent={PhoneMask}
            />
            <Field
                disabled={processed}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="off"
                name="fn"
                component={RenderTextField}
                label="ФН"
                inputComponent={FnMask}
                validate={[required, digitsFn]}
                fullWidth={true}
            />
            <Field
                disabled={processed}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="off"
                name="fd"
                component={RenderTextField}
                label="ФД"
                inputComponent={FdMask}
                validate={[required, digitsFd]}
                fullWidth={true}
            />


            {/*<KeyboardDatePicker*/}
            {/*    margin="normal"*/}
            {/*    id="date-picker-dialog"*/}
            {/*    label="Date picker dialog"*/}
            {/*    format="MM/dd/yyyy"*/}
            {/*    value={selectedDate}*/}
            {/*    // onChange={handleDateChange}*/}
            {/*    KeyboardButtonProps={{*/}
            {/*        'aria-label': 'change date',*/}
            {/*    }}*/}
            {/*/>*/}

            {/*<DatePickerCustom*/}
            {/*    disableToolbar*/}
            {/*    disabled={processed}*/}
            {/*    name="check_date"*/}
            {/*    label="Дата чека"*/}
            {/*    fullWidth={true}*/}
            {/*    variant={'outlined'}*/}
            {/*    minDate={minDate}*/}
            {/*    maxDate={maxDate}*/}
            {/*    validate={[required]}*/}
            {/*    InputLabelProps={{*/}
            {/*        classes: {*/}
            {/*            root: classes.root,*/}
            {/*            shrink: classes.shrink,*/}
            {/*            error: classes.error,*/}
            {/*        },*/}
            {/*    }}*/}
            {/*    FormHelperTextProps={{*/}
            {/*        classes: {*/}
            {/*            root: classes.error,*/}
            {/*        },*/}
            {/*    }}*/}
            {/*/>*/}



            <Field
                name="datetime"
                component={Example}
                label="Дата чека"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="off"
                // disabled={true}
                validate={[required,dateValidChecker]}
                className="lastTB"
                fullWidth={true}
                mindate={minDate}
                maxdate={maxDate}
                inputComponent={DateMask}
            />
            {/* <Field
                disabled={processed}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="off"
                name="datetime"
                component={RenderTextField}
                inputComponent={DateMask}
                label="Дата чека"
                validate={[required]}
                minDate={minDate}
                maxDate={maxDate}
            /> */}
            <Field
                name="rules"
                component={RenderCheckBoxField}
                disabled={processed}
                validate={[required]}
                checkBoxLabel={<>Я прочитал и согласен с <a target="_blank" href="/backend/files/rules.pdf">Правилами
                    акции</a> и <a target="_blank" href="/backend/files/useragreem.pdf">Пользовательским соглашением</a>,
                    согласен на обработку персональных данных.</>}
            />
            <Field
                name="subscribeSms"
                component={RenderCheckBoxField}
                disabled={processed}
                // validate={[required]}
                checkBoxLabel={'Я согласен получать информацию об акции по СМС'}
            />
            <Snackbar {...snackbarProps} mt={2}/>
            <SubmitButton
                processed={processed}
                color="primary"
                variant="contained"
                title="Зарегистрировать чек"
                fullWidth
                onClick={() => {
                    ga.send(CATEGORY.BtnClick, ACTION.regWidget, 'Check');
                }}
            />
        </form>
    );
};

const ReduxForm = reduxForm<{}, Props>({
    form: 'checkRegisterForm', // a unique identifier for this form
    // enableReinitialize: true,
})(Form);

interface iTheme {
    breakpoints: iBreakpoints
}

interface iBreakpoints {
    down: any
}

interface iEvent {
    type: string;
    key: string;
}

export default (props: FormProps) => {
    const {
        recaptchaSitekey = '',
        docPeriodEnd = 0,
        docPeriodStart = 0,
        now=0,
        onSuccess = (alertPros: AlertProps) => {
        },
        onProcessed = (r: boolean) => {
        },
        initialValues,
        formDataRefund,
    } = props;

    const sm = useMediaQuery((theme: iTheme) => theme.breakpoints.down('sm'));

    const [formData, setFormData] = useState({});
    const recaptchaRef = React.useRef<ReCAPTCHA>(null);
    const [processed, setProcessed] = useState(false);
    const [snackbarProps, setSbnackbarProps] = useState<SnackbarProps>({
        show: false,
        message: undefined,
        apiAnswerMessage: undefined,
        onClose: () => {
            setSbnackbarProps({...snackbarProps, show: false});
        },
    });

    function onSubmit(data: any) {
        console.log('onSubmit', data);
        setSbnackbarProps({
            ...snackbarProps,
            type: SnackBarTypeMessage.ERROR,
            show: false,
            message: undefined,
            apiAnswerMessage: undefined,
        });

        setProcessed(true);
        setFormData({
            ...data,
            datetime: moment(data?.datetime, 'DD.MM.YYYY').format('YYYY-MM-DD') + " 00:00:00",
            subscribeSms: data?.subscribeSms || false,
            phone: data.phone.slice(3).replace(/[ )]/g, ""),
            name: "1",
        });
        // setFormData(data);
        recaptchaRef?.current?.execute();
    }

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
        console.log('forgot-password onRecaptchaExpired');
        setProcessed(false);
    }

//----

    async function onRecaptchaChange(recaptchaToken: any) {
        const r = await chekRegisterAction({
            ...formData,

            recaptcha: recaptchaToken,
        });
        if (r.data?.status === ApiAnswerStatus.SUCCESS) {
            console.info('chekRegisterAction success', r);
            onSuccess({
                result: true,
                open: true,
                data: formData,
                messages: r.data?.message,
            });
        } else {
            setProcessed(false);
            console.info('chekRegisterAction error', r);
            setSbnackbarProps({
                ...snackbarProps,
                type: SnackBarTypeMessage.ERROR,
                show: true,
                apiAnswerMessage: r.data?.message,
                showApiAnswerMessage: true,
            });
            recaptchaRef.current?.reset();
        }
    }

    function onRecaptchaErrored() {
        console.log('chekRegisterAction onRecaptchaErrored');
        setProcessed(false);
    }

    useEffect(() => {
        onProcessed(processed);
    }, [processed]);

//--------------------

    return (
        <>

            <ReduxForm
                docPeriodEnd={docPeriodEnd}
                docPeriodStart={docPeriodStart}
                now={now}
                processed={processed}
                onSubmit={onSubmit}
                onSubmitFail={onSubmitFail}
                snackbarProps={snackbarProps}
                initialValues={initialValues}
            />
            {!!recaptchaSitekey.length && (
                <ReCAPTCHA
                    key="register-check"
                    ref={recaptchaRef}
                    size="invisible"
                    badge={sm ? "inline" : "bottomright"}
                    sitekey={recaptchaSitekey}
                    onExpired={onRecaptchaExpired}
                    onChange={onRecaptchaChange}
                    onErrored={onRecaptchaErrored}
                />
            )}
        </>
    );
};
