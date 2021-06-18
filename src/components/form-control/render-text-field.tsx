import React, { useState, MouseEvent } from 'react';
import { WrappedFieldProps } from 'redux-form';

import {
  TextField,
  IconButton,
  Box,
  Popover,
  PropTypes,
  OutlinedInputProps,
  FilledInputProps,
  InputBaseComponentProps,
  withStyles,
} from '@material-ui/core';
import { Help } from '@material-ui/icons';
import font from '../../theme/font';

const IconButtonCustom = withStyles({
  root: {
    color: '#fff',
  },
})(IconButton);

export enum INPUT_RULE {
  CYR_ONLY = '^[абвгдеёжзийклмнопрстуфхцчшщьыъэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ]*$',
}
interface RenderTextParams {
  custom?: any;
  disabled?: boolean;
  inputComponent?: any;
  popover?: string;
  variant?: 'filled' | 'outlined' | 'standard' | undefined;
  popoverButtonColor?: PropTypes.Color;
  anchorEl?: any;
  anchorOrigin?: any;
  transformOrigin?: any;
  InputProps?: OutlinedInputProps | FilledInputProps;
  inputProps?: InputBaseComponentProps & { inputRule?: INPUT_RULE };
}

const RenderTextField = (props: RenderTextParams & WrappedFieldProps) => {
  const {
    disabled,
    label,
    input,
    meta: { invalid, touched, error },
    inputComponent,
    popover,
    popoverButtonColor,
    anchorEl,
    anchorOrigin = {},
    transformOrigin = {},
    variant = 'outlined',
    InputProps = { notched: false },
    inputProps: { inputRule, rows = 1, ...inputProps } = {},
    ...custom
  } = props;

  const [popoverEl, setPopoverEl] = useState<Element & EventTarget>();

  const popover_id = !!popoverEl ? `${input.name}-popover` : undefined;

  const handlePopoverClick = (event: MouseEvent) => {
    if (anchorEl) {
      setPopoverEl(anchorEl);
    } else {
      setPopoverEl(event.currentTarget);
    }
  };
  const popoverClose = () => {
    setPopoverEl(undefined);
  };
  return (
    <TextField
      fullWidth={true}
      label={label}
      // placeholder={label}
      error={touched && invalid}
      helperText={touched && invalid ? error : null}
      variant="outlined"
      inputProps={inputProps}
      multiline={rows > 1}
      rows={rows && rows > 0 ? rows : undefined}
      InputProps={{
        inputComponent,
        endAdornment: (
          <>
            {popover ? (
              <>
                <IconButtonCustom
                  color={popoverButtonColor}
                  // onMouseEnter={handlePopoverClick}
                  onClick={(e) => handlePopoverClick(e)}
                  aria-describedby={popover_id}
                  disabled={disabled}
                  tabIndex={-1}
                  size={'small'}
                >
                  <Help />
                </IconButtonCustom>
                <Popover
                  id={popover_id}
                  open={!!popoverEl}
                  anchorEl={popoverEl}
                  onClose={popoverClose}
                  anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                    ...anchorOrigin,
                  }}
                  transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                    ...transformOrigin,
                  }}
                >
                  <Box p={2} style={{ maxWidth: 200, color: '#7f3168', fontFamily: font.primary }}>
                    <Box>{popover}</Box>
                  </Box>
                </Popover>
              </>
            ) : null}
          </>
        ),
        ...InputProps,
      }}
      onKeyPress={(e) => {
        if (!!inputRule && !new RegExp(inputRule.toString()).test(String.fromCharCode(e.which)))
          e.preventDefault();
      }}
      {...input}
      disabled={disabled}
      {...custom}

    />
  );
};

export default RenderTextField;
