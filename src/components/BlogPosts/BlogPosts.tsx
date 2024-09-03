'use client'

import Link from 'next/link'

import styles from './BlogPosts.module.scss'
import { IBlogPost } from '@/services/blog.service'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Tags } from '../Tags/Tags'
interface IBlogPostsProps {
  data: IBlogPost[]
}

export function BlogPosts({ data }: IBlogPostsProps) {
  const comp = useRef<HTMLUListElement>(null)
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() =>{
      if(!itemsRef.current) return
      itemsRef.current.forEach(item => {
        gsap.fromTo(
          item,
          {opacity: 0, y:20},
          {
            opacity: 1,
            y:0,
            duration: 1.3,
            ease: 'elastic.out(1,0.3)',
            stagger: 0.2,
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100px",
              end: "bottom center",
              toggleActions: "play none none none"
            }
          }
        )
      })
      }, comp);
      return () => ctx.revert()
  },[])

  return (
    <ul className={styles.list} ref={comp}>
      {data &&
        data.map((item, index) => (
          <li
            key={index}
            className={styles.item}
            ref={(el) => {if(itemsRef.current) itemsRef.current[index] = el}}
          >
            <Link
              className={styles.link}
              href={`/blog/${item.id}`}
            >
              <div className={styles.wrap}>
                <div className={styles.titleWrap}>
                  <h2 className={styles.title}>{item.title}</h2>
                  <span className={styles.more}>Read More</span>
                </div>
                  <Tags data={item.tags}/>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  )
}
