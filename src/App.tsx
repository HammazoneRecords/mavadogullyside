import { useState, useEffect } from 'react';
import { Menu, X, Play, ExternalLink, Instagram, Youtube } from 'lucide-react';
import WorkingDraftBanner from './components/WorkingDraftBanner';

/* ─── Palette ───────────────────────────────────────────────────────────── */
const C = {
  void:    '#080808',
  night:   '#0C0C0C',
  card:    '#141414',
  wire:    '#2A2A2A',
  gold:    '#C9A84C',
  goldL:   '#E8C97A',
  goldDim: 'rgba(201,168,76,0.08)',
  cream:   '#EDE8DF',
  muted:   'rgba(237,232,223,0.50)',
  dim:     'rgba(237,232,223,0.22)',
} as const;

const FF = {
  display: "'Bebas Neue', Impact, sans-serif",
  ui:      "'Barlow Condensed', sans-serif",
  body:    "'DM Sans', sans-serif",
} as const;

/* ─── Data ──────────────────────────────────────────────────────────────── */
const TRACKS = [
  { id: 1, title: 'Real McKoy',                       duration: '3:41', videoId: 'ikQXIrscSPI' },
  { id: 2, title: 'So Special',                       duration: '3:55', videoId: 'khzYfshc0AY' },
  { id: 3, title: 'Weh Dem A Do',                     duration: '3:28', videoId: 'NMZePxKt-fk' },
  { id: 4, title: 'Give It All To Me ft. Nicki Minaj',duration: '3:47', videoId: '0WLhst40USw' },
  { id: 5, title: 'Survivor ft. Akon',                duration: '4:02', videoId: 'NIgmgHURetk' },
  { id: 6, title: 'Life',                             duration: '3:33', videoId: 'FQD95AHBZ2g' },
];

const NAV_LINKS = ['Music', 'Videos', 'Legacy', 'About'];

