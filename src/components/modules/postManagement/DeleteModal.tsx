import { AppDispatch } from '@/store';
import XClose from '@assets/icon/X.svg?react';

import { CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CRow } from '@coreui/react-pro';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { removeEntity } from './PostManagement.api';
import { resetAll } from './PostManagement.reducer';

interface IModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  id: any;
}

const DeleteModal = (props: IModalProps) => {
  const { visible, setVisible, id } = props;
  const dispatch = useDispatch<AppDispatch>();

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <CModal visible={visible} alignment="center" backdrop="static">
        <CModalHeader className="justify-content-between mb-xl">
          <div className="fs-4 fw-bold text-neutral-800">Xác nhận xoá tài khoản</div>
          <div className="box-btn-close">
            <XClose onClick={() => onClose()} className="cursor-pointer" color="inherit" stroke="currentcolor" />
          </div>
        </CModalHeader>
        <CModalBody>
          <div className="d-flex flex-column gap-xl "></div>
        </CModalBody>
        <CModalFooter className="mt-3xl d-block">
          <CRow>
            <CCol md={6}>
              <CButton
                onClick={() => onClose()}
                className="w-100 border-0"
                color="secondary"
                style={{ backgroundColor: '#242426' }}
              >
                Đóng
              </CButton>
            </CCol>
            <CCol md={6}>
              <CButton
                onClick={() => {
                  dispatch(removeEntity(id));
                  dispatch(resetAll());
                  onClose();
                }}
                type="submit"
                form="form-edit-user"
                className="w-100 border-0"
                color="primary"
              >
                Xác nhận
              </CButton>
            </CCol>
          </CRow>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeleteModal;
