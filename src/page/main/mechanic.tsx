import React from "react";
import {
    Box,
    BoxProps,
    makeStyles,
    useMediaQuery,
    Theme,
    Button,
    Grid,
} from "@material-ui/core";
import { Link as LinkRoute } from "react-router-dom";
import { modalName as signinModalName } from "../../page/signin";
import { modalName as signupModalName } from "../../page/signup";
//
import Slider, { ItemSliderProps } from "../../components/slider";
import Mechanic1Img from "../../img/mech_01.png";
import Mechanic2Img from "../../img/mech_02.png";
import Mechanic3Img from "../../img/mech_03.png";
import { useSelector } from "react-redux";
import { ProjectProps } from "../../store/props/types";

const useStyles = makeStyles((theme) => ({
    slide: {
        "& .slick-arrow": { top: "55%" },
        "& .slick-slide": {
            padding: theme.spacing(1),
            "& img": { margin: "auto", maxWidth: "75%" },
        },
    },
}));

interface Props {
    isAuth?: boolean;
}

const prizes: ItemSliderProps[] = [
    {
        src: Mechanic1Img,
    },
    {
        src: Mechanic2Img,
    },
    {
        src: Mechanic3Img,
    },
];

export default (props: BoxProps & Props) => {
    const classes = useStyles();

    const { isAuth, init } = useSelector(
        (state: { propsReducer: ProjectProps }) => state.propsReducer
    );

    return (
        <Box {...props}>
            <Slider
                items={prizes}
                className={classes.slide}
                variant="primary"
                pb={2}
            />
            {!isAuth && (
                <Box mt={2} mb={6} mx={4}>
                    <Grid
                        spacing={2}
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={5}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                to={`?w=${signupModalName}`}
                                component={LinkRoute}
                            >
                                Зарегистрироваться
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Box>
    );
};