/* ─── Nav ───────────────────────────────────────────────────────────────── */
function Nav({ onNav }: { onNav: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = document.getElementById('scroll-root');
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 40);
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler);
  }, []);

  const go = (id: string) => { onNav(id); setOpen(false); };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(8,8,8,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'background 0.3s',
      borderBottom: scrolled ? `1px solid ${C.wire}` : 'none',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => go('hero')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <span style={{ fontFamily: FF.display, fontSize: 22, letterSpacing: 3, color: C.cream }}>
            MAVADO <span style={{ color: C.gold }}>GULLY SIDE</span>
          </span>
        </button>

        <div className="hidden md:flex" style={{ gap: 32 }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => go(l.toLowerCase())}
              style={{ fontFamily: FF.ui, fontSize: 14, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: C.muted, background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
              {l}
            </button>
          ))}
        </div>

        <button className="md:hidden" onClick={() => setOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.cream }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div style={{ background: C.night, borderTop: `1px solid ${C.wire}`, padding: '16px 24px 24px' }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => go(l.toLowerCase())}
              style={{ display: 'block', width: '100%', textAlign: 'left', fontFamily: FF.display, fontSize: 28, letterSpacing: 2, color: C.cream, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', borderBottom: `1px solid ${C.wire}` }}>
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
function Hero({ onNav }: { onNav: (id: string) => void }) {
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', padding: '120px 24px 80px', overflow: 'hidden' }}>
      {/* BG gold orb */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* Gully Side tag */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <div style={{ height: 1, width: 50, background: `linear-gradient(to right, transparent, ${C.gold})` }} />
        <span style={{ fontFamily: FF.ui, fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase', color: C.gold }}>Gully Side</span>
        <div style={{ height: 1, width: 50, background: `linear-gradient(to left, transparent, ${C.gold})` }} />
      </div>

      {/* Name */}
      <h1 style={{ fontFamily: FF.display, fontSize: 'clamp(80px, 20vw, 200px)', lineHeight: 0.85, letterSpacing: 6, color: C.cream, marginBottom: 16 }}>
        MAVADO
      </h1>

      {/* Gold divider */}
      <div style={{ width: 80, height: 2, background: `linear-gradient(to right, transparent, ${C.gold}, transparent)`, marginBottom: 24 }} />

      <p style={{ fontFamily: FF.body, fontSize: 16, color: C.muted, maxWidth: 480, lineHeight: 1.8, marginBottom: 48 }}>
        Two decades of dancehall. Kingston to the world. Gangsta gospel from the Gully.
      </p>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
        {[
          { n: '948K', l: 'YouTube' },
          { n: '1M+', l: 'Instagram' },
          { n: '20+', l: 'Years Active' },
          { n: 'VEVO', l: 'Certified' },
        ].map(s => (
          <div key={s.l} style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: FF.display, fontSize: 30, letterSpacing: 2, color: C.gold, lineHeight: 1 }}>{s.n}</p>
            <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: C.dim, marginTop: 4 }}>{s.l}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
        <button onClick={() => onNav('music')} style={{
          fontFamily: FF.ui, fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
          background: C.gold, color: C.void, border: 'none', padding: '14px 36px', cursor: 'pointer', transition: 'opacity 0.2s',
        }} onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
          Hear the Music
        </button>
        <button onClick={() => onNav('legacy')} style={{
          fontFamily: FF.ui, fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
          background: 'transparent', color: C.cream, border: `1px solid ${C.wire}`, padding: '14px 36px', cursor: 'pointer', transition: 'border-color 0.2s',
        }} onMouseEnter={e => (e.currentTarget.style.borderColor = C.gold)} onMouseLeave={e => (e.currentTarget.style.borderColor = C.wire)}>
          The Legacy
        </button>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        {[
          { href: 'https://www.instagram.com/mavadogully/', icon: <Instagram size={20} /> },
          { href: 'https://www.youtube.com/channel/UCgF4x1ZWVpDP1Msr0iXu7sw', icon: <Youtube size={20} /> },
        ].map(s => (
          <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
            style={{ color: C.dim, transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.gold)}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.dim)}>
            {s.icon}
          </a>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <span style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: C.dim }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${C.gold}, transparent)` }} />
      </div>
    </section>
  );
}

/* ─── Music ─────────────────────────────────────────────────────────────── */
function MusicSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section id="music" style={{ padding: '100px 24px', maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 56 }}>
        <span style={{ fontFamily: FF.ui, fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.gold }}>Discography</span>
        <h2 style={{ fontFamily: FF.display, fontSize: 'clamp(48px, 8vw, 80px)', letterSpacing: 3, color: C.cream, marginTop: 8, lineHeight: 1 }}>MUSIC</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {TRACKS.map((t, i) => (
          <button key={t.id} onClick={() => setActiveVideo(activeVideo === t.videoId ? null : t.videoId)}
            style={{
              display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px',
              background: activeVideo === t.videoId ? C.goldDim : 'transparent',
              border: `1px solid ${activeVideo === t.videoId ? 'rgba(201,168,76,0.2)' : 'transparent'}`,
              cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s', width: '100%',
            }}
            onMouseEnter={e => { if (activeVideo !== t.videoId) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.02)'; }}
            onMouseLeave={e => { if (activeVideo !== t.videoId) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
            <span style={{ fontFamily: FF.ui, fontSize: 12, color: activeVideo === t.videoId ? C.gold : C.dim, width: 24, flexShrink: 0 }}>
              {activeVideo === t.videoId ? <Play size={14} fill={C.gold} color={C.gold} /> : String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ flex: 1, fontFamily: FF.ui, fontSize: 17, fontWeight: 600, letterSpacing: 1, color: activeVideo === t.videoId ? C.gold : C.cream }}>{t.title}</span>
            <span style={{ fontFamily: FF.body, fontSize: 12, color: C.dim }}>{t.duration}</span>
          </button>
        ))}
      </div>

      {activeVideo && (
        <div style={{ marginTop: 12, position: 'relative', paddingBottom: '56.25%', background: C.void, border: `1px solid ${C.wire}` }}>
          <iframe key={activeVideo}
            src={`https://www.youtube.com/embed/${activeVideo}?rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
        </div>
      )}
    </section>
  );
}

