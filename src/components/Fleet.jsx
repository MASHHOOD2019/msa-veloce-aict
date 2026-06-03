import { motion } from 'framer-motion'
import { cars, WHATSAPP_NUMBER, WHATSAPP_TPL } from '../constants/cars'

function waLink(car) {
  const msg = WHATSAPP_TPL.replace('{name}', car.name)
    .replace('{price}', car.price)
    .replace('{topSpeed}', car.topSpeed)
    .replace('{power}', car.power)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

export default function Fleet() {
  return (
    <section
      id="fleet"
      className="py-24 px-8 lg:px-20 relative bg-transparent"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="text-sm text-white/40 uppercase tracking-widest font-body mb-2">
            // The Collection
          </div>
          <h2 className="font-heading italic text-white text-5xl lg:text-7xl">
            Elite Fleet — 14 Masterpieces
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cars.map((car, i) => (
            <motion.div
              key={i}
              className="liquid-glass p-4 rounded-[2rem] group cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-500 bg-black/10"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-black/40 mb-6">
                <motion.img
                  src={car.id}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = '/assets/placeholder.svg'
                  }}
                />
              </div>
              <h3 className="font-heading italic text-2xl mb-2 px-2 text-white">
                {car.name}
              </h3>
              <div className="px-2 text-sm text-white/90 font-semibold mb-3">
                {car.price}
              </div>
              <div className="flex justify-between text-[10px] text-white/40 font-body uppercase tracking-wider px-2 pb-2">
                <div className="flex flex-col">
                  <span>Speed</span>
                  <span className="text-white text-xs font-semibold">
                    {car.topSpeed}
                  </span>
                </div>
                <div className="flex flex-col text-right">
                  <span>Power</span>
                  <span className="text-white text-xs font-semibold">
                    {car.power}
                  </span>
                </div>
              </div>
              <div className="mt-4 px-2">
                <a
                  href={waLink(car)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center liquid-glass-strong bg-white text-black py-2 rounded-full text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Reserve via WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
