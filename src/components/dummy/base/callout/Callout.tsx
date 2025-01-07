import { CCallout, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro';
import DocsExample from '../../../containers/DocsExample';

const Callout = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Callout</strong>
            <p className="text-medium-emphasis small mt-3">
              React callout component provides presentation of content in a visually distinct manner. Includes a
              heading, icon and typically text-based content
            </p>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/callout">
              <CCallout color="primary">
                New to or unfamiliar with flexbox? Read this CSS Tricks flexbox guide for background, terminology,
                guidelines, and code snippets.
              </CCallout>
              <CCallout color="secondary">
                New to or unfamiliar with flexbox? Read this CSS Tricks flexbox guide for background, terminology,
                guidelines, and code snippets.
              </CCallout>
              <CCallout color="success">
                New to or unfamiliar with flexbox? Read this CSS Tricks flexbox guide for background, terminology,
                guidelines, and code snippets.
              </CCallout>
              <CCallout color="danger">
                New to or unfamiliar with flexbox? Read this CSS Tricks flexbox guide for background, terminology,
                guidelines, and code snippets.
              </CCallout>
              <CCallout color="warning">
                New to or unfamiliar with flexbox? Read this CSS Tricks flexbox guide for background, terminology,
                guidelines, and code snippets.
              </CCallout>
              <CCallout color="info">
                New to or unfamiliar with flexbox? Read this CSS Tricks flexbox guide for background, terminology,
                guidelines, and code snippets.
              </CCallout>
              <CCallout color="light">
                New to or unfamiliar with flexbox? Read this CSS Tricks flexbox guide for background, terminology,
                guidelines, and code snippets.
              </CCallout>
              <CCallout color="dark">
                New to or unfamiliar with flexbox? Read this CSS Tricks flexbox guide for background, terminology,
                guidelines, and code snippets.
              </CCallout>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Callout;
