import UploadWrapper from '@/components/shared/uploadComponents/UploadWrapper';
import { AppDispatch } from '@/store';
import { CForm, CFormFeedback, CFormInput, CFormLabel, CRow, CCol, CImage, CFormTextarea } from '@coreui/react-pro';
import { Formik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { createEntity, uploadImage } from './PostManagement.api';

const CreatePost = () => {
  const dispatch = useDispatch<AppDispatch>();
  interface ICreatePost {
    thumbnail: string | undefined;
    imageUrl: string | undefined;
    roomName: string;
    description: string;
    price: string;
    address: string;
    area: string
  }

  const initialValues: ICreatePost = {
    thumbnail: undefined,
    imageUrl: '',
    roomName: '',
    description: '',
    price: '',
    address: '',
    area: ''
  };

  const [imageUrl, setThumbnailImage] = useState<string | undefined>('');
  const [file, setFile] = useState<any>();

  const validationSchema = Yup.object().shape({
    // roomName: Yup.string().required('Tên là bắt buộc'),
    // description: Yup.string().required('Mô tả là bắt buộc'),
    // price: Yup.number().required('Giá là bắt buộc').positive('Giá phải là số dương'),
    // imageUrl: Yup.mixed().required('Ảnh là bắt buộc'),
  });

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
                  <CRow className="h-100 mb-2">
                    <CImage src={imageUrl} className="w-100 h-100 thumbnail" alt="Thumbnail Preview" />
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
                  className="w-100 cursor-pointer h-100 card rounded-3"
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
