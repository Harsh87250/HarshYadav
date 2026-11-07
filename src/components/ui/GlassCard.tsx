import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode, useRef, type MouseEvent, useState } from 'react';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  tilt?: boolean;
  lift?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
  tilt = false,
  lift = false,
  ...rest
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);

    if (tilt) {
      const rotX = (0.5 - y) * 12;
      const rotY = (x - 0.5) * 12;
      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`,
      });
    }
  };

  const handleMouseLeave = () => {
    if (tilt) {
      setTiltStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)' });
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={hover ? handleMouseMove : undefined}
      onMouseLeave={hover ? handleMouseLeave : undefined}
      className={`glass-card ${hover ? 'glass-card-hover' : ''} ${lift ? 'hover:-translate-y-1' : ''} ${className}`}
      style={{
        background: glow
          ? 'radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(76,168,255,0.10), transparent 70%), linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)'
          : undefined,
        transformStyle: tilt ? 'preserve-3d' : undefined,
        transition: tilt ? 'transform 0.2s ease-out' : undefined,
        ...tiltStyle,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
