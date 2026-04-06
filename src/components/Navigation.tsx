"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      zIndex: 100,
      background: "rgba(10, 10, 15, 0.95)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(201, 162, 39, 0.2)",
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
          fontFamily: "'Cinzel', serif",
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "var(--accent-gold)",
          textDecoration: "none",
          letterSpacing: "0.1em",
        }}>
          WW2 HISTORY
        </Link>

        {/* Desktop Nav */}
        <div style={{
          display: "flex",
          gap: "2rem",
        }} className="desktop-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: pathname === item.href ? "var(--accent-gold)" : "var(--text-secondary)",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                transition: "color 0.3s ease",
                position: "relative",
                paddingBottom: "4px",
              }}
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
                }} />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "var(--accent-gold)",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div style={{
          background: "var(--bg-secondary)",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
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
                letterSpacing: "0.1em",
                padding: "0.5rem 0",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
