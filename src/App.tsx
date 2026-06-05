import { useState, useEffect, useRef, useCallback } from 'react';
import WorkingDraftBanner from './components/WorkingDraftBanner';

declare global { interface Window { YT: any; onYouTubeIframeAPIReady: () => void; } }

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 640);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return mobile;
}

/* ─── Palette ─────────────────────────────────────────────────────────── */
const C = {
  topBar:   'rgba(6,7,4,0.72)',
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
  { id:  1, title: 'Star Bwoy', year: '',     duration: '--:--', videoId: 'usSj7U6vOtM', note: '' },
  { id:  2, title: 'Big Money', year: '',     duration: '--:--', videoId: '93l9e9mgpWI', note: '' },
  { id:  3, title: 'Give It All To Me ft. Nicki Minaj', year: '2013', duration: '--:--', videoId: '9sbuoFy32Kc', note: 'Collab with Nicki Minaj' },
  { id:  4, title: 'Holy Mountain ft. Buju Banton, Sizzla, 070 Shake', year: '', duration: '--:--', videoId: 'LJvwEuMHero', note: 'Collab with Buju Banton, Sizzla, 070 Shake' },
  { id:  5, title: 'Father God', year: '',     duration: '--:--', videoId: 'tyYsGH0oPbg', note: '' },
  { id:  6, title: '21 Psalm', year: '',     duration: '--:--', videoId: '7DXw1ikJCuo', note: '' },
  { id:  7, title: "I'm on the Rock", year: '', duration: '--:--', videoId: 'tx_6i-sH4Zk', note: '' },
  { id:  8, title: "Can't Take Wi Life ft. Di Genius", year: '', duration: '--:--', videoId: 'msy42nVSZG8', note: 'ft. Di Genius' },
  { id:  9, title: 'Bad & BBC Rick', year: '', duration: '--:--', videoId: 'HsaXkeejbEA', note: 'ft. BBC Rick' },
  { id: 10, title: 'Progress',      year: '', duration: '--:--', videoId: '4lrdVWbNb24', note: '' },
];

const BRIEFS = [
  { label: 'Origins',         content: 'Born David Constantine Brooks in Cassava Piece, Kingston, Jamaica. Raised between the gospel choir and the street. That duality — spiritual melody over hard content — is what made Mavado sound like nothing else in dancehall.' },
  { label: 'Gully Side',      content: 'When the Gully vs Gaza rivalry defined a decade of Jamaican culture, Mavado carried the Gully Side beyond the island. This wasn\'t manufactured — it was lived. His music is the audio record of a community that needed a voice and found one.' },
  { label: 'Mansion Records', content: 'Founded Mansion Records in 2011. Debuted with "Delilah." Building a label means building infrastructure — the ability to release, own, and profit from music on his own terms. Most artists never get there.' },
  { label: 'Cultural Reach',  content: 'One of a handful of Jamaican artists to reach mainstream pop crossover — collaborations with Nicki Minaj and Akon, signed to DJ Khaled\'s We The Best, distributed by VP Records globally. Dancehall from the Gully, heard worldwide.' },
  { label: 'Legacy',          content: 'Twenty years in. 948K YouTube subscribers. 1M+ on Instagram. Toured London, New York, Toronto. Collaborated with Nicki Minaj and Akon. Signed to VP Records and DJ Khaled\'s We The Best. Dancehall from the Gully — still recording, still performing.' },
];

