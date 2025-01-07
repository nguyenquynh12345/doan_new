import { CSmartTable } from '@coreui/react-pro';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { Column } from '@coreui/react-pro/dist/esm/components/table/types';
import { useEffect } from 'react';
import { getEntities } from './UserManagement.api';
// import { RootState } from '@/reducers';
import { userManagementSelector } from './UserManagement.reducer';

const UserManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const columns: Column[] = [
    { key: 'index', label: '#', _style: { textWrap: 'nowrap' } },
    {
      key: 'userName',
      label: 'Tên',
      _style: { textWrap: 'nowrap' },
    },
    {
      key: 'email',
      label: 'Email',
      _style: { textWrap: 'nowrap' },
    },
  ];

  useEffect(() => {
    dispatch(getEntities());
  }, []);
  //   const { userInfo } = useSelector((state: RootState) => state.authentication);

  const listCashbackPolicy = useSelector(userManagementSelector.selectAll);
  console.log(listCashbackPolicy);

  return (
    <>
      <div>
        <CSmartTable
          noItemsLabel={
            <div
              className="d-flex align-items-center justify-content-center flex-column gap-xl"
              style={{ height: '381px' }}
            >
              <p className="text-16 text-neutral-400">{12345}</p>
            </div>
          }
          clickableRows
          columns={columns}
          items={listCashbackPolicy}
          scopedColumns={{
            index: (_: any, index: number) => <td className="align-middle">{index + 1}</td>,
            userName: (item: any) => <td className="align-middle">{item.userName}</td>,
            email: (item: any) => <td className="align-middle">{item.email}</td>,
            action: (item: any) => <td className="align-middle">{item.userName}</td>,
          }}
          tableHeadProps={{
            className: 'table-head',
          }}
          tableBodyProps={{
            className: 'table-body',
          }}
          tableProps={{
            hover: true,
            responsive: true,
            className: 'custom-table',
          }}
        />
      </div>
    </>
  );
};

export default UserManagement;
