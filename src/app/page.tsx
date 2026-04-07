"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "Timeline",
    subtitle: "1922-1945",
    description: "Explore the major events from Mussolini's rise to V-J Day",
    href: "/timeline",
    color: "var(--accent-gold)",
  },
  {
    title: "Causes of War",
    subtitle: "Origins of Conflict",
    description: "Understand the Treaty of Versailles, rise of fascism, and the path to war",
    href: "/causes",
    color: "var(--axis-red)",
  },
  {
    title: "Theaters of War",
    subtitle: "Global Conflict",
    description: "Interactive map showing territorial changes and major battles",
    href: "/theaters",
    color: "var(--allies-navy)",
  },
  {
    title: "Technology",
    subtitle: "Weapons & Innovation",
    description: "Explore the weapons, vehicles, and innovations that shaped the war",
    href: "/technology",
    color: "#4a9c6d",
  },
  {
    title: "Major Players",
    subtitle: "Commanders & Leaders",
    description: "Biographies of the key figures who shaped the war",
    href: "/players",
    color: "#8b5cf6",
  },
  {
    title: "Sources",
    subtitle: "Bibliography",
    description: "Academic sources and historical references",
    href: "/sources",
    color: "#ec4899",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content animations
      gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });
      
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
      });
      
      gsap.from(".hero-dates", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        delay: 0.9,
      });
      
      gsap.from(".hero-cta", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        delay: 1.2,
      });
      
      gsap.from(".scroll-indicator", {
        opacity: 0,
        duration: 1,
        delay: 1.5,
      });

      // Cards stagger animation
      gsap.from(".section-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      });

      // Stats counter animation
      gsap.from(".stats-number", {
        textContent: 0,
        duration: 2,
        ease: "power1.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%",
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ paddingTop: "70px" }}>
      {/* Hero Section */}
      <section className="hero" ref={heroRef} style={{ position: "relative", minHeight: "100vh" }}>
        {/* Background Image - Iwo Jima Flag Raising */}
        <div 
          className="hero-background"
          style={{
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Iwo_Jima_flagRaising.jpg/1280px-Iwo_Jima_flagRaising.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        />
        
        {/* Overlay */}
        <div className="hero-overlay" />
        
        {/* Vignette */}
        <div className="hero-vignette" />
        
        {/* Film Grain */}
        <div className="hero-grain" />
        
        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">World War II</h1>
          <p className="hero-subtitle">The Second World War</p>
          <div className="hero-dates">1939 — 1945</div>
          
          <div className="hero-cta" style={{ marginTop: "3rem" }}>
            <Link href="/timeline" className="btn-military">
              Begin Your Journey
            </Link>
          </div>
          
          <p style={{
            marginTop: "2rem",
            color: "var(--text-secondary)",
            fontSize: "0.85rem",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em",
            maxWidth: "500px",
            lineHeight: 1.6,
          }}>
            The most devastating conflict in human history, claiming an estimated 70-85 million lives across six years of global warfare.
          </p>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
        
        {/* Image Credit */}
        <div style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          fontSize: "0.65rem",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          zIndex: 20,
        }}>
          U.S. Navy Photo / Wikimedia Commons
        </div>
      </section>

      {/* Stats Section */}
      <section 
        className="stats-section"
        style={{
          background: "var(--bg-secondary)",
          padding: "5rem 2rem",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
          textAlign: "center",
        }}>
          {[
            { number: "70-85M", label: "Estimated Deaths", suffix: "" },
            { number: "6", label: "Years of War", suffix: "" },
            { number: "30+", label: "Countries Involved", suffix: "" },
            { number: "3", label: "Major Theaters", suffix: "" },
          ].map((stat, i) => (
            <div key={i} className="stats-item">
              <div className="stats-number">{stat.number}</div>
              <div className="stats-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Sections Grid */}
      <section 
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "6rem 2rem",
        }} 
        ref={cardsRef}
      >
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.5rem",
          color: "var(--accent-gold)",
          textAlign: "center",
          marginBottom: "1rem",
        }}>
          Explore the War
        </h2>
        <p style={{
          color: "var(--text-secondary)",
          textAlign: "center",
          maxWidth: "600px",
          margin: "0 auto 4rem",
          fontSize: "1.1rem",
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
              style={{ textDecoration: "none" }}
            >
              <div 
                className="card"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  padding: "2rem",
                }}
              >
                <div 
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${section.color}22, ${section.color}44)`,
                    border: `2px solid ${section.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={section.color} strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  color: section.color,
                  marginBottom: "0.25rem",
                }}>
                  {section.title}
                </h3>
                
                <p style={{
                  color: "var(--text-muted)",
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "1rem",
                  fontFamily: "var(--font-mono)",
                }}>
                  {section.subtitle}
                </p>
                
                <p style={{ color: "var(--text-secondary)", flexGrow: 1, lineHeight: 1.7 }}>
                  {section.description}
                </p>
                
                <div style={{
                  marginTop: "1.5rem",
                  color: section.color,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: "0.8rem",
                  fontFamily: "var(--font-mono)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}>
                  Explore
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
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
        borderTop: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="var(--accent-gold)" 
            opacity="0.3"
            style={{ marginBottom: "1rem" }}
          >
            <path d="M3 21c1 1 3 3 4 4-2-2-3-4-4-4zm0 0c9 1 15 7 16 14H3c1-7 7-13 16-14zm0 0c-1 1-3 3-4 4 2-2 3-4 4-4zm0 0c9 1 15 7 16 14H3c1-7 7-13 16-14z" />
          </svg>
          
          <p style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontStyle: "italic",
            color: "var(--text-primary)",
            lineHeight: 1.8,
            marginBottom: "2rem",
          }}>
            "In war there is no substitute for victory."
          </p>
          
          <p style={{
            color: "var(--accent-gold)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
            letterSpacing: "0.1em",
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
          fontFamily: "var(--font-display)",
          fontSize: "2.5rem",
          color: "var(--accent-gold)",
          textAlign: "center",
          marginBottom: "3rem",
        }}>
          The War in Brief
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}>
          {[
            {
              title: "The Beginning",
              icon: "M12 2L2 7l10 5 10-5-10-5z",
              content: "World War II began on September 1, 1939, when Nazi Germany invaded Poland. Within two days, Britain and France declared war on Germany, beginning the largest armed conflict in history."
            },
            {
              title: "The Global Scale",
              icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
              content: "The war spanned multiple continents, with major theaters in Europe, Asia, Africa, and the Pacific. It involved more than 30 countries and resulted in an estimated 70-85 million deaths."
            },
            {
              title: "The Turning Points",
              icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l4.59-4.58L18 11l-6 6z",
              content: "Key turning points included the Battle of Britain (1940), the German invasion of the Soviet Union (1941), the Battle of Midway (1942), and the D-Day landings (1944)."
            },
            {
              title: "The End",
              icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.71 14.71l-1.41 1.41L12 15.41l-3.29 3.29-1.42-1.41L10.59 14l-3.3-3.3 1.41-1.42L12 12.59l3.29-3.29 1.42 1.41L13.41 14l3.3 3.3z",
              content: "The war ended in Europe on May 8, 1945 (V-E Day) with Germany's surrender. In Asia, Japan surrendered on September 2, 1945 (V-J Day), following the atomic bombings of Hiroshima and Nagasaki."
            },
          ].map((item, i) => (
            <div key={i} className="card card-document">
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.25rem",
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "var(--bg-tertiary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent-gold)">
                    <path d={item.icon} />
                  </svg>
                </div>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--accent-gold)",
                  fontSize: "1.25rem",
                }}>
                  {item.title}
                </h3>
              </div>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
