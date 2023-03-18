import {
  PistisScore,
  PistisScore__factory as PistisScoreFactory,
} from '@pistis-score/pistis-protocol-contracts';
import { BigNumber } from 'ethers';
import { useProvider, useSigner } from 'wagmi';

export const PISTIS_SCORE_CONTRACT_ADDRESS = import.meta.env.REACT_APP_PISTIS_SCORE_CONTRACT_ADDRESS;

export const usePistisScoreContract = () => {
  const { data: signer } = useSigner();
  const provider = useProvider();
  const contract: PistisScore = PistisScoreFactory.connect(
    PISTIS_SCORE_CONTRACT_ADDRESS,
    signer || provider
  );

  const addTokenAddress = async (tokenId: any, newAddress: string, signature: string) => {
    const depositResult = await contract.addTokenAddress(tokenId, newAddress, signature);
    return await depositResult.wait();
  };

  const wallets = async (address: string): Promise<{ exists: boolean; token: BigNumber }> => {
    return await contract.wallets(address);
  };

  const checkNameExists = async (name: string): Promise<boolean> => {
    return await contract.checkNameExists(name);
  };

  const mint = async () => {
    const mintResult = await contract.safeMint();
    return await mintResult.wait();
  };

  const tokens = async (tokenNumber: BigNumber) => {
    return await contract.tokens(tokenNumber);
  };

  const getTokenAddresses = async (tokenId: number) => {
    return await contract.getTokenAddresses(tokenId);
  };

  return {
    addTokenAddress,
    mint,
    tokens,
    getTokenAddresses,
    wallets,
    checkNameExists,
  };
};
