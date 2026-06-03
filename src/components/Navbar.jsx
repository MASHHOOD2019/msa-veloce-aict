import LogoWithParticles from './LogoWithParticles'

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 flex items-center justify-between">
        <LogoWithParticles src="/assets/logo.mp4" />
        <nav className="hidden lg:flex items-center gap-3 liquid-glass px-1.5 py-1.5 rounded-full text-white font-body bg-black/10">
          <a className="px-4 py-2 text-sm font-medium text-white/90 cursor-pointer">
            Home
          </a>
          <a
            onClick={() =>
              document
                .getElementById('fleet')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-4 py-2 text-sm font-medium text-white/90 cursor-pointer"
          >
            Fleet
          </a>
          <a
            onClick={() =>
              document
                .getElementById('owners')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-4 py-2 text-sm font-medium text-white/90 cursor-pointer"
          >
            Owners
          </a>
          <a className="px-4 py-2 text-sm font-medium text-white/90 cursor-pointer">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="liquid-glass-strong rounded-full px-5 py-2 text-sm font-medium bg-white text-black whitespace-nowrap transition-transform active:scale-95">
            Book Now ↗
          </button>
        </div>
      </div>
    </header>
  )
}
