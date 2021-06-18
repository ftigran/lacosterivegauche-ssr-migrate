import React from 'react';
import {
  makeStyles,
  FormControl,
  Box,
  FormHelperText,
  FormLabel,
  withStyles,
  InputBaseComponentProps,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { WrappedFieldProps } from 'redux-form';
import StarBorderIcon from '@material-ui/icons/StarBorder';

type RenderParams = {
  disabled?: boolean;
  inputProps?: InputBaseComponentProps & { nameRating?: string };
};

const useStyles = makeStyles((theme) => ({
  formLabel: {
    color: '#fff',
    fontSize: '80%',
    marginBottom: theme.spacing(1),
  },
  formControl: {},
}));

const StyledRating = withStyles({
  iconFilled: {
    color: '#e3c170',
  },
  iconHover: {
    color: '#e3c170',
  },
  iconEmpty: {
    color: '#e3c170',
  },
})(Rating);

const RenderComponent = ({
  label = '',
  input: { onChange, value, ...other },
  disabled = false,
  meta: { touched, invalid, error, dirty },
  inputProps: { nameRating } = {},
}: RenderParams & WrappedFieldProps) => {
  const classes = useStyles();
  return (
    <Box textAlign="left">
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend" className={classes.formLabel}>
          {label}
        </FormLabel>
        <StyledRating
          name={nameRating}
          size="large"
          disabled={disabled}
          value={value}
          onChange={(event, newValue) => {
            console.log('newValue: ', newValue);
            onChange(newValue);
          }}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
      </FormControl>
      <FormHelperText error={!!error}>
        {(dirty || touched) && invalid ? error : null}
      </FormHelperText>
    </Box>
  );
};

export default RenderComponent;
