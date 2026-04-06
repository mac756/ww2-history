"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { 
  TimelineIcon, 
  CausesIcon, 
  MapIcon, 
  TechIcon, 
  PlayersIcon, 
  SourcesIcon,
  ArrowRight
} from "@/components/Icons";

const sections = [
  {
    title: "Timeline",
    subtitle: "1922-1945",
    description: "Explore the major events from Mussolini's rise to V-J Day",
    href: "/timeline",
    icon: TimelineIcon,
    color: "var(--gold-amber)",
    image: "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?w=800&q=80",
  },
  {
    title: "Causes of War",
    subtitle: "Origins of Conflict",
    description: "Understand the Treaty of Versailles, rise of fascism, and the path to war",
    href: "/causes",
    icon: CausesIcon,
    color: "var(--axis-red)",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
  },
  {
    title: "Theaters of War",
    subtitle: "Global Conflict",
    description: "Interactive map showing territorial changes and major battles",
    href: "/theaters",
    icon: MapIcon,
    color: "var(--allies-blue)",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80",
  },
  {
    title: "Technology",
    subtitle: "Weapons & Innovation",
    description: "3D models of tanks, aircraft, ships, and infantry weapons",
    href: "/technology",
    icon: TechIcon,
    color: "var(--olive-drab)",
    image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&q=80",
  },
  {
    title: "Major Players",
    subtitle: "Commanders & Leaders",
    description: "Biographies of the key figures who shaped the war",
    href: "/players",
    icon: PlayersIcon,
    color: "var(--brass)",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80",
  },
  {
    title: "Sources",
    subtitle: "Bibliography",
    description: "Academic sources and historical references",
    href: "/sources",
    icon: SourcesIcon,
    color: "var(--copper)",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12a74?w=800&q=80",
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

      gsap.from(".stat-item", {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".stats-section",
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
        <div 
          className="hero-image" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1920&q=80')",
          }}
        />
        <div className="hero-content" style={{ position: "relative", zIndex: 1 }}>
          <h1 className="hero-title">World War II</h1>
          <p className="hero-subtitle">1939 - 1945 | A Comprehensive History</p>
          <div style={{ marginTop: "2rem" }}>
            <Link href="/timeline" className="btn-military">
              Begin Your Journey
            </Link>
          </div>
        </div>

        <div className="scroll-indicator" style={{ color: "var(--gold-amber)" }}>
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
      <section className="stats-section" style={{
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
            { number: "70-85M", label: "Total Deaths", image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=400&q=80" },
            { number: "6", label: "Years of War", image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&q=80" },
            { number: "30+", label: "Countries Involved", image: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=400&q=80" },
            { number: "3", label: "Major Theaters", image: "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?w=400&q=80" },
          ].map((stat, i) => (
            <div key={i} className="stat-item" style={{
              background: "var(--bg-tertiary)",
              borderRadius: "12px",
              padding: "2rem",
              border: "1px solid rgba(201, 162, 39, 0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--gold-amber)";
              e.currentTarget.style.transform = "translateY(-5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(201, 162, 39, 0.2)";
              e.currentTarget.style.transform = "translateY(0)";
            }}>
              <div style={{
                fontSize: "3rem",
                fontWeight: 900,
                color: "var(--gold-amber)",
                fontFamily: "'Cinzel', serif",
              }}>
                {stat.number}
              </div>
              <div style={{
                color: "var(--cream)",
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
          color: "var(--gold-amber)",
          textAlign: "center",
          marginBottom: "1rem",
          fontFamily: "'Cinzel', serif",
        }}>
          Explore the War
        </h2>
        <p style={{
          color: "var(--cream)",
          textAlign: "center",
          maxWidth: "600px",
          margin: "0 auto 4rem",
          opacity: 0.8,
        }}>
          Navigate through six comprehensive sections to understand the most devastating conflict in human history.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem",
        }}>
          {sections.map((section, i) => {
            const IconComponent = section.icon;
            return (
              <Link
                key={i}
                href={section.href}
                className="section-card"
                style={{
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <div className="card" style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  padding: 0,
                }}>
                  <div style={{
                    height: "180px",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    <img 
                      src={section.image} 
                      alt={section.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    />
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "linear-gradient(to bottom, transparent 50%, var(--bg-secondary) 100%)",
                    }} />
                    <div style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                    }}>
                      <div style={{
                        width: "50px",
                        height: "50px",
                        background: "rgba(15, 20, 25, 0.9)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid var(--gold-amber)",
                      }}>
                        <IconComponent size={24} color="var(--gold-amber)" />
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{
                      fontSize: "1.5rem",
                      color: section.color,
                      marginBottom: "0.25rem",
                      fontFamily: "'Cinzel', serif",
                    }}>
                      {section.title}
                    </h3>
                    <p style={{
                      color: "rgba(243, 229, 166, 0.7)",
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "1rem",
                    }}>
                      {section.subtitle}
                    </p>
                    <p style={{
                      color: "rgba(243, 229, 166, 0.8)",
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
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}>
                      Explore <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quote Section */}
      <section style={{
        background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)",
        padding: "6rem 2rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
          }}
        />
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}>
          <p style={{
            fontSize: "1.8rem",
            fontStyle: "italic",
            color: "var(--cream)",
            lineHeight: 1.8,
            marginBottom: "2rem",
          }}>
            "In war there is no substitute for victory."
          </p>
          <p style={{
            color: "var(--gold-amber)",
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
          color: "var(--gold-amber)",
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
            <h3 style={{ color: "var(--gold-amber)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>The Beginning</h3>
            <p style={{ color: "rgba(243, 229, 166, 0.8)", lineHeight: 1.8 }}>
              World War II began on September 1, 1939, when Nazi Germany invaded Poland. Within two days, Britain and France declared war on Germany, beginning the largest armed conflict in history.
            </p>
          </div>

          <div className="card">
            <h3 style={{ color: "var(--gold-amber)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>The Global Scale</h3>
            <p style={{ color: "rgba(243, 229, 166, 0.8)", lineHeight: 1.8 }}>
              The war spanned multiple continents, with major theaters in Europe, Asia, Africa, and the Pacific. It involved more than 30 countries and resulted in an estimated 70-85 million deaths.
            </p>
          </div>

          <div className="card">
            <h3 style={{ color: "var(--gold-amber)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>The Turning Points</h3>
            <p style={{ color: "rgba(243, 229, 166, 0.8)", lineHeight: 1.8 }}>
              Key turning points included the Battle of Britain (1940), the German invasion of the Soviet Union (1941), the Battle of Midway (1942), and the D-Day landings (1944).
            </p>
          </div>

          <div className="card">
            <h3 style={{ color: "var(--gold-amber)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>The End</h3>
            <p style={{ color: "rgba(243, 229, 166, 0.8)", lineHeight: 1.8 }}>
              The war ended in Europe on May 8, 1945 (V-E Day) with Germany's surrender. In Asia, Japan surrendered on September 2, 1945 (V-J Day), following the atomic bombings of Hiroshima and Nagasaki.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "var(--bg-secondary)",
        padding: "3rem 2rem",
        borderTop: "1px solid rgba(201, 162, 39, 0.2)",
        textAlign: "center",
      }}>
        <p style={{
          color: "rgba(243, 229, 166, 0.6)",
          fontSize: "0.9rem",
        }}>
          World War II History Project | Educational Resource
        </p>
        <p style={{
          color: "rgba(243, 229, 166, 0.4)",
          fontSize: "0.8rem",
          marginTop: "0.5rem",
        }}>
          Images courtesy of Unsplash and Wikimedia Commons
        </p>
      </footer>
    </div>
  );
}
