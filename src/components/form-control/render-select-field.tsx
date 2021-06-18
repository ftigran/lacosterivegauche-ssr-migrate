import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  FormHelperText,
  InputLabel,
  FormControl,
  Box,
  Select,
  MenuItem,
  InputBaseComponentProps,
  OutlinedInputProps,
  FilledInputProps,
} from '@material-ui/core';
import { WrappedFieldProps } from 'redux-form';
import { SelectItemBasicType } from './types';

interface RenderSelectParams {
  custom?: any;
  disabled?: boolean;
  inputComponent?: any;
  variant?: 'filled' | 'outlined' | 'standard' | undefined;
  InputProps?: OutlinedInputProps | FilledInputProps;
  inputProps?: InputBaseComponentProps & {
    items?: Array<SelectItemBasicType>;
  };
  // items: [];
  // onChange?: () => void;
}

const useStyles = makeStyles((theme) => ({
  input: {},
  popoverContainer: {
    //   padding: theme.spacing(2)
  },
  inputContainer: {
    position: 'relative',
  },
  popoverButton: {
    position: 'absolute',
    top: '50%',
    right: 0,
    width: '56px',
    height: '56px',
    transform: 'translate(-5%, -50%)',
  },
  label: {
    //  display:'none'
  },
}));

const RenderSelectField = (props: RenderSelectParams & WrappedFieldProps) => {
  const {
    label,
    disabled,
    input: { onChange, name, value },
    meta: { touched, invalid, error, dirty },
    inputProps: { items = [] } = {},
    ...other
  } = props;

  const classes = useStyles();

  const form_helper_id = `${name}-error-text`;
  const form_control_id = `${name}-input`;

  return (
    <FormControl fullWidth variant="outlined" disabled={disabled}>
      <InputLabel shrink={!!value} className={classes.label} htmlFor={form_control_id}>
        {label}
      </InputLabel>
      <Box className={classes.inputContainer}>
        <Select
          error={touched && invalid}
          fullWidth={true}
          variant="outlined"
          {...other}
          inputProps={{
            id: form_control_id,
            name,
            // notched:false
          }}
          value={value}
          onChange={onChange}
        >
          {items.map(({ id, code, title }) => {
            return (
              <MenuItem key={code} value={id}>
                {title}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      <FormHelperText error={!!error} id={form_helper_id}>
        {(dirty || touched) && invalid ? error : null}
      </FormHelperText>
    </FormControl>
  );
};

export default RenderSelectField;
