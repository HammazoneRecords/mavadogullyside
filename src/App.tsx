import { useState, useEffect, useRef } from 'react';
import WorkingDraftBanner from './components/WorkingDraftBanner';

/* ─── Palette ─────────────────────────────────────────────────────────── */
const C = {
  topBar:   'rgba(6,7,4,0.97)',
  panel:    'rgba(10,11,7,0.90)',
  border:   'rgba(255,255,255,0.09)',
  green:    '#6B8E23',
  amber:    '#C47F17',
  wanted:   '#C01020',
  selected: '#EDEAE0',
  ash:      '#DDD8C4',
  muted:    'rgba(221,216,196,0.55)',
  dim:      'rgba(221,216,196,0.26)',
  hover:    'rgba(255,255,255,0.07)',
} as const;

const FF = {
  display: "'Bebas Neue', Impact, sans-serif",
  ui:      "'Barlow Condensed', sans-serif",
  body:    "'DM Sans', sans-serif",
} as const;

/* ─── Data ────────────────────────────────────────────────────────────── */
const TRACKS = [
  { id: 1, title: 'Real McKoy',                        year: '2005', duration: '3:41', videoId: 'ikQXIrscSPI', note: '★ Featured in Grand Theft Auto IV' },
  { id: 2, title: 'So Special',                        year: '2009', duration: '3:55', videoId: 'khzYfshc0AY', note: '' },
  { id: 3, title: 'Weh Dem A Do',                      year: '2009', duration: '3:28', videoId: 'NMZePxKt-fk', note: '' },
  { id: 4, title: 'Give It All To Me ft. Nicki Minaj', year: '2013', duration: '3:47', videoId: '0WLhst40USw', note: 'Collab with Nicki Minaj' },
  { id: 5, title: 'Survivor ft. Akon',                 year: '2011', duration: '4:02', videoId: 'NIgmgHURetk', note: 'Collab with Akon' },
  { id: 6, title: 'Life',                              year: '2020', duration: '3:33', videoId: 'FQD95AHBZ2g', note: 'Soul Survivor Riddim' },
];

const BRIEFS = [
  { label: 'Origins',         content: 'Born David Constantine Brooks in Cassava Piece, Kingston, Jamaica. Raised between the gospel choir and the street. That duality — spiritual melody over hard content — is what made Mavado sound like nothing else in dancehall.' },
  { label: 'Gully Side',      content: 'When the Gully vs Gaza rivalry defined a decade of Jamaican culture, Mavado carried the Gully Side beyond the island. This wasn\'t manufactured — it was lived. His music is the audio record of a community that needed a voice and found one.' },
  { label: 'Mansion Records', content: 'Founded Mansion Records in 2011. Debuted with "Delilah." Building a label means building infrastructure — the ability to release, own, and profit from music on his own terms. Most artists never get there.' },
  { label: 'GTA IV Feature',  content: '"Real McKoy" was licensed for the in-game radio of Grand Theft Auto IV — one of the highest-grossing entertainment products in history. One of a handful of Jamaican artists to reach that level of mainstream cultural crossover.' },
  { label: 'Legacy',          content: 'Twenty years in. 948K YouTube subscribers. 1M+ on Instagram. Toured London, New York, Toronto. Collaborated with Nicki Minaj and Akon. Signed to VP Records and DJ Khaled\'s We The Best. Dancehall from the Gully — still recording, still performing.' },
];

const STAT_GROUPS = [
  { label: 'Career',          stats: [{ name: 'Years Active', value: '20+', pct: 100 },{ name: 'Studio Albums', value: '5+', pct: 68 },{ name: 'Singles', value: '50+', pct: 84 },{ name: 'Tours Completed', value: '12+', pct: 60 }]},
  { label: 'Collaborations',  stats: [{ name: 'Nicki Minaj', value: '2013', pct: 100 },{ name: 'Akon', value: '2011', pct: 100 },{ name: 'DJ Khaled', value: 'We The Best', pct: 100 },{ name: 'Other Artists', value: '30+', pct: 78 }]},
  { label: 'Reach',           stats: [{ name: 'YouTube', value: '948K', pct: 79 },{ name: 'Instagram', value: '1M+', pct: 84 },{ name: 'Monthly Streams', value: 'Millions', pct: 91 },{ name: 'Countries Toured', value: '15+', pct: 64 }]},
  { label: 'Recognition',     stats: [{ name: 'GTA IV Radio', value: 'Certified', pct: 100 },{ name: 'VP Records', value: '2008', pct: 100 },{ name: 'We The Best', value: '2011', pct: 100 },{ name: 'VEVO', value: 'Certified', pct: 100 }]},
];