const STAT_GROUPS = [
  { label: 'Career',          stats: [{ name: 'Years Active', value: '20+', pct: 100 },{ name: 'Studio Albums', value: '5+', pct: 68 },{ name: 'Singles', value: '50+', pct: 84 },{ name: 'Tours Completed', value: '12+', pct: 60 }]},
  { label: 'Collaborations',  stats: [{ name: 'Nicki Minaj', value: '2013', pct: 100 },{ name: 'Akon', value: '2011', pct: 100 },{ name: 'DJ Khaled', value: 'We The Best', pct: 100 },{ name: 'Other Artists', value: '30+', pct: 78 }]},
  { label: 'Reach',           stats: [{ name: 'YouTube', value: '948K', pct: 79 },{ name: 'Instagram', value: '1M+', pct: 84 },{ name: 'Monthly Streams', value: 'Millions', pct: 91 },{ name: 'Countries Toured', value: '15+', pct: 64 }]},
  { label: 'Recognition',     stats: [{ name: 'VP Records', value: '2008', pct: 100 },{ name: 'We The Best', value: '2011', pct: 100 },{ name: 'VEVO', value: 'Certified', pct: 100 },{ name: 'Mansion Records', value: '2011', pct: 100 }]},
];


const MERCH_CATS = [
  { label: 'Clothing',    sub: 'DNDG Line' },
  { label: 'Accessories', sub: 'Caps & More' },
  { label: 'Music',       sub: 'Vinyl / Digital' },
  { label: 'Exclusives',  sub: 'Limited Drops' },
];

const GALLERY_CATS = [
  { label: 'Press Shots', sub: '4 Photos' },
  { label: 'Live Shows',  sub: '4 Videos' },
];

const LIVE_SHOWS = [
  { videoId: 'SZyQi7LNaEQ', title: 'Reggae Land UK 2025',                year: '2025' },
  { videoId: 'BOPlsoRjMf4', title: 'Bounty Killer Concert — Big Guns',   year: '2025' },
  { videoId: 'n-o7BP__sRM', title: 'Reggae Sumfest 2017 (Part 1 of 3)',  year: '2017' },
  { videoId: 'uPEsMXCt9-0', title: 'Mavado New Rules',                   year: ''     },
];

const PRESS_SHOTS = [
  { src: 'https://i.discogs.com/Bs0cxnGVOvaMybJHcwJDwznvugtiH1C6OUfQ_2eDIbI/rs:fit/g:sm/q:90/h:600/w:457/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTY0OTQy/My0xNjQzMTc4NTU1/LTU5NDMuanBlZw.jpeg', label: 'Official Press' },
  { src: 'https://bookingagentinfo.com/wp-content/uploads/2024/02/ab6761610000e5ebee1f859751c6e17cbe3b30e3.jpg', label: 'Artist Portrait' },
  { src: 'https://jamaicans.com/wp-content/uploads/Top-9-Mavado-Songs.jpg', label: 'Promo Shot' },
  { src: 'https://static.wixstatic.com/media/746148_bd5651b1d3ae4e8f8feee40115d78f2e~mv2.jpg/v1/fill/w_829,h_958,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/746148_bd5651b1d3ae4e8f8feee40115d78f2e~mv2.jpg', label: 'Stage Shot' },
];

const LINKS_DATA = [
  { label: 'Instagram',   value: '@mavadogully',       sub: '1M+ Followers',    href: 'https://www.instagram.com/mavadogully/' },
  { label: 'YouTube',     value: 'Mavado Gully Official', sub: '948K Subscribers', href: 'https://www.youtube.com/channel/UCgF4x1ZWVpDP1Msr0iXu7sw' },
  { label: 'Spotify',     value: 'Mavado',             sub: 'Stream Now',        href: 'https://open.spotify.com/search/mavado' },
  { label: 'Apple Music', value: 'Mavado',             sub: 'Listen Now',        href: 'https://music.apple.com/search?term=mavado' },
];

/* ─── Tab config ──────────────────────────────────────────────────────── */
type Tab = 'home' | 'music' | 'merch' | 'storyline' | 'stats' | 'gallery' | 'links';

const TABS: { id: Tab; label: string }[] = [
  { id: 'home',      label: 'HOME'      },
  { id: 'music',     label: 'MUSIC'     },
  { id: 'merch',     label: 'MERCH'     },
  { id: 'storyline', label: 'STORYLINE' },
  { id: 'stats',     label: 'STATS'     },
  { id: 'gallery',   label: 'ARCHIVE'   },
  { id: 'links',     label: 'LINKS'     },
];

