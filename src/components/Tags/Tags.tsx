import clsx from 'clsx'
import styles from './Tags.module.scss'

interface ITags {
  data: string[]
  className?: string
}

export function Tags({data, className}: ITags) {
  return (
    <ul className={clsx(styles.tags, className)}>
    {data.map((item, index) => (
      <li
        className={styles.tag}
        key={index}
      >
        {item}
      </li>
    ))}
  </ul>
  )
}
