import UploadWrapper from '@/components/shared/uploadComponents/UploadWrapper';
import { AppDispatch } from '@/store';
import { CForm, CFormFeedback, CFormInput, CFormLabel, CRow, CCol, CImage, CFormTextarea, CFormSelect } from '@coreui/react-pro';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { createEntity, getCategoriesRoom, getLocationsRoom, uploadImage } from './PostManagement.api';
import { RootState } from '@/reducers';
import { useRouter } from '@/shared/utils/hooks/useRouter';
import { resetAll } from './PostManagement.reducer';
import { ToastSuccess } from '@/components/shared/toast/Toast';

const CreatePost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.authentication);
  const { initialState } = useSelector((state: RootState) => state.postManagementReducer);
  const { categoryRoom, locationRoom, updateEntitySuccess } = initialState;
  const { navigate } = useRouter();
  interface ICreatePost {
    thumbnail: string | undefined;
    images: any | undefined;
    title: string;
    description: string;
    price: number;
    address: string;
    area: number;
    userId: number;
    categories: number;
    location: number;
    available: number
  }

  const initialValues: ICreatePost = {
    thumbnail: undefined,
    images: undefined,
    title: '',
    description: '',
    price: 0,
    address: '',
    area: 0,
    location: 0,
    userId: Number(userInfo?.userId) || 4,
    categories: 0,
    available: 1
  };
  console.log(userInfo);

  const [images, setThumbnailImage] = useState<string | undefined>('');
  const [file, setFile] = useState<any>();
  useEffect(() => {
    dispatch(getCategoriesRoom());
    dispatch(getLocationsRoom());
  }, [])
  const validationSchema = Yup.object().shape({

  });
  useEffect(() => {
    if (updateEntitySuccess) {
      navigate('/post-management');
      ToastSuccess('Tạo bài viết thành công');
      dispatch(resetAll());
    }
  }, [updateEntitySuccess])
  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={async (values) => {
        const dataUrl = await dispatch(uploadImage(file));
        console.log({ ...values, images: [{ ulr: `${dataUrl.payload.filePath}` }] }, 'values');
        dispatch(createEntity({ ...values, images: [{ url: `${dataUrl.payload.filePath}` }] }));
      }}
    >
      {({ values, errors, touched, handleChange, handleSubmit, setValues }) => (
        <CForm onSubmit={handleSubmit} id="form-create-post">
          <CRow className="py-3xl p-xxs">
            <CCol md={4} className="mb-xl">
              {images ? (
                <div className="d-flex flex-column align-items-center">
                  <CRow className=" mb-2">
                    <CImage src={images} className="w-100 thumbnail" alt="Thumbnail Preview" />
                  </CRow>
                  <span
                    onClick={() => {
                      setThumbnailImage('');
                      setValues({ ...values, images: '' });
                    }}
                    className="text-brand-400 text-sm-semibold cursor-pointer"
                  >
                    Remove
                  </span>
                </div>
              ) : (
                <UploadWrapper
                  className="w-100 cursor-pointer  card rounded-3"

                  disabled={false}
                  id="thumbnail"
                  name="thumbnail"
                  multiple={false}
                  onFileChange={(file) => {
                    if (file) {
                      setValues({ ...values, images: file?.url });
                      setFile(file);
                    }
                    setThumbnailImage(file?.url);
                  }}
                >
                  <div className="py-3 px-4 border-neutral-200 d-flex flex-column align-items-center justify-content-center rounded-xl text-center h-100">
                    <p className="text-neutral-400 text-sm mb-1">
                      <span className="text-brand-400 text-sm-semibold me-1">Upload Image</span>
                      Drag and drop
                    </p>
                    <span className="text-neutral-400 text-sm">SVG, PNG, JPG or GIF (max. 800x400px)</span>
                  </div>
                </UploadWrapper>
              )}
              <CFormFeedback
                invalid={!!errors.thumbnail && touched.thumbnail}
                className={!!errors.thumbnail && touched.thumbnail ? 'd-block' : 'd-none'}
              >
                {errors.thumbnail}
              </CFormFeedback>
            </CCol>

            <CCol md={8}>
              <div className="mb-xl">
                <CFormLabel htmlFor="title">Tên phòng</CFormLabel>
                <CFormInput
                  value={values.title}
                  onChange={handleChange}
                  type="text"
                  id="title"
                  name="title"
                  autoComplete="off"
                  placeholder="Nhập tên phòng"
                />
                <CFormFeedback
                  invalid={!!errors.title && touched.title}
                  className={!!errors.title && touched.title ? 'd-block' : 'd-none'}
                >
                  {errors.title}
                </CFormFeedback>
              </div>
              <div className="mb-xl">
                <CFormLabel htmlFor="location">Khu vực</CFormLabel>
                <CFormSelect name="location" onChange={handleChange}  >
                  <option value="">Chọn khu vực</option>
                  {
                    locationRoom?.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  }
                </CFormSelect>
              </div>
              <div className="mb-xl">
                <CFormLabel htmlFor="categories">Danh mục</CFormLabel>
                <CFormSelect name="categories" onChange={handleChange} >
                  <option value="">Chọn danh mục</option>
                  {
                    categoryRoom?.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  }
                </CFormSelect>
              </div>
              <div className="mb-xl">
                <CFormLabel htmlFor="price">Giá</CFormLabel>
                <CFormInput
                  value={values.price}
                  onChange={handleChange}
                  type="text"
                  id="price"
                  name="price"
                  autoComplete="off"
                  placeholder="Nhập giá"
                />
                <CFormFeedback
                  invalid={!!errors.price && touched.price}
                  className={!!errors.price && touched.price ? 'd-block' : 'd-none'}
                >
                  {errors.price}
                </CFormFeedback>
              </div>
              <div className="mb-xl">
                <CFormLabel htmlFor="address">Địa chỉ</CFormLabel>
                <CFormInput
                  value={values.address}
                  onChange={handleChange}
                  type="text"
                  id="address"
                  name="address"
                  autoComplete="off"
                  placeholder="Nhập địa chỉ"
                />
                <CFormFeedback
                  invalid={!!errors.address && touched.address}
                  className={!!errors.address && touched.address ? 'd-block' : 'd-none'}
                >
                  {errors.address}
                </CFormFeedback>
              </div>

              <div className="mb-xl">
                <CFormLabel htmlFor="area">Diện tích</CFormLabel>
                <CFormInput
                  value={values.area}
                  onChange={handleChange}
                  id="area"
                  name="area"
                  autoComplete="off"
                  placeholder="Diện tích"
                />
                <CFormFeedback
                  invalid={!!errors.area && touched.area}
                  className={!!errors.area && touched.area ? 'd-block' : 'd-none'}
                >
                  {errors.area}
                </CFormFeedback>
              </div>
              <div className="mb-xl">
                <CFormLabel htmlFor="description">Mô tả</CFormLabel>
                <CFormTextarea
                  value={values.description}
                  onChange={handleChange}
                  id="description"
                  name="description"
                  autoComplete="off"
                  placeholder="Nhập mô tả"
                />
                <CFormFeedback
                  invalid={!!errors.description && touched.description}
                  className={!!errors.description && touched.description ? 'd-block' : 'd-none'}
                >
                  {errors.description}
                </CFormFeedback>
              </div>
            </CCol>
          </CRow>
          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </CForm>
      )}
    </Formik>
  );
};

export default CreatePost;
