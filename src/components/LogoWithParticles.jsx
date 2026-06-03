import { useEffect, useRef } from 'react'

export default function LogoWithParticles({ src }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const rafRef = useRef(null)
  const pointerRef = useRef({ x: -10000, y: -10000, active: false })

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d')
    let dpr = Math.max(1, window.devicePixelRatio || 1)

    let rect = container.getBoundingClientRect()
    function resize() {
      rect = container.getBoundingClientRect()
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
    }
    resize()

    const N = 18
    particlesRef.current = []
    for (let i = 0; i < N; i++) {
      const ang = (i / N) * Math.PI * 2
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const baseOrbit = Math.min(canvas.width, canvas.height) * 0.36
      particlesRef.current.push({
        x: cx + Math.cos(ang) * baseOrbit,
        y: cy + Math.sin(ang) * baseOrbit,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        ang,
        mass: 0.8 + Math.random() * 1.2
      })
    }

    function onMove(e) {
      const r = container.getBoundingClientRect()
      pointerRef.current.x = (e.clientX - r.left) * dpr
      pointerRef.current.y = (e.clientY - r.top) * dpr
      pointerRef.current.active = true
    }
    function onLeave() {
      pointerRef.current.active = false
    }
    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', resize)

    function step() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const orbitR = Math.min(canvas.width, canvas.height) * 0.36
      const pointerX = pointerRef.current.x
      const pointerY = pointerRef.current.y
      const pointerActive = pointerRef.current.active
      const pointerRadius = Math.min(canvas.width, canvas.height) * 0.6
      const pointerStrength = 1200 * dpr

      for (let p of particlesRef.current) {
        p.ang += 0.003 + 0.001 * Math.sin(Date.now() / 600 + p.ang * 4)
        const desiredX = cx + Math.cos(p.ang) * orbitR
        const desiredY = cy + Math.sin(p.ang) * orbitR
        let fx = (desiredX - p.x) * 0.14
        let fy = (desiredY - p.y) * 0.14

        if (pointerActive) {
          const dx = p.x - pointerX
          const dy = p.y - pointerY
          const dist = Math.hypot(dx, dy) + 0.0001
          if (dist < pointerRadius) {
            const f =
              (1 - dist / pointerRadius) * (pointerStrength / p.mass)
            fx += (dx / dist) * f
            fy += (dy / dist) * f
          }
        }

        p.vx = (p.vx + fx / p.mass) * 0.86
        p.vy = (p.vy + fy / p.mass) * 0.86
        p.x += p.vx
        p.y += p.vy

        ctx.beginPath()
        ctx.strokeStyle = 'rgba(255,255,255,0.06)'
        ctx.lineWidth = 1 * dpr
        ctx.moveTo(cx, cy)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()

        ctx.beginPath()
        ctx.fillStyle = 'rgba(255,255,255,0.96)'
        ctx.arc(p.x, p.y, 2.4 * dpr, 0, Math.PI * 2)
        ctx.fill()
      }

      const grad = ctx.createRadialGradient(
        cx, cy, 0, cx, cy, Math.max(1, orbitR * 1.6)
      )
      grad.addColorStop(0, 'rgba(255,255,255,0.04)')
      grad.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(cx, cy, orbitR * 1.6, 0, Math.PI * 2)
      ctx.fill()

      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(rafRef.current)
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', resize)
    }
  }, [src])

  return (
    <div
      ref={containerRef}
      className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden bg-black/10 flex items-center justify-center"
    >
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover z-10"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />
    </div>
  )
}
