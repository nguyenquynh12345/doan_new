import { CSmartTable } from '@coreui/react-pro';
import { Column } from '@coreui/react-pro/dist/esm/components/table/types';
import EditIcon from '../../../assets/icon/edit.svg?react';
import DeleteIcon from '../../../assets/icon/delete.svg?react';
import { insertCommas } from '@/shared/utils/ultils';

const FeedbackManagement = () => {

    const columns: Column[] = [
        { key: 'index', label: '#', _style: { textWrap: 'nowrap' } },
        {
            key: 'roomName',
            label: 'Tên khách hàng',
            _style: { textWrap: 'nowrap' },
        },
        {
            key: 'description',
            label: 'Tiêu đề',
            _style: { textWrap: 'nowrap' },
        },
        {
            key: 'price',
            label: 'Nội dung feedback',
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



    return (
        <>
            <h2 className="mb-4 fw-bold text-24">Danh sách Feedback của khách hàng</h2>
            <div>
                <CSmartTable

                    noItemsLabel={
                        <div
                            className="d-flex align-items-center justify-content-center flex-column gap-xl"
                            style={{ height: '381px' }}
                        >
                            <p className="text-16 text-neutral-400">Không có dữ liệu</p>
                        </div>
                    }
                    clickableRows
                    columns={columns}
                    items={[]}
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

                                    />
                                    <DeleteIcon

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

export default FeedbackManagement

