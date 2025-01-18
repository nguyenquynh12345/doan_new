import { CSmartTable } from '@coreui/react-pro';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { Column } from '@coreui/react-pro/dist/esm/components/table/types';
import { useEffect, useState } from 'react';
import EditIcon from '../../../assets/icon/edit.svg?react';
import DeleteIcon from '../../../assets/icon/delete.svg?react';
import { RootState } from '@/reducers';
import { getEntities } from './PostManagement.api';
import { postManagementSelector } from './PostManagement.reducer';
import { insertCommas } from '@/shared/utils/ultils';
import DeleteModal from './DeleteModal';
import { useRouter } from '@/shared/utils/hooks/useRouter';

const PostManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const { navigate } = useRouter();
  const [data, setData] = useState(null);
  const { initialState } = useSelector((state: RootState) => state.postManagementReducer);
  const { deleteEntitySuccess, updateEntitySuccess } = initialState;
  const columns: Column[] = [
    { key: 'index', label: '#', _style: { textWrap: 'nowrap' } },
    {
      key: 'roomName',
      label: 'Tên Phòng',
      _style: { textWrap: 'nowrap' },
    },
    {
      key: 'description',
      label: 'Mô tả',
      _style: { textWrap: 'nowrap' },
    },
    {
      key: 'price',
      label: 'Giá',
      _style: { textWrap: 'nowrap' },
    },
    {
      key: 'status',
      label: 'Trạng thái',
      _style: { textWrap: 'nowrap' },
    },
    {
      key: 'action',
      label: '',
      _style: { textWrap: 'nowrap' },
    },
  ];

  useEffect(() => {
    dispatch(getEntities());
  }, [updateEntitySuccess, deleteEntitySuccess]);

  const listCashbackPolicy = useSelector(postManagementSelector.selectAll);

  return (
    <>
      <h2 className="mb-4 fw-bold text-24">Danh sách bài viết</h2>
      <div>
        <CSmartTable
          onRowClick={(item: any) => {
            navigate(`/post-management/detail/${item.id}`);
          }}
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
            roomName: (item: any) => <td className="align-middle">{item.roomName}</td>,
            description: (item: any) => <td className="align-middle">{item.description}</td>,
            price: (item: any) => <td className="align-middle">{insertCommas(item.price)} VND</td>,
            status: (item: any) => <td className="align-middle">{item.status}</td>,
            action: (item: any) => (
              <td className="align-middle">
                <div className="d-flex gap-3">
                  <EditIcon
                    onClick={() => {
                      navigate(`/post-management/edit/${item.id}`);
                    }}
                  />
                  <DeleteIcon
                    onClick={() => {
                      setVisibleDeleteModal(true);
                      setData(item.id);
                    }}
                  />
                </div>
              </td>
            ),
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
      <DeleteModal id={data} visible={visibleDeleteModal} setVisible={setVisibleDeleteModal}></DeleteModal>
    </>
  );
};

export default PostManagement;
