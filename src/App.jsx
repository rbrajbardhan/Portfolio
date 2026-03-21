import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppStore } from "./lib/store";
import { Helmet } from "react-helmet-async";
import { config } from "./data/config";

import CustomCursor from "./components/ui/CustomCursor";
import LoadingScreen from "./components/ui/LoadingScreen";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Resume from "./components/sections/Resume";
import Education from "./components/sections/Education";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Certificates from "./components/sections/Certificates";
import Achievements from "./components/sections/Achievements";
import Training from "./components/sections/Training";
// import HackathonBadges from "./components/sections/HackathonBadges";
import Contact from "./components/sections/Contact";

const Home = () => (
  <main className="w-full relative">
    <Helmet>
      <title>
        {config.name} | {config.role}
      </title>
      <meta name="description" content={config.tagline} />
      <meta
        name="keywords"
        content="Portfolio, Full Stack, React, Next.js, Web Development"
      />
      <meta property="og:title" content={`${config.name} | ${config.role}`} />
      <meta property="og:description" content={config.tagline} />
      <meta property="og:type" content="website" />
    </Helmet>
    <Hero />
    <About />
    <Resume />
    <Education />
    <Skills />
    <Projects />
    <Certificates />
    <Achievements />
    <Training />
    {/* <HackathonBadges /> */}
    <Contact />
  </main>
);

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
    <h1 className="text-9xl font-display font-bold text-white">404</h1>
    <p className="text-xl text-brand-cyan mt-4 mb-8">Page not found</p>
    <a
      href="/"
      className="px-6 py-3 bg-white text-black font-medium rounded-full cursor-none"
    >
      Go Home
    </a>
  </div>
);

function App() {
  const { hasSeenLoadingScreen, setHasSeenLoadingScreen } = useAppStore();
  const [loading, setLoading] = useState(!hasSeenLoadingScreen);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        setHasSeenLoadingScreen(true);
      }, 2000); // Same layout as before for loading
      return () => clearTimeout(timer);
    }
  }, [loading, setHasSeenLoadingScreen]);

  return (
    <Router>
      <CustomCursor />

      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="flex flex-col min-h-screen relative selection:bg-brand-indigo/30 selection:text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
