import React from 'react';
import { Box, createStyles, PropTypes, Typography, WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = createStyles({
  root: {},
});

type Props = {
  children: string | React.ReactNode;
  align?: PropTypes.Alignment;
  color?: string;
  lineHeight?: number;
  fontSize?: number;
} & WithStyles<typeof styles>;

const BodyText: React.FC<Props> = ({ children, classes, align, color, lineHeight, fontSize }) => (
  <Typography variant="body1" align={align} classes={classes} component="div">
    <Box color={color} lineHeight={lineHeight} fontSize={fontSize} component="div">
      {children}
    </Box>
  </Typography>
);

export default withStyles(styles)(BodyText);
