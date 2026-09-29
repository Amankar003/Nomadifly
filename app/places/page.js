"use client";
import { useState } from "react";
import Nav from "../../components/Nav";
import PageHeader from "../../components/PageHeader";
import {
  PlacesDestinations,
  CulturalExperiences,
  MasonryGallery,
  Footer,
  Enquire
} from "../../components/Sections";
import FloatingWhatsApp from "../../components/FloatingWhatsApp";
import TripQuizModal from "../../components/TripQuizModal";
import CursorGlow from "../../components/CursorGlow";
import { IMG } from "../../lib/data";

export default function PlacesPage() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <main>
      <CursorGlow />
      <Nav onOpenQuiz={() => setIsQuizOpen(true)} />
      
      <PageHeader 
        title="Places to Discover" 
        subtitle="Places you'll actually stand in. Real Bhutan, from the cliffside monastery to the quiet river valleys." 
        image={IMG.himalaya1} 
        bgWord="PLACES"
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(8px, 2vw, 16px)', marginTop: '10px' }}>
          <a href="#destinations" className="pill-btn" style={{ background: '#fff', color: '#000', margin: 0, padding: 'clamp(10px, 3vw, 16px) clamp(16px, 4vw, 32px)', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)', whiteSpace: 'nowrap', flex: '1 1 auto', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            Top Spots <span>↓</span>
          </a>
          <a href="#experiences" className="pill-btn" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', margin: 0, padding: 'clamp(10px, 3vw, 16px) clamp(16px, 4vw, 32px)', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', boxShadow: 'none', whiteSpace: 'nowrap', flex: '1 1 auto', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            Deep Immersion <span>↘</span>
          </a>
        </div>
      </PageHeader>
      
      <div style={{ paddingTop: '60px' }}>
        <PlacesDestinations />
        <CulturalExperiences />
        <MasonryGallery />
        <Enquire onOpenQuiz={() => setIsQuizOpen(true)} />
        <Footer />
      </div>

      <FloatingWhatsApp />
      <TripQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </main>
  );
}
