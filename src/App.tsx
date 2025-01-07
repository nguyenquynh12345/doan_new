import ErrorBoundary from '@/components/shared/errorBoundary/ErrorBoundary';
import store from '@/store';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import TheContainer from './components/containers/TheContainer';

const App = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n.language]);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ToastContainer position={'top-right'} className="toastify-container" toastClassName="toastify-toast" />
        <TheContainer />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
