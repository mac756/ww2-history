"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const causes = [
  {
    title: "Treaty of Versailles",
    period: "1919",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    color: "#8b1a1a",
    content: "The Treaty of Versailles ended WWI but punished Germany severely. War guilt clauses, massive reparations, and territorial losses humiliated Germany. This created deep resentment that Hitler would exploit to rise to power.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Treaty_of_Versailles.jpg/800px-Treaty_of_Versailles.jpg",
    imageCredit: "Wikimedia Commons",
  },
  {
    title: "Rise of Fascism",
    period: "1920s-1930s",
    icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9",
    color: "#8b1a1a",
    content: "Economic devastation from the Great Depression created fertile ground for extremist movements. Mussolini in Italy and Hitler in Germany promised national rejuvenation through aggressive nationalism and totalitarian control.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Hitler_portrait_crop.jpg/800px-Hitler_portrait_crop.jpg",
    imageCredit: "Wikimedia Commons",
  },
  {
    title: "Failure of Appeasement",
    period: "1938",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    color: "#d97706",
    content: "Britain and France's policy of appeasement allowed Hitler to violate the Treaty of Versailles unchallenged. The Munich Agreement of 1938 convinced Hitler that democracies would not fight.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Chamberlain_Munich.jpg/800px-Chamberlain_Munich.jpg",
    imageCredit: "Wikimedia Commons",
  },
  {
    title: "German Expansion",
    period: "1938-1939",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
    color: "#8b1a1a",
    content: "Hitler's Anschluss with Austria and annexation of the Sudetenland violated international law. The destruction of Czechoslovakia in March 1939 finally convinced Britain and France that war was inevitable.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/German_Expansion_1938-1939.png/800px-German_Expansion_1938-1939.png",
    imageCredit: "Wikimedia Commons",
  },
  {
    title: "Molotov-Ribbentrop Pact",
    period: "August 1939",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    color: "#6b4423",
    content: "The Nazi-Soviet Non-Aggression Pact secretly divided Eastern Europe into spheres of influence. This guaranteed Hitler could invade Poland without Soviet opposition and freed him to wage war in the West.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Molotov_Ribbentrop_Authograph.svg/800px-Molotov_Ribbentrop_Authograph.svg.png",
    imageCredit: "Wikimedia Commons",
  },
  {
    title: "Invasion of Poland",
    period: "September 1, 1939",
    icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
    color: "#8b1a1a",
    content: "Germany's invasion of Poland triggered Britain's and France's declarations of war. The swift defeat of Poland demonstrated the devastating power of blitzkrieg warfare and began the Second World War.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Poland_Invasion_1939.jpg/800px-Poland_Invasion_1939.jpg",
    imageCredit: "Bundesarchiv / Wikimedia Commons",
  },
];

export default function CausesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cause-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ paddingTop: "70px" }}>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)",
        padding: "6rem 2rem 4rem",
        textAlign: "center",
        borderBottom: "1px solid var(--border-color)",
      }}>
        <h1 className="section-title" style={{ display: "block", marginBottom: "1rem" }}>
          Causes of War
        </h1>
        <p style={{
          color: "var(--text-secondary)",
          maxWidth: "700px",
          margin: "0 auto",
          fontSize: "1.1rem",
          lineHeight: 1.8,
        }}>
          Understanding the complex web of political, economic, and social factors that led to the most devastating conflict in human history.
        </p>
      </section>

      {/* Causes */}
      <section ref={containerRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {causes.map((cause, index) => (
            <div 
              key={index}
              className="cause-card card-document hover-lift"
              style={{
                display: "grid",
                gridTemplateColumns: index % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                gap: "3rem",
                alignItems: "center",
                background: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                borderRadius: "12px",
                padding: "2.5rem",
                transition: "all 0.4s ease",
              }}
            >
              {/* Image */}
              <div style={{ 
                borderRadius: "8px", 
                overflow: "hidden",
                order: index % 2 === 0 ? 0 : 1,
              }}>
                <img
                  src={cause.image}
                  alt={cause.title}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    filter: "sepia(0.2) contrast(1.05)",
                    transition: "filter 0.4s ease, transform 0.5s ease",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              
              {/* Content */}
              <div style={{ order: index % 2 === 0 ? 1 : 0 }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.25rem",
                }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "8px",
                    background: `${cause.color}22`,
                    border: `2px solid ${cause.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={cause.color} strokeWidth="2">
                      <path d={cause.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      color: cause.color,
                    }}>
                      {cause.title}
                    </h3>
                    <p style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                    }}>
                      {cause.period}
                    </p>
                  </div>
                </div>
                
                <p style={{
                  color: "var(--text-secondary)",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                }}>
                  {cause.content}
                </p>
                
                <p style={{
                  marginTop: "1rem",
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}>
                  {cause.imageCredit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section style={{
        background: "var(--bg-secondary)",
        padding: "5rem 2rem",
        borderTop: "1px solid var(--border-color)",
        textAlign: "center",
      }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--accent-gold)" opacity="0.3" style={{ marginBottom: "1rem" }}>
          <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z"/>
        </svg>
        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
          fontStyle: "italic",
          color: "var(--text-primary)",
          lineHeight: 1.8,
          maxWidth: "800px",
          margin: "0 auto 2rem",
        }}>
          "The seeds of World War II were planted in the Treaty of Versailles and the Great Depression that followed."
        </p>
        <p style={{ color: "var(--accent-gold)", fontFamily: "var(--font-mono)", fontSize: "0.9rem" }}>
          — Historical Analysis
        </p>
      </section>
    </div>
  );
}
