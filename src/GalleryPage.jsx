import { useState, useEffect } from "react";

export default function GalleryPage({ cards, onBack }) {
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // null | "folder" | "user"
  const [aboutHovered, setAboutHovered] = useState(false); 

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
        @keyframes fadeInInner {
          from { opacity: 0; }
          to   { opacity: 1; }
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

        /* Fixed-Height Base Drawer */
        .header-drawer-container {
          width: 100%;
          background: #000000;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          transition: max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
        }

        .dropdown-flex-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          max-width: 440px; 
          padding: 24px 0;
          animation: fadeInInner 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 32px;
          padding: 10px 16px;
          cursor: pointer;
          text-decoration: none;
          border-radius: 4px;
          transition: background 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.08); 
          transform: translateX(4px);
        }
        .dropdown-text {
          font-family: 'Courier New', Courier, monospace;
          font-size: 14px;
          font-weight: bold;
          color: #ffffff;
          letter-spacing: 0.06em;
        }

        .stacked-container {
          position: relative;
          width: 95px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .thumb-base {
          position: absolute;
          width: 84px; 
          height: 58px; 
          object-fit: cover;
          border-radius: 4px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.65);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          background: #111111;
        }
        .layer-back {
          transform: translate(-10px, -6px) rotate(-6deg);
          opacity: 0.45;
          z-index: 1;
        }
        .layer-front {
          transform: translate(4px, 4px) rotate(2deg);
          z-index: 2;
          border: 1px solid rgba(255,255,255,0.12);
        }
        .dropdown-item:hover .layer-back { transform: translate(-14px, -8px) rotate(-10deg); }
        .dropdown-item:hover .layer-front { transform: translate(6px, 2px) rotate(0deg) scale(1.03); }

        /* CONTACT ABOUT BOX PANELS */
        .user-menu-outer-box {
          position: relative;
          width: 100%;
          max-width: 440px;
          height: 210px;
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          animation: fadeInInner 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .about-interactive-viewport {
          position: absolute;
          top: 24px;
          left: 16px; 
          display: flex;
          align-items: center;
          cursor: pointer;
          overflow: hidden;
          background: #111111;
          z-index: 5;
          transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1), 
                      height 0.5s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-radius 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .about-interactive-viewport img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .user-menu-link {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 14px;
          font-weight: bold;
          color: #cccccc;
          cursor: pointer;
          text-decoration: none;
          letter-spacing: 0.05em;
          width: 100%;
          padding: 10px 16px;
          border-radius: 4px;
          transition: background 0.25s ease, color 0.2s ease, transform 0.2s ease;
        }
        .user-menu-link:hover {
          background: rgba(255, 255, 255, 0.08); 
          color: #ffffff;
          transform: translateX(4px);
        }

        /* DYNAMIC ICON ROTATION/MOVEMENT ENGINE */
        .animated-icon {
          display: inline-block;
          font-size: 16px;
          width: 24px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        /* Mantra Infinity Loop Rotation Hover Trigger */
        .user-menu-link:hover .mantra-loop {
          transform: rotate(180deg) scale(1.15);
        }

        /* Experience Paperclip Hinge Tilt Hover Trigger */
        .user-menu-link:hover .paperclip-hinge {
          transform: rotate(-25deg) translateY(-2px);
        }
      `}</style>

      {/* GLOBAL MOUSE LEAVE CONTROLLER FOR ENTIRE HEADER ZONE */}
      <div 
        onMouseLeave={() => { setActiveMenu(null); setAboutHovered(false); }}
        style={{ position: "sticky", top: 0, zIndex: 200, width: "100%" }}
      >
        {/* Core Black Bar Row */}
        <div style={{
          width: "100%",
          background: "#000000",
          height: "68px", 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "60px",
          transition: "background 0.3s ease"
        }}>
          {/* Home Icon */}
          <button 
            onClick={onBack} 
            style={{ 
              background: "none", 
              border: "none", 
              padding: 0,
              cursor: "pointer", 
              width: "25px", 
              height: "25px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center"
            }}
            onMouseEnter={() => { setActiveMenu(null); setAboutHovered(false); }}
          >
            <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "#8a8a8a" }}>
              <path d="M12 3c-.4 0-.8.2-1.1.5l-8.2 7.2c-.5.4-.6 1.1-.2 1.6.4.5 1.1.6 1.6.2l.9-.8v6.8c0 1.4 1.1 2.5 2.5 2.5h3.5c.6 0 1-.4 1-1v-4.5c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v4.5c0 .6.4 1 1 1h3.5c1.4 0 2.5-1.1 2.5-2.5v-6.8l.9.8c.2.2.5.3.7.3.3 0 .6-.1.8-.3.5-.4.4-1.2-.1-1.6l-8.2-7.2c-.3-.3-.7-.5-1.1-.5z" />
            </svg>
          </button>

          {/* Folder Icon Trigger */}
          <div style={{ display: "flex", alignItems: "center" }} onMouseEnter={() => { setActiveMenu("folder"); setAboutHovered(false); }}>
            <span 
              style={{ 
                width: "24px", 
                height: "24px", 
                cursor: "pointer", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                background: activeMenu === "folder" ? "#ffffff" : "transparent",
                padding: activeMenu === "folder" ? "14px" : "0",
                borderRadius: activeMenu === "folder" ? "4px" : "0",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              <svg viewBox="0 0 24 24" style={{ width: "24px", height: "24px", fill: activeMenu === "folder" ? "#000000" : "#8a8a8a", transition: "fill 0.2s ease" }}>
                <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
              </svg>
            </span>
          </div>

          {/* User Icon Trigger */}
          <div style={{ display: "flex", alignItems: "center" }} onMouseEnter={() => setActiveMenu("user")}>
            <span 
              style={{ 
                width: "24px", 
                height: "24px", 
                cursor: "pointer", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                background: activeMenu === "user" ? "#ffffff" : "transparent",
                padding: activeMenu === "user" ? "14px" : "0",
                borderRadius: activeMenu === "user" ? "4px" : "0",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              <svg viewBox="0 0 24 24" style={{ width: "24px", height: "24px", fill: activeMenu === "user" ? "#000000" : "#8a8a8a", transition: "fill 0.2s ease" }}>
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </span>
          </div>

          {/* Comment Icon Link */}
          <span style={{ width: "24px", height: "24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onMouseEnter={() => { setActiveMenu(null); setAboutHovered(false); }}>
            <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "#8a8a8a" }}>
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </span>
        </div>

        {/* UNIFIED STABLE HEIGHT DRAWER PANEL */}
        <div 
          className="header-drawer-container"
          style={{
            maxHeight: activeMenu ? "240px" : "0px", 
            opacity: activeMenu ? 1 : 0,
          }}
        >
          {/* Section 1: Folder View Context */}
          {activeMenu === "folder" && (
            <div className="dropdown-flex-row">
              <div className="dropdown-item">
                <div className="stacked-container">
                  <img src="https://i.ibb.co/4ZWcP129/1.png" className="thumb-base layer-back" />
                  <img src="https://i.ibb.co/TMbhBRcL/2.png" className="thumb-base layer-front" />
                </div>
                <div className="dropdown-text">PROFESSIONAL WORK ↗</div>
              </div>

              <div className="dropdown-item">
                <div className="stacked-container">
                  <img src="https://i.ibb.co/spXBFdSm/3.png" className="thumb-base layer-back" />
                  <img src="https://i.ibb.co/N2TCN0bC/4.png" className="thumb-base layer-front" />
                </div>
                <div className="dropdown-text">PERSONAL GALLERY ↗</div>
              </div>
            </div>
          )}

          {/* Section 2: Contact About Module */}
          {activeMenu === "user" && (
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <div className="user-menu-outer-box">
                {/* Profile Image Viewport Canvas Container */}
                <div 
                  className="about-interactive-viewport"
                  onMouseEnter={() => setAboutHovered(true)}
                  onMouseLeave={() => setAboutHovered(false)}
                  style={{
                    width: aboutHovered ? "280px" : "54px",     
                    height: aboutHovered ? "65px" : "54px",     
                    borderRadius: aboutHovered ? "4px" : "50%", 
                    transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                >
                  <img src="https://i.ibb.co/8L2Sdt5Q/17.png" alt="User Avatar" />
                  
                  {/* Text inside image structure when scaled */}
                  <span style={{
                    position: "absolute",
                    left: "16px",
                    zIndex: 10,
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#ffffff",
                    letterSpacing: "0.06em",
                    opacity: aboutHovered ? 1 : 0,
                    transition: "opacity 0.2s ease 0.08s",
                    textShadow: "0 2px 6px rgba(0,0,0,0.6)"
                  }}>
                    ABOUT →
                  </span>
                </div>

                {/* Baseline Static Label Link */}
                <span 
                  onMouseEnter={() => setAboutHovered(true)}
                  style={{
                    position: "absolute",
                    left: "16px", 
                    top: "24px",
                    width: "280px",
                    padding: "10px 16px",
                    fontFamily: 'Courier New, Courier, monospace',
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#ffffff",
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                    borderRadius: "4px",
                    opacity: aboutHovered ? 0 : 1,
                    transition: "opacity 0.15s ease, background 0.25s",
                    userSelect: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <span style={{ marginLeft: "70px" }}>ABOUT ↗</span>
                </span>

                {/* Lower Section Stack - Aligned Items with Micro-animation Classes */}
                <div style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "6px", 
                  width: "280px",
                  paddingLeft: "16px", 
                  marginTop: "95px" 
                }}>
                  <a className="user-menu-link">
                    <span className="animated-icon paperclip-hinge">📎</span> EXPERIENCE
                  </a>
                  <a className="user-menu-link">
                    <span className="animated-icon mantra-loop">∞</span> MY MANTRA
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Title Header Area */}
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

      {/* Layout Grid Toggles */}
      <div className="layout-switch-container" style={{ animation: "fadeUp 0.8s ease both" }}>
        <div className="toggle-box-single"></div>
        <div className="toggle-box-grid">
          <span></span><span></span><span></span><span></span>
        </div>
      </div>

      {/* Grid Canvas Flow Layout */}
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

      {/* Footer Element */}
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
        <div style={{ cursor: "pointer", transition: "opacity 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.opacity="0.5"} onMouseLeave={(e) => e.currentTarget.style.opacity="1"} onClick={() => alert('Contact Triggered')}>CONTACT</div>
      </footer>

      {/* Light Overlay Detail Modal Sheets */}
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