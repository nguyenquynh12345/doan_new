import UploadWrapper from '@/components/shared/uploadComponents/UploadWrapper';
import { AppDispatch } from '@/store';
import { CForm, CFormFeedback, CFormInput, CFormLabel, CRow, CCol, CImage, CFormTextarea, CFormSelect } from '@coreui/react-pro';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { createEntity, getCategoriesRoom, uploadImage } from './PostManagement.api';
import { RootState } from '@/reducers';
import { useRouter } from '@/shared/utils/hooks/useRouter';
import { resetAll } from './PostManagement.reducer';
import { ToastSuccess } from '@/components/shared/toast/Toast';

const CreatePost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.authentication);
  const { initialState } = useSelector((state: RootState) => state.postManagementReducer);
  const { categoryRoom, updateEntitySuccess } = initialState;
  const { navigate } = useRouter();
  interface ICreatePost {
    thumbnail: string | undefined;
    imageUrl: string | undefined;
    roomName: string;
    description: string;
    price: string;
    address: string;
    capacity: string;
    userId: string;
    utilities: string;
    waterPrice: string;
    electricityPrice: string;
    categories: number;
    region: string;
  }

  const initialValues: ICreatePost = {
    thumbnail: undefined,
    imageUrl: '',
    roomName: '',
    description: '',
    price: '',
    address: '',
    capacity: '',
    userId: userInfo?.id || '0',
    utilities: '',
    waterPrice: '',
    categories: 0,
    electricityPrice: '',
    region: ''
  };

  const [imageUrl, setThumbnailImage] = useState<string | undefined>('');
  const [file, setFile] = useState<any>();
  useEffect(() => {
    dispatch(getCategoriesRoom());
  }, [])
  const validationSchema = Yup.object().shape({
    // roomName: Yup.string().required('Tên là bắt buộc'),
    // description: Yup.string().required('Mô tả là bắt buộc'),
    // price: Yup.number().required('Giá là bắt buộc').positive('Giá phải là số dương'),
    // imageUrl: Yup.mixed().required('Ảnh là bắt buộc'),
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
        dispatch(createEntity({ ...values, imageUrl: dataUrl.payload.filePath }));
      }}
    >
      {({ values, errors, touched, handleChange, handleSubmit, setValues }) => (
        <CForm onSubmit={handleSubmit} id="form-create-post">
          <CRow className="py-3xl p-xxs">
            <CCol md={4} className="mb-xl">
              {imageUrl ? (
                <div className="d-flex flex-column align-items-center">
                  <CRow className=" mb-2">
                    <CImage src={imageUrl} className="w-100 thumbnail" alt="Thumbnail Preview" />
                  </CRow>
                  <span
                    onClick={() => {
                      setThumbnailImage('');
                      setValues({ ...values, imageUrl: '' });
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
                      setValues({ ...values, imageUrl: file?.url });
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
                <CFormLabel htmlFor="roomName">Tên phòng</CFormLabel>
                <CFormInput
                  value={values.roomName}
                  onChange={handleChange}
                  type="text"
                  id="roomName"
                  name="roomName"
                  autoComplete="off"
                  placeholder="Nhập tên phòng"
                />
                <CFormFeedback
                  invalid={!!errors.roomName && touched.roomName}
                  className={!!errors.roomName && touched.roomName ? 'd-block' : 'd-none'}
                >
                  {errors.roomName}
                </CFormFeedback>
              </div>
              {/* <CFormLabel htmlFor="categories">Danh mục</CFormLabel>
              <div className="mb-xl">
                <CFormSelect name="categories" onChange={handleChange} className="w-100">
                  <option value="">Chọn danh mục phòng</option>
                  {
                    categoryRoom?.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  }
                </CFormSelect>
              </div> */}
              <div className="mb-xl">
                <CFormLabel htmlFor="region">Khu vực</CFormLabel>
                <CFormSelect name="region" onChange={handleChange} options={[{ label: 'Khu vực', value: '' }, { label: 'Bắc từ liêm', value: '1' }, { label: 'Nam từ liêm', value: '2' }, { label: 'Đống đa', value: '3' }, { label: 'Cầu giấy', value: '4' }, { label: 'Hoàng mai', value: '5' }]} />
              </div>
              <div className="mb-xl">
                <CFormLabel htmlFor="categories">Danh mục</CFormLabel>
                <CFormSelect name="categories" onChange={handleChange} options={[{ label: 'Nhà cấp 4', value: 'otp1' }, { label: 'Chung cư mini', value: 'otp2' }, { label: 'Chung cư', value: 'otp3' }, { label: 'Nhà nguyên căn', value: 'otp4' }]} />
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
                <CFormLabel htmlFor="capacity">Diện tích</CFormLabel>
                <CFormInput
                  value={values.capacity}
                  onChange={handleChange}
                  id="capacity"
                  name="capacity"
                  autoComplete="off"
                  placeholder="Diện tích"
                />
                <CFormFeedback
                  invalid={!!errors.capacity && touched.capacity}
                  className={!!errors.capacity && touched.capacity ? 'd-block' : 'd-none'}
                >
                  {errors.capacity}
                </CFormFeedback>
              </div>
              <div className="mb-xl">
                <CFormLabel htmlFor="electricityPrice">Giá điện</CFormLabel>
                <CFormInput
                  value={values.electricityPrice}
                  onChange={handleChange}
                  id="electricityPrice"
                  name="electricityPrice"
                  autoComplete="off"
                  placeholder="Giá điện"
                />
                <CFormFeedback
                  invalid={!!errors.electricityPrice && touched.electricityPrice}
                  className={!!errors.electricityPrice && touched.electricityPrice ? 'd-block' : 'd-none'}
                >
                  {errors.electricityPrice}
                </CFormFeedback>
              </div>
              <div className="mb-xl">
                <CFormLabel htmlFor="waterPrice">Giá nước</CFormLabel>
                <CFormInput
                  value={values.waterPrice}
                  onChange={handleChange}
                  id="waterPrice"
                  name="waterPrice"
                  autoComplete="off"
                  placeholder="Giá nước"
                />
                <CFormFeedback
                  invalid={!!errors.waterPrice && touched.waterPrice}
                  className={!!errors.waterPrice && touched.waterPrice ? 'd-block' : 'd-none'}
                >
                  {errors.waterPrice}
                </CFormFeedback>
              </div>
              <div className="mb-xl">
                <CFormLabel htmlFor="utilities">Tiện ích</CFormLabel>
                <CFormInput
                  value={values.utilities}
                  onChange={handleChange}
                  id="utilities"
                  name="utilities"
                  autoComplete="off"
                  placeholder="Tiện ích"
                />
                <CFormFeedback
                  invalid={!!errors.utilities && touched.utilities}
                  className={!!errors.utilities && touched.utilities ? 'd-block' : 'd-none'}
                >
                  {errors.utilities}
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
