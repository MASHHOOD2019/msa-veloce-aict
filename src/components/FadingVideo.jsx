import { useEffect, useRef } from 'react'

export default function FadingVideo({ src, className = '', style = {}, playbackRate = 0.65 }) {
  const videoRef = useRef(null)
  const stateRef = useRef({ raf: null })
  const FADE_MS = 500

  function cancelRaf() {
    if (stateRef.current.raf) {
      cancelAnimationFrame(stateRef.current.raf)
      stateRef.current.raf = null
    }
  }

  function fadeTo(target, duration = FADE_MS) {
    const v = videoRef.current
    if (!v) return
    cancelRaf()
    const from = parseFloat(v.style.opacity || 0)
    const delta = target - from
    const startTime = { t: null }
    function step(ts) {
      if (startTime.t === null) startTime.t = ts
      const elapsed = ts - startTime.t
      const t = Math.min(1, elapsed / duration)
      v.style.opacity = String(from + delta * t)
      if (t < 1) stateRef.current.raf = requestAnimationFrame(step)
      else stateRef.current.raf = null
    }
    stateRef.current.raf = requestAnimationFrame(step)
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.style.opacity = 0
    v.crossOrigin = 'anonymous'
    v.preload = 'auto'
    v.loop = true
    v.muted = true
    v.playsInline = true
    v.defaultPlaybackRate = playbackRate
    try { v.playbackRate = playbackRate } catch (e) {}

    function onLoaded() {
      v.style.opacity = 0
      try { v.playbackRate = playbackRate } catch (e) {}
      v.play().catch(() => {})
      fadeTo(1, FADE_MS)
    }

    v.addEventListener('loadeddata', onLoaded)
    if (v.readyState >= 3) onLoaded()

    return () => {
      cancelRaf()
      v.removeEventListener('loadeddata', onLoaded)
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      className={className}
      style={{ ...style, opacity: 0 }}
      playsInline
      muted
      loop
      preload="auto"
      crossOrigin="anonymous"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
