import React from "react";
import { DefaultPageContainer } from "../page-container";
import { useSelector } from "react-redux";
import { ProjectProps } from "../../store/props/types";
import { useHistory } from "react-router-dom";

const Page = () => {
    const history = useHistory();
    const { docRulesLink } = useSelector(
        (state: { propsReducer: ProjectProps }) => state.propsReducer
    );
    if (!!docRulesLink) {
        window.open(docRulesLink);
        history.goBack();
    }

    return (
        <DefaultPageContainer>
            <>Rules</>
        </DefaultPageContainer>
    );
};

export default Page;
