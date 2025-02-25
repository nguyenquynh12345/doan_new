import { CSmartTable } from '@coreui/react-pro';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { Column } from '@coreui/react-pro/dist/esm/components/table/types';
import { useEffect, useState } from 'react';
import EditIcon from '../../../assets/icon/edit.svg?react';
import DeleteIcon from '../../../assets/icon/delete.svg?react';
import { RootState } from '@/reducers';
import { ToastSuccess } from '@/components/shared/toast/Toast';
import { resetAll, userManagementSelector } from './categoriesManagement.reducer';
import { getEntities } from './cateogries.api';
import ModalEditUser from './EditModal';
import DeleteModal from './DeleteModal';
import ModalCreateCategories from './CreateModal';

const CategoriesManagement = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [visible, setVisible] = useState(false);
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
    const [visibleCreateModal, setVisibleCreateModal] = useState(false);
    const [data, setData] = useState(null);
    const { initialState } = useSelector((state: RootState) => state.userManagementReducer);
    const { deleteEntitySuccess, updateEntitySuccess } = initialState;
    const columns: Column[] = [
        { key: 'index', label: '#', _style: { textWrap: 'nowrap' } },
        {
            key: 'name',
            label: 'Tên',
            _style: { textWrap: 'nowrap' },
        },
        {
            key: 'action',
            label: 'action',
            _style: { textWrap: 'nowrap' },
        },
    ];
    useEffect(() => {
        if (updateEntitySuccess) {
            ToastSuccess('Cập nhật thành công');
            dispatch(resetAll());
        }
    }, [updateEntitySuccess]);
    useEffect(() => {
        dispatch(getEntities());
    }, [updateEntitySuccess, deleteEntitySuccess]);

    const listCashbackPolicy = useSelector(userManagementSelector.selectAll);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-4 fw-bold text-24">Danh sách danh mục</h2>
                <button className='btn btn-primary' onClick={() => setVisibleCreateModal(true)}>Thêm danh mục</button>
            </div>
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
                        action: (item: any) => (
                            <td className="align-middle">
                                <div className="d-flex gap-3">
                                    <EditIcon
                                        onClick={() => {
                                            setVisible(true);
                                            setData(item);
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
            <ModalEditUser data={data} visible={visible} setVisible={setVisible}></ModalEditUser>
            <DeleteModal id={data} visible={visibleDeleteModal} setVisible={setVisibleDeleteModal}></DeleteModal>
            <ModalCreateCategories data={data} visible={visibleCreateModal} setVisible={setVisibleCreateModal}></ModalCreateCategories>
        </>
    );
};

export default CategoriesManagement;
