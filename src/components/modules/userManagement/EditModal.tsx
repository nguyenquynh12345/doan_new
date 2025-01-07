import { AppDispatch } from '@/store';
import XClose from '@assets/icon/X.svg?react';

import { CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CModal, CModalBody, CModalFooter, CModalHeader, CRow } from '@coreui/react-pro';
import { Formik } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { fetching } from './UserManagement.reducer';
import { updateEntity } from './UserManagement.api';
interface IModalProps {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    data: any;
}

const ModalEditUser = (props: IModalProps) => {
    const { visible, setVisible, data } = props;
    const dispatch = useDispatch<AppDispatch>();
    const initialValues = { id: data?.id, userName: '', email: '', phone: '' };
    const validationSchema = Yup.object().shape({
        userName: Yup.string().trim().required('1'),
        password: Yup.string().trim().required('1'),
    });
    const onClose = () => {
        setVisible(false);
    };

    return (
        <>
            <CModal visible={visible} alignment="center" backdrop="static">
                <CModalHeader className="justify-content-between mb-xl">
                    <div className="fs-4 fw-bold text-neutral-800">
                        Cập nhật tài khoản
                    </div>
                    <div className="box-btn-close">
                        <XClose onClick={() => onClose()} className="cursor-pointer" color="inherit" stroke="currentcolor" />
                    </div>
                </CModalHeader>
                <CModalBody>
                    <div className="d-flex flex-column gap-xl ">
                        <Formik
                            enableReinitialize
                            validationSchema={validationSchema}
                            initialValues={data || initialValues}
                            onSubmit={(values) => {
                                dispatch(fetching());
                                dispatch(updateEntity(values));
                                onClose();
                            }}
                        >
                            {({ values, errors, touched, handleChange, handleSubmit }) => {
                                return (
                                    <CForm onSubmit={handleSubmit} id='form-edit-user'>
                                        <div className="py-3xl p-xxs">
                                            <div className="mb-xl">
                                                <CFormLabel>Tên</CFormLabel>
                                                <CFormInput
                                                    value={values.userName}
                                                    onChange={handleChange}
                                                    disabled
                                                    type="text"
                                                    id="userName"
                                                    name="userName"
                                                    autoComplete="none"
                                                    placeholder='Nhập tên'
                                                />
                                                <CFormFeedback
                                                    invalid
                                                    className={!!errors.userName && touched.userName ? 'd-block' : 'd-none'}
                                                >
                                                    {errors.userName as any}
                                                </CFormFeedback>
                                            </div>
                                            <div className="mb-xl">
                                                <CFormLabel>Email</CFormLabel>
                                                <CFormInput
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    type="text"
                                                    id="email"
                                                    name="email"
                                                    autoComplete="none"
                                                    placeholder='Nhập email'
                                                />
                                                <CFormFeedback
                                                    invalid
                                                    className={!!errors.email && touched.email ? 'd-block' : 'd-none'}
                                                >
                                                    {errors.email as any}
                                                </CFormFeedback>
                                            </div>
                                            <div className="mb-xl">
                                                <CFormLabel>Số điện thoại</CFormLabel>
                                                <CFormInput
                                                    value={values.phone}
                                                    onChange={handleChange}
                                                    type="text"
                                                    id="phone"
                                                    name="phone"
                                                    autoComplete="none"
                                                    placeholder='Nhập phone'
                                                />
                                                <CFormFeedback
                                                    invalid
                                                    className={!!errors.phone && touched.phone ? 'd-block' : 'd-none'}
                                                >
                                                    {errors.phone as any}
                                                </CFormFeedback>
                                            </div>
                                        </div>

                                    </CForm>
                                );
                            }}
                        </Formik>
                    </div>
                </CModalBody>
                <CModalFooter className="mt-3xl d-block">
                    <CRow >
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
                                type="submit"
                                form='form-edit-user'
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

export default ModalEditUser;
