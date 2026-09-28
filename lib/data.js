// ====== EDIT THESE ======
export const CONTACT = {
  email: "info@nomadifly.com",
  whatsapp: "", // e.g. "919876543210" (country code + number, no +). Leave empty to use email.
  instagram: "",
};
// Photos: free Unsplash images (hotlink allowed). Swap any with your own real trip photos in /public and use "/yourfile.jpg".
const u = (id, w = 2000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
export const IMG = {
  hero: u("1578556881786-851d4b79cb73", 2600),
  dzong: u("1602058033339-b9325bb3a6c3"),
  dzong2: u("1580649851649-992b28f56e98"),
  bridge: u("1650747858910-5d48a4116296"),
  bridge2: u("1585978231472-76a64f52fd7a"),
  valley: u("1599025520505-ee4b3a648401"),
  peaks: u("1578556893833-7c403f70101d"),
  green: u("1586347347212-429e14d79f83"),
  town: u("1579459719973-e1f6d1a5c438"),
};
export const waLink = (msg) =>
  CONTACT.whatsapp
    ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`
    : `mailto:${CONTACT.email}?subject=${encodeURIComponent("Bhutan trip enquiry")}&body=${encodeURIComponent(msg)}`;

export const TOURS = [
  { id: "sep", title: "Bhutan September Magic", host: "with Annu Sia", dates: "13 – 19 September", length: "6N / 7D", price: 39900, was: 50000, img: IMG.valley },
  { id: "oct", title: "Bhutan Dussehra Special", host: "with Annu Sia", dates: "13 – 19 October", length: "6N / 7D", price: 39900, was: 50000, img: IMG.dzong },
];
export const DESTINATIONS = [
  { name: "Paro", note: "Tiger's Nest & the valley landing", img: IMG.hero },
  { name: "Punakha", note: "The dzong where two rivers meet", img: IMG.dzong },
  { name: "Suspension Bridge", note: "Prayer flags all along the river", img: IMG.bridge },
  { name: "Thimphu", note: "Capital, markets & giant Buddha", img: IMG.town },
  { name: "Valleys", note: "Farmhouses, terraces, slow mornings", img: IMG.valley },
  { name: "High Himalaya", note: "Passes, chortens and cold clear air", img: IMG.peaks },
];
export const DAYS = [
  { t: "Fly into Paro", d: "Land through the famous Himalayan approach, meet your guide, and stroll Paro town by evening.", img: IMG.green },
  { t: "Thimphu, the capital", d: "Memorial chorten, Buddha Dordenma, local crafts — and the weekend market if your dates line up.", img: IMG.town },
  { t: "Dochula Pass to Punakha", d: "108 chortens in the mist, then down to Punakha Dzong at the river confluence.", img: IMG.dzong },
  { t: "Punakha bridge & valley", d: "Cross the suspension bridge, farmhouse lunch, slow valley afternoon.", img: IMG.bridge },
  { t: "Hike to Tiger's Nest", d: "4–5 hours round trip to the cliffside monastery, paced to you with tea-house stops.", img: IMG.hero },
  { t: "Buffer day & departure", d: "A cushion for weather, shopping and farewell dinner, then fly out of Paro.", img: IMG.peaks },
];
export const INFO = [
  ["Visa", "Not needed", "Indian passport or voter ID. We arrange the Entry & Route Permits."],
  ["SDF", "₹1,200 / night", "Sustainable Development Fee for Indian nationals (half for ages 6–12, free under 6)."],
  ["Best time", "Oct–Dec · Mar–May", "Clear skies, crisp air, and festival season."],
  ["Currency", "Ngultrum (BTN)", "Pegged 1:1 to INR — rupees are widely accepted."],
  ["Getting in", "Fly or drive", "Paro airport or the Phuentsholing / Gelephu / Samdrup Jongkhar borders."],
  ["Max stay", "15 days", "Standard permit window for Indian travellers."],
];
export const FAQ = [
  ["Do Indians need a visa for Bhutan?", "No visa. An Indian passport or voter ID is enough. You need a free Entry Permit, plus a Route Permit for anywhere beyond Thimphu/Paro — we handle both."],
  ["What is the Sustainable Development Fee?", "Bhutan's per-night tourism fee — ₹1,200 per adult per night for Indians. It funds healthcare, education and conservation and is quoted separately from the tour price."],
  ["How hard is the Tiger's Nest hike?", "A real but non-technical hike: roughly 4–5 hours round trip at a steady pace with rest stops. Horses can cover part of the climb."],
  ["Can you plan a private or family trip?", "Yes. Outside the fixed group departures, every trip is custom-built for your dates, pace and group."],
  ["What's not included?", "SDF, monument tickets, personal spending and anything outside the itinerary — all listed clearly before you pay."],
];
