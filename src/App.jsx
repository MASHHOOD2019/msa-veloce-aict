import PersistentBackground from './components/PersistentBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Fleet from './components/Fleet'
import Owners from './components/Owners'

export default function App() {
  return (
    <div className="bg-black min-h-screen">
      <PersistentBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Fleet />
        <Owners />
      </main>
      <footer className="py-20 text-center relative z-10 bg-transparent">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="font-heading italic text-4xl mb-4 text-white">MSA VELOCE</h2>
          <p className="text-sm text-white/40 font-body mb-8 italic tracking-[0.2em]">VELOCITY. LUXURY. LEGACY.</p>
          <div className="flex justify-center gap-8 text-[11px] font-body text-white/30 uppercase tracking-widest mb-10">
            <span>Islamabad</span>
            <span>·</span>
            <span>Lahore</span>
            <span>·</span>
            <span>Karachi</span>
          </div>
          <p className="text-xs text-white/20 font-body">
            &copy; 2026 MSA VELOCE RENTALS. PAKISTAN NATIONWIDE SERVICE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  )
}
