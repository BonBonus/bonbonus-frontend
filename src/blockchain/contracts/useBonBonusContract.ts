import {
  BonBonus,
  BonBonus__factory as BonBonusFactory,
} from '@bonbonus/bonbonus-protocol';
import { useProvider, useSigner } from 'wagmi';

export const BON_BONUS_CONTRACT_ADDRESS = import.meta.env.VITE_BONBONUS_CONTRACT_ADDRESS;

console.log(import.meta.env.REACT_APP_BONBONUS_CONTRACT_ADDRESS)
export const useBonBonusContract = () => {
  const { data: signer } = useSigner();
  const provider = useProvider();
  const contract: BonBonus = BonBonusFactory.connect(
    BON_BONUS_CONTRACT_ADDRESS,
    signer || provider
  );

  const mint = async (address: string, dateOfBirth: number) => {
    const mintResult = await contract.safeMint(address, dateOfBirth)
    return await mintResult.wait();
  };

  const getToken = async (address: string) => {
    return await contract.tokenOfOwnerByIndex(address, 0);
  };

  const tokens = async (tokenId: number) => {
    return await contract.tokens(tokenId);
  };

  const getAddressProviders = async (address: string) => {
    return await contract.getAddressProviders(address);
  };

  const getTokenProviderFinalRating = async (tokenId: number, provider: number) => {
    return await contract.getTokenProviderFinalRating(tokenId, provider);
  };

  const getTokenProviderLoyaltyPoints = async (tokenId: number, provider: number) => {
    return await contract.getTokenProviderLoyaltyPoints(tokenId, provider);
  };

  const updateTokenLoyaltyPointsByProvider = async (tokenId: number, provider: number, points: number) => {
    const updateResult = await contract.updateTokenLoyaltyPointsByProvider(tokenId, provider, points);
    return await updateResult.wait();
  };

  return {
    mint,
    getToken,
    tokens,
    getAddressProviders,
    getTokenProviderFinalRating,
    getTokenProviderLoyaltyPoints,
    updateTokenLoyaltyPointsByProvider
  };
};
