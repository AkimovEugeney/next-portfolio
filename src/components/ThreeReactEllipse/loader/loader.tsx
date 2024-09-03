import { Star } from 'lucide-react'

import { IThreeReactEllipse } from '../ThreeReactEllipse'

import styles from './loader.module.scss'

export function LoaderStar({ height }: IThreeReactEllipse) {
  return (
    <div className={styles.loader} style={{ height: height }}>
      <Star className={styles.star} width='18rem' height='18rem' color='#fff' />
    </div>
  )
}
