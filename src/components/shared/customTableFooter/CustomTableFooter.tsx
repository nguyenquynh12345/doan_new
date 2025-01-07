import { useDeviceDetect } from '@/shared/utils/hooks/useDeviceDetect';
import {
  cisChevronDoubleLeftAlt,
  cisChevronDoubleRightAlt,
  cisChevronLeftAlt,
  cisChevronRightAlt,
} from '@coreui/icons-pro';
import CIcon from '@coreui/icons-react';
import { CCol, CFormLabel, CFormSelect, CSmartPagination } from '@coreui/react-pro';
import { useTranslation } from 'react-i18next';
import { IParams } from '../../../shared/shared-interfaces';

export interface ICustomTableFooter<T extends IParams> {
  totalPages: number;
  totalItems?: number;
  filterState: T;
  handlePaginationChange: (page: number) => void;
  setFilterState: (filterState: T) => void;
  sizeArray?: Number[];
  hideSideChosen?: boolean;
}

const CustomTableFooter = <T extends IParams>(props: ICustomTableFooter<T>) => {
  const {t} = useTranslation();
  const { filterState, setFilterState, totalPages, handlePaginationChange, sizeArray, totalItems, hideSideChosen } =
    props;
  const isMobile = useDeviceDetect();
  const selectOption = sizeArray || [10, 20, 30, 50];
  const startEndIndexCal = () => {
    const endIndex = (filterState.page + 1) * filterState.size;
    const startIndex = filterState.page * filterState.size + 1;

    return {
      startIndex,
      endIndex: endIndex > (totalItems || 0) ? totalItems : endIndex,
    };
  };
  const startEndIndex = startEndIndexCal();
  return (
    <>
      <CCol
        className={`d-flex ${
          hideSideChosen ? 'justify-content-center' : 'justify-content-between'
        } flex-wrap custom-table-footer align-items-center`}
      >
        <div className={`${hideSideChosen ? 'd-none' : 'd-flex'} justify-content-start align-items-center `}>
          <div className="custom-form">
            <CFormSelect
              //   className=" cursor-pointer"
              size="sm"
              value={filterState.size}
              onChange={(e) => setFilterState({ ...filterState, size: Number(e.currentTarget.value) })}
            >
              {selectOption.map((item, index) => (
                <option value={item.toString()} key={index}>
                  <>{item}</>
                </option>
              ))}
            </CFormSelect>
          </div>
          {totalItems ? (
            <CFormLabel className="pagi-label m-0 ms-3">
              {startEndIndex.startIndex} - {startEndIndex.endIndex} {t('app.global.form.label.filter')}  {totalItems}
            </CFormLabel>
          ) : (
            ''
          )}
        </div>

        <CSmartPagination
          align="end"
          className="table-pagination cursor-pointer m-0"
          doubleArrows={true}
          limit={isMobile ? 3 : undefined}
          activePage={filterState.page + 1}
          pages={totalPages || 1}
          onActivePageChange={(page) => {
            handlePaginationChange(page - 1 >= 0 ? page - 1 : 0);
          }}
          nextButton={
            <div className="cursor-pointer">
              <CIcon icon={cisChevronRightAlt} />
            </div>
          }
          previousButton={
            <div className="cursor-pointer">
              <CIcon icon={cisChevronLeftAlt} />
            </div>
          }
          lastButton={
            <div className="cursor-pointer">
              <CIcon icon={cisChevronDoubleRightAlt} />
            </div>
          }
          firstButton={
            <div className="cursor-pointer">
              <CIcon icon={cisChevronDoubleLeftAlt} />
            </div>
          }
        />
      </CCol>
    </>
  );
};

export default CustomTableFooter;