const MILESTONES = [
  { year: '2003', title: 'DEBUT',       body: 'First recordings circulate the dancehall circuit from Cassava Piece, Kingston.' },
  { year: '2005', title: 'REAL MCKOY',  body: 'Breakthrough single. Later chosen for the GTA IV in-game radio.' },
  { year: '2008', title: 'VP RECORDS',  body: '"Gangster for Life" establishes Gully Side globally. Signs to VP Records.' },
  { year: '2011', title: 'WE THE BEST', body: 'Signs with DJ Khaled\'s label. "Survivor" ft. Akon goes international. Launches Mansion Records.' },
  { year: '2013', title: 'NICKI COLLAB',body: '"Give It All To Me" crosses into mainstream pop with Nicki Minaj.' },
  { year: '2024', title: 'STILL STANDING',body: 'International touring continues. Legacy catalogue streaming millions monthly.' },
];

const MERCH_CATS = [
  { label: 'Clothing',    sub: 'DNDG Line' },
  { label: 'Accessories', sub: 'Caps & More' },
  { label: 'Music',       sub: 'Vinyl / Digital' },
  { label: 'Exclusives',  sub: 'Limited Drops' },
];

const GALLERY_CATS = [
  { label: 'Music Videos', sub: '6 Videos' },
  { label: 'Press Shots',  sub: 'Official' },
  { label: 'Live Shows',   sub: 'Archive' },
  { label: 'Cover Art',    sub: 'Singles' },
];

const LINKS_DATA = [
  { label: 'Instagram',   value: '@mavadogully',       sub: '1M+ Followers',    href: 'https://www.instagram.com/mavadogully/' },
  { label: 'YouTube',     value: 'Mavado Gully Official', sub: '948K Subscribers', href: 'https://www.youtube.com/channel/UCgF4x1ZWVpDP1Msr0iXu7sw' },
  { label: 'Spotify',     value: 'Mavado',             sub: 'Stream Now',        href: 'https://open.spotify.com/search/mavado' },
  { label: 'Apple Music', value: 'Mavado',             sub: 'Listen Now',        href: 'https://music.apple.com/search?term=mavado' },
];

/* ─── Tab config ──────────────────────────────────────────────────────── */
type Tab = 'home' | 'music' | 'merch' | 'brief' | 'stats' | 'legacy' | 'videos' | 'gallery' | 'links';

const TABS: { id: Tab; label: string }[] = [
  { id: 'home',    label: 'HOME'    },
  { id: 'music',   label: 'MUSIC'   },
  { id: 'merch',   label: 'MERCH'   },
  { id: 'brief',   label: 'BRIEF'   },
  { id: 'stats',   label: 'STATS'   },
  { id: 'legacy',  label: 'LEGACY'  },
  { id: 'videos',  label: 'VIDEOS'  },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'links',   label: 'LINKS'   },
];

/* Per-tab background gradients (override with image when available) */
const TAB_BG: Record<Tab, string> = {
  home:    'linear-gradient(160deg,#1A1C12 0%,#0E100A 100%)',
  music:   'linear-gradient(160deg,#141810 0%,#0A0C08 100%)',
  merch:   'linear-gradient(160deg,#181410 0%,#100C08 100%)',
  brief:   'linear-gradient(160deg,#101418 0%,#080C10 100%)',
  stats:   'linear-gradient(160deg,#101618 0%,#080E10 100%)',
  legacy:  'linear-gradient(160deg,#181510 0%,#100D08 100%)',
  videos:  'linear-gradient(160deg,#141810 0%,#0A0C08 100%)',
  gallery: 'linear-gradient(160deg,#141018 0%,#0C0810 100%)',
  links:   'linear-gradient(160deg,#101818 0%,#081010 100%)',
};

