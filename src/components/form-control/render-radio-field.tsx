import React from 'react';
import {
  makeStyles,
  FormControl,
  FormControlLabel,
  Box,
  FormHelperText,
  RadioGroup,
  Radio,
  FormLabel,
} from '@material-ui/core';
import { WrappedFieldProps } from 'redux-form';

type RadioData = {
  label: string;
  value: string | number;
};

type RenderRadioParams = {
  disabled?: boolean;
  data: RadioData[];
};

const useStyles = makeStyles((theme) => ({ formControl: {} }));

const RenderComponent = ({
  label = '',
  input: { onChange, value, ...other },
  disabled = false,
  meta: { touched, invalid, error, dirty },
  data,
}: RenderRadioParams & WrappedFieldProps) => {
  const classes = useStyles();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event);
  }
  return (
    <Box textAlign="left">
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup aria-label="gender" name="gender" value={value} onChange={handleChange}>
          {data.map((d) => (
            <FormControlLabel
              value={d.value}
              control={<Radio color="primary" />}
              label={d.label}
              disabled={disabled}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <FormHelperText error={!!error}>
        {(dirty || touched) && invalid ? error : null}
      </FormHelperText>
    </Box>
  );
};

export default RenderComponent;
