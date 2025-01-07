import { cisCircle } from '@coreui/icons-pro';
import CIcon from '@coreui/icons-react';
import { Flip, ToastOptions, Zoom, toast } from 'react-toastify';

const centerToast: ToastOptions = {
  position: 'top-center',
  autoClose: 4000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
  progress: undefined,
  closeButton: false,
  transition: Flip,
};

const bottomRightToast: ToastOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
  progress: undefined,
};

const bottomCenterToast: ToastOptions = {
  position: 'bottom-center',
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: 'dark',
  transition: Zoom,
};

interface INotify {
  title: string;
  body: string;
}

// const Success = (prop: IProp) => (
//   <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: '16px' }}>
//     <CIcon className="text-brand-500" icon={cisCheckCircle} size="lg" />
//     <div style={{ color: '#66c61c', marginLeft: '5px' }}>{prop.message}</div>
//   </div>
// );

// const ErrorToast = (prop: IProp) => (
//   <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: '16px' }}>
//     <CIcon className="text-danger-500" icon={cisExclamationCircle} size="lg" />
//     <div style={{ color: '#f04438', marginLeft: '5px' }}>{prop.message}</div>
//   </div>
// );

// const Info = (prop: IProp) => (
//   <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: '16px' }}>
//     <CIcon className="text-info-500" icon={cisInfo} size="lg" />
//     <div style={{ color: '#6172f3', marginLeft: '5px' }}>{prop.message}</div>
//   </div>
// );

// const Warning = (prop: IProp) => (
//   <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: '16px' }}>
//     <CIcon className="text-warning-500" icon={cisWarning} size="lg" />
//     <div style={{ color: '#eaaa08', marginLeft: '5px' }}>{prop.message}</div>
//   </div>
// );

const Notify = (prop: INotify) => (
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
    <CIcon className="text-brand-500 mr-1 mt-1" icon={cisCircle} size="sm" />
    <div style={{ marginLeft: '5px' }}>
      <b>{prop.title}</b>
      <br />
      {prop.body}
    </div>
  </div>
);

export const ToastSuccess = (message: string, toastId?: string) => {
  if (message) {
    toast.success(message, { ...centerToast, toastId });
  }
};

export const ToastError = (message: string, toastId?: string) => {
  if (message) {
    toast.error(message, { ...centerToast, toastId });
  }
};

export const ToastInfo = (message: string, toastId?: string) => {
  if (message) {
    toast.info(message, { ...centerToast, toastId });
  }
};

export const ToastWarning = (message: string, toastId?: string) => {
  if (message) {
    toast.warn(message, { ...centerToast, toastId });
  }
};

export const ToastCopy = (message: string, toastId?: string) => {
  if (message) {
    toast.success(message, { ...bottomCenterToast, toastId });
  }
};

export const ToastNotification = (title: string, body: string) => {
  if (title && body) {
    toast(<Notify title={title} body={body} />, bottomRightToast);
  }
};
