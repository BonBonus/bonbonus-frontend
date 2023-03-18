import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import s from './Dashboard.module.scss';
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useMediaQuery, useOnClickOutside } from 'usehooks-ts'
import { toast } from 'react-toastify'
import { QRCode } from 'react-qrcode-logo'
import { backend } from '../../api/configs/axios'
import { UserRating } from '../../components/UserRating/UserRating'
import { ZIndexUtils } from 'primereact/utils'
import { Dialog } from 'primereact/dialog'
import { setTokenCongratsModalOpened } from '../../store/slices/appSlice'
import { Button } from 'primereact/button'
import TextSwitcher from '../../components/TextSwitcher/TextSwitcher'

export const Dashboard: FC = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [qrOpened, setQrOpened] = useState(false);
  const [businessApplicationModalOpened, setBusinessApplicationModalOpened] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number | undefined>(4.3);
  const isLaptop = useMediaQuery('(max-width: 768px)')

  const ref = useRef<HTMLDivElement>(null);
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  useOnClickOutside(ref, () => setQrOpened(false));

  const copyHandler = () => {
    navigator.clipboard.writeText(`https://app.pistis.network/customer-points/${token}`);
    toast.success('Copied!');
  };

  useEffect(() => {
    setRating(4.5)
  }, [])

  return (
    <div className={s.container}>
      <div className={s.leftPull}>
        <div className={s.headLeftPull}>
          <div className={s.title}>Hello, token #1</div>
          <div className={s.description}>here is your current rating</div>
        </div>
        <UserRating rating={rating} setRating={setRating} />
        <TextSwitcher texts={['test1', 'test2', 'test3']}></TextSwitcher>
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
      <img className={s.coloredCircle} src="/src/assets/coloredCircle.png"/>
      <img className={s.yellowCircle} src="/src/assets/yellowCircle.png"/>
    </div>
  );
};
