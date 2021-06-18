import React from "react";
import {
    
    makeStyles,
    Box,
    BoxProps,
} from "@material-ui/core";
//
interface Props {
    src: string | undefined;
    alt?: string;
}

const useStyles = makeStyles((theme) => ({
    img: {
        // position:"absolute",
        // top:0,
        // left:0,
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
    },
}));
export default ({ src, alt, style, ...props }: Props & BoxProps) => {
    const classes = useStyles();
    return (
        <Box
            className={classes.img}
            style={{ backgroundImage: `url(${src})`, ...style }}
            {...props}
        />
    );
};
