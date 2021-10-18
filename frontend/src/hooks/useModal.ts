import React, { useCallback, useState } from 'react';

const useModal = () => {
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const toggle = useCallback(
    () => setModalStatus(!modalStatus),
    [modalStatus, setModalStatus]
  );
  const open = useCallback(() => setModalStatus(true), [setModalStatus]);
  const close = useCallback(() => setModalStatus(false), [setModalStatus]);
  return { modalStatus, toggle, open, close };
};
export default useModal;