function ytThumb(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

/* ─── Background layer ────────────────────────────────────────────────── */
function BgLayer({ tab, sel }: { tab: Tab; sel: number }) {
  const useThumb = tab === 'music' || tab === 'videos' || tab === 'gallery';
  const thumbId  = TRACKS[Math.min(sel, TRACKS.length - 1)]?.videoId;
  const bg       = useThumb && thumbId
    ? `url(${ytThumb(thumbId)}) center/cover no-repeat`
    : TAB_BG[tab];

  return (
    <div key={`${tab}-${sel}`} style={{
      position: 'absolute', inset: 0, zIndex: 0,
      background: bg,
      filter: 'blur(10px) brightness(0.28) saturate(0.5)',
      transform: 'scale(1.06)',
      transition: 'background 0.5s ease',
    }} />
  );
}

/* ─── Intro / Preload screen ──────────────────────────────────────────── */
function IntroScreen({ onEnter }: { onEnter: () => void }) {
  const [progress, setProgress] = useState(0);
  const [videoErr, setVideoErr] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const start = Date.now();
    const duration = 5000;
    const frame = () => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100);
      setProgress(p);
      if (p < 100) requestAnimationFrame(frame);
      else onEnter();
    };
    requestAnimationFrame(frame);
  }, []);

  return (
    <div onClick={onEnter} style={{ position: 'fixed', inset: 0, zIndex: 9999, cursor: 'pointer', overflow: 'hidden', background: '#080905' }}>
      {/* Background video — plays /intro.mp4 if provided */}
      {!videoErr && (
        <video ref={videoRef} autoPlay muted loop playsInline
          onError={() => setVideoErr(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45, filter: 'saturate(0.4) brightness(0.7)' }}>
          <source src="/intro.mp4" type="video/mp4" />
        </video>
      )}
      {/* Fallback atmospheric bg */}
      {videoErr && (
        <div style={{ position: 'absolute', inset: 0, background: `url(${ytThumb('ikQXIrscSPI')}) center/cover no-repeat`, filter: 'blur(8px) brightness(0.25) saturate(0.4)', transform: 'scale(1.05)' }} />
      )}

      {/* Scanlines */}
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg,transparent 0px,transparent 3px,rgba(0,0,0,0.08) 3px,rgba(0,0,0,0.08) 4px)', pointerEvents: 'none' }} />

      {/* Dark overlay gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.2) 60%,rgba(0,0,0,0.5) 100%)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 60px 80px' }}>
        {/* Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ width: 32, height: 2, background: C.green }} />
          <span style={{ fontFamily: FF.ui, fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase', color: C.green }}>Gully Side · Kingston, Jamaica</span>
        </div>

        {/* Name */}
        <h1 style={{ fontFamily: FF.display, fontSize: 'clamp(80px, 16vw, 180px)', lineHeight: 0.85, letterSpacing: 4, color: C.ash, marginBottom: 24 }}>
          MAVADO
        </h1>

        {/* GTA callout */}
        <p style={{ fontFamily: FF.ui, fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: C.amber, marginBottom: 48 }}>
          ★ Real McKoy — As Heard In Grand Theft Auto IV ★
        </p>

        {/* Loading bar */}
        <div style={{ maxWidth: 480 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: C.dim }}>Loading Legacy...</span>
            <span style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 2, color: C.green }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
            <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(to right, ${C.green}, #8FB02A)`, borderRadius: 2, transition: 'width 0.1s linear' }} />
          </div>
          <p className="blink" style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 4, color: C.dim, marginTop: 16, textAlign: 'right' }}>PRESS ANYWHERE TO ENTER</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Components ──────────────────────────────────────────────────────── */

function StatBar({ name, value, pct }: { name: string; value: string; pct: number }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontFamily: FF.ui, fontSize: 13, fontWeight: 600, letterSpacing: 1, color: C.ash }}>{name}</span>
        <span style={{ fontFamily: FF.ui, fontSize: 13, letterSpacing: 1, color: C.green }}>{value}</span>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(to right,${C.green},#8FB02A)`, borderRadius: 2 }} />
      </div>
    </div>
  );
}

