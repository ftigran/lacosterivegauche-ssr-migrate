import React, { useCallback } from 'react';
import ButtonCore from '@material-ui/core/Button';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  createStyles,
  Link,
  Menu,
  MenuItem,
  Theme,
  Typography,
  useMediaQuery,
  WithStyles,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ExpandMore } from '@material-ui/icons';
import { colors } from '../../../theme/theme';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import font from '../../../theme/font';

type Props = {} & WithStyles<typeof styles>;

const ButtonAdd: React.FC<Props> = ({ classes }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expand, setExpand] = React.useState<boolean>(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLink = useCallback(
    (link: string) => () => {
      setAnchorEl(null);
      console.log('@@@handleLink link: ', link);
    },
    [],
  );

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return smDown ? (
    <Accordion
      expanded={expand}
      className={classes.accordionRoot}
      onChange={(_, expanded) => {
        setExpand(expanded);
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel1a-content_menu`}
        id={`panel1a-header_menu`}
        className={[
          classes.accordionSummary,
          expand ? classes.accordionSummaryActive : undefined,
        ].join(' ')}
      >
        Дополнительно
      </AccordionSummary>
      <AccordionDetails className={classes.menuMobile}>
        <Link href="https://yandex.ru/" className={classes.menuLink}>
          Эко-инициативы Valio
        </Link>

        <Link href="https://yandex.ru/" className={classes.menuLink}>
          Valio в Пятерочке
        </Link>

        <Link href="https://yandex.ru/" className={classes.menuLink}>
          Информация о фонде
        </Link>

        <Link href="https://yandex.ru/" className={classes.menuLink}>
          Интересные факты
        </Link>
      </AccordionDetails>
    </Accordion>
  ) : (
    <Box display="flex" flexDirection="row" alignItems="center">
      <ButtonCore
        aria-controls="fade-menu"
        aria-haspopup="true"
        variant="text"
        color="default"
        fullWidth={true}
        onClick={handleClick}
        className={open ? classes.active : undefined}
      >
        Дополнительно
      </ButtonCore>
      <ExpandMore className={[classes.icon, open ? classes.active : undefined].join(' ')} />
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={classes.paper}
      >
        <MenuItem onClick={handleLink('https://ya.ru/')}>Эко-инициативы Valio</MenuItem>
        <MenuItem onClick={handleLink('https://ya.ru/')}>Valio в Пятерочке</MenuItem>
        <MenuItem onClick={handleLink('https://ya.ru/')}>Информация о фонде</MenuItem>
        <MenuItem onClick={handleLink('https://ya.ru/')}>Интересные факты</MenuItem>
      </Menu>
    </Box>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(1),
    },
    icon: {
      fontSize: 20,
      color: colors.LIGHT_CYAN,
    },
    active: {
      color: colors.WHITE,
    },
    menuMobile: {
      flexDirection: 'column',
    },
    menuLink: {
      fontFamily: font.primary,
      color: colors.GREY3,
      marginBottom: 16,
      fontSize: 16,
    },
    accordionSummary: {
      fontFamily: font.primary,
      color: colors.DARK_BLUE,
      fontSize: '130%',
      marginTop: 0,
      marginBottom: 0,
      paddingLeft: theme.spacing(1.5),
    },
    accordionSummaryActive: {
      color: colors.DARK_BLUE_o70,
    },
    accordionRoot: {
      borderBottomWidth: 0,
    },
  });

export default withStyles(styles)(ButtonAdd);
