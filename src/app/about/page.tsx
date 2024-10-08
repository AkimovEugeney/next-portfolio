import { Biography } from '@/components/Biography/Biography'
import { Tech } from '@/components/Tech/Tech'
import { serviceBiography } from '@/services/biography.service'
import type { Metadata } from 'next'

export const metadata: Metadata = {
 title: 'About',
 description: 'About me'
}

export const revalidate = 60

export default async function Page() {
  const biographyData_ = await serviceBiography.get()
 return (
  <main>
    <section className='section-one'>
      <div className="container">
        <h1 className='title'>Akimov Eugeney</h1>
        <Biography img={biographyData_.img} text={biographyData_.text} />
      </div>
    </section>
    <section className='section'>
        <div className="container">
        <h2 className='title'>What i use</h2>
        </div>
        <Tech data={[{color: '#0cd5fa', name: 'React'},{color: '#fff', name: 'NEXT.JS'},{color: '#15ff03', name: 'GSAP'},{color: '#ff890e', name: 'SCSS'}]}/>
    </section>
  </main>
 )
}
