import { _window } from '@/shared/config/constants';
import { Language } from '@/shared/enumeration/language';
import {
  CButton,
  CDatePicker,
  CDateRangePicker,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react-pro';
import { ethers } from 'ethers';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastCopy, ToastError, ToastInfo, ToastNotification, ToastSuccess, ToastWarning } from '../shared/toast/Toast';

const DummyLanding = () => {
  const { t, i18n } = useTranslation();
  const [providerState, setProviderState] = useState<undefined | ethers.BrowserProvider>(undefined);

  const changeLang = (lang: Language) => {
    i18n.changeLanguage(lang);
  };

  const getProviderLogin = async (provider: undefined | ethers.BrowserProvider) => {
    if (!provider) return;
    try {
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      console.log(signer, 'signer');
      console.log(address, 'address');
    } catch (e) {
      console.log(e, 'provider login');
    }
  };

  // refactor this funtion
  const getProvider = () => {
    try {
      if (!_window.ethereum) throw Error('app.global.error.ethereumIsNotInitializedErrMsg');
      const provider = new ethers.BrowserProvider(_window.ethereum);
      setProviderState(provider);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    getProvider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  _window.ethereum?.on('accountsChanged', () => {
    console.log('accountsChanged');
    // if (providerState) {
    //   getProviderLogin(providerState);
    // }
  });

  return (
    <div className="pt-2xl">
      <CDropdown>
        <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => changeLang(Language.en)}>English</CDropdownItem>
          <CDropdownItem onClick={() => changeLang(Language.vi)}>Vietnammese</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <div className="text-display-2xl">{t('app.global.title')}</div>
      <div className="text-display-2xl">{t('country.VN')}</div>

      <CButton color="primary" onClick={() => getProviderLogin(providerState)}>
        Get Provider
      </CButton>
      <Formik
        initialValues={{ test: '' }}
        // validateOnChange={false}
        onSubmit={async (value) => {
          console.log(value);
        }}
      >
        {({ handleSubmit }) => (
          <CForm onSubmit={handleSubmit} className="custom-form">
            <CInputGroup className="py-md">
              <CInputGroupText>From</CInputGroupText>
              <CDatePicker indicator={false} />
            </CInputGroup>
            <CInputGroup className="py-md">
              <CDatePicker indicator={false} disabled />
              <CInputGroupText>From</CInputGroupText>
            </CInputGroup>
            <CDateRangePicker />
          </CForm>
        )}
      </Formik>
      <CButton onClick={() => ToastSuccess('Success', 'unique')}>Success</CButton>
      <CButton onClick={() => ToastError('Error')}>Error</CButton>
      <CButton onClick={() => ToastInfo('Info')}>Info</CButton>
      <CButton onClick={() => ToastWarning('Warning')}>Warning</CButton>
      <CButton onClick={() => ToastNotification('Warning', 'Hello')}>Notifi</CButton>
      <CButton onClick={() => ToastCopy('Copy')}>Copy</CButton>
    </div>
  );
};

export default DummyLanding;
