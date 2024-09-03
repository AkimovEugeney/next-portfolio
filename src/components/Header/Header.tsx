'use client'
import { SITE_NAME } from '@/constants/seo.constants'
import cl from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navbarLink } from './header.data'
import './Header.scss'

export function Header() {
  const pathname = usePathname()
  return (
    <header className='header'>
      <div className="container">
      <div className='header__wrapp'>
        <Link href='/' className='header__logo'>
          {SITE_NAME}
        </Link>
        <nav>
            <ul className='header__list'>
            {navbarLink.map(item => (
              <li key={item.link} className={cl('header__item', pathname === item.link ? 'active' : '')}>
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
