import React, {useState} from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
    useMediaQuery,
    Theme, Button, makeStyles,
} from '@material-ui/core';
import Moment from 'react-moment';
import {ImageSearch} from '@material-ui/icons';
import Pagination from '../../../components/pagination';
import {PromoCode} from '../types';
import {BodyTextBold} from '../../../components/typography';
import {colors} from '../../../theme/theme';
import font from "../../../theme/font";
import PopupState, {bindPopover, bindTrigger} from 'material-ui-popup-state';
import Popover from '@material-ui/core/Popover';

interface Props {
    data?: PromoCode[];
}

const paginate = 10;

const useStylesPersonalLineItem = makeStyles(() => ({
    boxQuestion: {
        width: 20,
        height: 20,
        borderRadius: 11,
        border: '1px solid #FCF297',
        color: '#FCF297',
        fontSize: 14,
        lineHeight: 1,
        fontFamily: font.arial,
        marginLeft: 10,
        cursor: 'pointer',
    },
    popoverText: {
        fontSize: '80%',
        color: '#3E3E3E',
        maxWidth: 300,
    },
    status: {},
}));


const CodeList: React.FC<Props> = ({data = []}) => {
    const [dataPaginate, setDataPaginate] = useState<PromoCode[]>([]);
    const xs = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

    return (
        <>
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <RowHeader xs={xs}/>
                    </TableHead>
                    <TableBody>
                        {dataPaginate.map((row, index) => (
                            <RowBody key={index} index={index} row={row} xs={xs}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {dataPaginate.length == 0 && (
                <Box mt={3}>
                    <BodyTextBold color={colors.GREY3} align="center">
                        У вас нет кодов
                    </BodyTextBold>
                </Box>
            )}
            <Pagination data={data} pageSize={paginate} onChange={setDataPaginate}/>
        </>
    );
};

type RowProps = { xs: boolean };

const RowHeader: React.FC<RowProps> = ({xs}) =>
    xs ? (
        <TableRow>
            <TableCell style={{width: '65%'}} align={'left'}>
                Данные кода
            </TableCell>
            <TableCell style={{width: '35%'}}>Начислено</TableCell>
        </TableRow>
    ) : (
        <TableRow>
            <TableCell style={{width: '25%'}}>Дата</TableCell>
            <TableCell style={{width: '25%'}}>Код</TableCell>
            <TableCell style={{width: '25%'}}>Статус</TableCell>
            <TableCell style={{width: '25%'}}>Начислено</TableCell>
        </TableRow>
    );

type RowBodyProps = { index: number; row: PromoCode } & RowProps;

const RowBody: React.FC<RowBodyProps> = ({xs, row}) =>

    xs ? (
        <TableRow>
            <TableCell align={'left'}>
                Дата: <Moment>{row.createDatetime}</Moment>
                <br/>
                {row.code !== "-" && <> Код: {row.code} <br/></>}
                {row.path && row.code === "-" && <>Код:
                    <a target="_blank" color="primary"
                       href={`/backend/code${row.path}`}><ImageSearch
                        style={{fontSize: 20, color: '#3f51b5', position: "relative", top: 5}}/></a>
                    <br/></>}

                {row.status}

                {(row.id === 1001 || row.id === 1002) &&
                <PopupState variant="popover" popupId={`popup-popover-moderate-${row.id}`}>
                    {(popupState) => (
                        <>
                            <Box
                                style={{
                                    background: "#00488C", color: "#fff", borderRadius: 20, width: 21,
                                    height: 21,
                                    marginLeft:10,
                                    overflow: "hidden",
                                    display: "inline-flex"
                                }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                {...bindTrigger(popupState)}
                            >
                                <Box>?</Box>
                            </Box>
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <Box p={2}>
                                    {row.id === 1001 && <>Фото кода плохого качества</>}
                                    {row.id === 1002 && <>Код не распознан. Пожалуйста, обратитесь в службу поддержки акции
                                        support@les.valio.ru</>}
                                </Box>
                            </Popover>
                        </>
                    )}
                </PopupState>
                }

            </TableCell>
            <TableCell>   {!row.amount ? <Box>-</Box> : <Box>{`${row.amount} ₽`}</Box>}</TableCell>
        </TableRow>
    ) : (
        <TableRow>
            <TableCell>
                <Moment>{row.createDatetime}</Moment>
            </TableCell>
            <TableCell>
                {row.code !== "-" && <>{row.code}</>}
                {row.path && row.code === "-" &&
                <Button target="_blank" color="primary" href={`/backend/code${row.path}`}><ImageSearch
                    style={{fontSize: 25, color: '#3f51b5'}}/></Button>}
            </TableCell>
            <TableCell>{row.status}
                {(row.id === 1001 || row.id === 1002) &&
                <PopupState variant="popover" popupId={`popup-popover-moderate-${row.id}`}>
                    {(popupState) => (
                        <>
                            <Box
                                style={{
                                    background: "#00488C", color: "#fff", borderRadius: 20, width: 21,
                                    height: 21,
                                    marginLeft:10,
                                    overflow: "hidden",
                                    display: "inline-flex"
                                }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                {...bindTrigger(popupState)}
                            >
                                <Box>?</Box>
                            </Box>
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <Box p={2}>
                                    {row.id === 1001 && <>Фото кода плохого качества</>}
                                    {row.id === 1002 && <>Код не распознан. Пожалуйста, обратитесь в службу поддержки акции
                                        support@les.valio.ru</>}
                                </Box>
                            </Popover>
                        </>
                    )}
                </PopupState>
                }
            </TableCell>
            <TableCell>
                <Box display="flex" alignItems="center" justifyContent="center">
                    {!row.amount ? <Box>-</Box> : <Box>{`${row.amount} ₽`}</Box>}
                </Box>
            </TableCell>
        </TableRow>
    );

export default CodeList;
