import Image from 'next/image'

import { Tags } from '../Tags/Tags'

import styles from './Projects.module.scss'
import { TProjects } from '@/services/projects.service'

interface IProjectsProps {
  data: TProjects
}

export function Projects({ data }: IProjectsProps) {
  return (
    <ul className={styles.list}>
      {data &&
        data.map(item => (
          <li className={styles.item} key={item.id}>
            <div className={styles.img}>
              <Image src={item.img} alt={`${item.title} photo`} fill={true} />
            </div>
            <div className={styles.inner}>
              <Tags className={styles.tags} data={item.tags} />
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          </li>
        ))}
    </ul>
  )
}
