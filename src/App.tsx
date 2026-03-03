import { useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Map from './components/Map';
import About from './components/About';
import Events from './components/Events';
import Sponsors from './components/Sponsors';
import Contact from './components/Contact';
import Gallery from './components/Gallery';
import Schedule from './components/Schedule';
import './App.css';

/**
 * Rendering order (z-index stack):
 *
 *   z-index 999  →  Preloader (video, fullscreen, unmounts after completion)
 *   z-index  50  →  Navbar (fixed, liquid glass, always above canvas)
 *   z-index  40  →  HUD / joystick / state badge (in index.html)
 *   z-index   2  →  Three.js canvas (Map.tsx, fixed, full viewport)
 */
export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [activePage, setActivePage] = useState<string | null>(null);

  const pageComponents: Record<string, React.ReactNode> = {
    about: <About />,
    events: <Events />,
    gallery: <Gallery />,
    schedule: <Schedule />,
    sponsors: <Sponsors />,
    contact: <Contact />,
  };

  return (
    <div className="app-root">

      {/* ── PRELOADER (video + progress bar) ─────────────────────────────── */}
      {/* Stays mounted until onComplete fires, then fades out and unmounts */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* ── MAIN EXPERIENCE ───────────────────────────────────────────────── */}
      {/* 
        Three.js 3D world — fills the full viewport at z-index 2 
        Loads immediately in the background behind the z-index 999
        Preloader so WebGL shaders compile concurrently!
      */}
      <Map onNavigate={(page) => setActivePage(page)} />

      {/* Page overlay — shown when a nav link is clicked */}
      {activePage && pageComponents[activePage] && (
        <div className="page-overlay">
          <button
            onClick={() => setActivePage(null)}
            className="page-overlay-close"
            aria-label="Close"
          >
            ✕
          </button>
          {pageComponents[activePage]}
        </div>
      )}

      {/* Navbar — fixed at top, z-index 50 (above canvas and HUD).
          We also load this immediately to fetch its imagery.
      */}
      <Navbar onNavigate={(page) => setActivePage(page || null)} />
    </div>
  );
}
