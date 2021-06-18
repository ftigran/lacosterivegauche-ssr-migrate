import React, { ReactNode } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
    SnackbarContent,
    IconButton,
    Box,
    SnackbarContentProps,
    BoxProps,
    Fade,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";
import InfoIcon from "@material-ui/icons/Info";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

export enum SnackBarTypeMessage {
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
    INFO = "info",
}

function VariantIcon({ type = "", className = "" }) {
    switch (type) {
        case SnackBarTypeMessage.SUCCESS:
            return <CheckCircleIcon className={className} />;
        case SnackBarTypeMessage.WARNING:
            return <WarningIcon className={className} />;
        case SnackBarTypeMessage.ERROR:
            return <ErrorIcon className={className} />;
        case SnackBarTypeMessage.INFO:
            return <InfoIcon className={className} />;
        default:
            return <></>;
    }
}

const useStyles = makeStyles((theme) => ({
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    messages: {
        display: "flex",
        alignItems: "flex-start",
        textAlign: "left",
        "&.success": {
            color: "green",
        },
        
    },
    answerMessages: {
        "&:not(:first-child)": {
            marginTop: theme.spacing(1),
        },
    },
    closeButton: {
        padding: 0,
        color: "#c61633",
        "&.success": {
            color: "green",
        },
    },
    snackbar: {
        marginRight: "auto",
        marginLeft: "auto",
        flex: "1 1 auto",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

export interface Props {
    show: boolean;
    className?: string | undefined;
    message?: string | ReactNode | undefined | null;
    type?: SnackBarTypeMessage;
    showApiAnswerMessage?: boolean;
    onClose?: Function;
    containerProps?: Object;
    apiAnswerMessage?: any;
}

export default (props: Props & SnackbarContentProps & BoxProps) => {
    const {
        show = false,
        className,
        message,
        apiAnswerMessage,
        type,
        showApiAnswerMessage = false,
        onClose = () => {},
        containerProps = {},
        ...other
    } = props;
    const classes = useStyles();

    const handleClose = () => {
        console.log("snackbar onClose");
        onClose();
    };
    const messages = Object.keys(apiAnswerMessage || {});

    return (
        <Fade in={show} unmountOnExit={true}>
            <Box {...containerProps}>
                <SnackbarContent
                    className={clsx(
                        classes.snackbar,
                        className,
                        "animated fadeIn"
                    )}
                    style={{ maxWidth: "100%" }}
                    aria-describedby="client-snackbar"
                    message={
                        <Box
                            id="client-snackbar"
                            className={clsx(classes.messages, type)}
                        >
                            <Box flex="0 0 auto">
                                <VariantIcon
                                    type={type}
                                    className={clsx(
                                        classes.icon,
                                        classes.iconVariant
                                    )}
                                />
                            </Box>
                            <Box flex="1 1 auto">
                                {!!message && <Box>{message}</Box>}

                                {showApiAnswerMessage && messages.length > 0 && (
                                    <Box
                                        className={clsx(classes.answerMessages)}
                                    >
                                        {messages.map((key, index) => {
                                            const value = apiAnswerMessage[key];
                                            return (
                                                <Box
                                                    key={`answer-message-err-${index}`}
                                                >
                                                    {Array.isArray(value) ? (
                                                        value.map((v, i) => (
                                                            <span key={i}>
                                                                {v}
                                                                <br />
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span>{value}</span>
                                                    )}
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                )}
                            </Box>
                            <Box flex="0 0 auto" lineHeight={1}>
                                <IconButton
                                    className={clsx(classes.closeButton, type)}
                                    key="close"
                                    aria-label="close"
                                    color="inherit"
                                    onClick={handleClose}
                                >
                                    <CloseIcon className={classes.icon} />
                                </IconButton>
                            </Box>
                        </Box>
                    }
                    {...other}
                />
            </Box>
        </Fade>
    );
};
