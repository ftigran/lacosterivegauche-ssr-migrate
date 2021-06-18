import React from 'react';
import { Box, Typography, WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { colors } from '../../../theme/theme';

const styles = {
  root: {
    color: colors.DARK_BLUE,
  },
};

type Props = { children: string; color?: string } & WithStyles<typeof styles>;

const PageTitle: React.FC<Props> = ({ children, classes, color = colors.DARK_BLUE }) => (
  <Typography variant="h1" align="center" classes={classes}>
    <Box color={color} component="span">
      {children}
    </Box>
  </Typography>
);

export default withStyles(styles)(PageTitle);
