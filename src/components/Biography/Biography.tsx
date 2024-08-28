import { Avatar } from './Avatar/Avatar'
import styles from './Biography.module.scss'

interface IBiography {
  img: string;
  text: string
}

export function Biography(data: IBiography) {
  return (
    <div className={styles.wrap}>
      <p className={styles.desc}>{data.text}</p>
      <Avatar className={styles.img} src={data.img} width={300} height={300}/>
    </div>
  )
}
