import React, { FC, useEffect, useState } from 'react';
import { fallDown as Menu } from 'react-burger-menu';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useUpdateEffect } from 'usehooks-ts';
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

export const Layout: FC = () => {
  const { address, isConnected } = useAccount();
  const [menuOpen, setMenuOpen] = useState(false);
  const { tokenCongratsModalOpened } = useSelector((state: RootState) => state.app);
  const { token } = useSelector((state: RootState) => state.user);
  const { mint, getToken } = useBonBonusContract();

  const dispatch = useDispatch();

  useUpdateEffect(() => {
    document.body.style.overflow = 'hidden';
    menuOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
  }, [menuOpen]);

  useEffect(() => {
    const checkToken = async (address: string) => {
      try {
        const tokenId = await getToken(address)
        dispatch(setTokenId(Number(tokenId)))
      } catch (e: any) {
        console.log('no token')
      }
    }

    if (isConnected && address) {
      checkToken(address)
    }
  }, [address, isConnected]);

  return (
    <div className={s.bg}>
      <div className={s.layout}>
        {isConnected ? token ? <>
            <header className={s.header}>
              <a href="/" className={s.homeLink}>
                <img src="/src/assets/logo.svg" />
                <div className={s.name}>BonBonus</div>
              </a>
              <Menu
                menuClassName={s.menu}
                onClose={() => setMenuOpen(false)}
                onOpen={() => setMenuOpen(true)}
                isOpen={menuOpen}
              >
                <ul>
                  <li>1</li>
                  <li>2</li>
                </ul>
              </Menu>
              <div className={s.profile}>
                <ConnectButton />
              </div>
            </header>
            <main className={s.content}>
              <Outlet />
            </main>
          </> : <Welcome /> :
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