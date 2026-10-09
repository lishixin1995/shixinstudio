import { useEffect, useRef, useState } from 'react'
import { Frame } from './Frame.jsx'

// The site's theme is still water. Images surface the way a ripple spreads:
// a circle opens from where the drop lands, two thin rings run on past it,
// and the picture settles out of a slight blur. Clicks leave a ring, and the
// cover is a slow field of rings.

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// play 'view': ripple in when scrolled into view. 'now': ripple in on mount
// (remount with a new key to ripple again). origin: where the drop lands.
// effect 'fade': a plain fade instead of the ripple (project pages).
export function RippleImage({ image, fit = 'cover', ratio, eager = false, origin = ['50%', '50%'], play = 'view', effect = 'ripple', className = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(play === 'now')

  useEffect(() => {
    if (shown) return undefined
    if (!('IntersectionObserver' in window)) {
      setShown(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShown(true)
        observer.disconnect()
      },
      { rootMargin: '0px 0px -12% 0px' }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [shown])

  return (
    <div ref={ref} className={`${effect}${shown ? ' is-in' : ''}${className ? ` ${className}` : ''}`} style={{ '--x': origin[0], '--y': origin[1] }}>
      <div className={`${effect}-media`}>
        <Frame image={image} fit={fit} ratio={ratio} eager={eager} />
      </div>
      {effect === 'ripple' ? (
        <>
          <span className="ripple-ring" aria-hidden="true" />
          <span className="ripple-ring" aria-hidden="true" />
        </>
      ) : null}
    </div>
  )
}

// A ring wherever the pointer presses.
export function ClickRipples() {
  useEffect(() => {
    if (reducedMotion()) return undefined
    const onDown = (event) => {
      if (event.button !== 0) return
      const ring = document.createElement('span')
      ring.className = 'click-ripple'
      ring.style.left = `${event.clientX}px`
      ring.style.top = `${event.clientY}px`
      ring.addEventListener('animationend', () => ring.remove(), { once: true })
      document.body.appendChild(ring)
    }
    window.addEventListener('pointerdown', onDown)
    return () => window.removeEventListener('pointerdown', onDown)
  }, [])
  return null
}

const SLOW_DROP = { speed: 0.075, life: 9500, alpha: 0.16, rings: 3, gap: 520 }
const POINTER_DROP = { speed: 0.11, life: 2600, alpha: 0.1, rings: 2, gap: 260 }

// Rings on still water: a slow drop near the middle every few seconds, and
// small ones where the pointer moves. Drawn on a canvas behind the cover.
export function RippleField({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const still = reducedMotion()
    let width = 0
    let height = 0
    // Rings grow with the page: the root size is 16px at 1440px wide.
    let scale = 1
    let rings = []
    let frame = 0
    let running = false
    let lastSlow = -Infinity
    let lastPointer = { x: -1e4, y: -1e4, at: 0 }

    function drop(x, y, kind, now) {
      for (let k = 0; k < kind.rings; k += 1) {
        rings.push({ x, y, born: now + k * kind.gap, speed: kind.speed, life: kind.life, alpha: kind.alpha * (1 - k * 0.22) })
      }
    }

    function circle(x, y, radius, alpha) {
      ctx.strokeStyle = `rgba(17, 17, 17, ${alpha.toFixed(3)})`
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.stroke()
    }

    function draw(now) {
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = 1
      if (still) {
        for (let k = 1; k <= 6; k += 1) circle(width / 2, height / 2, k * Math.min(width, height) * 0.12, 0.07 - k * 0.008)
        return
      }
      rings = rings.filter((ring) => now - ring.born < ring.life)
      for (const ring of rings) {
        const age = now - ring.born
        if (age < 0) continue
        const fade = 1 - age / ring.life
        circle(ring.x, ring.y, ring.speed * age * scale, ring.alpha * fade * fade)
      }
    }

    function resize() {
      const box = canvas.getBoundingClientRect()
      width = box.width
      height = box.height
      scale = parseFloat(getComputedStyle(document.documentElement).fontSize) / 16 || 1
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (still) draw(performance.now())
    }

    function tick(now) {
      if (!running) return
      if (now - lastSlow > 3200) {
        lastSlow = now
        drop(width / 2 + (Math.random() - 0.5) * width * 0.08, height / 2 + (Math.random() - 0.5) * height * 0.08, SLOW_DROP, now)
      }
      draw(now)
      frame = requestAnimationFrame(tick)
    }

    function setRunning(on) {
      if (still || on === running) return
      running = on
      if (running) frame = requestAnimationFrame(tick)
      else cancelAnimationFrame(frame)
    }

    const onMove = (event) => {
      if (still || event.pointerType !== 'mouse') return
      const box = canvas.getBoundingClientRect()
      const x = event.clientX - box.left
      const y = event.clientY - box.top
      const now = performance.now()
      if (Math.hypot(x - lastPointer.x, y - lastPointer.y) < 120 * scale || now - lastPointer.at < 180) return
      lastPointer = { x, y, at: now }
      drop(x, y, POINTER_DROP, now)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    const visibility = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting))
    visibility.observe(canvas)
    host.addEventListener('pointermove', onMove)

    return () => {
      setRunning(false)
      resizeObserver.disconnect()
      visibility.disconnect()
      host.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas className={`ripple-field ${className}`} ref={canvasRef} aria-hidden="true" />
}
