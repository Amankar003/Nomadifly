"use client";
import { useState } from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import {
  Trust,
  Destinations,
  Story,
  Tours,
  Itinerary,
  WhyUs,
  Reviews,
  Info,
  About,
  Faq,
  Enquire,
  Footer,
  CulturalExperiences,
  MasonryGallery,
} from "../components/Sections";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import TripQuizModal from "../components/TripQuizModal";

export default function Home() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <main>
      <Nav onOpenQuiz={() => setIsQuizOpen(true)} />
      <Hero />
      <Trust />
      <Destinations />
      <Story />
      <CulturalExperiences />
      <MasonryGallery />
      <Tours onOpenQuiz={() => setIsQuizOpen(true)} />
      <Itinerary />
      <WhyUs />
      <Reviews />
      <Info />
      <About />
      <Faq />
      <Enquire onOpenQuiz={() => setIsQuizOpen(true)} />
      <Footer />

      <FloatingWhatsApp />
      <TripQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </main>
  );
}

