import { useState } from 'react'
import BubbleField from './components/BubbleField'
import Header from './components/Header'
import JourneyRail from './components/JourneyRail'
import AboutStack from './components/AboutStack'
import Formations from './components/Formations'
import Tutors from './components/Tutors'
import Students from './components/Students'
import Partners from './components/Partners'
import Plans from './components/Plans'
import Guarantee from './components/Guarantee'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import EnrollModal from './components/EnrollModal'
import ParticleHero from './components/ParticleHero'
import LogoRippleSection from './components/LogoRippleSection'
import WhatsAppButton from './components/WhatsAppButton'


function App() {
  const [enrollOpen, setEnrollOpen] = useState(false)

  return (
    <div className="bg-void text-ink font-body relative">
      <BubbleField />
      <Header onOpenEnroll={() => setEnrollOpen(true)} />
      <JourneyRail />
      <ParticleHero />
      <AboutStack />
      <Formations />
      <Tutors />
      <Students />
      <Partners />
      <Plans onOpenEnroll={() => setEnrollOpen(true)} />
      <Guarantee />
      <FAQ />
      <CTA onOpenEnroll={() => setEnrollOpen(true)} />
      <LogoRippleSection />
      <EnrollModal open={enrollOpen} onClose={() => setEnrollOpen(false)} />
      <WhatsAppButton />
    </div>
  )
}

export default App
