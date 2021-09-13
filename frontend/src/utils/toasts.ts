import { ReactText } from 'react';
import { toast } from 'react-toastify';

export const successToast = (message: string = 'Success!'): ReactText =>
  toast.success(`${message}`);
export const warningToast = (message: string = 'Warning!'): ReactText =>
  toast.warning(`${message}`);
export const errorToast = (message: string = 'Error!'): ReactText =>
  toast.error(`${message}`);
