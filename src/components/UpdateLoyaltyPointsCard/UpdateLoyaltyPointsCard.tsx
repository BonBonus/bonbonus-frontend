import { Button } from 'primereact/button'
import React, { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import s from './UpdateLoyaltyPointsCard.module.scss';
import classNames from 'classnames'
import { InputNumber } from 'primereact/inputnumber'

interface IUserLoyalPoints {
  userLoyalPoints: number | undefined,
  setUserLoyalPoints: (points: number | undefined) => void,
  setNewUserLoyaltyPoints: (points: number | undefined) => void,
  updateTokenLoyaltyPoints: (points: number | undefined) => void,
  isUpdating?: boolean,
  className?: string
}

export const UpdateLoyaltyPointsCard: FC<IUserLoyalPoints> = ({
  isUpdating,
  userLoyalPoints,
  updateTokenLoyaltyPoints,
  setNewUserLoyaltyPoints,
  className
}) => {
  const [inputValue, setInputValue] = useState<number | undefined>(undefined);

  const updateUserPoints = async () => {
    try {
      updateTokenLoyaltyPoints(inputValue)
    } catch (e: any) {
      toast.error('Something went wrong. Please try again');
    }
  };

  const test = (value: any) => {
    setInputValue(value)
    setNewUserLoyaltyPoints(value)
  }

  useEffect(() => {
    setInputValue(userLoyalPoints)
  }, [])

  return (
    <>
      <div className={classNames(s.container, className)}>
        <div className={s.points}>User points: {userLoyalPoints}</div>
        <div className={s.changeScoreContainer}>
          <InputNumber
            value={inputValue}
            min={0}
            className={s.input}
            onChange={(e: any) => test(e.value)}
            placeholder="Enter a new amount of points"
          />
          {inputValue && inputValue !== userLoyalPoints ? (
            <span className={s.hint}>
              {userLoyalPoints! > inputValue
                ? `${Math.abs(userLoyalPoints! - inputValue)} points will be deducted`
                : `${Math.abs(userLoyalPoints! - inputValue)} points will be added`}
            </span>
          ) : null}
        </div>
        <Button
          label="Update points"
          loading={isUpdating}
          disabled={userLoyalPoints === inputValue}
          onClick={updateUserPoints}
          className={s.button}
        />
      </div>
    </>
  )
}
