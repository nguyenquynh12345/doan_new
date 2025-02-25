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
import { getEllipsisTxt, insertCommas } from '@/shared/utils/ultils';
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
      key: 'title',
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
      key: 'address',
      label: 'Địa chỉ',
      _style: { textWrap: 'nowrap' },
    },
    {
      key: 'area',
      label: 'diện tích',
      _style: { textWrap: 'nowrap' },
    },
    {
      key: 'available',
      label: 'Trạng thái',
      _style: { textWrap: 'nowrap' },
    },
    {
      key: 'action',
      label: 'Thao tác',
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
            title: (item: any) => <td className="align-middle">{getEllipsisTxt(item.title, 25)}</td>,
            description: (item: any) => <td className="align-middle">{getEllipsisTxt(item.description, 25)}</td>,
            price: (item: any) => <td className="align-middle">{insertCommas(item.price)} VND</td>,
            available: (item: any) => <td className="align-middle">{item.available == 1 ? 'Hoạt động' : 'Khóa'}</td>,
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
