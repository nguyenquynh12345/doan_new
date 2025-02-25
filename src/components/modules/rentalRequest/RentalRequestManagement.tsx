import { CButton, CSmartTable } from '@coreui/react-pro';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { Column } from '@coreui/react-pro/dist/esm/components/table/types';
import { useEffect, useState } from 'react';
import DeleteIcon from '../../../assets/icon/delete.svg?react';
import { RootState } from '@/reducers';

import { getEllipsisTxt, insertCommas } from '@/shared/utils/ultils';
import { useRouter } from '@/shared/utils/hooks/useRouter';
import { approved, unapproved } from '../postManagement/PostManagement.api';
const PostManagement = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
    const { navigate } = useRouter();
    const [data, setData] = useState(null);
    const { initialState } = useSelector((state: RootState) => state.postManagementReducer);
    const { deleteEntitySuccess, updateEntitySuccess, dataUnapproved } = initialState;
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
        dispatch(unapproved());
    }, [updateEntitySuccess, deleteEntitySuccess]);


    return (
        <>
            <h2 className="mb-4 fw-bold text-24">Danh sách bài viết</h2>
            <div>
                <CSmartTable
                    clickableRows
                    columns={columns}
                    items={dataUnapproved}
                    scopedColumns={{
                        index: (_: any, index: number) => <td className="align-middle">{index + 1}</td>,
                        title: (item: any) => <td className="align-middle">{getEllipsisTxt(item.title, 15)}</td>,
                        description: (item: any) => <td className="align-middle">{getEllipsisTxt(item.description, 5)}</td>,
                        address: (item: any) => <td className="align-middle">{getEllipsisTxt(item.address, 15)}</td>,
                        price: (item: any) => <td className="align-middle">{insertCommas(item.price)} VND</td>,
                        available: (item: any) => <td className="align-middle">{item.available == 1 ? 'Hoạt động' : 'Khóa'}</td>,
                        action: (item: any) => (
                            <td className="align-middle">
                                <div className="d-flex gap-3">
                                    <CButton onClick={
                                        () => {
                                            dispatch(approved(item.id));
                                            navigate('/post-management');
                                        }
                                    } size='sm' className="btn btn-primary">Phê duyệt</CButton>
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
        </>
    );
};

export default PostManagement;
