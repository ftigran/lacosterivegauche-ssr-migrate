import React, { useEffect, ReactNode } from 'react';
import Dialog from '../dialog';

import { Box, Button, makeStyles } from '@material-ui/core';
import font from '../../theme/font';
import theme, { colors } from '../../theme/theme';

export interface Props {
  data?: any;
  open: boolean;
  result: boolean;
  title?: string;
  name?: string;
  message?: string | ReactNode;
  messages?: any;
  onClose?(r: boolean, params?: any): void;
  onShow?(): void;
}

const useStyles = makeStyles((theme) => ({}));

const Alert = (props: Props) => {
  const classes = useStyles();
  const {
    data,
    result = false,
    open = false,
    title = 'Информация',
    name = 'alert',
    message = '',
    messages,
    onClose = () => {},
    onShow = () => {},
  } = props;

  useEffect(() => {
    onShow();
  }, []);

  return (
    <Dialog title={title} name={name} open={open} onCloseDialog={onClose}>
      <Box
        p={2}
        color={colors.GREY2}
        fontSize="100%"
        style={{ borderRadius: theme.spacing(3 / 4) }}
        fontFamily={font.primary}
      >
        <Box>{message}</Box>
        {!!messages &&
          Object.keys(messages).map((key, index) => {
            const value = messages[key];
            return (
              <Box key={`message-${index}`}>
                {Array.isArray(value) &&
                  value.map((v: any, i: number) => (
                    <span key={i}>
                      {v}
                      <br />
                    </span>
                  ))}
              </Box>
            );
          })}
      </Box>
      <Box pt={4}>
        <Button
          size="large"
          fullWidth={false}
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => onClose(result, data)}
        >
          Ок
        </Button>
      </Box>
    </Dialog>
  );
};

export default Alert;
