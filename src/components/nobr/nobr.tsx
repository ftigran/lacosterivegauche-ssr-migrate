import React, { ReactNode, FunctionComponent } from "react";
interface Props {
    children: ReactNode | string;
}
const Element: FunctionComponent<Props> = ({ children }) => {
    return (
        <span style={{ whiteSpace: "nowrap", display: "inline-block" }}>
            {children}
        </span>
    );
};
export default Element;
