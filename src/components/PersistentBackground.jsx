import { useEffect, useState } from 'react'
import FadingVideo from './FadingVideo'

// Remote CloudFront hero video (primary)
const HERO_REMOTE = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4'
const HERO_LOCAL = '/assets/hero.mp4'

export default function PersistentBackground() {
  const [src, setSrc] = useState(HERO_REMOTE)

  useEffect(() => {
    // Prefer a local copy if present on the server; non-blocking check
    let mounted = true
    fetch(HERO_LOCAL, { method: 'HEAD' })
      .then((res) => {
        if (!mounted) return
        if (res.ok) setSrc(HERO_LOCAL)
      })
      .catch(() => {})
    return () => { mounted = false }
  }, [])

  return (
    <div className="fixed-bg inset-0">
      <FadingVideo src={src} className="w-full h-full object-cover glass-video" playbackRate={0.65} />
      <div className="glass-sheen" />
      <div className="film-grain" />
      <div className="overlay-dark" />
    </div>
  )
}
