import { useState } from 'react';
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import VideoSection from './components/VideoSection';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Intro splash — shown until user clicks Enter */}
      {!entered && <Intro onEnter={() => setEntered(true)} />}

      {/* Main site — always rendered but hidden behind intro */}
      <div className={`transition-opacity duration-700 ${entered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Projects />
          <VideoSection />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
