import { flagSet } from '@coreui/icons-pro'
import { CCard, CCardBody, CCardHeader, CRow } from '@coreui/react-pro'
import { getIconsView } from '../brands/Brands'

const CoreUIIcons = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Flag Icons</CCardHeader>
        <CCardBody>
          <CRow className="text-center">{getIconsView(flagSet)}</CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default CoreUIIcons