/* Per-tab background gradients (override with image when available) */
const TAB_BG: Record<Tab, string> = {
  home:    'linear-gradient(160deg,#1A1C12 0%,#0E100A 100%)', // handled by BgLayer directly
  music:   'linear-gradient(160deg,#141810 0%,#0A0C08 100%)',
  merch:   'linear-gradient(160deg,#181410 0%,#100C08 100%)',
  storyline: 'linear-gradient(160deg,#101418 0%,#080C10 100%)',
  stats:   'linear-gradient(160deg,#101618 0%,#080E10 100%)',
  gallery: 'linear-gradient(160deg,#141018 0%,#0C0810 100%)',
  links:   'linear-gradient(160deg,#101818 0%,#081010 100%)',
};

function ytThumb(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

const REAL_PHOTO = "/288591b1-b703-4fc9-8a2b-2c04136250fd (1).jpg";
const GTA_PHOTO  = "/Gemini_Generated_Image_5gjbjk5gjbjk5gjb.png";
const CROP_POS   = "center top";

/* ─── Background layer ────────────────────────────────────────────────── */
function BgLayer({ tab, sel, frozen }: { tab: Tab; sel: number; frozen: boolean }) {
  const useThumb = tab === 'music' || tab === 'gallery';
  const thumbId  = TRACKS[Math.min(sel, TRACKS.length - 1)]?.videoId;
  const bg       = useThumb && thumbId
    ? `url(${ytThumb(thumbId)}) center/cover no-repeat`
    : TAB_BG[tab];

  if (tab === 'home') {
    return (
      <div key="home-bg" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Real photo — base layer */}
        <img
          src={REAL_PHOTO}
          alt=""
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: CROP_POS,
            filter: 'brightness(0.22) saturate(0.5)',
          }}
        />
        {/* GTA illustration — crossfades in after delay, slight blur for paused-menu depth */}
        <img
          src={GTA_PHOTO}
          alt=""
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: CROP_POS,
            filter: frozen ? 'brightness(0.2) saturate(0.55) blur(1.4px)' : 'brightness(0.2) saturate(0.55) blur(0px)',
            opacity: frozen ? 1 : 0,
            transition: 'opacity 2.8s ease-in-out, filter 2.8s ease-in-out',
            transform: 'scale(1.03)',
          }}
        />
        {/* Dark vignette overlay — paused menu feel */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.45) 100%)',
        }} />
        {/* Subtle scanlines */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg,transparent 0px,transparent 3px,rgba(0,0,0,0.07) 3px,rgba(0,0,0,0.07) 4px)',
        }} />
      </div>
    );
  }

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

