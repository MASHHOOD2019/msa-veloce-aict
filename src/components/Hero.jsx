import { motion } from 'framer-motion'
import BlurText from './BlurText'

export default function Hero() {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-transparent">
      <div className="relative z-10 flex-1 w-full flex flex-col items-center text-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="liquid-glass inline-flex items-center gap-3 rounded-full px-4 py-2 bg-black/20">
            <span className="bg-white text-black px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase">
              Exclusive
            </span>
            <span className="text-xs text-white/90 font-body uppercase tracking-wider">
              Pakistan's Premier Hypercar Experience
            </span>
          </div>
        </motion.div>
        <div className="mt-8">
          <h1 className="font-heading italic text-white text-5xl md:text-7xl lg:text-[6rem] leading-[0.85] tracking-tight max-w-4xl mx-auto">
            <BlurText text="Velocity Luxury Legacy at Your Command" />
          </h1>
          <p className="mt-6 text-sm md:text-base text-white/70 max-w-xl mx-auto font-body font-light leading-relaxed">
            Experience the world's most exclusive automobiles. From McLaren
            hypercars to Rolls-Royce royalty—Pakistan's elite showroom is now
            open for private bookings.
          </p>
          <div className="flex items-center gap-4 mt-10 justify-center">
            <button className="liquid-glass-strong rounded-full px-8 py-3 text-sm font-medium text-white bg-white/5 active:scale-95 transition-transform">
              Start Reservation ↗
            </button>
            <button
              onClick={() =>
                document
                  .getElementById('fleet')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="liquid-glass rounded-full px-8 py-3 text-sm text-white/90 bg-black/20 hover:bg-black/40 transition-colors"
            >
              Explore Fleet
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
