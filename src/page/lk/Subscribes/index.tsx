import { Box, BoxProps } from '@material-ui/core';
import Subscribe from '../subscribe';
import NoBr from '../../../components/nobr';
import React from 'react';

const Subscribes: React.FC<{ authData: any } & BoxProps> = ({ authData, ...props }) => {
  return (
    <Box>
      <Subscribe
        name="subscribe_email"
        value={!!authData?.user?.subscribe_email}
        label={
          <>
            Я согласен получать информацию об акции по <NoBr>E-mail</NoBr>
          </>
        }
      />
      <br />
      <Subscribe
        name="subscribe_sms"
        value={!!authData?.user?.subscribe_sms}
        label="Я согласен получать информацию об акции по смс"
      />
    </Box>
  );
};

export default Subscribes;