/* ─── GTA Loading Screen (2s) ────────────────────────────────────────── */
function GTALoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#080905', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Scanlines */}
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg,transparent 0px,transparent 3px,rgba(0,0,0,0.08) 3px,rgba(0,0,0,0.08) 4px)', pointerEvents: 'none' }} />

      {/* Center wordmark */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: FF.display, fontSize: 'clamp(28px,6vw,56px)', letterSpacing: 5, color: C.ash, lineHeight: 1 }}>MAVADO</p>
        <p style={{ fontFamily: FF.ui, fontSize: 9, letterSpacing: 5, textTransform: 'uppercase', color: C.green, marginTop: 6 }}>Gully Side</p>
      </div>

      {/* Bottom-right GTA spinner */}
      <div style={{ position: 'absolute', bottom: 24, right: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: FF.ui, fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: C.dim }}>Loading</span>
        <div style={{ position: 'relative', width: 20, height: 20 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1.5px solid rgba(221,216,196,0.12)` }} />
          <div className="gta-spin" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1.5px solid transparent`, borderTopColor: C.ash, borderRightColor: 'rgba(221,216,196,0.35)' }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Intro / Preload screen ──────────────────────────────────────────── */
function IntroScreen({ onEnter }: { onEnter: () => void }) {
  const [progress, setProgress] = useState(0);
  const [videoErr, setVideoErr] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const start = Date.now();
    const duration = 9000;
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
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(0px,4vw,0px) clamp(20px,6vw,60px) clamp(40px,7vh,80px)' }}>
        {/* Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ width: 32, height: 2, background: C.green }} />
          <span style={{ fontFamily: FF.ui, fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase', color: C.green }}>Cassava Piece · Kingston, Jamaica</span>
        </div>

        {/* Name */}
        <h1 style={{ fontFamily: FF.display, fontSize: 'clamp(80px, 16vw, 180px)', lineHeight: 0.85, letterSpacing: 4, color: C.ash, marginBottom: 24 }}>
          MAVADO
        </h1>

        {/* Loading bar */}
        <div style={{ maxWidth: 480 }}>
          <div style={{ position: 'relative', height: 16, marginBottom: 10 }}>
            {/* Track */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(to right, ${C.green}, #8FB02A)`, borderRadius: 2, transition: 'width 0.1s linear' }} />
            </div>
            {/* Percentage rides the tip */}
            <span style={{
              position: 'absolute', bottom: 6,
              left: `${Math.min(progress, 96)}%`,
              transform: 'translateX(-50%)',
              fontFamily: FF.ui, fontSize: 9, letterSpacing: 1,
              color: C.green, whiteSpace: 'nowrap',
              transition: 'left 0.1s linear',
            }}>{Math.round(progress)}%</span>
          </div>
          <p className="blink" style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 4, color: C.dim }}>PRESS ANYWHERE TO ENTER</p>
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
function DropItem({ item, index, active, onSelect }: { item: { label: string; sub?: string }; index: number; active: boolean; onSelect: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onSelect}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', padding: '11px 18px', textAlign: 'left',
        background: active ? C.selected : hov ? C.hover : 'transparent',
        border: 'none', borderBottom: `1px solid ${C.border}`,
        cursor: 'pointer', transition: 'background 0.1s',
        animation: `itemReveal 0.18s ease-out ${index * 28}ms both`,
      }}>
      <span style={{ fontFamily: FF.ui, fontSize: 14, fontWeight: 600, letterSpacing: 0.5, color: active ? '#0A0906' : C.ash }}>{item.label}</span>
      {item.sub && <span style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 0.5, color: active ? 'rgba(0,0,0,0.4)' : C.dim }}>{item.sub}</span>}
    </button>
  );
}

