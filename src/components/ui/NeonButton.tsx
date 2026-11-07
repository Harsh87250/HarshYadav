import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode, useRef, type MouseEvent, useState } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface NeonButtonProps extends Omit<HTMLMotionProps<'a'>, 'ref'> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  magnetic?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'text-white bg-gradient-to-r from-neon-blue/90 to-neon-cyan/80 border-transparent hover:shadow-neon-blue hover:from-neon-blue hover:to-neon-cyan',
  secondary:
    'text-neon-cyan bg-white/[0.02] border-neon-cyan/30 hover:bg-neon-cyan/10 hover:border-neon-cyan/60 hover:shadow-neon-cyan',
  ghost:
    'text-text-primary bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.05]',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function NeonButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  onClick,
  className = '',
  icon,
  iconRight,
  magnetic = true,
  ...rest
}: NeonButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMagneticPos({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
  };

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2 font-medium tracking-wide">
      {icon}
      {children}
      {iconRight}
    </span>
  );

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      animate={{ x: magneticPos.x, y: magneticPos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className={`group neon-trail relative inline-flex items-center justify-center overflow-hidden rounded-xl border transition-all duration-300 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      style={{ willChange: 'transform' }}
      {...rest}
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}
      {content}
    </motion.a>
  );
}