/* ─── Dropdown ────────────────────────────────────────────────────────── */
function Dropdown({ tab, sel, setSel, dropKey }: { tab: Tab; sel: number; setSel: (i: number) => void; dropKey: number }) {
  // Tabs with no left dropdown
  if (tab === 'home') return null;

  const items: { label: string; sub?: string }[] = (() => {
    switch (tab) {
      case 'music':   return TRACKS.map(t => ({ label: t.title, sub: t.year }));
      case 'merch':   return MERCH_CATS;
      case 'brief':   return BRIEFS.map(b => ({ label: b.label }));
      case 'stats':   return STAT_GROUPS.map(g => ({ label: g.label }));
      case 'legacy':  return MILESTONES.map(m => ({ label: m.title, sub: m.year }));
      case 'videos':  return TRACKS.map(t => ({ label: t.title, sub: t.year }));
      case 'gallery': return GALLERY_CATS;
      case 'links':   return LINKS_DATA.map(l => ({ label: l.label, sub: l.sub }));
      default:        return [];
    }
  })();

  return (
    <div key={dropKey} className="drop-in" style={{
      position: 'absolute', top: 0, left: 0, width: 288, zIndex: 20,
      background: C.panel,
      borderRight: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
      transformOrigin: 'top left',
    }}>
      {items.map((item, i) => {
        const [hov, setHov] = useState(false);
        const active = sel === i;
        return (
          <button key={i} onClick={() => setSel(i)}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', padding: '11px 18px', textAlign: 'left',
              background: active ? C.selected : hov ? C.hover : 'transparent',
              border: 'none', borderBottom: `1px solid ${C.border}`,
              cursor: 'pointer', transition: 'background 0.1s',
              animation: `itemReveal 0.18s ease-out ${i * 28}ms both`,
            }}>
            <span style={{ fontFamily: FF.ui, fontSize: 14, fontWeight: 600, letterSpacing: 0.5, color: active ? '#0A0906' : C.ash }}>{item.label}</span>
            {item.sub && <span style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 0.5, color: active ? 'rgba(0,0,0,0.4)' : C.dim }}>{item.sub}</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Right panel content ─────────────────────────────────────────────── */

function HomeContent() {
  return (
    <div style={{ padding: '48px 56px', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: C.green, marginBottom: 10 }}>Gully Side · Kingston, Jamaica</p>
      <h1 style={{ fontFamily: FF.display, fontSize: 'clamp(56px, 10vw, 120px)', letterSpacing: 4, color: C.ash, lineHeight: 0.9, marginBottom: 24 }}>MAVADO</h1>
      <div style={{ width: 56, height: 3, background: C.green, marginBottom: 28 }} />
      <p style={{ fontFamily: FF.body, fontSize: 15, color: C.muted, maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
        Twenty years of dancehall. Kingston streets to Grand Theft Auto IV. Gangsta gospel from the Gully — the voice that defined a generation.
      </p>
      {/* Callout */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, background: 'rgba(196,127,23,0.1)', border: `1px solid rgba(196,127,23,0.3)`, padding: '14px 24px', marginBottom: 40, maxWidth: 'max-content' }}>
        <span style={{ fontFamily: FF.ui, fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: C.amber }}>★ Real McKoy featured in Grand Theft Auto IV</span>
      </div>
      {/* Stat row */}
      <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        {[{ n: '948K', l: 'YouTube' },{ n: '1M+', l: 'Instagram' },{ n: '20+', l: 'Yrs Active' },{ n: 'GTA IV', l: 'Featured' }].map(s => (
          <div key={s.l}>
            <p style={{ fontFamily: FF.display, fontSize: 30, letterSpacing: 2, color: C.green, lineHeight: 1 }}>{s.n}</p>
            <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: C.dim, marginTop: 3 }}>{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MusicContent({ sel }: { sel: number }) {
  const t = TRACKS[sel];
  if (!t) return null;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '18px 24px 14px', borderBottom: `1px solid ${C.border}`, background: 'rgba(0,0,0,0.35)' }}>
        <p style={{ fontFamily: FF.display, fontSize: 26, letterSpacing: 2, color: C.ash, lineHeight: 1 }}>{t.title}</p>
        <div style={{ display: 'flex', gap: 20, marginTop: 5 }}>
          <span style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 2, color: C.green }}>{t.year}</span>
          <span style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 1, color: C.dim }}>{t.duration}</span>
          {t.note && <span style={{ fontFamily: FF.ui, fontSize: 11, color: C.amber }}>{t.note}</span>}
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative', background: '#000' }}>
        <iframe key={t.videoId} src={`https://www.youtube.com/embed/${t.videoId}?rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
      </div>
    </div>
  );
}

function MerchContent({ sel }: { sel: number }) {
  const cat = MERCH_CATS[sel];
  return (
    <div style={{ padding: '36px 40px', height: '100%', overflowY: 'auto' }}>
      <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: C.green, marginBottom: 8 }}>Store</p>
      <p style={{ fontFamily: FF.display, fontSize: 36, letterSpacing: 2, color: C.ash, marginBottom: 24, lineHeight: 1 }}>{cat?.label.toUpperCase() ?? 'MERCH'}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 12 }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ width: 40, height: 40, background: 'rgba(107,142,35,0.15)', border: `1px solid rgba(107,142,35,0.2)`, borderRadius: 2 }} />
            <span style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: C.dim }}>Coming Soon</span>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: FF.body, fontSize: 13, color: C.muted, marginTop: 24, lineHeight: 1.7 }}>
        Official Mavado merchandise coming soon. DNDG Clothing line available through official channels.
      </p>
    </div>
  );
}

function BriefContent({ sel }: { sel: number }) {
  const b = BRIEFS[sel];
  if (!b) return null;
  return (
    <div style={{ padding: '36px 40px', height: '100%', overflowY: 'auto' }}>
      <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: C.green, marginBottom: 8 }}>Mission Brief</p>
      <p style={{ fontFamily: FF.display, fontSize: 36, letterSpacing: 2, color: C.ash, marginBottom: 24, lineHeight: 1 }}>{b.label.toUpperCase()}</p>
      <div style={{ width: 40, height: 2, background: C.green, marginBottom: 24 }} />
      <p style={{ fontFamily: FF.body, fontSize: 15, color: C.muted, lineHeight: 1.85 }}>{b.content}</p>
    </div>
  );
}

function StatsContent({ sel }: { sel: number }) {
  const g = STAT_GROUPS[sel];
  if (!g) return null;
  return (
    <div style={{ padding: '36px 40px', height: '100%', overflowY: 'auto' }}>
      <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: C.green, marginBottom: 8 }}>Statistics</p>
      <p style={{ fontFamily: FF.display, fontSize: 36, letterSpacing: 2, color: C.ash, marginBottom: 28, lineHeight: 1 }}>{g.label.toUpperCase()}</p>
      {g.stats.map(s => <StatBar key={s.name} {...s} />)}
    </div>
  );
}

function LegacyContent({ sel }: { sel: number }) {
  const m = MILESTONES[sel];
  if (!m) return null;
  const done = MILESTONES.slice(0, sel);
  const pct = Math.round(((sel + 1) / MILESTONES.length) * 100);
  return (
    <div style={{ padding: '36px 40px', height: '100%', overflowY: 'auto' }}>
      <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: C.green, marginBottom: 8 }}>Mission Log</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <span style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 2, color: C.dim }}>CAREER PROGRESS</span>
        <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
          <div style={{ width: `${pct}%`, height: '100%', background: C.green, borderRadius: 2, transition: 'width 0.4s' }} />
        </div>
        <span style={{ fontFamily: FF.ui, fontSize: 11, color: C.green }}>{pct}%</span>
      </div>
      {done.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, opacity: 0.4 }}>
          <span style={{ color: C.green, fontFamily: FF.ui, fontSize: 13, flexShrink: 0 }}>✓</span>
          <span style={{ fontFamily: FF.ui, fontSize: 12, color: C.ash }}>{p.year} — {p.title} · <span style={{ color: C.green, fontSize: 10, letterSpacing: 2 }}>OBJECTIVE COMPLETE</span></span>
        </div>
      ))}
      <div style={{ background: 'rgba(107,142,35,0.08)', border: `1px solid rgba(107,142,35,0.25)`, padding: '16px 20px', marginTop: done.length ? 16 : 0 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 8 }}>
          <span style={{ fontFamily: FF.display, fontSize: 30, letterSpacing: 2, color: C.green }}>{m.year}</span>
          <span style={{ fontFamily: FF.ui, fontSize: 14, fontWeight: 700, letterSpacing: 2, color: C.ash }}>{m.title}</span>
        </div>
        <p style={{ fontFamily: FF.body, fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{m.body}</p>
      </div>
    </div>
  );
}

function VideosContent({ sel }: { sel: number }) {
  const t = TRACKS[sel];
  if (!t) return null;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}`, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 3, height: 18, background: C.green }} />
        <p style={{ fontFamily: FF.display, fontSize: 20, letterSpacing: 2, color: C.ash }}>{t.title}</p>
        <span style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 2, color: C.dim, marginLeft: 'auto' }}>{t.year}</span>
      </div>
      <div style={{ flex: 1, position: 'relative', background: '#000' }}>
        <iframe key={t.videoId} src={`https://www.youtube.com/embed/${t.videoId}?rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
      </div>
    </div>
  );
}

function GalleryContent({ sel }: { sel: number }) {
  if (sel === 0) {
    return (
      <div style={{ padding: '28px', height: '100%', overflowY: 'auto' }}>
        <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: C.green, marginBottom: 16 }}>Music Videos</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 3 }}>
          {TRACKS.map(t => (
            <a key={t.id} href={`https://www.youtube.com/watch?v=${t.videoId}`} target="_blank" rel="noopener noreferrer"
              style={{ position: 'relative', aspectRatio: '16/9', display: 'block', overflow: 'hidden', textDecoration: 'none' }}>
              <img src={ytThumb(t.videoId)} alt={t.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s, filter 0.3s', filter: 'brightness(0.75)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; (e.currentTarget as HTMLImageElement).style.filter = 'brightness(1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.75)'; }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '6px 10px', background: 'linear-gradient(to top,rgba(0,0,0,0.85),transparent)' }}>
                <p style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 1, color: C.ash, lineHeight: 1 }}>{t.title}</p>
                <p style={{ fontFamily: FF.ui, fontSize: 9, color: C.green, letterSpacing: 2 }}>{t.year}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div style={{ padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: FF.display, fontSize: 28, letterSpacing: 3, color: C.ash, marginBottom: 12 }}>{GALLERY_CATS[sel]?.label.toUpperCase()}</p>
        <p style={{ fontFamily: FF.ui, fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: C.dim }}>Coming Soon</p>
      </div>
    </div>
  );
}

