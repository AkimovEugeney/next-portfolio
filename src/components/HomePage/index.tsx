import { Hero } from '../Hero'
import ThreeReactEllipse from '../ThreeReactEllipse/ThreeReactEllipse'
import './HomePage.scss'

export default function HomePage() {
  return (
    <main>
      <section className='hero-section'>
        <div className='container'>
          <Hero
            className='hero'
            name='Eugeney'
            lastName='Akimov'
            tag='React | Next  [devoloper]'
          />
        </div>
        <div>
          <ThreeReactEllipse height='50rem'/>
        </div>
      </section>
    </main>
  )
}
