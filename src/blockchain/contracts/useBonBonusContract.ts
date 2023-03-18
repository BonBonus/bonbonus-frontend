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
    console.log(address);
    console.log(dateOfBirth);
    const mintResult = await contract.safeMint(address, dateOfBirth)
    return await mintResult.wait();
  };

  const getToken = async (address: string) => {
    return await contract.tokenOfOwnerByIndex(address, 0);
  };

  return {
    mint,
    getToken
  };
};