function Dropdown({ tab, sel, setSel, dropKey, onTrackSelect }: { tab: Tab; sel: number; setSel: (i: number) => void; dropKey: number; onTrackSelect?: (i: number) => void }) {
  // Tabs with no left dropdown
  if (tab === 'home') return null;

  const items: { label: string; sub?: string }[] = (() => {
    switch (tab) {
      case 'music':   return TRACKS.map(t => ({ label: t.title, sub: t.year }));
      case 'merch':   return MERCH_CATS;
      case 'storyline': return BRIEFS.map(b => ({ label: b.label }));
      case 'stats':   return STAT_GROUPS.map(g => ({ label: g.label }));
      case 'gallery': return GALLERY_CATS;
      case 'links':   return LINKS_DATA.map(l => ({ label: l.label, sub: l.sub }));
      default:        return [];
    }
  })();

  const isMobile = useIsMobile();
  return (
    <div key={dropKey} className="drop-in" style={{
      position: isMobile ? 'relative' : 'absolute',
      top: 0, left: 0,
      width: isMobile ? '100%' : 288,
      zIndex: 20,
      background: C.panel,
      borderRight: isMobile ? 'none' : `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
      transformOrigin: 'top left',
    }}>
      {items.map((item, i) => (
        <DropItem key={i} item={item} index={i} active={sel === i} onSelect={() => {
          setSel(i);
          if (tab === 'music' && onTrackSelect) onTrackSelect(i);
        }} />
      ))}
    </div>
  );
}

/* ─── Right panel content ─────────────────────────────────────────────── */

function HomeContent() {
  const isMobile = useIsMobile();
  return (
    <div style={{ padding: isMobile ? '32px 20px' : '48px 56px', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: C.green, marginBottom: 10 }}>Cassava Piece · Kingston, Jamaica</p>
      <h1 style={{ fontFamily: FF.display, fontSize: 'clamp(48px, 10vw, 120px)', letterSpacing: 4, color: C.ash, lineHeight: 0.9, marginBottom: 24 }}>MAVADO</h1>
      <div style={{ width: 56, height: 3, background: C.green, marginBottom: 28 }} />
      <p style={{ fontFamily: FF.body, fontSize: 15, color: C.muted, maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
        Twenty years of dancehall. Kingston streets to the world. Gangsta gospel from the Gully — the voice that defined a generation.
      </p>
      <div style={{ display: 'flex', gap: isMobile ? 20 : 40, flexWrap: 'wrap' }}>
        {[{ n: '948K', l: 'YouTube' },{ n: '1M+', l: 'Instagram' },{ n: '20+', l: 'Yrs Active' },{ n: 'GTA IV', l: 'Featured' }].map(s => (
          <div key={s.l}>
            <p style={{ fontFamily: FF.display, fontSize: isMobile ? 24 : 30, letterSpacing: 2, color: C.green, lineHeight: 1 }}>{s.n}</p>
            <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: C.dim, marginTop: 3 }}>{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MusicContent({ trackIndex, onMusicTabLeave }: {
  trackIndex: number; onMusicTabLeave?: () => void;
}) {
  const t = TRACKS[trackIndex];
  if (!t) return null;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}`, background: 'rgba(0,0,0,0.35)' }}>
        <p style={{ fontFamily: FF.display, fontSize: 24, letterSpacing: 2, color: C.ash, lineHeight: 1 }}>{t.title}</p>
        <div style={{ display: 'flex', gap: 16, marginTop: 5 }}>
          {t.year && <span style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 2, color: C.green }}>{t.year}</span>}
          {t.note && <span style={{ fontFamily: FF.ui, fontSize: 11, color: C.amber }}>{t.note}</span>}
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative', background: '#000' }}>
        <iframe
          key={t.videoId}
          src={`https://www.youtube.com/embed/${t.videoId}?rel=0&autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        />
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
      <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: C.green, marginBottom: 8 }}>Storyline</p>
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



function GalleryContent({ sel }: { sel: number }) {
  if (sel === 0) {
    return (
      <div style={{ padding: '28px', height: '100%', overflowY: 'auto' }}>
        <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: C.green, marginBottom: 16 }}>Press Shots</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 3 }}>
          {PRESS_SHOTS.map((shot, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
              <img src={shot.src} alt={shot.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', transition: 'transform 0.3s, filter 0.3s', filter: 'brightness(0.8)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; (e.currentTarget as HTMLImageElement).style.filter = 'brightness(1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.8)'; }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '6px 10px', background: 'linear-gradient(to top,rgba(0,0,0,0.85),transparent)' }}>
                <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 2, color: C.ash }}>{shot.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sel === 1) {
    return (
      <div style={{ padding: '28px', height: '100%', overflowY: 'auto' }}>
        <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: C.green, marginBottom: 16 }}>Live Shows</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 3 }}>
          {LIVE_SHOWS.map((show, i) => (
            <a key={i} href={`https://www.youtube.com/watch?v=${show.videoId}`} target="_blank" rel="noopener noreferrer"
              style={{ position: 'relative', aspectRatio: '16/9', display: 'block', overflow: 'hidden', textDecoration: 'none' }}>
              <img src={ytThumb(show.videoId)} alt={show.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s, filter 0.3s', filter: 'brightness(0.75)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; (e.currentTarget as HTMLImageElement).style.filter = 'brightness(1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.75)'; }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '6px 10px', background: 'linear-gradient(to top,rgba(0,0,0,0.85),transparent)' }}>
                <p style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 1, color: C.ash, lineHeight: 1 }}>{show.title}</p>
                {show.year && <p style={{ fontFamily: FF.ui, fontSize: 9, color: C.green, letterSpacing: 2 }}>{show.year}</p>}
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

