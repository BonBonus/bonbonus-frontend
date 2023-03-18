import React, { FC } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import s from './Connect.module.scss';
import classNames from 'classnames'
import { IConnect } from './Connect.types'

export const Connect: FC<IConnect> = ({ className }) => {
  return (
    <div className={classNames(s.container, className)}>
      <div className={s.text}>
        <p>
          Hello and welcome to BonBonus - the service that helps you earn bonuses and discounts from your favorite stores!
          x </p>
        <br />
        <p>
          We are delighted to welcome you to our community and are ready to help you save money on your purchases.
        </p>
      </div>
     <ConnectButton />
    </div>
  );
};
