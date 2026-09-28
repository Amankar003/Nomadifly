import Nav from "../components/Nav";
import Hero from "../components/Hero";
import { Trust, Destinations, Story, Tours, Itinerary, Info, About, Faq, Enquire, Footer } from "../components/Sections";
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Trust />
      <Destinations />
      <Story />
      <Tours />
      <Itinerary />
      <Info />
      <About />
      <Faq />
      <Enquire />
      <Footer />
    </main>
  );
}