function RightContent({ tab, sel, trackIndex, isPlaying, onTogglePlay, onTrackSelect }: {
  tab: Tab; sel: number; trackIndex: number; isPlaying: boolean;
  onTogglePlay: () => void; onTrackSelect: (i: number) => void;
}) {
  switch (tab) {
    case 'home':      return <HomeContent />;
    case 'music':     return <MusicContent trackIndex={trackIndex} />;
    case 'merch':     return <MerchContent   sel={sel} />;
    case 'storyline': return <BriefContent   sel={sel} />;
    case 'stats':     return <StatsContent   sel={sel} />;
    case 'gallery':   return <GalleryContent sel={sel} />;
    case 'links':     return <LinksContent   sel={sel} />;
  }
}

/* ─── Chrome ──────────────────────────────────────────────────────────── */

function TopBar({ now }: { now: Date }) {
  const isMobile = useIsMobile();
  const days = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  return (
    <div style={{ height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '0 14px' : '0 22px', background: C.topBar, borderBottom: `1px solid ${C.border}`, flexShrink: 0, position: 'relative', zIndex: 30 }}>
      {!isMobile && <span style={{ fontFamily: FF.display, fontSize: 20, letterSpacing: 4, color: C.ash }}>MAVADO GULLY SIDE</span>}
      {isMobile && <span style={{ fontFamily: FF.display, fontSize: 16, letterSpacing: 3, color: C.ash }}>MAVADO</span>}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 14 }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontFamily: FF.ui, fontSize: isMobile ? 12 : 14, fontWeight: 700, letterSpacing: 2, color: C.ash, lineHeight: 1.2 }}>DAVID BROOKS</p>
          {!isMobile && <p style={{ fontFamily: FF.ui, fontSize: 11, color: C.dim, letterSpacing: 1 }}>{days[now.getDay()]} {h}:{m}</p>}
          <p style={{ fontFamily: FF.ui, fontSize: 11, color: C.green, fontWeight: 700 }}>$74,034,729.34</p>
        </div>
        <div style={{ width: isMobile ? 40 : 50, height: isMobile ? 40 : 50, border: `1px solid rgba(107,142,35,0.3)`, flexShrink: 0, overflow: 'hidden', background: '#1A1C12', backgroundImage: 'url(/Gemini_Generated_Image_5gjbjk5gjbjk5gjb-Photoroom.png)', backgroundSize: 'auto 340%', backgroundPosition: 'center 1%', backgroundRepeat: 'no-repeat' }} />
      </div>
    </div>
  );
}

