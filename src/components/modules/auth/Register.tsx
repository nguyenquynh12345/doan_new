import { CCard, CCardBody, CCol, CContainer, CForm, CFormFeedback, CFormInput, CFormLabel, CLoadingButton, CRow } from "@coreui/react-pro";
import { Formik } from "formik";
import { ILoginForm, registerBill } from "./auth.api";
import { fetching, resetAll } from "./auth.reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { useTranslation } from "react-i18next";
import * as Yup from 'yup';
import { RootState } from "@/reducers";
import { useEffect } from "react";
import { useRouter } from "@/shared/utils/hooks/useRouter";
import { ToastSuccess } from "@/components/shared/toast/Toast";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { navigate } = useRouter();
  const { registerSuccess } = useSelector((state: RootState) => state.authentication);
  useEffect(() => {
    if (registerSuccess) {
      navigate('/auth/login');
      ToastSuccess("Đăng ký thành công")
      dispatch(resetAll())
    }
  }, [registerSuccess])
  const initialValues: ILoginForm = { name: '', password: '', email: '', phone: '', role: 'owner' };
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
  });

  return (
    <div className="responsive-container">
      <CContainer className="d-flex flex-column align-items-center gap-4xl p-0">
        <CRow className="justify-content-center w-100">
          <CCol xs={12} sm={10} md={8} lg={6}>
            <CCard className="p-3xl">
              <CCardBody className="p-0">
                <div className="d-flex flex-column gap-xl">
                  <p className="text-xl-semibold m-0"> Well come</p>
                </div>

                <Formik
                  enableReinitialize
                  validationSchema={validationSchema}
                  initialValues={initialValues}
                  onSubmit={(values) => {
                    dispatch(fetching());
                    dispatch(registerBill(values));
                  }}
                >
                  {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => {
                    return (
                      <CForm onSubmit={handleSubmit}>
                        <div className="py-3xl p-xxs">
                          <div className="mb-xl">
                            <CFormLabel>{t('app.global.form.label.username')}</CFormLabel>

                            <CFormInput
                              value={values.name}
                              onChange={handleChange}
                              type="text"
                              id="name"
                              name="name"
                              autoComplete="none"
                            />
                            <CFormFeedback
                              invalid
                              className={!!errors.name && touched.name ? 'd-block' : 'd-none'}
                            >
                              {errors.name}
                            </CFormFeedback>
                          </div>
                          <div className="mb-xl">
                            <CFormLabel>Eamil</CFormLabel>

                            <CFormInput
                              value={values.email}
                              onChange={handleChange}
                              type="text"
                              id="email"
                              name="email"
                              autoComplete="none"
                            />
                            <CFormFeedback
                              invalid
                              className={!!errors.email && touched.email ? 'd-block' : 'd-none'}
                            >
                              {errors.email}
                            </CFormFeedback>
                          </div>
                          <div>
                            <CFormLabel>{t('app.global.form.label.password')}</CFormLabel>
                            <CFormInput
                              value={values.password}
                              onChange={handleChange}
                              type="password"
                              id="password"
                              name="password"
                              autoComplete="none"
                              placeholder={t('app.global.form.placeholder.password')}
                            />
                            <CFormFeedback
                              invalid
                              className={!!errors.password && touched.password ? 'd-block' : 'd-none'}
                            >
                              {errors.password}
                            </CFormFeedback>
                          </div>

                        </div>
                        <CRow>

                          <CCol xs={6}>
                            <CLoadingButton
                              disabledOnLoading
                              onClick={() => navigate('/auth/login')}
                              className="w-100"
                              color="secondary"

                            >
                              Đăng Nhập
                            </CLoadingButton>
                          </CCol>            <CCol xs={6}>
                            <CLoadingButton
                              disabledOnLoading
                              loading={isSubmitting}
                              className="w-100"
                              color="primary"
                              type="submit"
                            >
                              Đăng ký
                            </CLoadingButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    );
                  }}
                </Formik>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default Register;