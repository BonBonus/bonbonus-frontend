import React, { FC, useEffect, useState } from 'react'
import s from './Welcome.module.scss';
import { toast } from 'react-toastify'
import { Button } from 'primereact/button'
import { setTokenId } from '../../store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { setTokenCongratsModalOpened } from '../../store/slices/appSlice'
import { useBonBonusContract } from '../../blockchain/contracts/useBonBonusContract'
import { useAccount } from 'wagmi'
import { Calendar } from 'primereact/calendar'

export const Welcome: FC = () => {
  const [minting, setMinting] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState<any>()
  const { address } = useAccount();
  const { mint, getToken } = useBonBonusContract();

  const dispatch = useDispatch()
  const mintHandler = async () => {
    if (!address) {
      return
    }
    try {
      setMinting(true)
      await mint(address, new Date(dateOfBirth).getTime() / 1000)
      const tokenId = await getToken(address)
      console.log(tokenId)
      setMinting(false)
      dispatch(setTokenId(1))
      dispatch(setTokenCongratsModalOpened(true))
    } catch (e: any) {
      toast.error('some fucking error...')
    }
  }

  useEffect(() => {
    console.log(dateOfBirth)
  }, [dateOfBirth])
  return (
    <div>
      <div className={s.text}>
        <h1>About</h1>
        <p>
          Hello and welcome to BonBonus - the service that helps you earn bonuses and discounts from your favorite
          stores!
          x </p>
        <br />
        <p>
          We are delighted to welcome you to our community and are ready to help you save money on your purchases.
        </p>
        <p>
          To get started with our service, you will need a unique BonBon token. This is a code that you can redeem to
          gain
          access to a multitude of bonuses and privileges from our partners.
        </p>
        <br />
        <p>
          Take a step towards bigger savings and start using BonBonus today!
        </p>
      </div>
      <div className={s.controls}>
        <Calendar placeholder="Choose your date of birth" value={dateOfBirth} onChange={(e: any) => setDateOfBirth(e.target.value)} />
        <Button disabled={!dateOfBirth} icon="pi pi-check" label="Mint your BonBon token" loading={minting}
                onClick={mintHandler}
                className={s.mintButton} />
      </div>

    </div>
  );
};