function TabBar({ active, setActive }: { active: Tab; setActive: (t: Tab) => void }) {
  return (
    <div style={{ height: 44, display: 'flex', alignItems: 'stretch', background: 'rgba(8,9,5,0.68)', borderBottom: `1px solid ${C.border}`, flexShrink: 0, position: 'relative', zIndex: 30, overflowX: 'auto' }}>
      <div style={{ padding: '0 14px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ fontFamily: FF.display, fontSize: 22, color: C.ash, lineHeight: 1, display: 'inline-block', transform: 'scaleX(-1)' }}>D</span>
      </div>
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
      <div style={{ padding: '0 14px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ fontFamily: FF.display, fontSize: 22, color: C.ash, lineHeight: 1 }}>B</span>
      </div>
    </div>
  );
}

function BottomBar({ onPrevTab, onNextTab, backLabel = 'Back' }: { onPrevTab: () => void; onNextTab: () => void; backLabel?: string }) {
  return (
    <div style={{ height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', background: C.topBar, borderTop: `1px solid ${C.border}`, flexShrink: 0, position: 'relative', zIndex: 30 }}>
      {/* PlayStation B — circle + label below */}
      <button onClick={onPrevTab} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'transparent', border: 'none', cursor: 'pointer' }}>
        <span style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid #C0392B', background: 'rgba(192,57,43,0.15)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: FF.display, fontSize: 14, color: '#C0392B', lineHeight: 1 }}>B</span>
        <span style={{ fontFamily: FF.ui, fontSize: 9, letterSpacing: 2, color: C.dim }}>{backLabel}</span>
      </button>

      <span style={{ fontFamily: FF.ui, fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: C.dim }}>mavadogullyside.com</span>

      {/* PlayStation A + d-pad arrows */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* A button + label below */}
        <button onClick={onNextTab} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <span style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid #27AE60', background: 'rgba(39,174,96,0.15)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: FF.display, fontSize: 14, color: '#27AE60', lineHeight: 1 }}>A</span>
          <span style={{ fontFamily: FF.ui, fontSize: 9, letterSpacing: 2, color: C.dim }}>Select</span>
        </button>
        {/* D-pad → style */}
        <button onClick={onPrevTab} style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: C.ash, fontSize: 13, fontFamily: 'monospace', letterSpacing: -2 }}>←</button>
        <button onClick={onNextTab} style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: C.ash, fontSize: 13, fontFamily: 'monospace', letterSpacing: -2 }}>→</button>
      </div>
    </div>
  );
}

/* ─── App ─────────────────────────────────────────────────────────────── */


