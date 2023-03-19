import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  braveWallet,
  ledgerWallet,
  metaMaskWallet,
  omniWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, createStorage } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

export const initialChain = bscTestnet;
export const whitelistChains = [bscTestnet];

const { provider, chains, webSocketProvider } = configureChains(whitelistChains, [
  jsonRpcProvider({
    rpc: () => {
      return { http: 'https://data-seed-prebsc-1-s1.binance.org:8545/' };
    },
  })
]);

// Rainbowkit connectors list
const connectors = connectorsForWallets([
  {
    groupName: 'Suggested',
    wallets: [
      metaMaskWallet({ chains }),
      walletConnectWallet({ chains: whitelistChains }),
      trustWallet({ chains }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      rainbowWallet({ chains }),
      ledgerWallet({ chains }),
      omniWallet({ chains }),
      braveWallet({ chains }),
    ],
  },
]);

// Wagmi client
const client = createClient({
  connectors,
  provider,
  autoConnect: true,
  storage: createStorage({ storage: window.localStorage }),
  webSocketProvider,
});

export { chains, client };
