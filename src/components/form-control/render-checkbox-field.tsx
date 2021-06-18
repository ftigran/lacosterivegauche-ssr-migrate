import React, { useState, ReactNode } from 'react';
import {
  Checkbox,
  makeStyles,
  FormControl,
  FormControlLabel,
  Box,
  FormHelperText,
} from '@material-ui/core';
import CheckBoxChecked  from '../../img/cbCheck.svg';
import CheckBoxIco  from '../../img/cb.svg';
import { WrappedFieldProps } from 'redux-form';
import font from '../../theme/font';
import { colors } from '../../theme/theme';

interface RenderCheckboxParams {
  checkBoxLabel?: string | ReactNode;
  disabled: boolean;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    '& a': {
      color: colors.GREY2,
      textDecoration: 'underline',
    },
    fontFamily: font.primary,
  },
}));

export default (props: RenderCheckboxParams & WrappedFieldProps) => {
  const classes = useStyles();

  const {
    checkBoxLabel = '',
    input: { onChange, value, ...other },
    disabled = false,
    meta: { touched, invalid, error, dirty },
  } = props;
  const [checked, setChecked] = useState(!!value);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
    onChange(event);
  }
  return (
    <Box textAlign="left" 
    className="checkbox"
    >
      <FormControl component="fieldset" className={classes.formControl}>
        <FormControlLabel
          control={
            <Checkbox
              disabled={disabled}
              icon={<img src={CheckBoxIco} />}
              checkedIcon={<img src={CheckBoxChecked} />}
              color="primary"
              onChange={handleChange}
              checked={checked}
              size="medium"
              {...other}
            />
          }
          label={checkBoxLabel}
        />
      </FormControl>
      <FormHelperText error={!!error}>
        {(dirty || touched) && invalid ? error : null}
      </FormHelperText>
    </Box>
  );
};
