import { useState } from "react";

/**
 * Reusable Header Component
 *
 * Props:
 *   onBack       — function called when Home icon is clicked
 *   activeMenu   — (optional) controlled state from parent; if not passed, Header manages its own state
 *
 * Usage (standalone / self-contained):
 *   <Header onBack={() => setPage("home")} />
 *
 * Usage (controlled from parent):
 *   <Header onBack={handleBack} activeMenu={menu} setActiveMenu={setMenu} />
 */

export default function Header({ onBack, activeMenu: controlledMenu, setActiveMenu: controlledSetMenu }) {
  const [internalMenu, setInternalMenu] = useState(null);
  const [aboutHovered, setAboutHovered] = useState(false);

  // Support both controlled (from parent) and uncontrolled (self-managed) mode
  const activeMenu = controlledMenu !== undefined ? controlledMenu : internalMenu;
  const setActiveMenu = controlledSetMenu !== undefined ? controlledSetMenu : setInternalMenu;

  return (
    <>
      <style>{`
        @keyframes fadeInInner {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

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

        .animated-icon {
          display: inline-block;
          font-size: 16px;
          width: 24px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .user-menu-link:hover .mantra-loop {
          transform: rotate(180deg) scale(1.15);
        }
        .user-menu-link:hover .paperclip-hinge {
          transform: rotate(-25deg) translateY(-2px);
        }
      `}</style>

      {/* Mouse-leave zone covers entire header area */}
      <div
        onMouseLeave={() => { setActiveMenu(null); setAboutHovered(false); }}
        style={{ position: "sticky", top: 0, zIndex: 200, width: "100%" }}
      >
        {/* ── Black Bar ── */}
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
              background: "none", border: "none", padding: 0,
              cursor: "pointer", width: "25px", height: "25px",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}
            onMouseEnter={() => { setActiveMenu(null); setAboutHovered(false); }}
          >
            <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "#8a8a8a" }}>
              <path d="M12 3c-.4 0-.8.2-1.1.5l-8.2 7.2c-.5.4-.6 1.1-.2 1.6.4.5 1.1.6 1.6.2l.9-.8v6.8c0 1.4 1.1 2.5 2.5 2.5h3.5c.6 0 1-.4 1-1v-4.5c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5v4.5c0 .6.4 1 1 1h3.5c1.4 0 2.5-1.1 2.5-2.5v-6.8l.9.8c.2.2.5.3.7.3.3 0 .6-.1.8-.3.5-.4.4-1.2-.1-1.6l-8.2-7.2c-.3-.3-.7-.5-1.1-.5z" />
            </svg>
          </button>

          {/* Folder Icon Trigger */}
          <div style={{ display: "flex", alignItems: "center" }} onMouseEnter={() => { setActiveMenu("folder"); setAboutHovered(false); }}>
            <span style={{
              width: "24px", height: "24px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: activeMenu === "folder" ? "#ffffff" : "transparent",
              padding: activeMenu === "folder" ? "14px" : "0",
              borderRadius: activeMenu === "folder" ? "4px" : "0",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}>
              <svg viewBox="0 0 24 24" style={{ width: "24px", height: "24px", fill: activeMenu === "folder" ? "#000000" : "#8a8a8a", transition: "fill 0.2s ease" }}>
                <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
              </svg>
            </span>
          </div>

          {/* User Icon Trigger */}
          <div style={{ display: "flex", alignItems: "center" }} onMouseEnter={() => setActiveMenu("user")}>
            <span style={{
              width: "24px", height: "24px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: activeMenu === "user" ? "#ffffff" : "transparent",
              padding: activeMenu === "user" ? "14px" : "0",
              borderRadius: activeMenu === "user" ? "4px" : "0",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}>
              <svg viewBox="0 0 24 24" style={{ width: "24px", height: "24px", fill: activeMenu === "user" ? "#000000" : "#8a8a8a", transition: "fill 0.2s ease" }}>
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </span>
          </div>

          {/* Comment Icon */}
          <span
            style={{ width: "24px", height: "24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            onMouseEnter={() => { setActiveMenu(null); setAboutHovered(false); }}
          >
            <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "#8a8a8a" }}>
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </span>
        </div>

        {/* ── Drawer Panel ── */}
        <div
          className="header-drawer-container"
          style={{
            maxHeight: activeMenu ? "240px" : "0px",
            opacity: activeMenu ? 1 : 0,
          }}
        >
          {/* Folder Menu */}
          {activeMenu === "folder" && (
            <div className="dropdown-flex-row">
              <div className="dropdown-item">
                <div className="stacked-container">
                  <img src="https://i.ibb.co/4ZWcP129/1.png" className="thumb-base layer-back" alt="" />
                  <img src="https://i.ibb.co/TMbhBRcL/2.png" className="thumb-base layer-front" alt="" />
                </div>
                <div className="dropdown-text">PROFESSIONAL WORK ↗</div>
              </div>
              <div className="dropdown-item">
                <div className="stacked-container">
                  <img src="https://i.ibb.co/spXBFdSm/3.png" className="thumb-base layer-back" alt="" />
                  <img src="https://i.ibb.co/N2TCN0bC/4.png" className="thumb-base layer-front" alt="" />
                </div>
                <div className="dropdown-text">PERSONAL GALLERY ↗</div>
              </div>
            </div>
          )}

          {/* User / About Menu */}
          {activeMenu === "user" && (
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <div className="user-menu-outer-box">
                {/* Expanding Profile Image */}
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

                {/* Static ABOUT label (hidden when hovered) */}
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

                {/* Links */}
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
    </>
  );
}