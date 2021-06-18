import React, { useEffect } from "react";
import { signout } from "../../api/actions";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_PROPS } from "../../store/props/types";
import { DefaultPageContainer } from "../page-container";
import { Box, Container } from "@material-ui/core";

//
const Page = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        signout().then((r) => {
            dispatch({
                type: SET_PROPS,
                payload: { init: true, isAuth: false },
            });
            history.push("/");
        });
    }, []);

    return (
        <DefaultPageContainer>
                <Box textAlign="center" mb={4} color="#7C7C7C" fontSize="75%">
                    Завершение работы...
                </Box>
        </DefaultPageContainer>
    );
};

export default Page;
