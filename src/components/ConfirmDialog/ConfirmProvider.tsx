import React, { useState, useCallback, Fragment } from 'react';
import ConfirmContext from './ConfirmContext';
import ConfirmationDialog from './ConfirmationDialog';
import { ConfirmDialogOptions, ConfirmType } from './types';

type Props = {
  children: React.ReactNode;
  options?: ConfirmDialogOptions;
};

const _defaultOptions = {
  title: 'Подтвердите действие',
  confirmationText: 'Подтвердить',
  cancellationText: 'Отмена',
};

const ConfirmProvider: React.FC<Props> = ({ children, options: propsOptions }) => {
  const [options, setOptions] = useState<ConfirmDialogOptions>({
    ..._defaultOptions,
    ...propsOptions,
  });
  const [resolveReject, setResolveReject] = useState<Array<(value: number | any) => void>>([]);
  const [resolve, reject] = resolveReject;

  const confirm = useCallback<ConfirmType>(
    (options) => {
      return new Promise<number>((resolve, reject) => {
        setOptions({ ..._defaultOptions, ...propsOptions, ...options });
        setResolveReject([resolve, reject]);
      });
    },
    [propsOptions],
  );

  const handleClose = useCallback(() => {
    setResolveReject([]);
  }, []);

  const handleCancel = useCallback(() => {
    reject(0);
    handleClose();
  }, [reject, handleClose]);

  const handleConfirm = useCallback(() => {
    resolve(1);
    handleClose();
  }, [resolve, handleClose]);

  return (
    <Fragment>
      <ConfirmContext.Provider value={confirm}>{children}</ConfirmContext.Provider>
      <ConfirmationDialog
        open={resolveReject.length === 2}
        options={options}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </Fragment>
  );
};

export default ConfirmProvider;
