import { useRouter } from '@/shared/utils/hooks/useRouter';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { useEffect } from 'react';
import { getEntitie } from './PostManagement.api';
import { RootState } from '@/reducers';

const DetailPost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { params } = useRouter();
  const { id } = params;
  useEffect(() => {
    if (id) {
      dispatch(getEntitie(id));
    }
  }, []);
  const { initialState } = useSelector((state: RootState) => state.postManagementReducer);
  const { detailPost } = initialState;
  if (!detailPost) return null;
  return (
    <div>
      <div className="d-flex flex-column gap-3">
        {/* <img width={400} src={"http://localhost:3333" + detailPost?.images[0]} alt="" /> */}
        <span className="fw-medium fs-5">
          {detailPost?.title} - {detailPost?.price} VND
        </span>
        <p>{detailPost?.description}</p>
        <p></p>
      </div>
    </div>
  );
};

export default DetailPost;
