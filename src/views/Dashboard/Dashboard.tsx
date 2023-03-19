import React, { FC, useEffect, useState } from 'react';
import s from './Dashboard.module.scss';
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useMediaQuery } from 'usehooks-ts'
import { toast } from 'react-toastify'
import { QRCode } from 'react-qrcode-logo'
import { backend } from '../../api/configs/axios'
import { UserRating } from '../../components/UserRating/UserRating'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import TextSwitcher from '../../components/TextSwitcher/TextSwitcher'
import { useAccount } from 'wagmi'
import { useBonBonusContract } from '../../blockchain/contracts/useBonBonusContract'
import { mockFeatures } from '../../components/TextSwitcher/TextSwitcher.constants'
import coloredCircleImage from '@assets/coloredCircle.png';
import yellowCircleImage from '@assets/yellowCircle.png';

export const Dashboard: FC = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [businessApplicationModalOpened, setBusinessApplicationModalOpened] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { address } = useAccount()
  const { tokens } = useBonBonusContract()

  const [userGlobalRating, setUserGlobalRating] = useState<number | undefined>(undefined)

  const isLaptop = useMediaQuery('(max-width: 768px)')
  const copyHandler = () => {
    navigator.clipboard.writeText(`https://app.pistis.network/customer-points/${token}`);
    toast.success('Copied!');
  };

  useEffect(() => {
    const getUserRating = async () => {
      if (token !== null) {
        const res = await tokens(Number(token));
        setUserGlobalRating(Number(res.globalRating))
      }
    }
    if (address) {
      getUserRating()
    }
  }, [address])

  return (
    <div className={s.container}>
      <div className={s.leftPull}>
        <div className={s.headLeftPull}>
          <div className={s.title}>Hello, token #{token}</div>
          <div className={s.description}>here is your current rating</div>
        </div>
        <UserRating setRating={setUserGlobalRating} rating={(userGlobalRating! / 100) ?? undefined}
                    withUpdate={false} />
        <span>
          *5-star rating based on your history
        </span>
        <div className={s.tokenImageContainer}>
          <img className={s.tokenImage} src={`${import.meta.env.VITE_API_DOMAIN}/render/token/${token}`} />
          <TextSwitcher texts={mockFeatures} />
          <span className={s.checkOnOpenseaLink}>Check on Opensea</span>
        </div>
      </div>
      <div className={s.rightPull}>
        <div className={s.rightPull}>
          <div className={s.qrContainer}>
            <span onClick={copyHandler} className={s.copy}>
              <img src={`${import.meta.env.VITE_API_DOMAIN}/assets/copy.svg`}/>
              Copy
            </span>
            <QRCode size={isLaptop ? undefined : 400}
                    logoPadding={6}
                    logoPaddingStyle={'square'}
                    logoImage={`${backend.defaults.baseURL}/render/token/${token}`}
                    value={`${'bonbonus-frontend.pages.dev'
                    }/customer/${token}`}
            />
            <span className={s.startBusinessLink}
                  onClick={() => setBusinessApplicationModalOpened(true)}>Want to start your own business with BonBonus? </span>
            <Dialog style={{ width: '50vw' }} onHide={() => setBusinessApplicationModalOpened(false)}
                    visible={businessApplicationModalOpened}>
              <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore
                magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
              <div className={s.modalFooter}>
                <Button className={s.modalButton} disabled={buttonDisabled} label="Send a request"
                        onClick={() => setButtonDisabled(true)} />
                {buttonDisabled && <span className={s.checkingText}>Please wait for checking your request...</span>}
              </div>
            </Dialog>
          </div>
        </div>
      </div>
      <img className={s.coloredCircle} src={coloredCircleImage} />
      <img className={s.yellowCircle} src={yellowCircleImage} />
    </div>
  );
};
