import { Box, Fade } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { getPersonal as getPersonalAction } from '../../../api/actions';
import { ApiAnswerStatus } from '../../../api/types';
import SubmitButton from '../../../components/submit-button';
import { UserDataLkType } from '../types';
import { useConfirm } from '../../../components/ConfirmDialog';

type Props = { userDataLk?: UserDataLkType };

const PersonButtons: React.FC<Props> = ({ userDataLk }) => {
  const [personNeedButtonLoading, setPersonNeedButtonLoading] = useState(false);
  const needPerson = userDataLk?.needPerson ?? 0;
  const confirm = useConfirm();

  const handlePersonButton = useCallback(
    (person_need: number) => {
      setPersonNeedButtonLoading(true);
      getPersonalAction(person_need).then((res) => {
        if (res.status === ApiAnswerStatus.SUCCESS) {
          const { redirect_url } = res.data || {};
          if (redirect_url) {
            window.location.href = redirect_url;
          }
        } else {
          console.log('PersonButtons error', res.message);
          confirm &&
            confirm({
              title: 'Внимание',
              body: res?.message ?? 'Ошибка',
              alert: true,
              confirmationText: 'OK',
            }).then((r) => null);
        }
        setPersonNeedButtonLoading(false);
      });
    },
    [confirm],
  );

  return (
    <Fade in={!!needPerson} unmountOnExit={true}>
      <Box my={2} textAlign="center">
        <SubmitButton
          size="small"
          // className={classes.personButton}
          variant="contained"
          color="primary"
          processed={personNeedButtonLoading}
          onClick={() => (!!needPerson ? handlePersonButton(needPerson) : () => {})}
        >
          Заполнить налоговую форму
        </SubmitButton>
      </Box>
    </Fade>
  );
};

export default PersonButtons;
