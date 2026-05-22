import { useState, useEffect, useRef } from "react";

export default function HomePage({ cards, layout, onGalleryClick }) {
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const handleMove = (e) => {
      const cx = e.clientX ?? e.touches?.[0]?.clientX ?? window.innerWidth / 2;
      const cy = e.clientY ?? e.touches?.[0]?.clientY ?? window.innerHeight / 2;
      targetMouse.current = {
        x: (cx / window.innerWidth - 0.5) * 2,
        y: (cy / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });

    const lerp = (a, b, t) => a + (b - a) * t;
    const LERP = 0.025;
    const tick = () => {
      currentMouse.current.x = lerp(currentMouse.current.x, targetMouse.current.x, LERP);
      currentMouse.current.y = lerp(currentMouse.current.y, targetMouse.current.y, LERP);
      setSmoothMouse({ x: currentMouse.current.x, y: currentMouse.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      background: "#0a0a0a", 
      overflow: "hidden",
      position: "relative",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(15px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .nav-link {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          color: #888;
          cursor: pointer;
          transition: color 0.3s;
        }
        .nav-link:hover { color: #fff; }
        .gallery-title {
          font-size: 24px;
          font-family: Georgia, serif;
          font-style: italic;
          color: #fff;
          cursor: pointer;
          transition: opacity 0.3s;
          text-decoration: none;
        }
        .gallery-title:hover { opacity: 0.7; }
      `}</style>

      {/* Floating Canvas Layout Elements */}
      {cards.map((card, i) => {
        const pos = layout[i];
        if (!pos) return null;
        const isHov = hovered === card.id;
        const maxShift = 45;
        const dx = smoothMouse.x * maxShift * pos.speed;
        const dy = smoothMouse.y * maxShift * pos.speed;

        return (
          <div
            key={card.id}
            onClick={() => setSelected(card)}
            onMouseEnter={() => setHovered(card.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "absolute",
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: "clamp(100px, 11vw, 180px)",
              transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${pos.rotate}deg) scale(${isHov ? 1.06 : 1})`,
              zIndex: isHov ? 100 : pos.zIndex,
              cursor: "pointer",
              transition: "scale 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform",
            }}
          >
            <div style={{
              width: "100%",
              aspectRatio: "3/4",
              borderRadius: "6px",
              overflow: "hidden",
              boxShadow: isHov ? "0 30px 70px rgba(0,0,0,0.6)" : "0 10px 30px rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.03)",
            }}>
              <img
                src={card.imageUrl}
                alt={card.title}
                crossOrigin="anonymous"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: isHov ? "grayscale(0%)" : "grayscale(20%)",
                  transition: "all 0.4s ease",
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Top Floating View Navigation Links */}
      <nav style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "32px 40px",
        pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(10,10,10,0.8), transparent)"
      }}>
        <div style={{ display: "flex", gap: "40px" }}>
          <span className="nav-link" style={{ pointerEvents: "auto" }} onClick={onGalleryClick}>
            GALLERY
          </span>
          <span className="nav-link" style={{ pointerEvents: "auto" }}>
            WORK
          </span>
        </div>

        <span className="gallery-title" style={{ pointerEvents: "auto" }} onClick={onGalleryClick}>
          jony.
        </span>

        <div style={{ display: "flex", gap: "40px" }}>
          <span className="nav-link" style={{ pointerEvents: "auto" }}>ABOUT</span>
          <span className="nav-link" style={{ pointerEvents: "auto" }}>CONTACT</span>
        </div>
      </nav>

      {/* Interactive Trigger Area CTA */}
      <div style={{
        position: "absolute",
        bottom: 35,
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.14em",
        color: "#555",
        zIndex: 200,
        pointerEvents: "auto",
        cursor: "pointer",
        borderBottom: "1px solid #222",
        paddingBottom: "4px"
      }} onClick={onGalleryClick}>
        CLICK ANYWHERE OR "GALLERY" TO VIEW ALL
      </div>
    </div>
  );
}