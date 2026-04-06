"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const sections = [
  {
    title: "Timeline",
    subtitle: "1922-1945",
    description: "Explore the major events from Mussolini's rise to V-J Day",
    href: "/timeline",
    icon: "⏱",
    color: "var(--accent-gold)",
  },
  {
    title: "Causes of War",
    subtitle: "Origins of Conflict",
    description: "Understand the Treaty of Versailles, rise of fascism, and the path to war",
    href: "/causes",
    icon: "⚔",
    color: "var(--axis-red)",
  },
  {
    title: "Theaters of War",
    subtitle: "Global Conflict",
    description: "Interactive map showing territorial changes and major battles",
    href: "/theaters",
    icon: "🗺",
    color: "var(--allies-blue)",
  },
  {
    title: "Technology",
    subtitle: "Weapons & Innovation",
    description: "3D models of tanks, aircraft, ships, and infantry weapons",
    href: "/technology",
    icon: "🔧",
    color: "#4a9c6d",
  },
  {
    title: "Major Players",
    subtitle: "Commanders & Leaders",
    description: "Biographies of the key figures who shaped the war",
    href: "/players",
    icon: "🎖",
    color: "#8b5cf6",
  },
  {
    title: "Sources",
    subtitle: "Bibliography",
    description: "Academic sources and historical references",
    href: "/sources",
    icon: "📚",
    color: "#ec4899",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".section-card", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ paddingTop: "70px" }}>
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-content" style={{ position: "relative", zIndex: 1 }}>
          <h1 className="hero-title">World War II</h1>
          <p className="hero-subtitle">1939 - 1945 | A Comprehensive History</p>
          <div style={{ marginTop: "2rem" }}>
            <Link href="/timeline" className="btn-military">
              Begin Your Journey
            </Link>
          </div>
        </div>

        <div className="scroll-indicator" style={{ color: "var(--accent-gold)" }}>
          <span style={{ fontSize: "2rem" }}>▼</span>
        </div>

        {/* Decorative Elements */}
        <div style={{
          position: "absolute",
          top: "20%",
          left: "5%",
          width: "200px",
          height: "200px",
          border: "2px solid rgba(201, 162, 39, 0.1)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute",
          bottom: "30%",
          right: "5%",
          width: "300px",
          height: "300px",
          border: "2px solid rgba(201, 162, 39, 0.1)",
          borderRadius: "50%",
        }} />
      </section>

      {/* Stats Section */}
      <section style={{
        background: "var(--bg-secondary)",
        padding: "4rem 2rem",
        borderTop: "1px solid rgba(201, 162, 39, 0.2)",
        borderBottom: "1px solid rgba(201, 162, 39, 0.2)",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
          textAlign: "center",
        }}>
          {[
            { number: "70-85M", label: "Total Deaths" },
            { number: "6", label: "Years of War" },
            { number: "30+", label: "Countries Involved" },
            { number: "3", label: "Major Theaters" },
          ].map((stat, i) => (
            <div key={i} className="hero-content">
              <div style={{
                fontSize: "3rem",
                fontWeight: 900,
                color: "var(--accent-gold)",
                fontFamily: "'Cinzel', serif",
              }}>
                {stat.number}
              </div>
              <div style={{
                color: "var(--text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontSize: "0.9rem",
                marginTop: "0.5rem",
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sections Grid */}
      <section style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "6rem 2rem",
      }} ref={cardsRef}>
        <h2 style={{
          fontSize: "2.5rem",
          color: "var(--accent-gold)",
          textAlign: "center",
          marginBottom: "1rem",
          fontFamily: "'Cinzel', serif",
        }}>
          Explore the War
        </h2>
        <p style={{
          color: "var(--text-secondary)",
          textAlign: "center",
          maxWidth: "600px",
          margin: "0 auto 4rem",
        }}>
          Navigate through six comprehensive sections to understand the most devastating conflict in human history.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem",
        }}>
          {sections.map((section, i) => (
            <Link
              key={i}
              href={section.href}
              className="section-card"
              style={{
                textDecoration: "none",
              }}
            >
              <div className="card" style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}>
                <div style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                }}>
                  {section.icon}
                </div>
                <h3 style={{
                  fontSize: "1.5rem",
                  color: section.color,
                  marginBottom: "0.25rem",
                  fontFamily: "'Cinzel', serif",
                }}>
                  {section.title}
                </h3>
                <p style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "1rem",
                }}>
                  {section.subtitle}
                </p>
                <p style={{
                  color: "var(--text-secondary)",
                  flexGrow: 1,
                }}>
                  {section.description}
                </p>
                <div style={{
                  marginTop: "1.5rem",
                  color: section.color,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: "0.85rem",
                }}>
                  Explore →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section style={{
        background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)",
        padding: "6rem 2rem",
        textAlign: "center",
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}>
          <p style={{
            fontSize: "1.8rem",
            fontStyle: "italic",
            color: "var(--text-primary)",
            lineHeight: 1.8,
            marginBottom: "2rem",
          }}>
            "In war there is no substitute for victory."
          </p>
          <p style={{
            color: "var(--accent-gold)",
            fontWeight: 600,
          }}>
            — General Douglas MacArthur
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "6rem 2rem",
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          color: "var(--accent-gold)",
          textAlign: "center",
          marginBottom: "3rem",
          fontFamily: "'Cinzel', serif",
        }}>
          The War in Brief
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}>
          <div className="card">
            <h3 style={{ color: "var(--accent-gold)", marginBottom: "1rem" }}>The Beginning</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
              World War II began on September 1, 1939, when Nazi Germany invaded Poland. Within two days, Britain and France declared war on Germany, beginning the largest armed conflict in history.
            </p>
          </div>

          <div className="card">
            <h3 style={{ color: "var(--accent-gold)", marginBottom: "1rem" }}>The Global Scale</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
              The war spanned multiple continents, with major theaters in Europe, Asia, Africa, and the Pacific. It involved more than 30 countries and resulted in an estimated 70-85 million deaths.
            </p>
          </div>

          <div className="card">
            <h3 style={{ color: "var(--accent-gold)", marginBottom: "1rem" }}>The Turning Points</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
              Key turning points included the Battle of Britain (1940), the German invasion of the Soviet Union (1941), the Battle of Midway (1942), and the D-Day landings (1944).
            </p>
          </div>

          <div className="card">
            <h3 style={{ color: "var(--accent-gold)", marginBottom: "1rem" }}>The End</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
              The war ended in Europe on May 8, 1945 (V-E Day) with Germany's surrender. In Asia, Japan surrendered on September 2, 1945 (V-J Day), following the atomic bombings of Hiroshima and Nagasaki.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
