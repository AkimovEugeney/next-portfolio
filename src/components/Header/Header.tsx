'use client'

import cl from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Suspense, useEffect } from 'react'

import { SITE_NAME } from '@/constants/seo.constants'

import { useStateAnimation } from '@/store/store'

import useStore from '@/hooks/useStore'

import { Switch } from '../ui/Switch/Switch'

import './Header.scss'
import { navbarLink } from './header.data'

export function Header() {
  const pathname = usePathname()
  const isAnimation = useStore(useStateAnimation, state => state.isAnimation)
  const setIsAnimation = useStateAnimation(state => state.setIsAnimation)

  const toggleAnimation = () => {
    setIsAnimation(!isAnimation)
  }
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrap'>
          <div className='header-logo__wrap'>
            <Link href='/' className='header__logo'>
              {SITE_NAME}
            </Link>
            <Suspense fallback={<div>...</div>}>
              {typeof isAnimation != 'undefined' ? <Switch isChecked={isAnimation} onClick={toggleAnimation} /> : null}
            </Suspense>
          </div>
          <nav>
            <ul className='header__list'>
              {navbarLink.map(item => (
                <li
                  key={item.link}
                  className={cl(
                    'header__item',
                    pathname === item.link ? 'active' : ''
                  )}
                >
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