/* ─── Videos ────────────────────────────────────────────────────────────── */
function VideosSection() {
  return (
    <section id="videos" style={{ padding: '100px 24px', background: C.night }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 56 }}>
          <span style={{ fontFamily: FF.ui, fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.gold }}>Watch</span>
          <h2 style={{ fontFamily: FF.display, fontSize: 'clamp(48px, 8vw, 80px)', letterSpacing: 3, color: C.cream, marginTop: 8, lineHeight: 1 }}>VIDEOS</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {TRACKS.slice(0, 4).map(t => (
            <div key={t.id} style={{ background: C.card, border: `1px solid ${C.wire}`, overflow: 'hidden' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
                <iframe src={`https://www.youtube.com/embed/${t.videoId}?rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
              </div>
              <div style={{ padding: '12px 16px', borderTop: `2px solid ${C.gold}` }}>
                <p style={{ fontFamily: FF.ui, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: C.cream }}>{t.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href="https://www.youtube.com/channel/UCgF4x1ZWVpDP1Msr0iXu7sw" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: FF.ui, fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: C.gold, textDecoration: 'none', padding: '12px 28px', border: `1px solid rgba(201,168,76,0.25)` }}>
            <Youtube size={16} /> More on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Legacy ────────────────────────────────────────────────────────────── */
function LegacySection() {
  const milestones = [
    { year: '2003', event: 'Emerged from Cassava Piece, Kingston — first recordings circulate the dancehall circuit' },
    { year: '2005', event: '"Real McKoy" breaks through — street anthem that defines a generation' },
    { year: '2008', event: 'Signed to VP Records. "Gangster for Life" cements the Gully Side identity globally' },
    { year: '2011', event: 'Signs with DJ Khaled\'s We The Best Music Group. "Survivor" ft. Akon goes international. Mansion Records launched.' },
    { year: '2013', event: '"Give It All To Me" ft. Nicki Minaj — dancehall crosses into mainstream pop' },
    { year: '2021+', event: 'Continued touring London, New York, Toronto. Legacy catalogue streaming millions monthly' },
  ];

  return (
    <section id="legacy" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 56 }}>
          <span style={{ fontFamily: FF.ui, fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.gold }}>History</span>
          <h2 style={{ fontFamily: FF.display, fontSize: 'clamp(48px, 8vw, 80px)', letterSpacing: 3, color: C.cream, marginTop: 8, lineHeight: 1 }}>THE LEGACY</h2>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Gold timeline line */}
          <div style={{ position: 'absolute', left: 52, top: 8, bottom: 8, width: 1, background: `linear-gradient(to bottom, ${C.gold}, transparent)` }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {milestones.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 80, textAlign: 'right' }}>
                  <span style={{ fontFamily: FF.display, fontSize: 18, letterSpacing: 2, color: C.gold }}>{m.year}</span>
                </div>
                {/* Dot */}
                <div style={{ flexShrink: 0, width: 10, height: 10, borderRadius: '50%', background: C.gold, marginTop: 6, boxShadow: `0 0 10px ${C.gold}` }} />
                <p style={{ fontFamily: FF.body, fontSize: 15, color: C.muted, lineHeight: 1.7, paddingTop: 2 }}>{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── About ─────────────────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" style={{ padding: '100px 24px', background: C.night }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ fontFamily: FF.ui, fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.gold }}>The Artist</span>
          <h2 style={{ fontFamily: FF.display, fontSize: 'clamp(48px, 8vw, 80px)', letterSpacing: 3, color: C.cream, marginTop: 8, lineHeight: 1 }}>ABOUT</h2>
        </div>

        <div style={{ display: 'grid', gap: 40 }}>
          <div>
            <p style={{ fontFamily: FF.body, fontSize: 16, color: C.muted, lineHeight: 1.8, marginBottom: 20 }}>
              <strong style={{ color: C.cream }}>David Constantine Brooks</strong>, known worldwide as Mavado, was born in Cassava Piece, Kingston, Jamaica. Raised between the streets and the gospel choir, his music carries both — a tension that made him unlike anyone else in dancehall.
            </p>
            <p style={{ fontFamily: FF.body, fontSize: 16, color: C.muted, lineHeight: 1.8, marginBottom: 20 }}>
              His <strong style={{ color: C.cream }}>Gully Side</strong> identity isn't a brand slogan — it's the address where his voice was forged. Two decades in, he remains one of the most internationally recognised Jamaican artists alive, with placements in Grand Theft Auto IV, collaborations with Nicki Minaj and Akon, and sold-out shows from Kingston to London.
            </p>
            <p style={{ fontFamily: FF.body, fontSize: 16, color: C.muted, lineHeight: 1.8 }}>
              Founder of <strong style={{ color: C.cream }}>Mansion Records</strong>. Signed to We The Best Music Group. Still making music that hits like the first time you heard it.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Born', value: 'Kingston, Jamaica' },
              { label: 'Label', value: 'Mansion Records' },
              { label: 'Also signed to', value: 'We The Best' },
              { label: 'GTA IV Feature', value: 'Real McKoy' },
            ].map(s => (
              <div key={s.label} style={{ padding: '16px 20px', background: C.card, border: `1px solid ${C.wire}`, borderLeft: `3px solid ${C.gold}` }}>
                <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: C.dim, marginBottom: 4 }}>{s.label}</p>
                <p style={{ fontFamily: FF.ui, fontSize: 17, fontWeight: 600, letterSpacing: 1, color: C.cream }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ padding: '60px 24px 100px', borderTop: `1px solid ${C.wire}`, textAlign: 'center' }}>
      <p style={{ fontFamily: FF.display, fontSize: 32, letterSpacing: 4, color: C.cream, marginBottom: 4 }}>
        MAVADO <span style={{ color: C.gold }}>GULLY SIDE</span>
      </p>
      <p style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: C.dim, marginBottom: 24 }}>mavadogullyside.com</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 32 }}>
        {[
          { href: 'https://www.instagram.com/mavadogully/', icon: <Instagram size={18} /> },
          { href: 'https://www.youtube.com/channel/UCgF4x1ZWVpDP1Msr0iXu7sw', icon: <Youtube size={18} /> },
        ].map(s => (
          <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
            style={{ color: C.dim, transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.gold)}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.dim)}>
            {s.icon}
          </a>
        ))}
      </div>
      <div style={{ marginBottom: 24 }}>
        <a href="https://www.youtube.com/channel/UCgF4x1ZWVpDP1Msr0iXu7sw" target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: FF.ui, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: C.gold, textDecoration: 'none' }}>
          <ExternalLink size={12} /> Mavado on YouTube
        </a>
      </div>
      <p style={{ fontFamily: FF.body, fontSize: 11, color: C.dim }}>
        © 2025 Mavado. All rights reserved. Built by{' '}
        <a href="https://mindwaveja.com" target="_blank" rel="noopener noreferrer" style={{ color: C.gold, textDecoration: 'none' }}>MindWave JA</a>.
      </p>
    </footer>
  );
}

/* ─── App ───────────────────────────────────────────────────────────────── */
export default function App() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="scroll-root" style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 40 }}>
      <Nav onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <MusicSection />
      <VideosSection />
      <LegacySection />
      <AboutSection />
      <Footer />
      <WorkingDraftBanner artist="Mavado" />
    </div>
  );
}
