import React from "react";
import {
    Box,
    BoxProps,
    makeStyles,
    useMediaQuery,
    Theme,
    Grid,
    Container,
} from "@material-ui/core";

//
import Slider, { ItemSliderProps } from "../../components/slider";
import PrizAirpodsImg from "../../img/priz/airpods.png";
import PrizAppleWatchImg from "../../img/priz/apple-watch.png";
import PrizCardImg from "../../img/priz/card.png";
import PrizElectroImg from "../../img/priz/electro.png";
import PrizVeloImg from "../../img/priz/velo.png";
import font from "../../theme/font";

const useStyles = makeStyles(() => ({
    slide: {
        //   "& .slick-arrow": { top: "33%" },
    },

    prizesContainer: {
        "& img": {
            maxWidth: "100%",
        },
    },
}));

const prizes: ItemSliderProps[] = [
    {
        src: PrizAirpodsImg,
        title: "AirPods Pro",
    },
    {
        src: PrizAppleWatchImg,
        title: "Apple Watch",
    },
    {
        src: PrizElectroImg,
        title: "Электросамокат",
    },
    {
        src: PrizVeloImg,
        title: "Складной велосипед",
    },
    {
        src: PrizCardImg,
        title: "Сертификаты 1000-4000 Р",
    },
];

const PrizItem = (item: ItemSliderProps) => {
    return (
        <Box
            textAlign="center"
            color="#fff"
            fontFamily={font.primary}
            fontSize="150%"
        >
            <Box>
                <img src={item.src} />
            </Box>
            <Box>{item.title}</Box>
        </Box>
    );
};
export default (props: BoxProps) => {
    const classes = useStyles();
    const xs = useMediaQuery((theme: Theme) =>  theme.breakpoints.down("xs"));
    return (
        <Box {...props} id="prizes">
            {xs ? (
                <Slider items={prizes} slideClassName={classes.slide} variant="secondary"/>
            ) : (
                <Box py={4}>
                    <Container>
                        <Box minHeight={300}>
                            <Grid
                                container
                                className={classes.prizesContainer}
                                spacing={2}
                            >
                                <Grid item xs={4}>
                                    <PrizItem {...prizes[0]} />
                                </Grid>
                                <Grid item xs={4}>
                                    <PrizItem {...prizes[1]} />
                                </Grid>
                                <Grid item xs={4}>
                                    <PrizItem {...prizes[2]} />
                                </Grid>
                                <Grid item xs={6}>
                                    <PrizItem {...prizes[3]} />
                                </Grid>
                                <Grid item xs={6}>
                                    <PrizItem {...prizes[4]} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Box>
            )}
        </Box>
    );
};
