'use client'

import clsx from 'clsx'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Fragment, useEffect, useRef } from 'react'

import { useStateAnimation } from '@/store/store'

import styles from './Tech.module.scss'

interface ITech {
  color: string
  name: string
}

interface IProps {
  data: ITech[]
}

export function Tech({ data }: IProps) {
  const comp = useRef<HTMLDivElement>(null)
  const isAnimation = useStateAnimation(state => state.isAnimation)

  useEffect(() => {
    if (isAnimation) {
      if (!comp.current) return
      gsap.registerPlugin(ScrollTrigger)
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: comp.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 4 // остановить через 4 секунды
          }
        })

        tl.fromTo(
          '.row-anim',
          {
            x: index =>
              index % 2 === 0
                ? gsap.utils.random(600, 400)
                : gsap.utils.random(-600, -400)
          },
          {
            x: index =>
              index % 2 === 0
                ? gsap.utils.random(-600, -400)
                : gsap.utils.random(600, 400),
            ease: 'power1.inOut'
          }
        )
      }, comp)
      return () => ctx.revert()
    }
  }, [isAnimation])

  return (
    <div className={styles.wrap} ref={comp}>
      {data.map((item: ITech, index: number) => (
        <div
          key={index}
          className={clsx(styles.row, 'row-anim')}
          aria-label={item.name}
        >
          {Array.from({ length: 15 }, (_, index) => (
            <Fragment key={index}>
              <span
                className={styles.item}
                style={{
                  color: index === 7 && item.color ? item.color : 'inherit'
                }}
              >
                {item.name}
              </span>
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  )
}
