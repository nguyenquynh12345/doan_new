import { cilPhone } from '@coreui/icons-pro';
import CIcon from '@coreui/icons-react';
import {
  CButton,
  CCard,
  CCardBody, CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CLink,
  CRow
} from '@coreui/react-pro';

const ForgotPassword = () => {
  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Forgot Password</h1>
                  <p className="text-medium-emphasis">Enter your phone to receive a reset key</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput placeholder="Phone number" autoComplete="off" />
                  </CInputGroup>
                  <CRow>
                    <CCol md={6} xs={12}>
                      <CButton color="primary" className="px-4">
                        Send reset key
                      </CButton>
                    </CCol>
                    <CCol md={6} xs={12} className="text-right my-2">
                      Just remembered?{' '}
                      <CLink className="px-0" href="#/login">
                        Sign in
                      </CLink>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ForgotPassword;
