import React, { FC, useState } from 'react'
import s from './Welcome.module.scss';
import { toast } from 'react-toastify'
import { Button } from 'primereact/button'
import { setTokenId } from '../../store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { setTokenCongratsModalOpened } from '../../store/slices/appSlice'

export const Welcome: FC = () => {
  const [minting, setMinting] = useState(false)

  const dispatch = useDispatch()
  const mintHandler = async () => {
    try {
      setMinting(true)

      setTimeout(() => {
        setMinting(false)
        dispatch(setTokenId(1))
        dispatch(setTokenCongratsModalOpened(true))
      }, 2000)
    } catch (e: any) {
      toast.error('some fucking error...')
    }
  }
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
      <Button icon="pi pi-check" label="Mint your BonBon token" loading={minting} onClick={mintHandler}
              className={s.mintButton} />
    </div>
  );
};
