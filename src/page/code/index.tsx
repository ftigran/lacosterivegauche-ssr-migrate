import React, { useEffect } from 'react';
import {
  Box,
  createStyles,
  withStyles,
  Theme,
  WithStyles,
  Container,
  CircularProgress,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks';
import { setCodeAction, setCodeTypeAction } from '../../store/code/action';
import { ProjectProps } from '../../store/props/types';

export enum TypeCode {
  AR,
  CODE,
  C,
}

type Props = { type: TypeCode } & WithStyles<typeof styles>;

const Code: React.FC<Props> = ({ classes, type }) => {
  const dispatch = useDispatch();
  const { code } = useParams();
  const { isAuth, init } = useSelector(
    (state: { propsReducer: ProjectProps }) => state.propsReducer,
  );

  const codeStore = useSelector((state) => state.codeReducer.code);

  useEffect(() => {
    dispatch(setCodeTypeAction(type));
    dispatch(setCodeAction(code));
  }, [code, type, dispatch]);

  useEffect(() => {
    if (init && codeStore) {
      if (isAuth) {
        document.location.href = '/lk';
      } else {
        document.location.href = '/?w=SigninDialog';
      }
    }
  }, [init, isAuth, codeStore]);

  return (
    <Box
      className={classes.container}
      mt={12}
      py={4}
      display="flex"
      flex="1 0 auto"
      flexDirection="column"
    >
      <Container>
        <Box justifyContent="center" alignItems="center" display="flex" pt={{ xs: 0, sm: 6 }}>
          <CircularProgress size={62} />
        </Box>
      </Container>
    </Box>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    container: {},
  });

export default withStyles(styles)(Code);
