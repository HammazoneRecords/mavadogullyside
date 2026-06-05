import { Info } from 'lucide-react';

interface Props { artist: string; }

export default function WorkingDraftBanner({ artist }: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 66,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40,
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '7px 18px',
        borderRadius: 99,
        background: 'rgba(10,11,7,0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(245,158,11,0.22)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)',
        whiteSpace: 'nowrap',
        maxWidth: 'calc(100vw - 40px)',
        overflow: 'hidden',
      }}
    >
      <Info size={13} style={{ color: 'rgba(251,191,36,0.85)', flexShrink: 0 }} />
      <p
        className="font-ui text-[10px] uppercase tracking-widest text-center"
        style={{ color: 'rgba(251,191,36,0.65)' }}
      >
        Working draft — buyer assumes responsibility for clearing image &amp; likeness rights with {artist}. This site is available for{' '}
        <a href="https://mindwaveja.com" target="_blank" rel="noopener noreferrer"
          style={{ textDecoration: 'underline' }} className="hover:opacity-100 transition-opacity">
          purchase
        </a>.
      </p>
    </div>
  );
}
