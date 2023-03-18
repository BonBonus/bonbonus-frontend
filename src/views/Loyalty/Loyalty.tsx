import React, { useCallback, useEffect, useRef, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { useOnClickOutside } from 'usehooks-ts';
import { useAccount } from 'wagmi';

import { backend } from '../../api/configs/axios'
import { userApi } from '../../api/userApi'
import { useBonBonusContract } from '../../blockchain/contracts/useBonBonusContract'
import { RootState } from '../../store/store'

import s from './Loyalty.module.scss';
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'

export interface ILoyaltyProgram {
  name: string;
  points: number;
}

export interface IUserPointsResponse {
  token: number;
  points: number;
  lastUpdated: string;
  nodeName: string;
}

export const Loyalty: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const [qrOpened, setQrOpened] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  const [programs, setPrograms] = useState<any>();
  const ref = useRef<HTMLDivElement>(null);
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const isProd = process.env.REACT_APP_ENVIRONMENT === 'production';

  useEffect(() => {
    const getLoyaltyPrograms = async () => {
      try {
        const res = await userApi.getLoyaltyPrograms();
        setPrograms(res.data.programs);
      } catch (e) {
      } finally {
        setFetching(false);
      }
    };
    getLoyaltyPrograms();
  }, [address]);

  useOnClickOutside(ref, () => setQrOpened(false));

  const copyHandler = () => {
    navigator.clipboard.writeText(`https://app.pistis.network/customer-points/${token}`);
    toast.success('Copied!');
  };

  const mintToken = useCallback(async () => {
    if (isConnected) {
      setLoading(true);
      const mintingToast = toast.loading(
        'Minting your Pistis Token... Confirm the action with a signature in your wallet'
      );
      try {
        // await mint();
        // toast.update(mintingToast, {
        //   render: 'Your token was successfully minted!',
        //   type: 'success',
        //   isLoading: false,
        //   autoClose: 3000,
        // });
        // await wallets(String(address)).then((res: any) => {
        //   if (res.exists) {
        //     dispatch(setTokenId(Number(res.token)));
        //   }
        // });
      } catch (e: any) {
        toast.update(mintingToast, {
          render: 'Something went wrong. Please try later',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    } else {
      openConnectModal && openConnectModal();
    }
  }, [isConnected]);

  return (
    <div>
      {address && token ? (
        <>
          <div className={s.control}>
            <div className={s.title}>Loyalty Programs</div>
            <div className={s.rightPull}>
              <div onClick={() => setQrOpened(!qrOpened)} className={s.rightPullItem}>
                <img src="/src/images/qr.svg" />
                <span className={s.text}>See code</span>
              </div>
              <div onClick={copyHandler} className={s.rightPullItem}>
                <img src="/src/images/copy.svg" />
                <span className={s.text}>Copy link</span>
              </div>
            </div>
          </div>
          <h1>
            {!fetching ? (
              programs?.length > 0 ? (
                programs?.map((program: ILoyaltyProgram) => (
                  <div key={program.name} className={s.programContainer}>
                    <span className={s.name}>{program?.name}</span>
                    <span className={s.points}>Points: {program?.points}</span>
                  </div>
                ))
              ) : (
                <span className={s.emptyText}>
                  Loyalty programs you are participating in will be displayed here
                </span>
              )
            ) : (
              <ProgressSpinner className={s.loader} />
            )}
          </h1>
          <Dialog onHide={() => setQrOpened(false)} closeOnEscape visible={qrOpened}>
            <div ref={ref} className={s.qrContainer}>
              <div className={s.qrTitle}>QR code of my loyalty program</div>
              <div className={s.subtitle}>
                <span onClick={copyHandler} className={s.copy}>
                  <img src="/src/images/copy.svg" />
                  Copy
                </span>
              </div>
              <QRCode
                logoPadding={6}
                logoPaddingStyle={'square'}
                logoImage={`${backend.defaults.baseURL}/render/token/${token}`}
                value={`${
                  isProd ? 'https://app.pistis.network' : 'app.quvet.com'
                }/customer-points/${token}`}
              />
            </div>
          </Dialog>
        </>
      ) : (
        <div className={s.requiredText}>
          <span className={s.title}>Oops!</span>
          <br />
          <span className={s.description}>
            {!address ? (
              <>
                <span className={s.textWithGap}>
                  Looks like you are not connected, connect your wallet to use Pistis Dapp
                </span>
                <br /> <ConnectButton label="Connect wallet" />
              </>
            ) : !token ? (
              <>
                Looks like you have no Pistis Token. Mint it for using Pistis Dapp
                <br />{' '}
                <Button className={s.mintButton} onClick={() => mintToken()}>
                  Mint Free Pistis Token
                </Button>
              </>
            ) : null}
          </span>
        </div>
      )}
    </div>
  );
};
