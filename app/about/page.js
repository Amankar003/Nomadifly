"use client";
import { useState } from "react";
import Nav from "../../components/Nav";
import PageHeader from "../../components/PageHeader";
import {
  Story,
  WhyUs,
  Info,
  About,
  Footer,
  Enquire
} from "../../components/Sections";
import FloatingWhatsApp from "../../components/FloatingWhatsApp";
import TripQuizModal from "../../components/TripQuizModal";
import CursorGlow from "../../components/CursorGlow";
import { IMG } from "../../lib/data";

export default function AboutPage() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <main>
      <CursorGlow />
      <Nav onOpenQuiz={() => setIsQuizOpen(true)} />
      <PageHeader 
        title="Our Story" 
        subtitle="Two people. One homeland to share." 
        image={IMG.himalaya3} 
        bgWord="ABOUT"
      />
      
      <div style={{ paddingTop: '60px' }}>
        <About />
        <div style={{ height: '120px' }} />
        <Enquire onOpenQuiz={() => setIsQuizOpen(true)} />
        <Footer />
      </div>

      <FloatingWhatsApp />
      <TripQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </main>
  );
}
