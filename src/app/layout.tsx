import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { SITE_NAME } from '@/constants/seo.constants'
import { Header } from '@/components/Header'

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  weight: ['400','600', '700', '900'],
  display: 'swap',
  variable: '--font-main',
  style: ['normal']
})

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: 'Good'
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
