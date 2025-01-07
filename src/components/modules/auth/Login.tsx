import { RootState } from '@/reducers';
import { AppDispatch } from '@/store';
import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro';
import { useRouter } from '@shared/utils/hooks/useRouter';
import { Formik, FormikProps } from 'formik';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { ILoginForm, login } from './auth.api';
import { fetching, resetEntity } from './auth.reducer';
interface ILocationPath {
  path?: string;
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const { navigate, location } = useRouter();
  const state = location.state as ILocationPath;
  const { userInfo, errorCode, loginSuccess } = useSelector((state: RootState) => state.authentication);
  const formikRef = useRef<FormikProps<ILoginForm>>(null);
  const validationSchema = Yup.object().shape({
    userName: Yup.string().trim().required(t('app.global.validation.required')),
    password: Yup.string().trim().required(t('app.global.validation.required')),
  });

  useEffect(() => {
    if (errorCode) {
      formikRef.current?.setSubmitting(false);
      dispatch(resetEntity());
    }
  }, [errorCode]);

  useEffect(() => {
    if (loginSuccess) {
      formikRef.current?.setSubmitting(false);
      // dispatch(resetEntity())
    }
  }, [loginSuccess]);

  useEffect(() => {
    if (userInfo) {
      const redirectPath = state?.path || '/';
      navigate(redirectPath, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const initialValues: ILoginForm = { userName: '', password: '' };

  return (
    <div className="responsive-container">
      <CContainer className="d-flex flex-column align-items-center gap-4xl p-0">
        <CRow className="justify-content-center w-100">
          <CCol xs={12} sm={10} md={8} lg={6}>
            <CCard className="p-3xl">
              <CCardBody className="p-0">
                <Formik
                  innerRef={formikRef}
                  enableReinitialize
                  validationSchema={validationSchema}
                  initialValues={initialValues}
                  onSubmit={(values) => {
                    dispatch(fetching());
                    dispatch(login(values));
                  }}
                >
                  {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => {
                    return (
                      <CForm onSubmit={handleSubmit}>
                        <div className="py-3xl p-xxs">
                          <div className="mb-xl">
                            <CFormLabel>{t('app.global.form.label.username')}</CFormLabel>

                            <CFormInput
                              value={values.userName}
                              onChange={handleChange}
                              type="text"
                              id="userName"
                              name="userName"
                              autoComplete="none"
                              placeholder={t('app.global.form.placeholder.username')}
                            />
                            <CFormFeedback
                              invalid
                              className={!!errors.userName && touched.userName ? 'd-block' : 'd-none'}
                            >
                              {errors.userName}
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
                              className={!!errors.password && touched.password ? 'd-block text-center' : 'd-none'}
                            >
                              {errors.password}
                            </CFormFeedback>
                          </div>
                        </div>
                        <CRow>
                          <CCol xs={12}>
                            <CLoadingButton
                              disabledOnLoading
                              loading={isSubmitting}
                              className="w-100"
                              color="primary"
                              type="submit"
                            >
                              {t('app.global.button.login')}
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
  );
};

export default Login;
