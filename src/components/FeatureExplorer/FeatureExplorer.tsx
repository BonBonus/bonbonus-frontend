import React, { FC, useEffect } from 'react'
import { IFeatureExplorer } from './FeatureExplorer.types'
import s from './FeatureExplorer.module.scss'
import classNames from 'classnames'

export const FeatureExplorer: FC<IFeatureExplorer> = ({ texts, className }) => {
  return <div className={s.container}>
    <div className={classNames(s.rating, className)}>
      {texts[0]}
    </div>
  </div>
}
