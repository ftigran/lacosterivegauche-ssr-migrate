import React, { useState, useMemo, useCallback } from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import { ReactComponent as SocialAuthOk } from "../../imgs/social-auth-ok.svg";
import { ReactComponent as SocialAuthVk } from "../../imgs/social-auth-vk.svg";
import { ReactComponent as SocialAuthFb } from "../../imgs/social-auth-fb.svg";

import clsx from "clsx";
enum SOCIAL {
  VKONTAKTE = "vkontakte",
  FACEBOOK = "facebook",
  ODNOKLASSNIKI = "odnoklassniki",
}
const { REACT_APP_BACKEND_URL = "/" } = process.env;

//
interface Props {
  onClick?(provider: string): void;
  disabled?: boolean;
  selectProvider?: string;
}

const useStyles = makeStyles((theme) => ({
  button: {
    position: "relative",

    "&.select": {
      boxShadow: "-3px -6px 6px 0px rgba(0,0,0,.25) inset",
      borderRadius: theme.spacing(1 / 2),
    },
  },
}));

export default (props: Props) => {
  const {
    selectProvider,
    disabled = false,
    onClick = (provider: string) => {},
  } = props;

  const onClickSocialAuth = useCallback((name: string) => {
    if (!!name) {
      onClick(name);
    }
    const url = `${REACT_APP_BACKEND_URL}/social/signin/${name}`;
    window.location.href = url;
  }, []);

  const classes = useStyles();
  return (
    <>
      <IconButton
        disabled={selectProvider === SOCIAL.VKONTAKTE || disabled}
        className={clsx(
          classes.button,
          selectProvider,
          selectProvider === SOCIAL.VKONTAKTE ? "select" : ""
        )}
        onClick={(e) => onClickSocialAuth(SOCIAL.VKONTAKTE)}
        size="small"
      >
        <SocialAuthVk />
      </IconButton>
      <IconButton
        disabled={selectProvider === SOCIAL.FACEBOOK || disabled}
        className={clsx(
          classes.button,
          selectProvider,
          selectProvider === SOCIAL.FACEBOOK ? "select" : ""
        )}
        onClick={(e) => onClickSocialAuth(SOCIAL.FACEBOOK)}
        size="small"
      >
        <SocialAuthFb />
      </IconButton>

      <IconButton
        disabled={selectProvider === SOCIAL.ODNOKLASSNIKI || disabled}
        className={clsx(
          classes.button,
          selectProvider,
          selectProvider === SOCIAL.ODNOKLASSNIKI ? "select" : ""
        )}
        onClick={(e) => onClickSocialAuth(SOCIAL.ODNOKLASSNIKI)}
        size="small"
      >
        <SocialAuthOk />
      </IconButton>
    </>
  );
};
