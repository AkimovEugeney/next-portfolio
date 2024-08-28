'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Avatar.module.scss'
interface IAvatar {
  className?: string
  src: string
  width: number
  height: number
}

export function Avatar({className, width, height, src}: IAvatar) {

  const comp = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.avatar-anim',
        {opacity: 0, scale: 1.4},
        {opacity: 1, scale: 1, duration: 1.3, ease: 'power3.inOut'}
      )

      window.onmousemove = (e) => {
        if(!comp.current) return
        const rect = comp.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const percentX = (e.clientX - centerX) / rect.width / 2
        let distFromCenter = 1 - Math.abs(percentX)

        gsap.timeline({
          defaults: {duration: .5, overwrite: "auto", ease: "power3.out"}
        }).to(
          '.avatar-anim',
          {rotation: gsap.utils.clamp(-2, 2, 5 * percentX), duration: .5}, 0
        ).to(
          '.highlight-anim',
          {opacity: distFromCenter - 0.7, x: -10 + 20 & percentX, duration: .5}, 0
        )
      }
    },comp)
    return () => ctx.revert()
  },[])

  return (
    <div ref={comp} className={clsx(className, styles.wrap)} style={{width: width, height: height}}>
      <Image className={clsx('avatar-anim', styles.avatar)}  src={src} alt='Photo' width={width} height={height}/>
      <span style={{width: width, height: height}}  className={clsx(styles.highlight, 'highlight-anim')}></span>
    </div>
  )
}
