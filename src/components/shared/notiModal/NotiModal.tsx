import XClose from '@assets/img/common/x-close.svg?react';
import BriefcaseIcon from '@assets/img/modal/briefcase-02.svg?react';
import CheckBrokenIcon from '@assets/img/modal/check-circle-broken.svg?react';
import CheckIcon from '@assets/img/modal/check.svg?react';
import ImageUserRightIcon from '@assets/img/modal/image-user-right.svg?react';
import MessageDotIcon from '@assets/img/modal/message-dots-circle.svg?react';
import XIcon from '@assets/img/modal/x-circle.svg?react';

import InfoIcon from '@assets/img/modal/info-circle.svg?react';
import MailIcon from '@assets/img/modal/mail-03.svg?react';
import { CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CRow } from '@coreui/react-pro';
import { ReactNode } from 'react';

type ModalType = 'primary' | 'danger' | 'warning' | 'success' | 'info';
type IconType = 'briefcase' | 'mail' | 'check' | 'checkBroken' | 'info' | 'xIcon' | 'imageUserRight' | 'messageDot';

interface INotiModalProps {
  visible: boolean;
  onClose: () => void;
  type?: ModalType;
  icon?: IconType;
  title: ReactNode;
  subTitle?: ReactNode;
  cancelText?: ReactNode;
  confirmText?: ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const mapTypeToColor: { [key in ModalType]: string } = {
  primary: 'bg-brand-950',
  danger: 'bg-danger-950',
  warning: 'bg-warning-950',
  success: 'bg-success-950',
  info: 'bg-info-950',
};

const mapTypeToIconColor: { [key in ModalType]: string } = {
  primary: 'text-brand-500',
  danger: 'text-danger-500',
  warning: 'text-warning-500',
  success: 'text-success-500',
  info: 'text-info-500',
};

const mapIconTypeToIcon: { [key in IconType]: (className: string) => ReactNode } = {
  mail: (className: string) => <MailIcon className={className} fill="currentcolor" />,
  check: (className: string) => <CheckIcon className={className} fill="currentcolor" />,
  info: (className: string) => <InfoIcon className={className} fill="currentcolor" />,
  checkBroken: (className: string) => <CheckBrokenIcon className={className} fill="currentcolor" />,
  xIcon: (className: string) => <XIcon className={className} fill="currentcolor" />,
  imageUserRight: (className: string) => <ImageUserRightIcon className={className} fill="currentcolor" />,
  briefcase: (className: string) => <BriefcaseIcon className={className} fill="currentcolor" />,
  messageDot: (className: string) => <MessageDotIcon className={className} fill="currentcolor" />,
};

const NotiModal = (props: INotiModalProps) => {
  const {
    visible,
    onClose,
    type = 'primary',
    icon = 'check',
    title,
    subTitle,
    cancelText,
    confirmText,
    onCancel,
    onConfirm,
  } = props;
  return (
    <>
      <CModal visible={visible} alignment="center" backdrop="static">
        <CModalHeader className="justify-content-between mb-xl">
          <div className={`p-lg rounded-md ${mapTypeToColor[type]}`}>
            {mapIconTypeToIcon[icon](mapTypeToIconColor[type])}
          </div>
          <XClose onClick={() => onClose()} className="cursor-pointer" color="inherit" stroke="currentcolor" />
        </CModalHeader>
        <CModalBody>
          {typeof title === 'string' ? <p className="m-0 text-xl-semibold text-gray-25">{title}</p> : title}
          {typeof subTitle === 'string' ? <p className="m-0 text-sm text-gray-300">{subTitle}</p> : subTitle || ''}
        </CModalBody>
        <CModalFooter className="mt-xl d-block">
          <CRow sm={{ gutterX: 4 }}>
            {onCancel ? (
              <CCol xs={12} sm={onConfirm ? 6 : 12}>
                <CButton onClick={() => onCancel()} className="w-100" color="secondary" variant="outline">
                  {cancelText || 'Hủy'}
                </CButton>
              </CCol>
            ) : (
              ''
            )}

            {onConfirm ? (
              <CCol xs={12} sm={onCancel ? 6 : 12}>
                <CButton onClick={() => onConfirm()} className="w-100" color="primary">
                  {confirmText || 'Xác nhận'}
                </CButton>
              </CCol>
            ) : (
              ''
            )}
          </CRow>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default NotiModal;