function LinksContent({ sel }: { sel: number }) {
  const l = LINKS_DATA[sel];
  if (!l) return null;
  return (
    <div style={{ padding: '36px 40px', height: '100%', overflowY: 'auto' }}>
      <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: C.green, marginBottom: 8 }}>Online</p>
      <p style={{ fontFamily: FF.display, fontSize: 36, letterSpacing: 2, color: C.ash, marginBottom: 24, lineHeight: 1 }}>{l.label.toUpperCase()}</p>
      <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, padding: '20px 24px', marginBottom: 20 }}>
        <p style={{ fontFamily: FF.ui, fontSize: 18, fontWeight: 600, color: C.ash, marginBottom: 4 }}>{l.value}</p>
        <p style={{ fontFamily: FF.body, fontSize: 13, color: C.green }}>{l.sub}</p>
      </div>
      <a href={l.href} target="_blank" rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', fontFamily: FF.ui, fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#0A0906', background: C.ash, padding: '12px 28px', textDecoration: 'none', transition: 'opacity 0.2s' }}
        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.85')}
        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}>
        Open →
      </a>
    </div>
  );
}

function RightContent({ tab, sel }: { tab: Tab; sel: number }) {
  switch (tab) {
    case 'home':    return <HomeContent />;
    case 'music':   return <MusicContent   sel={sel} />;
    case 'merch':   return <MerchContent   sel={sel} />;
    case 'brief':   return <BriefContent   sel={sel} />;
    case 'stats':   return <StatsContent   sel={sel} />;
    case 'legacy':  return <LegacyContent  sel={sel} />;
    case 'videos':  return <VideosContent  sel={sel} />;
    case 'gallery': return <GalleryContent sel={sel} />;
    case 'links':   return <LinksContent   sel={sel} />;
  }
}

