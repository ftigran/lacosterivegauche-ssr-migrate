import React from 'react';
import { Box, createStyles, Theme, WithStyles } from '@material-ui/core';
import { BodyText, BodyTextBold } from '../../../components/typography';
import { colors } from '../../../theme/theme';
import { withStyles } from '@material-ui/core/styles';

type Props = { code: number; tree: number; amount: number } & WithStyles<typeof styles>;

const StatSummary: React.FC<Props> = ({ classes, code, tree, amount }) => (
  <Box className={classes.root}>
    <Box className={classes.title}>
      <BodyTextBold color={colors.DARK_BLUE} fontSize={18}>
        Статистика
      </BodyTextBold>
    </Box>
    <Box className={classes.body}>
      <Item label="Мои коды:" value={code} />
      <Item label="Деревьев посажено:" value={tree} />
      <Item label="Эко-счет:" value={`${amount} ₽`} />
    </Box>
  </Box>
);

const Item: React.FC<{ label: string; value: string | number; className?: string }> = ({
  label,
  value,
  className,
}) => (
  <Box
    className={className}
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    alignItems="center"
    my={1}
  >
    <TextLabel>{label}</TextLabel>
    <TextValue>{value}</TextValue>
  </Box>
);

const TextLabel: React.FC<{ children: string }> = ({ children }) => (
  <BodyText color={colors.GREY2} fontSize={16}>
    {children}
  </BodyText>
);

const TextValue: React.FC<{ children: string | number }> = ({ children }) => (
  <BodyTextBold color={colors.DARK_BLUE} fontSize={18}>
    {children}
  </BodyTextBold>
);

const RADIUS = 16;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      borderRadius: RADIUS,
      backgroundColor: colors.WHITE,
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.16)',
    },
    title: {
      backgroundColor: colors.GREY5,
      textAlign: 'center',
      padding: theme.spacing(1),
      borderTopRightRadius: RADIUS,
      borderTopLeftRadius: RADIUS,
    },
    body: {
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(2.5),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  });

export default withStyles(styles)(StatSummary);
