import {
  CalculateTokenRating,
  CalculateTokenRating__factory as CalculateTokenRatingFactory,
} from '@bonbonus/bonbonus-protocol';
import { useProvider, useSigner } from 'wagmi';

export const CALCULATE_TOKEN_RATING_CONTRACT_ADDRESS = import.meta.env.VITE_CALCULATE_TOKEN_RATING_CONTRACT_ADDRESS;

export const useCalculateTokenRatingContract = () => {
  const { data: signer } = useSigner();
  const provider = useProvider();
  const contract: CalculateTokenRating = CalculateTokenRatingFactory.connect(
    CALCULATE_TOKEN_RATING_CONTRACT_ADDRESS,
    signer || provider
  );

  const updateTokenRating = async (token: number, provider: number, rating: number) => {
    const updateResult = await contract.updateTokenRating(token, provider, rating)
    return await updateResult.wait();
  };

  return {
    updateTokenRating,
  };
};
