import React, { ReactNode } from "react";
import {
    Box,
    BoxProps,
    makeStyles,
    useMediaQuery,
    Theme,
    Button,
    Grid,
} from "@material-ui/core";
//
import Slider from "react-slick";

import ArrowNextImg from "../../img/arrow-right.png";
import ArrowPrevImg from "../../img/arrow-left.png";
import ArrowNextWhiteImg from "../../img/arrow-right-white.png";
import ArrowPrevWhiteImg from "../../img/arrow-left-white.png";
import clsx from "clsx";
import "./slider.scss";
import font from "../../theme/font";

interface Props {
    variant?: "primary" | "secondary";
    items: ItemSlider[];
    slideClassName?: string;
}
export interface ItemSlider {
    src: string;
    title?: string;
}
const useStyles = makeStyles(() => ({
    img: {
        margin: "auto",
        maxWidth: "100%",
    },
    slideContainer: {
        outline: "0 none",
        textAlign: "center",
        position: "relative",
    },
    title: {
        color: "#fff",
        fontSize: "150%",
        textAlign: "center",
        fontFamily: font.primary,
    },
}));

export default (params: BoxProps & Props) => {
    const classes = useStyles();
    const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const { items, slideClassName, variant, ...props } = params;
    let other = {};
    switch (variant) {
        case "primary":
            other = {
                ...other,
                nextArrow: <img src={ArrowNextImg} />,
                prevArrow: <img src={ArrowPrevImg} />,
            };
            break;
        case "secondary":
            other = {
                ...other,
                nextArrow: <img src={ArrowNextWhiteImg} />,
                prevArrow: <img src={ArrowPrevWhiteImg} />,
            };
            break;
    }

    return !!items.length ? (
        <Box
            {...props}
            className={clsx(
                "custom-slick",
                !!variant ? `slick-slider-variant-${variant}` : ""
            )}
        >
            <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={sm ? 1 : 3}
                slidesToScroll={1}
                className={clsx(slideClassName)}
                {...other}
            >
                {items.map(({ src, title }, index) => {
                    return (
                        <Box key={index}>
                            <Box
                                className={classes.slideContainer}
                                m={sm ? 4 : 0}
                            >
                                <img src={src} className={classes.img} />
                            </Box>
                            {!!title && (
                                <Box p={2} className={classes.title}>
                                    {title}
                                </Box>
                            )}
                        </Box>
                    );
                })}
            </Slider>
        </Box>
    ) : (
        <></>
    );
};
