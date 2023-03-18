import React, { FC, useEffect, useState } from 'react';
import { fallDown as Menu } from 'react-burger-menu';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useUpdateEffect } from 'usehooks-ts';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import Logo from '../../assets/logo.svg'

import { userApi } from '../../api/userApi'
import {
  setAuthenticated,
  setTokenName,
  setUserAddress
} from '../../store/slices/userSlice'

import s from './Layout.module.scss';
import { Connect } from '../../views/Connect/About'
import { Welcome } from '../../views/Welcome/Welcome'
import { RootState } from '../../store/store'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { setTokenCongratsModalOpened } from '../../store/slices/appSlice'

export const Layout: FC = () => {
  const { address, isConnected } = useAccount();
  const { data: signature, status: signStatus, reset } = useSignMessage();
  const { disconnect } = useDisconnect();
  const [menuOpen, setMenuOpen] = useState(false);
  const { token } = useSelector((state: RootState) => state.user);
  const { tokenCongratsModalOpened } = useSelector((state: RootState) => state.app);

  const dispatch = useDispatch();

  const verifyAuth = async (address: string) => {
    return await userApi.verify(String(address), String(signature));
  };

  useUpdateEffect(() => {
    if (signature && address) {
      verifyAuth(String(address)).then(() => temp(address));
    }
  }, [signature, address]);

  const getUser = async () => {
    try {
      const user = await userApi.getUser();
      if (user) {
        dispatch(setAuthenticated(true));
      }
      return true;
    } catch (e: any) {
      if (e.response.data.statusCode === 401) {
        return false;
      }
    }
  };

  useUpdateEffect(() => {
    document.body.style.overflow = 'hidden';
    menuOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
  }, [menuOpen]);

  const getWallets = async (address: string) => {
    // return await wallets(address);
  };

  const temp = async (address: string) => {
    const userAuthorized = await getUser();
    dispatch(setTokenName(undefined));
    if (!userAuthorized) {
      dispatch(setAuthenticated(false));
      return;
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      temp(address);
    }
  }, [address, isConnected]);

  useUpdateEffect(() => {
    if (!address) {
      return;
    }
    userApi.logout().then(() => {
      temp(address);
    });
  }, [address]);

  const disconnectHandler = () => {
    disconnect();
    reset();
    dispatch(setUserAddress(''));
  };

  return (
    <div className={s.bg}>
      <div className={s.layout}>
        {isConnected ? token ? <>
            <header className={s.header}>
              <a href="/" className={s.homeLink}>
                <img src="src/assets/logo.svg" />
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
