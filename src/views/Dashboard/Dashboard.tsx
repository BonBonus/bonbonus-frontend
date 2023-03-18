import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import s from './Dashboard.module.scss';
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useOnClickOutside } from 'usehooks-ts'
import { toast } from 'react-toastify'
import { QRCode } from 'react-qrcode-logo'
import { backend } from '../../api/configs/axios'
import { UserRating } from '../../components/UserRating/UserRating'
import { ZIndexUtils } from 'primereact/utils'

export const Dashboard: FC = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [qrOpened, setQrOpened] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number | undefined>(4.3);

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
      </div>
      <div className={s.rightPull}>
        <div className={s.rightPull}>
          <div className={s.qrContainer}>
            <span onClick={copyHandler} className={s.copy}>
                  <img src="/src/assets/copy.svg" />
                  Copy
            </span>
            <QRCode size={400}
              logoPadding={6}
              logoPaddingStyle={'square'}
              logoImage={`${backend.defaults.baseURL}/render/token/${token}`}
              value={`${
                'app.quvet.com'
              }/customer-points/${token}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
