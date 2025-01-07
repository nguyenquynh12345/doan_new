import { CCard, CCardBody, CCardHeader, CCol, CMultiSelect, CRow } from '@coreui/react-pro';
// import { Option } from '@coreui/react-pro/dist/components/multi-select/types';
import { Option } from '@coreui/react-pro/dist/esm/components/multi-select/types';
import DocsExample from '../../../containers/DocsExample';

const options: Option[] = [
  {
    value: 0,
    label: 'Angular',
  },
  {
    value: 1,
    label: 'Bootstrap',
  },
  {
    value: 2,
    label: 'React.js',
  },
  {
    value: 3,
    label: 'Vue.js',
  },
  {
    label: 'backend',
    value: 'backend',
    options: [
      {
        value: 4,
        label: 'Django',
      },
      {
        value: 5,
        label: 'Laravel',
      },
      {
        value: 6,
        label: 'Node.js',
      },
    ],
  },
];

const MultiSelect = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Multi Select</strong> <small>Default</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/multi-select">
              <CMultiSelect options={options} />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default MultiSelect;
