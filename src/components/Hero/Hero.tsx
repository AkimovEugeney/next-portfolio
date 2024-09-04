'use client'

import clsx from 'clsx'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

import { useStateAnimation } from '@/store/store'

import { renderLetters } from '@/utils/renderLetters'

import styles from './Hero.module.scss'

interface IHero {
  name: string
  lastName: string
  tag: string
  className?: string
}

export function Hero({ name, lastName, tag, className }: IHero) {
  const comp = useRef(null)
  const isAnimation = useStateAnimation(state => state.isAnimation)

  useEffect(() => {
    if (isAnimation) {
      if (!comp.current) return
      let ctx = gsap.context(() => {
        const tl = gsap.timeline()
        tl.fromTo(
          '.letter-anim',
          { y: -100, opacity: 0, rotate: -10 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            ease: 'elastic.out(1, 0.3)',
            duration: 0.5,
            transformOrigin: 'left top',
            stagger: {
              each: 0.1,
              from: 'random'
            }
          }
        )

        tl.fromTo(
          '.tag-anim',
          { y: 50, opacity: 0, scale: 1.2 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
          }
        )
      }, comp)
      return () => ctx.revert()
    }
  }, [isAnimation])

  return (
    <div className={clsx(styles.wrap, className)} ref={comp}>
      <h1 className={styles.title} aria-label={name + ' ' + lastName}>
        <p className={styles.name}>{renderLetters(name, 'name')}</p>
        <p className={styles.lastName}>{renderLetters(lastName, 'lastName')}</p>
      </h1>
      <h2 className={`${styles.tag} tag-anim`}>{tag}</h2>
    </div>
  )
}
