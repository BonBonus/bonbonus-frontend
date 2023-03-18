import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';

import { router } from './services/router';
import { client, initialChain, whitelistChains } from './services/wagmi';
import { store } from './store/store'

import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
      <Provider store={store()}>
        <WagmiConfig client={client}>
          <RainbowKitProvider
            theme={darkTheme()}
            chains={whitelistChains}
            initialChain={initialChain}
            appInfo={{ appName: 'BonBonus App' }}
          >
            <RouterProvider router={router} />
            <ToastContainer theme="light" />
          </RainbowKitProvider>
        </WagmiConfig>
      </Provider>
  );
};
