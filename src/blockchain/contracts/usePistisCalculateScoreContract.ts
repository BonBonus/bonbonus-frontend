import {
  CalculateScore,
  CalculateScore__factory as CalculateScoreFactory,
} from '@pistis-score/pistis-protocol-contracts';
import { BigNumber, ethers } from 'ethers';
import { useProvider, useSigner } from 'wagmi';

export const PISTIS_SCORE_CONTRACT_ADDRESS: any =
  import.meta.env.REACT_APP_CALCULATE_SCORE_CONTRACT_ADDRESS;

export const usePistisCalculateScoreContract = () => {
  const { data: signer } = useSigner();
  const provider = useProvider();
  const contract: CalculateScore = CalculateScoreFactory.connect(
    PISTIS_SCORE_CONTRACT_ADDRESS,
    signer || provider
  );

  const calculateTokenScore = async (tokenId: number) => {
    return await contract.calculateTokenScore(tokenId);
  };

  const addCalculateScoreListener = (tokenId: number, callback: any) => {
    contract.on(
      'ScoreCalculated',
      (
        requestId: string,
        token: BigNumber,
        pistisScore: BigNumber,
        deFiScore: BigNumber,
        tradFiScore: BigNumber,
        personalScore: BigNumber
      ) => {
        const data = { pistisScore, deFiScore, tradFiScore, personalScore };
        if (parseInt(ethers.utils.formatUnits(token, 0)) === tokenId) {
          callback(data);
        }
      }
    );
  };

  return {
    calculateTokenScore,
    addCalculateScoreListener,
  };
};
