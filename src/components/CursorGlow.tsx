import { useEffect, useRef, useCallback, useState } from 'react';

interface TrailParticle {
  id: number;
  x: number;
  y: number;
}

interface ClickBurst {
  id: number;
  x: number;
  y: number;
}

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -200, y: -200 });
  const ringPosRef = useRef({ x: -200, y: -200 });
  const lastPosRef = useRef({ x: -200, y: -200 });
  const speedRef = useRef(0);
  const particleIdRef = useRef(0);

  const [trails, setTrails] = useState<TrailParticle[]>([]);
  const [bursts, setBursts] = useState<ClickBurst[]>([]);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.body.classList.add('custom-cursor-active');

    let rafId = 0;
    let trailAccum = 0;

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      // Calculate speed for trail emission
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      speedRef.current = Math.sqrt(dx * dx + dy * dy);
      lastPosRef.current = { x: e.clientX, y: e.clientY };

      // Emit trail particles when moving fast
      trailAccum += speedRef.current;
      if (trailAccum > 50 && speedRef.current > 8) {
        trailAccum = 0;
        const id = particleIdRef.current++;
        setTrails((prev) => [...prev.slice(-12), { id, x: e.clientX, y: e.clientY }]);
        window.setTimeout(() => {
          setTrails((prev) => prev.filter((t) => t.id !== id));
        }, 500);
      }

      // Detect hover over interactive elements
      const el = e.target as HTMLElement;
      const isInteractive = !!el.closest(
        'a, button, [role="button"], input, textarea, .glass-card, [data-cursor-hover]'
      );
      setHovering(isInteractive);
    };

    const onLeave = () => setVisible(false);
    const onDown = (e: MouseEvent) => {
      const id = particleIdRef.current++;
      setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, 600);
    };

    // Smooth follow loop — dot is fast, ring lags slightly
    const animate = () => {
      const tx = targetRef.current.x;
      const ty = targetRef.current.y;

      // Dot follows almost instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
      }

      // Ring lags behind with easing
      ringPosRef.current.x += (tx - ringPosRef.current.x) * 0.18;
      ringPosRef.current.y += (ty - ringPosRef.current.y) * 0.18;
      if (ringRef.current) {
        const scale = hovering ? 1.8 : 1;
        ringRef.current.style.transform = `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px) translate(-50%, -50%) scale(${scale})`;
      }

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [hovering]);

  const removeBurst = useCallback((id: number) => {
    setBursts((prev) => prev.filter((b) => b.id !== id));
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Glow dot — follows instantly */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 rounded-full mix-blend-screen"
        style={{
          opacity: visible ? 1 : 0,
          background: '#6CE6FF',
          boxShadow: '0 0 8px #6CE6FF, 0 0 16px rgba(76,168,255,0.6)',
          transition: 'opacity 0.2s',
        }}
      />

      {/* Neon ring — lags behind */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[199] rounded-full border mix-blend-screen"
        style={{
          opacity: visible ? 1 : 0,
          width: '32px',
          height: '32px',
          borderColor: hovering ? 'rgba(108,230,255,0.9)' : 'rgba(76,168,255,0.5)',
          boxShadow: hovering
            ? '0 0 20px rgba(108,230,255,0.6), 0 0 40px rgba(76,168,255,0.3)'
            : '0 0 10px rgba(76,168,255,0.3)',
          transition: 'opacity 0.2s, border-color 0.3s, box-shadow 0.3s',
        }}
      />

      {/* Particle trail */}
      <div ref={trailRef} className="pointer-events-none fixed inset-0 z-[198]">
        {trails.map((t) => (
          <div
            key={t.id}
            className="pointer-events-none absolute h-1.5 w-1.5 rounded-full"
            style={{
              left: t.x,
              top: t.y,
              transform: 'translate(-50%, -50%)',
              background: '#4CA8FF',
              boxShadow: '0 0 6px #6CE6FF',
              animation: 'trail-fade 0.5s ease-out forwards',
            }}
          />
        ))}
      </div>

      {/* Click bursts */}
      {bursts.map((b) => (
        <div
          key={b.id}
          className="pointer-events-none fixed z-[201]"
          style={{ left: b.x, top: b.y, transform: 'translate(-50%, -50%)' }}
          onAnimationEnd={() => removeBurst(b.id)}
        >
          <div
            className="h-8 w-8 rounded-full border-2 border-neon-cyan"
            style={{
              animation: 'light-burst 0.6s ease-out forwards',
              boxShadow: '0 0 20px rgba(108,230,255,0.6)',
            }}
          />
        </div>
      ))}
    </>
  );
}
