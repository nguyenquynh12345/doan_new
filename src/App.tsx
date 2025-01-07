import ErrorBoundary from '@/components/shared/errorBoundary/ErrorBoundary';
import store from '@/store';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
// Import dayjs locale
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import TheContainer from './components/containers/TheContainer';
import { WALLET_CONNECT_PROJECT_ID } from './shared/config/constants';

// 1. Your WalletConnect Cloud project ID
const projectId = WALLET_CONNECT_PROJECT_ID;

// 2. Set chains
const mainnet = {
  chainId: 56,
  name: 'BNB Chain',
  currency: 'BNB',
  explorerUrl: 'https://bscscan.com',
  rpcUrl: 'https://bsc-dataseed.binance.org/',
};

// 3. Create a metadata object
const metadata = {
  name: 'GE2E',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
    'c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a',
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',
  ],
  // includeWalletIds: [
  //   'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
  //   '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
  //   'c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a',
  //   'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',
  // ],
  ethersConfig,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-z-index': 1111,
  },
  chains: [mainnet],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  // allWallets: 'HIDE',
});

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
