import React, { FC } from 'react'
import { IUserRating } from './UserRating.types'
import s from './UserRating.module.scss'
import { Rating } from 'primereact/rating'
import { Counter } from '../Counter/Counter'

export const UserRating: FC<IUserRating> = ({ withUpdate, setRating, rating }) => {
  const handleRatingChange = (rating: any) => {
    setRating(rating)
  }
  return <div className={s.container}>
    <div className={s.rating}>
      <Counter targetValue={rating} duration={1500} decimalPlaces={1} />
    </div>
    <Rating readOnly={!withUpdate} cancel={false} className={s.ratingStyles} value={rating} onChange={(e) => handleRatingChange(e.target.value)} />
  </div>
}
