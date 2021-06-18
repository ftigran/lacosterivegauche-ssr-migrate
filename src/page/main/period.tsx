import React from "react";
import { Box, BoxProps } from "@material-ui/core";
import font from "../../theme/font";
export default (props: BoxProps) => {
    return (
        <Box
            style={{
                fontFamily:font.secondary,
                color: "#39404A",
                fontSize: "90%",
                fontWeight: "bold",
                textTransform: "uppercase",
            }}
            {...props}
        >
            c 1 сентября по 15 октября
        </Box>
    );
};
