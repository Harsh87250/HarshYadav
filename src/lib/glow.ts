export type GlowColor = 'blue' | 'cyan' | 'purple';

export const glowMap: Record<GlowColor, { text: string; shadow: string; border: string; bg: string }> = {
  blue: {
    text: 'text-neon-blue',
    shadow: 'shadow-neon-blue',
    border: 'border-neon-blue/40',
    bg: 'bg-neon-blue/10',
  },
  cyan: {
    text: 'text-neon-cyan',
    shadow: 'shadow-neon-cyan',
    border: 'border-neon-cyan/40',
    bg: 'bg-neon-cyan/10',
  },
  purple: {
    text: 'text-neon-purple',
    shadow: 'shadow-neon-purple',
    border: 'border-neon-purple/40',
    bg: 'bg-neon-purple/10',
  },
};

export const levelColor: Record<'Foundational' | 'Learning' | 'Working Knowledge', GlowColor> = {
  Foundational: 'purple',
  Learning: 'cyan',
  'Working Knowledge': 'blue',
};
