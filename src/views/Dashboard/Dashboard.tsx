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

export const Dashboard: FC = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [businessApplicationModalOpened, setBusinessApplicationModalOpened] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { address } = useAccount()
  const [rating, setRating] = useState<number | undefined>(undefined);
  const { getToken } = useBonBonusContract()

  const isLaptop = useMediaQuery('(max-width: 768px)')
  const copyHandler = () => {
    navigator.clipboard.writeText(`https://app.pistis.network/customer-points/${token}`);
    toast.success('Copied!');
  };

  useEffect(() => {
    const setTokenRating = async (address: string) => {
      const res = await getToken(address)
      setRating(Number(res))
    }
    if (address) {
      setTokenRating(address)
    }

  }, [address])

  return (
    <div className={s.container}>
      <div className={s.leftPull}>
        <div className={s.headLeftPull}>
          <div className={s.title}>Hello, token #1</div>
          <div className={s.description}>here is your current rating</div>
        </div>
        <UserRating setRating={setRating} rating={rating} withUpdate={false} />
        <span>
      *5-star rating based on your history
    </span>
        <span className={s.opportunityText}>
          You can share your token id to various businesses.
          It will allow you:
        </span>
        <TextSwitcher texts={['Case 1', 'Case 2', 'Case 3']} />
      </div>
      <div className={s.rightPull}>
        <div className={s.rightPull}>
          <div className={s.qrContainer}>
            <span onClick={copyHandler} className={s.copy}>
                  <img src="/src/assets/copy.svg" />
                  Copy
            </span>
            <QRCode size={isLaptop ? undefined : 400}
                    logoPadding={6}
                    logoPaddingStyle={'square'}
                    logoImage={`${backend.defaults.baseURL}/render/token/${token}`}
                    value={`${
                      'app.quvet.com'
                    }/customer-points/${token}`}
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
      <img className={s.coloredCircle} src="/src/assets/coloredCircle.png" />
      <img className={s.yellowCircle} src="/src/assets/yellowCircle.png" />
    </div>
  );
};
