import { servicesProjects } from '@/services/projects.service'
import { Hero } from '../Hero'
import ThreeReactEllipse from '../ThreeReactEllipse/ThreeReactEllipse'

import './HomePage.scss'
import { Projects } from '../Projects/Projects'
export const revalidate = 60

export default async function HomePage() {
  const projects = await servicesProjects.get()
  return (
    <main>
      <section className='section-one'>
        <div className='container'>
          <Hero
            className='hero'
            name='Eugeney'
            lastName='Akimov'
            tag='React | Next  [devoloper]'
          />
        </div>
        <div>
          <ThreeReactEllipse height='50rem' />
        </div>
      </section>
      <section>
        <div className='container'>
          <h2 className='title'>My Projects</h2>
          <div className='projects'>
            <Projects data={projects}/>
          </div>
        </div>
      </section>
    </main>
  )
}