export default function App() {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [intro, setIntro]   = useState(true);
  const [tab, setTab]       = useState<Tab>('home');
  const [sel, setSel]       = useState(0);
  const [dropKey, setDropKey] = useState(0);
  const [now, setNow]       = useState(new Date());
  const [frozen, setFrozen] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying]   = useState(false);
  const [showMobileList, setShowMobileList] = useState(true); // mobile: true = list view, false = detail view
  const ytRef = useRef<any>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!intro && !loading) {
      const t = setTimeout(() => setFrozen(true), 3000);
      return () => clearTimeout(t);
    }
  }, [intro, loading]);

  // YouTube IFrame API
  useEffect(() => {
    if (window.YT) return;
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => {
      ytRef.current = new window.YT.Player('yt-bg-player', {
        height: '0', width: '0',
        videoId: TRACKS[0].videoId,
        playerVars: { autoplay: 0 },
        events: {
          onStateChange: (e: any) => {
            if (e.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
            if (e.data === window.YT.PlayerState.PAUSED)  setIsPlaying(false);
            if (e.data === window.YT.PlayerState.ENDED)
              setTrackIndex(i => (i + 1) % TRACKS.length);
          },
        },
      });
    };
  }, []);

  // Load new track in bg player when trackIndex changes — only when NOT on music tab
  useEffect(() => {
    if (!ytRef.current || tab === 'music') return;
    try {
      isPlaying
        ? ytRef.current.loadVideoById(TRACKS[trackIndex].videoId)
        : ytRef.current.cueVideoById(TRACKS[trackIndex].videoId);
    } catch {}
  }, [trackIndex]);

  // Keep dropdown highlight in sync with sticky player when on music tab
  useEffect(() => {
    if (tab === 'music') setSel(trackIndex);
  }, [trackIndex, tab]);

  const handleTogglePlay = useCallback(() => {
    if (!ytRef.current) return;
    isPlaying ? ytRef.current.pauseVideo() : ytRef.current.playVideo();
  }, [isPlaying]);

  const handlePrevTrack = useCallback(() =>
    setTrackIndex(i => (i - 1 + TRACKS.length) % TRACKS.length), []);

  const handleNextTrack = useCallback(() =>
    setTrackIndex(i => (i + 1) % TRACKS.length), []);

  const handlePrevTab = useCallback(() => {
    const idx = TABS.findIndex(t => t.id === tab);
    changeTab(TABS[(idx - 1 + TABS.length) % TABS.length].id);
  }, [tab]);

  const handleNextTab = useCallback(() => {
    const idx = TABS.findIndex(t => t.id === tab);
    changeTab(TABS[(idx + 1) % TABS.length].id);
  }, [tab]);

  const handleTrackSelect = useCallback((i: number) => {
    setTrackIndex(i);
    // Only load in bg player when NOT on music tab (iframe handles it there)
    if (ytRef.current && tab !== 'music') {
      try {
        ytRef.current.loadVideoById(TRACKS[i].videoId);
        setIsPlaying(true);
      } catch {}
    }
  }, [tab]);

  const changeTab = (t: Tab) => {
    try { if (t === 'music' && ytRef.current) ytRef.current.pauseVideo(); } catch {}
    try { if (t !== 'music' && tab === 'music' && ytRef.current) ytRef.current.playVideo(); } catch {}
    setTab(t);
    setSel(t === 'music' ? trackIndex : 0);
    setDropKey(k => k + 1);
    setShowMobileList(true); // always show list first when changing tabs on mobile
  };

  if (loading) return <GTALoadingScreen onDone={() => setLoading(false)} />;
  if (intro)   return <IntroScreen onEnter={() => setIntro(false)} />;

  const hasDropdown = tab !== 'home';

  const handleMobileSel = (i: number) => {
    setSel(i);
    if (tab === 'music' && handleTrackSelect) handleTrackSelect(i);
    setShowMobileList(false); // drill into detail
  };

  return (
    <div className="scanlines" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Background */}
      <BgLayer tab={tab} sel={sel} frozen={frozen} />

      {/* UI stack */}
      <TopBar now={now} />
      <TabBar active={tab} setActive={changeTab} />

      {/* Main area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>

        {isMobile ? (
          /* ── MOBILE: full-screen panels ── */
          tab === 'home' || !hasDropdown ? (
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              <RightContent tab={tab} sel={sel} trackIndex={trackIndex} isPlaying={isPlaying} onTogglePlay={handleTogglePlay} onTrackSelect={handleTrackSelect} />
            </div>
          ) : showMobileList ? (
            /* List panel */
            <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', background: C.panel }}>
              <Dropdown tab={tab} sel={sel} setSel={handleMobileSel} dropKey={dropKey} onTrackSelect={handleTrackSelect} />
            </div>
          ) : (
            /* Detail panel */
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              <RightContent tab={tab} sel={sel} trackIndex={trackIndex} isPlaying={isPlaying} onTogglePlay={handleTogglePlay} onTrackSelect={handleTrackSelect} />
            </div>
          )
        ) : (
          /* ── DESKTOP: split view ── */
          <>
            <Dropdown tab={tab} sel={sel} setSel={setSel} dropKey={dropKey} onTrackSelect={handleTrackSelect} />
            <div style={{
              position: 'absolute', inset: 0,
              paddingLeft: hasDropdown ? 288 : 0,
              transition: 'padding-left 0.2s ease',
              overflow: 'hidden',
            }}>
              <RightContent tab={tab} sel={sel} trackIndex={trackIndex} isPlaying={isPlaying} onTogglePlay={handleTogglePlay} onTrackSelect={handleTrackSelect} />
            </div>
          </>
        )}
      </div>

      <BottomBar
        onPrevTab={isMobile && hasDropdown && !showMobileList ? () => setShowMobileList(true) : handlePrevTab}
        onNextTab={handleNextTab}
        backLabel={isMobile && hasDropdown && !showMobileList ? 'List' : 'Back'}
      />

      {/* Hidden YT player — audio only */}
      <div id="yt-bg-player" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} />

      <WorkingDraftBanner artist="Mavado" />
    </div>
  );
}
