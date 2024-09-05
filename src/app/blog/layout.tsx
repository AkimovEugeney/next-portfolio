import type { ReactNode } from 'react'

interface IBlogLayout {
  children: ReactNode
  modal: ReactNode
}

export default function BlogLayout({
  children,
  modal
}: IBlogLayout) {
  return (
    <div>
      {children}
      {modal}
    </div>
  )
}