/* ─── Chrome ──────────────────────────────────────────────────────────── */

function TopBar({ now }: { now: Date }) {
  const days = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  return (
    <div style={{ height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', background: C.topBar, borderBottom: `1px solid ${C.border}`, flexShrink: 0, position: 'relative', zIndex: 30 }}>
      <span style={{ fontFamily: FF.display, fontSize: 20, letterSpacing: 4, color: C.ash }}>MAVADO GULLY SIDE</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontFamily: FF.ui, fontSize: 14, fontWeight: 700, letterSpacing: 2, color: C.ash, lineHeight: 1.2 }}>DAVID BROOKS</p>
          <p style={{ fontFamily: FF.ui, fontSize: 11, color: C.dim, letterSpacing: 1 }}>{days[now.getDay()]} {h}:{m}</p>
          <p style={{ fontFamily: FF.ui, fontSize: 11, color: C.green, fontWeight: 700 }}>$74,034,729.34</p>
        </div>
        <div style={{ width: 50, height: 50, background: 'linear-gradient(135deg,#2E3120,#1A1C12)', border: `1px solid rgba(107,142,35,0.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: FF.display, fontSize: 18, letterSpacing: 1, color: C.green }}>DB</span>
        </div>
      </div>
    </div>
  );
}

function TabBar({ active, setActive }: { active: Tab; setActive: (t: Tab) => void }) {
  return (
    <div style={{ height: 44, display: 'flex', alignItems: 'stretch', background: 'rgba(8,9,5,0.96)', borderBottom: `1px solid ${C.border}`, flexShrink: 0, position: 'relative', zIndex: 30, overflowX: 'auto' }}>
      <div style={{ padding: '0 12px', display: 'flex', alignItems: 'center', color: C.dim, flexShrink: 0, fontFamily: FF.ui, fontSize: 11 }}>◄</div>
      {TABS.map(tab => (
        <button key={tab.id} onClick={() => setActive(tab.id)}
          style={{
            flex: 1, minWidth: 68, fontFamily: FF.ui, fontSize: 12, fontWeight: 700, letterSpacing: 3,
            color: active === tab.id ? C.ash : C.dim,
            background: 'transparent', border: 'none', cursor: 'pointer',
            borderBottom: active === tab.id ? `3px solid ${C.ash}` : '3px solid transparent',
            transition: 'color 0.15s, border-color 0.15s', paddingBottom: 2,
          }}>
          {tab.label}
        </button>
      ))}
      <div style={{ padding: '0 12px', display: 'flex', alignItems: 'center', color: C.dim, flexShrink: 0, fontFamily: FF.ui, fontSize: 11 }}>►</div>
    </div>
  );
}

function BottomBar() {
  return (
    <div style={{ height: 42, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', background: C.topBar, borderTop: `1px solid ${C.border}`, flexShrink: 0, position: 'relative', zIndex: 30 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 17, height: 17, borderRadius: '50%', background: '#C0392B', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff', fontWeight: 900, fontFamily: FF.ui }}>B</span>
        <span style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 2, color: C.dim }}>Back</span>
      </div>
      <span style={{ fontFamily: FF.ui, fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: C.dim }}>mavadogullyside.com</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 2, color: C.dim }}>Select</span>
        <span style={{ width: 17, height: 17, borderRadius: '50%', background: '#27AE60', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff', fontWeight: 900, fontFamily: FF.ui }}>A</span>
      </div>
    </div>
  );
}

/* ─── App ─────────────────────────────────────────────────────────────── */
export default function App() {
  const [intro, setIntro]   = useState(true);
  const [tab, setTab]       = useState<Tab>('home');
  const [sel, setSel]       = useState(0);
  const [dropKey, setDropKey] = useState(0);
  const [now, setNow]       = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const changeTab = (t: Tab) => {
    setTab(t);
    setSel(0);
    setDropKey(k => k + 1); // re-trigger drop animation
  };

  if (intro) return <IntroScreen onEnter={() => setIntro(false)} />;

  const hasDropdown = tab !== 'home';

  return (
    <div className="scanlines" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Background */}
      <BgLayer tab={tab} sel={sel} />

      {/* UI stack */}
      <TopBar now={now} />
      <TabBar active={tab} setActive={changeTab} />

      {/* Main area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* Floating dropdown — auto height, only as tall as items */}
        <Dropdown tab={tab} sel={sel} setSel={setSel} dropKey={dropKey} />

        {/* Content — offset right of dropdown when dropdown present */}
        <div style={{
          position: 'absolute', inset: 0,
          paddingLeft: hasDropdown ? 288 : 0,
          transition: 'padding-left 0.2s ease',
          overflow: 'hidden',
        }}>
          <RightContent tab={tab} sel={sel} />
        </div>
      </div>

      <BottomBar />
      <WorkingDraftBanner artist="Mavado" />
    </div>
  );
}
