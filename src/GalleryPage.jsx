import { useState, useEffect } from "react";
import Header from "./Header"; // ← Reusable header — use same path where you save Header.jsx

export default function GalleryPage({ cards, onBack }) {
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 30);
  }, []);

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      background: "#f4f3f1",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowY: "auto",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }

        .gcard-wrapper {
          display: flex;
          flex-direction: column;
          margin-bottom: 36px;
          break-inside: avoid;
        }
        .gcard {
          cursor: pointer;
          overflow: hidden;
          position: relative;
          background: #e5e5e5;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gcard img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gcard:hover img { transform: scale(1.02); }

        .gcard-title {
          font-family: 'Courier New', Courier, monospace;
          font-size: 13px;
          font-weight: bold;
          color: #555555;
          margin-top: 12px;
          text-align: left;
          letter-spacing: 0.02em;
        }

        .layout-switch-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          padding: 24px 0 36px;
        }
        .toggle-box-single {
          width: 20px;
          height: 20px;
          border: 2px solid #a3a3a3;
          background: #c5c5c5;
          border-radius: 4px;
        }
        .toggle-box-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          width: 16px;
          height: 16px;
        }
        .toggle-box-grid span {
          background: #000000;
        }
      `}</style>

      {/* ── Header (reusable component) ── */}
      <Header onBack={onBack} />

      {/* ── Main Title ── */}
      <div style={{
        padding: "85px 20px 0px",
        textAlign: "center",
        animation: "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
      }}>
        <h1 style={{
          fontSize: "90px",
          fontFamily: 'Georgia, serif',
          color: "#000000",
          fontWeight: "400",
          margin: "0 0 36px 0",
          letterSpacing: "-0.015em",
          lineHeight: "1.05"
        }}>
          My Personal<br />Gallery
        </h1>
        <p style={{
          fontSize: "13px",
          color: "#000000",
          fontFamily: 'Courier New, Courier, monospace',
          fontWeight: "bold",
          letterSpacing: "0.02em",
          lineHeight: "1.8",
          maxWidth: "520px",
          margin: "0 auto",
          textTransform: "uppercase"
        }}>
          UNFILTERED WORK, IDEAS, AND LESSONS<br />
          I'VE GATHERED ALONG THE WAY.
        </p>
      </div>

      {/* ── Layout Toggle ── */}
      <div className="layout-switch-container" style={{ animation: "fadeUp 0.8s ease both" }}>
        <div className="toggle-box-single"></div>
        <div className="toggle-box-grid">
          <span></span><span></span><span></span><span></span>
        </div>
      </div>

      {/* ── Masonry Grid ── */}
      <div style={{
        padding: "0 48px 60px",
        columns: "4 260px",
        columnGap: "32px",
        animation: "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
      }}>
        {cards.map((card, i) => (
          <div key={card.id} className="gcard-wrapper">
            <div
              className="gcard"
              onClick={() => setSelected(card)}
              style={{
                aspectRatio: i % 4 === 0 ? "4/3" : i % 4 === 1 ? "1/1" : i % 4 === 2 ? "4/5" : "3/4",
              }}
            >
              <img src={card.imageUrl} alt={card.title} crossOrigin="anonymous" />
            </div>
            <div className="gcard-title">
              {card.title.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <footer style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "60px 48px 40px",
        fontFamily: 'Courier New, Courier, monospace',
        fontSize: "13px",
        fontWeight: "bold",
        color: "#111111",
        letterSpacing: "0.05em",
        borderTop: "1px solid rgba(0,0,0,0.05)",
        marginTop: "40px",
        textTransform: "uppercase"
      }}>
        <div>© 2026 JONY</div>
        <div
          style={{ cursor: "pointer", transition: "opacity 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.5"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          onClick={() => alert('Contact Triggered')}
        >
          CONTACT
        </div>
      </footer>

      {/* ── Image Modal ── */}
      {selected && (
        <div
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div style={{
            position: "relative",
            maxWidth: "460px",
            width: "90%",
            animation: "modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}>
            <button
              onClick={() => setSelected(null)}
              style={{
                position: "absolute", top: -45, right: 0,
                background: "none", border: "none",
                fontSize: "22px", cursor: "pointer",
                color: "#111111", padding: "5px",
              }}
            >✕</button>
            <div style={{ width: "100%", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.08)" }}>
              <img
                src={selected.imageUrl}
                alt={selected.title}
                crossOrigin="anonymous"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "13px", fontFamily: 'Courier New', fontWeight: "bold", color: "#111" }}>
                {selected.title.toUpperCase()}
              </span>
              <a
                href={selected.imageUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "12px", fontFamily: 'Courier New', fontWeight: "bold", color: "#000000",
                  textDecoration: "none", borderBottom: "1px solid #000000", paddingBottom: "1px",
                }}
              >
                DOWNLOAD
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}