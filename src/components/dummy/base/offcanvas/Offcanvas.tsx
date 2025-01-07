import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCloseButton,
  CCol,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
  CRow,
} from '@coreui/react-pro';
import { useState } from 'react';
import DocsExample from '../../../containers/DocsExample';

const Offcanvas = () => {
  const [topVisible, setTopVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Offcanvas</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/offcanvas">
              <CButton color='danger' onClick={() => setTopVisible(true)}>Toggle top offcanvas</CButton>
              <COffcanvas placement="top" visible={topVisible} onHide={() => setTopVisible(false)}>
                <COffcanvasHeader>
                  <COffcanvasTitle>Offcanvas</COffcanvasTitle>
                  <CCloseButton className="text-reset" onClick={() => setTopVisible(false)} />
                </COffcanvasHeader>
                <COffcanvasBody>
                  Content for the offcanvas goes here. You can place just about any Bootstrap component or custom
                  elements here.
                </COffcanvasBody>
              </COffcanvas>
              <CButton color='success' onClick={() => setBottomVisible(true)}>Toggle bottom offcanvas</CButton>
              <COffcanvas placement="bottom" visible={bottomVisible} onHide={() => setBottomVisible(false)}>
                <COffcanvasHeader>
                  <COffcanvasTitle>Offcanvas</COffcanvasTitle>
                  <CCloseButton className="text-reset" onClick={() => setBottomVisible(false)} />
                </COffcanvasHeader>
                <COffcanvasBody>
                  Content for the offcanvas goes here. You can place just about any Bootstrap component or custom
                  elements here.
                </COffcanvasBody>
              </COffcanvas>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Offcanvas;
