'use client'

import clsx from 'clsx'
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

import { useStateAnimation } from '@/store/store'

import styles from './Avatar.module.scss'
import useStore from '@/hooks/useStore'

interface IAvatar {
  className?: string
  src: string
  width: number
  height: number
}

export function Avatar({ className, width, height, src }: IAvatar) {
  const comp = useRef<HTMLDivElement>(null)
  const isAnimation = useStore(useStateAnimation,state => state.isAnimation)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (isAnimation) {
        tl.fromTo(
          '.avatar-anim',
          { opacity: 0, scale: 1.4 },
          { opacity: 1, scale: 1, duration: 1.3, ease: 'power3.inOut' }
        );

        const handleMouse = (e: MouseEvent) => {
          if (!comp.current) return;
          const rect = comp.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const percentX = (e.clientX - centerX) / rect.width / 2;
          let distFromCenter = 1 - Math.abs(percentX);

          tl.to(
            '.avatar-anim',
            { rotation: gsap.utils.clamp(-2, 2, 5 * percentX), duration: 0.5 },
            0
          ).to(
            '.highlight-anim',
            {
              opacity: distFromCenter - 0.7,
              x: (-10 + 20) * percentX,
              duration: 0.5,
            },
            0
          );
        }

        window.addEventListener('mousemove', handleMouse);

        return () => {
          window.removeEventListener('mousemove', handleMouse);
        };
      }
    }, comp);

    return () => ctx.revert(); // очистка при размонтировании компонента
  }, [isAnimation]);

  return (
    <div
      ref={comp}
      className={clsx(className, styles.wrap)}
      style={{ width: width, height: height }}
    >
      <Image
        className={clsx('avatar-anim', styles.avatar, isAnimation ? '' : styles.show
        )}
        src={src}
        alt='Photo'
        width={width}
        height={height}
      />
      {isAnimation && (
        <span
          style={{ width: width, height: height }}
          className={clsx(styles.highlight, 'highlight-anim')}
        ></span>
      )}
    </div>
  )
}
