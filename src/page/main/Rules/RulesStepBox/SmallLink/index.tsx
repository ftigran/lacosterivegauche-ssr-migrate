import React from 'react';
import { Box, WithStyles } from '@material-ui/core';
import theme, { colors } from '../../../../../theme/theme';
import { withStyles } from '@material-ui/core/styles';

type Props = {
  children: string;
  color?: string;
  onClick?: () => void;
} & WithStyles<typeof styles>;

const SmallLink: React.FC<Props> = ({ children, onClick, classes, color = colors.GREY1 }) => (
  <Box
    onClick={onClick}
    className={classes.root}
    py={1.5}
    px={2.5}
    m={1 / 2}
    display="inline-block"
    color={color}
    borderColor={color}
  >
    {children}
  </Box>
);

const styles = {
  root: {
    fontSize: 14,
    lineHeight: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#00488C',
    color: '#fff',
    borderColor: 'white',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0,72,140,0.8)',
    },
  },
};

export default withStyles(styles)(SmallLink);
