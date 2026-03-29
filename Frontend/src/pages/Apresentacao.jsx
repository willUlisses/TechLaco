import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import ComoFuncionaSection from '../components/sections/ComoFuncionaSection'
import ServicosSection from '../components/sections/ServicosSection'
import CTASection from '../components/sections/CTASection'

export default function Apresentacao() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <main>
        <HeroSection />
        <ComoFuncionaSection />
        <ServicosSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
