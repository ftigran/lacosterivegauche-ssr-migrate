import { Box, Grid, GridProps } from '@material-ui/core';
import React, { ReactNode } from 'react';
import theme from '../../../theme/theme';
import font from '../../../theme/font';

const BlockItem = (params: GridProps & { title?: string | ReactNode }) => {
  const { title, children, ...props } = params;
  return (
    <Grid item {...props}>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100%"
        style={{
          borderRadius: theme.spacing(3 / 4),
          overflow: 'hidden',
        }}
      >
        {!!title && (
          <Box
            flex="0 0 auto"
            py={3}
            px={3}
            textAlign="center"
            fontSize="150%"
            fontFamily={font.primary}
            color="#fff"
            style={{
              background: 'linear-gradient(270deg, #E8B75E 0%, #D69E65 100%)',
            }}
          >
            {title}
          </Box>
        )}
        <Box
          p={2}
          flex="1 1 auto"
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          alignItems="stretch"
        >
          {children}
        </Box>
      </Box>
    </Grid>
  );
};

export default BlockItem;
