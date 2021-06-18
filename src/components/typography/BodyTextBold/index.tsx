import React from 'react';
import { PropTypes, Typography, WithStyles, Box, createStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = createStyles({
  upper: {
    textTransform: 'uppercase',
  },
});

type Props = {
  children: string | React.ReactNode;
  align?: PropTypes.Alignment;
  color?: string;
  upper?: boolean;
  fontSize?: number | string;
} & WithStyles<typeof styles>;

const BodyTextBold: React.FC<Props> = ({ children, classes, align, color, fontSize, upper }) => (
  <Typography variant="subtitle1" align={align}>
    <Box
      color={color}
      className={upper ? classes.upper : undefined}
      component="span"
      fontSize={fontSize}
    >
      {children}
    </Box>
  </Typography>
);

export default withStyles(styles)(BodyTextBold);
