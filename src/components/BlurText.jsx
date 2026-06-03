import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function BlurText({ text, className = '' }) {
  const rootRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    if (rootRef.current) obs.observe(rootRef.current)
    return () => obs.disconnect()
  }, [])

  const words = String(text).split(' ')

  return (
    <span
      ref={rootRef}
      className={`flex flex-wrap justify-center ${className}`}
      style={{ rowGap: '0.1em' }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={
            visible
              ? {
                  filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                  opacity: [0, 0.5, 1],
                  y: [50, -5, 0]
                }
              : {}
          }
          transition={{
            duration: 0.7,
            times: [0, 0.5, 1],
            ease: 'easeOut',
            delay: i * 0.1
          }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  )
}
