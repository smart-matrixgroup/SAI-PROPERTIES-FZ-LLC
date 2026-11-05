import { useState } from 'react';
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import ConstructionUpdates from './components/ConstructionUpdates';
import VideoSection from './components/VideoSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AziziFlorence from './components/AziziFlorence';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [showAzizi, setShowAzizi] = useState(false);

  return (
    <div className="min-h-screen">
      {!entered && <Intro onEnter={() => setEntered(true)} />}

      <div className={`transition-opacity duration-700 ${entered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Navbar />
        {/* pb-16 = bottom nav height on mobile so content not hidden behind it */}
        <main className="pb-16 md:pb-0">
          <Hero />
          <About />
          <Services />
          <Projects onViewAzizi={() => setShowAzizi(true)} />
          <ConstructionUpdates />
          <VideoSection />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Azizi Florence Detail Page */}
      {showAzizi && (
        <AziziFlorence onClose={() => {
          setShowAzizi(false);
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }} />
      )}
    </div>
  );
}
