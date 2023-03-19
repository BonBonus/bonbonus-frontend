import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import s from './Layout.module.scss';
import { Connect } from '../../views/Connect/About'
import { Welcome } from '../../views/Welcome/Welcome'
import { RootState } from '../../store/store'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { setTokenCongratsModalOpened } from '../../store/slices/appSlice'
import { useBonBonusContract } from '../../blockchain/contracts/useBonBonusContract'
import { setTokenId } from '../../store/slices/userSlice'
import { ProgressSpinner } from 'primereact/progressspinner'

export const Layout: FC = () => {
  const { address, isConnected } = useAccount();
  const { tokenCongratsModalOpened } = useSelector((state: RootState) => state.app);
  const { token } = useSelector((state: RootState) => state.user);
  const { getToken } = useBonBonusContract();
  const [fetching, setFetching] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async (address: string) => {
      try {
        const tokenId = await getToken(address)
        dispatch(setTokenId(Number(tokenId)))
      } catch (e: any) {
        dispatch(setTokenId(null))
        console.log('No token')
      } finally {
        setFetching(false)
      }
    }

    if (isConnected && address) {
      checkToken(address)
    }
  }, [address, isConnected]);

  return (
    <div className={s.bg}>
      <div className={s.layout}>
        {isConnected ? fetching === false ? token !== null ? <>
            <header className={s.header}>
              <a href="/" className={s.homeLink}>
                <img src="/src/assets/logo.svg" />
                <div className={s.name}>BonBonus</div>
              </a>
              <div className={s.profile}>
                <ConnectButton />
              </div>
            </header>
            <main className={s.content}>
              <Outlet />
            </main>
          </> : <Welcome /> : <ProgressSpinner className={s.spinner} /> :
          <div className={s.connectContainer}>
            <Connect />
          </div>}
      </div>
      <Dialog header="Congrats!" visible={tokenCongratsModalOpened} style={{ width: '50vw' }}
              onHide={() => dispatch(setTokenCongratsModalOpened(false))}>
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Button label="Ok, thanks!" onClick={() => dispatch(setTokenCongratsModalOpened(false))} />
      </Dialog>
    </div>
  );
};
