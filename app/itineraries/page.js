"use client";
import { useState } from "react";
import Nav from "../../components/Nav";
import PageHeader from "../../components/PageHeader";
import {
  Tours,
  Itinerary,
  Reviews,
  Faq,
  Footer,
  Enquire
} from "../../components/Sections";
import FloatingWhatsApp from "../../components/FloatingWhatsApp";
import TripQuizModal from "../../components/TripQuizModal";
import CursorGlow from "../../components/CursorGlow";
import { IMG } from "../../lib/data";

export default function ItinerariesPage() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <main>
      <CursorGlow />
      <Nav onOpenQuiz={() => setIsQuizOpen(true)} />
      
      <PageHeader 
        title="Our Journeys" 
        subtitle="Small batch journeys, paced perfectly for the ultimate Himalayan experience." 
        image={IMG.himalaya2} 
        bgWord="JOURNEYS"
      />
      
      <div style={{ paddingTop: '60px' }}>
        <Tours onOpenQuiz={() => setIsQuizOpen(true)} />
        <Itinerary />
        <Enquire onOpenQuiz={() => setIsQuizOpen(true)} />
        <Footer />
      </div>

      <FloatingWhatsApp />
      <TripQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </main>
  );
}
