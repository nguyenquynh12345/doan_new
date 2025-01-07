import { getEllipsisTxt } from '@/shared/utils/ultils';
import { AppDispatch } from '@/store';
import ArrowLeft from '@assets/img/common/arrow-narrow-left.svg?react';
import { ToastError, ToastSuccess } from '@/components/shared/toast/Toast';
import { RootState } from '@/reducers';
import LogoText from '@assets/img/logo_text.svg?react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro';
import { useRouter } from '@shared/utils/hooks/useRouter';
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { onSignMessage } from '../shared/wallet/wallet.ultil';
import { getManagerInfo, IActiveAccount, updateActiveUser } from './auth.api';
import { resetEntity } from './auth.reducer';

const ActiveAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { navigate, params } = useRouter();
  const { id } = params;

  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  const { managerInfo, getManagerInfoSuccess, activeAccountSuccess } = useSelector(
    (state: RootState) => state.authentication
  );

  useEffect(() => {
    if (activeAccountSuccess) {
      // redirect to login
      ToastSuccess(t('app.global.toast.activeAccount'));
      dispatch(resetEntity());
      navigate('/auth/login', { replace: true });
    }
  }, [activeAccountSuccess]);

  useEffect(() => {
    if (id) {
      dispatch(getManagerInfo(id));
    }
  }, [id]);

  useEffect(() => {
    if (!managerInfo && getManagerInfoSuccess) {
      // redirect to login
      navigate('/auth/login', { replace: true });
    }
  }, [managerInfo, getManagerInfoSuccess]);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required(t('app.global.validation.required')),
    newPassword: Yup.string()
      .required(t('app.global.validation.required'))
      .test('passwords-match', t('app.global.validation.passwordDuplicate'), (value, context) => {
        return context.parent.oldPassword !== value;
      }),
    confirmPassword: Yup.string()
      .required(t('app.global.validation.required'))
      .test('passwords-match', t('app.global.validation.confirmPassword'), function (value) {
        return this.parent.newPassword === value;
      }),
  });

  const initialValues: IActiveAccount = {
    id: managerInfo ? String(managerInfo.id) : '',
    publicAddress: managerInfo ? managerInfo.publicAddress : '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    signature: '',
    confirmTerms: false,
  };

  return (
    <div className="responsive-container">
      <CContainer className="d-flex flex-column align-items-center gap-4xl p-0">
        <CRow className="justify-content-start w-100">
          <CCol xs={12}>
            <CButton color="secondary" size="sm" variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="me-sm" fill="currentcolor" />
              {t('app.global.button.return')}
            </CButton>
          </CCol>
        </CRow>
        <CRow className="justify-content-center w-100">
          <CCol xs={12} sm={10} md={8} lg={5}>
            <CCard className="p-3xl">
              <CCardBody className="p-0">
                <div className="d-flex flex-column gap-2xl">
                  <LogoText />
                  <p className="text-xl-semibold text-gray-25 m-0">
                    {' '}
                    {t('app.global.activeTitle')} <span className="text-brand-400">{managerInfo?.username || ''}</span>
                  </p>
                </div>

                <Formik
                  validationSchema={validationSchema}
                  enableReinitialize
                  initialValues={initialValues}
                  onSubmit={async (values) => {
                    if (address) {
                      if (!walletProvider) return ToastError(t('app.global.error.ethereumIsNotInitializedErrMsg'));
                      const signature = await onSignMessage(address, walletProvider);
                      if (signature) {
                        dispatch(updateActiveUser({ ...values, signature }));
                      }
                    } else {
                      open({ view: 'Connect' });
                    }
                  }}
                >
                  {({ values, errors, touched, handleSubmit, setFieldValue, isSubmitting, handleChange }) => {
                    return (
                      <CForm onSubmit={handleSubmit}>
                        <div className="py-3xl d-flex flex-column gap-2xl">
                          <div>
                            <CFormLabel>{t('app.global.form.label.blockchainAddress')} </CFormLabel>
                            <CFormInput
                              size="sm"
                              value={getEllipsisTxt(values.publicAddress || '', 10)}
                              readOnly
                              disabled
                            />
                          </div>
                          <div>
                            <CFormLabel>{t('app.global.form.label.oldPassword')}</CFormLabel>
                            <CFormInput
                              value={values.oldPassword}
                              onChange={handleChange}
                              type="password"
                              id="oldPassword"
                              size="sm"
                              name="oldPassword"
                              autoComplete="none"
                              placeholder={t('app.global.form.placeholder.oldPassword')}
                            />
                            <CFormFeedback
                              invalid
                              className={!!errors.oldPassword && touched.oldPassword ? 'd-block text-center' : 'd-none'}
                            >
                              {errors.oldPassword}
                            </CFormFeedback>
                          </div>
                          <div>
                            <CFormLabel>{t('app.global.form.label.newPassword')}</CFormLabel>
                            <CFormInput
                              value={values.newPassword}
                              onChange={handleChange}
                              type="password"
                              id="newPassword"
                              size="sm"
                              name="newPassword"
                              autoComplete="none"
                              placeholder={t('app.global.form.placeholder.newPassword')}
                            />
                            <CFormFeedback
                              invalid
                              className={!!errors.newPassword && touched.newPassword ? 'd-block text-center' : 'd-none'}
                            >
                              {errors.newPassword}
                            </CFormFeedback>
                          </div>
                          <div>
                            <CFormLabel>{t('app.global.form.label.confirmPassword')}</CFormLabel>
                            <CFormInput
                              value={values.confirmPassword}
                              onChange={handleChange}
                              type="password"
                              size="sm"
                              id="confirmPassword"
                              name="confirmPassword"
                              autoComplete="none"
                              placeholder={t('app.global.form.placeholder.confirmPassword')}
                            />
                            <CFormFeedback
                              invalid
                              className={
                                !!errors.confirmPassword && touched.confirmPassword ? 'd-block text-center' : 'd-none'
                              }
                            >
                              {errors.confirmPassword}
                            </CFormFeedback>
                          </div>
                          <div>
                            <CFormLabel>{t('app.global.form.label.termTitle')}</CFormLabel>
                            <CFormCheck
                              id="flexCheckChecked"
                              label={t('app.global.form.label.termConfirm')}
                              checked={values.confirmTerms}
                              onChange={(e) => setFieldValue('confirmTerms', e.target.checked)}
                            />
                          </div>
                        </div>
                        <CRow className="align-items-center">
                          <CCol xs={12}>
                            <CLoadingButton
                              disabledOnLoading
                              loading={isSubmitting}
                              className="w-100"
                              disabled={!values.confirmTerms}
                              color="primary"
                              type="submit"
                            >
                              {t('app.global.button.confirm')}
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

export default ActiveAccount;
