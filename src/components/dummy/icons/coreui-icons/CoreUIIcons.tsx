import { linearSet } from '@coreui/icons-pro'
import { CCard, CCardBody, CCardHeader, CRow } from '@coreui/react-pro'
import { getIconsView } from '../brands/Brands'

const CoreUIIcons = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Free and Pro Icons</CCardHeader>
        <CCardBody>
          <CRow className="text-center">{getIconsView(linearSet)}</CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default CoreUIIcons
