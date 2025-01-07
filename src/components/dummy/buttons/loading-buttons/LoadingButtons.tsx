import { CCard, CCardBody, CCardHeader, CCol, CLoadingButton, CRow } from '@coreui/react-pro';
import { useState } from 'react';
import DocsExample from '../../../containers/DocsExample';

const Ranger = () => {
  const [state, setState] = useState(false);
  const [stateO, setStateO] = useState(false);
  const [stateG, setStateG] = useState(false);
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Loading Buttons</strong> <small>Using states</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/loading-button#example">
              <CLoadingButton loading={state} onClick={() => setState(!state)} color="secondary">
                Submit
              </CLoadingButton>
              <CLoadingButton loading={stateO} onClick={() => setStateO(!stateO)} color="danger">
                Submit
              </CLoadingButton>
              <CLoadingButton loading={stateG} onClick={() => setStateG(!stateG)} color="success">
                Submit
              </CLoadingButton>
              <CLoadingButton timeout={2000}>Submit</CLoadingButton>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Loading Buttons</strong> <small>Using timeout</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/loading-button">
              <CLoadingButton timeout={2000} color="warning">
                Submit
              </CLoadingButton>
              <CLoadingButton timeout={2000}>Submit</CLoadingButton>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Loading Buttons</strong> <small>Border (default)</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/loading-button#border-default">
              <CLoadingButton color="info" timeout={2000}>
                Submit
              </CLoadingButton>
              <CLoadingButton color="light" timeout={2000}>
                Submit
              </CLoadingButton>
              <CLoadingButton color="warning" timeout={2000}>
                Submit
              </CLoadingButton>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Loading Buttons</strong> <small>Grow</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/loading-button#grow">
              <CLoadingButton color="info" spinnerType="grow" timeout={2000}>
                Submit
              </CLoadingButton>
              <CLoadingButton color="success" spinnerType="grow" timeout={2000}>
                Submit
              </CLoadingButton>
              <CLoadingButton color="warning" spinnerType="grow" timeout={2000}>
                Submit
              </CLoadingButton>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Ranger;
