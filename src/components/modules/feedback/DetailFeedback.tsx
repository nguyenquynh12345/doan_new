import { RootState } from "@/reducers";
import { useRouter } from "@/shared/utils/hooks/useRouter";
import { AppDispatch } from "@/store";
import { CFormSwitch } from "@coreui/react-pro";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DetailFeedback = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { params } = useRouter();
    const { id } = params;
    useEffect(() => {
        if (id) {
            // dispatch(getEntitie(id));
        }
    }, []);
    const { initialState } = useSelector((state: RootState) => state.postManagementReducer);
    const { detailPost } = initialState;
    // if (!detailPost) return null;
    return (<>
        <div>
            <div className="d-flex flex-column gap-3">
                <img width={400} src={"http://103.20.102.115:3333" + detailPost?.imageUrl} alt="" />
                <span className="fw-medium fs-5">
                    {detailPost?.roomName} - {detailPost?.price} VND
                </span>
                <p>{detailPost?.description}</p>
            </div>
            <label className="mb-2">Đã xử lý</label>
            <CFormSwitch className="mb-2"></CFormSwitch>
            <a className="btn btn-primary" href="tel:0123456789">Liên hệ khách hàng</a>
        </div>
    </>)
}
export default DetailFeedback