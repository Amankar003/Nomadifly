// ====== EDIT THESE ======
export const CONTACT = {
  email: "info@nomadifly.com",
  whatsapp: "", // e.g. "919876543210" (country code + number, no +). Leave empty to use email.
  instagram: "@nomadifly",
};
// Photos: free Unsplash images (hotlink allowed). Swap any with your own real trip photos in /public and use "/yourfile.jpg".
const u = (id, w = 2000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
export const IMG = {
  himalaya1: "/himalayan_mountains.png",
  himalaya2: "/mountain_peaks_2.png",
  himalaya3: "/himalayan_valley_mountains.png",
  hero: u("1578556881786-851d4b79cb73", 2600),
  dzong: u("1602058033339-b9325bb3a6c3"),
  dzong2: u("1580649851649-992b28f56e98"),
  bridge: u("1650747858910-5d48a4116296"),
  bridge2: u("1585978231472-76a64f52fd7a"),
  valley: u("1599025520505-ee4b3a648401"),
  peaks: u("1578556893833-7c403f70101d"),
  green: u("1586347347212-429e14d79f83"),
  town: u("1579459719973-e1f6d1a5c438"),
  avatar1: u("1534528741775-53994a69daeb", 300),
  avatar2: u("1507003211169-0a1dd7228f2d", 300),
  avatar3: u("1517841905240-472988babdf9", 300),
  
  // New section images (using local highly-premium AI generated assets!)
  archery: "/archery_bhutan.png",
  hotstone: "/hotstone_bath.png",
  food: "/ema_datshi.png",
  monk: "/bhutan_monk.png",
  
  spring: "/bhutan_spring.png",
  autumn: "/bhutan_autumn.png",
  winter: "/bhutan_winter.png",
  
  gallery1: u("1578556881786-851d4b79cb73", 800),
  gallery2: u("1602058033339-b9325bb3a6c3", 800),
  gallery3: u("1599025520505-ee4b3a648401", 800),
  gallery4: u("1579459719973-e1f6d1a5c438", 800),
  gallery5: u("1585978231472-76a64f52fd7a", 800),
  gallery6: u("1586347347212-429e14d79f83", 800),
};

export const EXPERIENCES = [
  { title: "Traditional Archery", desc: "Try Bhutan's national sport with locals.", img: IMG.archery, icon: "🏹" },
  { title: "Dotsho (Hot Stone Bath)", desc: "Relax in wooden tubs heated by river stones.", img: IMG.hotstone, icon: "🛀" },
  { title: "Taste Ema Datshi", desc: "Savor the iconic fiery chili and cheese dish.", img: IMG.food, icon: "🌶️" },
  { title: "Monastic Encounters", desc: "Light butter lamps and meet Buddhist monks.", img: IMG.monk, icon: "🏮" },
];

export const SEASONS = [
  { name: "Spring (Mar-May)", desc: "Blooming rhododendrons and Jacaranda trees paint the valleys purple and pink.", img: IMG.spring },
  { name: "Autumn (Sep-Nov)", desc: "Crystal clear Himalayan views, golden rice fields, and vibrant mask dance festivals.", img: IMG.autumn },
  { name: "Winter (Dec-Feb)", desc: "Peaceful, crisp air with fewer tourists and stunning snow-capped dzongs.", img: IMG.winter },
];

export const waLink = (msg) =>
  CONTACT.whatsapp
    ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`
    : `mailto:${CONTACT.email}?subject=${encodeURIComponent("Bhutan trip enquiry")}&body=${encodeURIComponent(msg)}`;

export const TOURS = [
  { id: "sep", title: "Bhutan September Magic", host: "with Annu Sia", dates: "13 – 19 September", length: "6N / 7D", price: 39900, was: 50000, img: IMG.valley, spots: "3 spots left" },
  { id: "oct", title: "Bhutan Dussehra Special", host: "with Annu Sia", dates: "13 – 19 October", length: "6N / 7D", price: 39900, was: 50000, img: IMG.dzong, spots: "Selling fast" },
];

export const DESTINATIONS = [
  { id: "paro", name: "Paro Valley", note: "Tiger's Nest & scenic runway landing", altitude: "2,200 m", img: IMG.hero, cx: 250, cy: 310, lat: 27.4267, lng: 89.4133 },
  { id: "thimphu", name: "Thimphu", note: "Capital city, markets & giant Buddha", altitude: "2,320 m", img: IMG.town, cx: 320, cy: 290, lat: 27.4728, lng: 89.6393 },
  { id: "dochula", name: "Dochula Pass", note: "108 memorial chortens in mountain mist", altitude: "3,100 m", img: IMG.peaks, cx: 375, cy: 275, lat: 27.5372, lng: 89.7497 },
  { id: "punakha", name: "Punakha Dzong", note: "Iconic fortress where two rivers meet", altitude: "1,200 m", img: IMG.dzong, cx: 430, cy: 250, lat: 27.5878, lng: 89.8778 },
  { id: "phobjikha", name: "Phobjikha Valley", note: "Glacial valley of black-necked cranes", altitude: "2,900 m", img: IMG.valley, cx: 520, cy: 280, lat: 27.4500, lng: 90.1833 },
];

export const DAYS = [
  {
    t: "Fly into Paro & Evening Walk",
    d: "Land through the famous Himalayan valley approach. Meet your guide, check into your boutique lodge, and take a slow evening stroll around Paro town.",
    img: IMG.green,
    alt: "2,200 m",
    level: "Easy",
    highlight: "Scenic mountain approach landing",
    food: "Suja (butter tea) & Phaksha Paa",
    destId: "paro"
  },
  {
    t: "Thimphu Capital Exploration",
    d: "Drive to Thimphu. Visit the National Memorial Chorten, the majestic 169ft Buddha Dordenma overlooking the valley, and artisan paper-making workshops.",
    img: IMG.town,
    alt: "2,320 m",
    level: "Easy",
    highlight: "Giant Buddha Dordenma view",
    food: "Ema Datshi with Red Rice",
    destId: "thimphu"
  },
  {
    t: "Dochula Pass & Punakha Dzong",
    d: "Cross Dochula Pass surrounded by 108 stupas and 360° Himalayan peaks. Descend into warm Punakha valley to explore the Palace of Great Happiness.",
    img: IMG.dzong,
    alt: "3,100 m ➔ 1,200 m",
    level: "Moderate",
    highlight: "108 Chortens & Punakha Dzong",
    food: "River valley trout & local cheese",
    destId: "dochula"
  },
  {
    t: "Suspension Bridge & Valley Hike",
    d: "Cross one of Bhutan's longest iron chain suspension bridges lined with prayer flags. Enjoy an authentic organic lunch hosted at a local family farmhouse.",
    img: IMG.bridge,
    alt: "1,250 m",
    level: "Easy-Moderate",
    highlight: "Longest prayer-flag bridge",
    food: "Farmhouse cooked organic meal",
    destId: "punakha"
  },
  {
    t: "Hike to Tiger's Nest Monastery",
    d: "The ultimate Bhutan experience. Hike 4–5 hours round trip through pine forests to Paro Taktsang perched 900m above the valley floor.",
    img: IMG.hero,
    alt: "3,120 m",
    level: "Challenging (Paced)",
    highlight: "Tiger's Nest Cliffside Monastery",
    food: "Cafeteria herbal tea & snacks",
    destId: "paro"
  },
  {
    t: "Farwell Evening & Departure",
    d: "A relaxed buffer day for traditional arching lessons, hot stone bath relaxation, souvenirs in Paro, followed by your farewell dinner and morning flight.",
    img: IMG.peaks,
    alt: "2,200 m",
    level: "Relaxed",
    highlight: "Hot Stone Bath & Archery",
    food: "Festive farewell dinner",
    destId: "paro"
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: "Rohan & Priya Sharma",
    location: "Mumbai",
    date: "Travelled Oct 2025",
    avatar: IMG.avatar1,
    tour: "Bhutan Dussehra Special",
    rating: 5,
    text: "Traveling with Anushia felt like having a local sister showing us hidden spots in Bhutan! Tiger's Nest was seamlessly organized and permit processing was completely hands-off for us."
  },
  {
    id: 2,
    name: "Vikram Sengupta",
    location: "Bengaluru",
    date: "Travelled Sept 2025",
    avatar: IMG.avatar2,
    tour: "Custom Private Journey",
    rating: 5,
    text: "Nomadifly took care of everything from SDF payments to route permits. The farmhouse lunch in Punakha and the Dochula pass sunrise will stay with me forever."
  },
  {
    id: 3,
    name: "Ananya & Family",
    location: "Delhi NCR",
    date: "Travelled Nov 2025",
    avatar: IMG.avatar3,
    tour: "Family Cultural Escape",
    rating: 5,
    text: "The small group size made such a difference. No rushed tourist buses — just intimate conversations, pristine mountain air, and top-tier lodges."
  }
];

export const COMPARISON = [
  { feature: "Trip Leader & Host", us: "Bhutanese co-founder who calls it home", standard: "Generic hired tour manager" },
  { feature: "Permits & Route Filings", us: "100% handled seamlessly", standard: "Complicated paperwork client handles" },
  { feature: "Group Size", us: "Intimate (8–12 travelers max)", standard: "Crowded buses (25–40 travelers)" },
  { feature: "SDF Transparency", us: "Clear ₹1,200/night breakdown", standard: "Hidden surcharges & markup" },
  { feature: "Itinerary Flexibility", us: "Paced to group comfort & weather", standard: "Strict rigid schedule" },
  { feature: "Support Channel", us: "Direct 1-on-1 WhatsApp with founders", standard: "Call center ticketing system" }
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

