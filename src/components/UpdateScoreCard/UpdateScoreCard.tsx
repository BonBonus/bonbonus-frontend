import { Button } from 'primereact/button'
import React, { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import s from './UpdateScoreCard.module.scss'
import classNames from 'classnames'
import { InputNumber } from 'primereact/inputnumber'

interface IUserLoyalPoints {
  userLoyalPoints: number,
  setUserLoyalPoints: (points: number) => void,
  className?: string
}

export const UpdateScoreCard: FC<IUserLoyalPoints> = ({ userLoyalPoints, setUserLoyalPoints, className }) => {
  const [inputValue, setInputValue] = useState<number>(0);

  const updateUserPoints = async () => {
    try {
      toast.success('Updated!');
      setUserLoyalPoints(inputValue)
    } catch (e: any) {
      toast.error('Something went wrong. Please try again');
    }
  };

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
            className={s.input}
            onChange={(e: any) => setInputValue(e.value)}
            placeholder="Enter a new amount of points"
          />
          {inputValue && inputValue !== userLoyalPoints ? (
            <span className={s.hint}>
                    {userLoyalPoints > inputValue
                      ? `${Math.abs(userLoyalPoints - inputValue)} points will be deducted`
                      : `${Math.abs(userLoyalPoints - inputValue)} points will be added`}
                  </span>
          ) : null}
        </div>
        <Button
          disabled={userLoyalPoints === inputValue}
          onClick={updateUserPoints}
          className={s.button}
        >
          Update points
        </Button>
      </div>
    </>
  )
}
