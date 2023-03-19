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
import { Chain, configureChains, createClient, createStorage } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

export const initialChain = bscTestnet;
export const whitelistChains = [bscTestnet];

const BSCChain: Chain = {
  id: 97,
  name: 'BSC Testnet',
  network: 'bscTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'tBNB',
  },
  rpcUrls: {
    default: {
      http: ['https://muddy-damp-river.bsc-testnet.discover.quiknode.pro/c3b7c38b1462442ff398c0c9fc1450b8a157e76c/'],
    },
    public: {
      http: ['https://muddy-damp-river.bsc-testnet.discover.quiknode.pro/c3b7c38b1462442ff398c0c9fc1450b8a157e76c/'],
    }
  },
  blockExplorers: {
    default: { name: 'BSC Scan', url: 'https://testnet.bscscan.com' },
  },
  testnet: true,
};

const { provider, chains, webSocketProvider} = configureChains(
  [BSCChain],
  [
    jsonRpcProvider({
      rpc: chain => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

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
