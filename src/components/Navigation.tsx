"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/timeline", label: "Timeline" },
  { href: "/causes", label: "Causes" },
  { href: "/theaters", label: "Theaters" },
  { href: "/technology", label: "Technology" },
  { href: "/players", label: "Major Players" },
  { href: "/sources", label: "Sources" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: "var(--nav-bg)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border-color)",
      transition: "background 0.4s ease, border-color 0.4s ease",
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "70px",
      }}>
        <Link href="/" style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.4rem",
          fontWeight: 700,
          color: "#f5d742",
          textDecoration: "none",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          textShadow: "0 0 10px rgba(245, 215, 66, 0.5), 2px 2px 4px rgba(0,0,0,0.8)",
        }}
        className="nav-logo"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f5d742" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span style={{ textShadow: "0 0 10px rgba(245, 215, 66, 0.5), 2px 2px 4px rgba(0,0,0,0.8)" }}>WW2 HISTORY</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
        }} className="desktop-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: pathname === item.href ? "#f5d742" : "#c9b96e",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                transition: "all 0.3s ease",
                position: "relative",
                paddingBottom: "4px",
                textShadow: pathname === item.href ? "0 0 8px rgba(245, 215, 66, 0.6)" : "none",
              }}
              className="nav-link"
            >
              {item.label}
              {pathname === item.href && (
                <span style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "2px",
                  background: "var(--accent-gold)",
                  boxShadow: "0 0 8px var(--hover-glow)",
                }} />
              )}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "none",
            background: "none",
            border: "1px solid var(--border-color)",
            color: "var(--accent-gold)",
            fontSize: "1.5rem",
            cursor: "pointer",
            padding: "0.5rem",
            borderRadius: "4px",
            transition: "all 0.3s ease",
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div style={{
          background: "var(--bg-secondary)",
          borderTop: "1px solid var(--border-color)",
          padding: "1rem 2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }} className="mobile-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              style={{
                color: pathname === item.href ? "var(--accent-gold)" : "var(--text-secondary)",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                padding: "0.75rem 0",
                borderBottom: "1px solid var(--border-color)",
                transition: "all 0.3s ease",
              }}
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}
          <div style={{ marginTop: "0.5rem" }}>
            <ThemeToggle />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
        }
        
        .nav-logo:hover {
          color: var(--accent-brass);
          transform: scale(1.02);
        }
        
        nav a:hover:not(.nav-logo) {
          color: var(--accent-gold) !important;
        }
      `}</style>
    </nav>
  );
}
