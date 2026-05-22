import { useState } from "react";
import HomePage from "./HomePage";
import GalleryPage from "./GalleryPage";

// Shared Images Data Array
const CARDS = [
  { id: "1",  imageUrl: "https://i.ibb.co/4ZWcP129/1.png",   title: "WALKING.JPG" },
  { id: "2",  imageUrl: "https://i.ibb.co/TMbhBRcL/2.png",   title: "GULL_LAKE.JPG" },
  { id: "3",  imageUrl: "https://i.ibb.co/spXBFdSm/3.png",   title: "STROKE.JPG" },
  { id: "4",  imageUrl: "https://i.ibb.co/N2TCN0bC/4.png",   title: "ISLA_MUJERES.JPG" },
  { id: "5",  imageUrl: "https://i.ibb.co/jZkh6q1M/5.png",   title: "FLORAL_DESIGN.JPG" },
  { id: "6",  imageUrl: "https://i.ibb.co/6cc7mksr/6.png",   title: "GEOMETRIC.JPG" },
  { id: "7",  imageUrl: "https://i.ibb.co/bjV35jNQ/7.png",   title: "LUXURY_GOLD.JPG" },
  { id: "8",  imageUrl: "https://i.ibb.co/PZ7WLs7g/8.png",   title: "RUSTIC_STYLE.JPG" },
  { id: "9",  imageUrl: "https://i.ibb.co/qLR5bQRM/9.png",   title: "DARK_MODERN.JPG" },
  { id: "10", imageUrl: "https://i.ibb.co/PdNhw3K/10.png",   title: "COLORFUL_PARTY.JPG" },
  { id: "11", imageUrl: "https://i.ibb.co/zWpN1nqJ/11.png",  title: "GEOMETRIC_II.JPG" },
  { id: "12", imageUrl: "https://i.ibb.co/fVYnCXgR/12.png",  title: "LUXURY_GOLD_II.JPG" },
  { id: "13", imageUrl: "https://i.ibb.co/1G6jZWcZ/13.png",  title: "RUSTIC_STYLE_II.JPG" },
  { id: "14", imageUrl: "https://i.ibb.co/xKG7m905/14.png",  title: "DARK_MODERN_II.JPG" },
  { id: "15", imageUrl: "https://i.ibb.co/7dJzR3xK/15.png",  title: "COLORFUL_PARTY_II.JPG" },
  { id: "16", imageUrl: "https://i.ibb.co/NdJ1csXB/16.png",  title: "ELEGANT_SCRIPT.JPG" },
  { id: "17", imageUrl: "https://i.ibb.co/8L2Sdt5Q/17.png",  title: "WATERCOLOR_ART.JPG" },
  { id: "18", imageUrl: "https://i.ibb.co/mC1zxJYq/18.png",  title: "BOTANICAL.JPG" },
  { id: "19", imageUrl: "https://i.ibb.co/wryzsKs4/20.png",  title: "ART_DECO.JPG" },
  { id: "20", imageUrl: "https://i.ibb.co/1fvnxL3L/19.png",  title: "MARBLE_LUXURY.JPG" },
];

// Shared Function for Circular Positions Layout Calculation
function generateCircleLayout(count) {
  const rand = (() => {
    let s = 77;
    return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  })();

  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const radiusX = 35;
    const radiusY = 32;
    const jitterX = (rand() - 0.5) * 8;
    const jitterY = (rand() - 0.5) * 8;
    const x = 50 + Math.cos(angle) * radiusX + jitterX;
    const y = 50 + Math.sin(angle) * radiusY + jitterY;
    const rotate = (rand() - 0.5) * 22;
    const speed = 0.3 + rand() * 0.7;
    const zIndex = Math.floor(rand() * 8) + 1;
    return { x, y, rotate, speed, zIndex };
  });
}

const LAYOUT = generateCircleLayout(CARDS.length);

export default function App() {
  const [page, setPage] = useState("home");

  return page === "gallery" ? (
    <GalleryPage cards={CARDS} onBack={() => setPage("home")} />
  ) : (
    <HomePage cards={CARDS} layout={LAYOUT} onGalleryClick={() => setPage("gallery")} />
  );
}