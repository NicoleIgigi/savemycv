import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Certificates from '@/components/Certificates'
import Testimonials from '@/components/Testimonials'
import Languages from '@/components/Languages'
import GitHubStats from '@/components/GitHubStats'
import Blog from '@/components/Blog'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import SideNavigation from '@/components/SideNavigation'

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <SideNavigation />
      <div className="pl-20">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Certificates />
        <Testimonials />
        <Languages />
        <GitHubStats />
        <Blog />
        <Education />
        <Contact />
      </div>
      <Footer />
    </main>
  )
} 