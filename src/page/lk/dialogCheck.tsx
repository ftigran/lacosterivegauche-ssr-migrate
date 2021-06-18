import React from 'react';
import Dialog, {Params as DialogParams} from '../../components/dialog';
import CheckForm from './check';
import {Box, makeStyles, useMediaQuery, Theme} from '@material-ui/core';
import imgGuidCheck from '../../imgs/guid-check.png';
import font from '../../theme/font';
import theme, {colors} from '../../theme/theme';
import "./dialogCheck.scss";
import {useDispatch, useSelector} from 'react-redux';
import {SET_DIALOG, ProjectProps} from '../../store/props/types';
import {useHistory} from 'react-router-dom';


export interface DialogGuidCheckProps {
    processed?: boolean;
    store?: boolean;
    open?: boolean;
    name?: string;
    closeButton?: boolean;
    okButton?: boolean;
    classN?: string
    onCloseDialog?: (r: boolean) => void;
    dialogContentClassName?: string;
    onOpen?: () => void;
    docPeriodStart: number | undefined;
    docPeriodEnd: number | undefined;
    now: number | undefined;
    recaptchaSitekey: string | undefined;
}

const useStyles = makeStyles((theme) => ({
    image: {
        backgroundImage: `url(${imgGuidCheck})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        backgroundPosition: 'center',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
}));

export default (props: DialogGuidCheckProps) => {
    const {recaptchaSitekey, docPeriodStart, docPeriodEnd,now, ...other} = props;
    const open = useSelector((state: { propsReducer: ProjectProps }) => state.propsReducer.dialog.checkReg?.open || false)
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <Dialog {...other} open={open} store name={"checkReg"} title="Регистрация чека " classN="reg"
                onCloseDialog={() => {
                    history.push("")
                }}>
            <CheckForm onSuccess={() => {
                history.push("")
                dispatch({
                    type: SET_DIALOG,
                    payload: {
                        checkReg: {open: false},
                        checkRegApprove: {open: true},
                    },
                });
            }}
                       docPeriodEnd={docPeriodEnd}
                       docPeriodStart={docPeriodStart}
                       recaptchaSitekey={recaptchaSitekey}
                       now={now}
            />
        </Dialog>
    );
};
