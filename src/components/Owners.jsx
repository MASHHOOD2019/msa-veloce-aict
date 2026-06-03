import { motion } from 'framer-motion'
import OwnerCard from './OwnerCard'
import { founders } from '../constants/cars'

export default function Owners() {
  return (
    <section
      id="owners"
      className="py-24 px-8 lg:px-20 relative bg-transparent"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="text-sm text-white/40 uppercase tracking-widest font-body mb-2">
            // The Visionaries
          </div>
          <h2 className="font-heading italic text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]">
            The
            <br />
            Founders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {founders.map((o, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <OwnerCard {...o} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
