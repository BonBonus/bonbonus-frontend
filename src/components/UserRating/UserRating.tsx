import React, { FC, useEffect } from 'react'
import { IUserRating } from './UserRating.types'
import s from './UserRating.module.scss'
import { Rating } from 'primereact/rating'
import { Counter } from '../Counter/Counter'

export const UserRating: FC<IUserRating> = ({ rating, setRating }) => {
  const handleRatingChange = (rating: any) => {
      setRating(rating)
  }
  return <div className={s.container}>
    <div className={s.rating}>
      <Counter targetValue={rating} duration={1500} decimalPlaces={1} />
    </div>
    <Rating readOnly cancel={false} className={s.ratingStyles} value={rating} onChange={(e) => handleRatingChange(e.target.value)} />
    <span className={s.description}>
      5-star rating based on your history
    </span>
  </div>
}
