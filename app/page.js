"use client";
import { useState } from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import {
  Trust,
  HomeDestinations,
  Story,
  Tours,
  Itinerary,
  WhyUs,
  Reviews,
  Info,
  Faq,
  Enquire,
  Footer,
  CulturalExperiences,
  MasonryGallery,
} from "../components/Sections";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import TripQuizModal from "../components/TripQuizModal";
import CursorGlow from "../components/CursorGlow";

export default function Home() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <main>
      <CursorGlow />
      <Nav onOpenQuiz={() => setIsQuizOpen(true)} />
      <Hero />
      <Trust />
      <HomeDestinations />
      <Story />
      <CulturalExperiences />
      <MasonryGallery />
      <Tours onOpenQuiz={() => setIsQuizOpen(true)} />
      <Itinerary />
      <WhyUs />
      <Reviews />
      <Info />
      <Faq />
      <Enquire onOpenQuiz={() => setIsQuizOpen(true)} />
      <Footer />

      <FloatingWhatsApp />
      <TripQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </main>
  );
}

