"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const theaters = {
  "europe": {
    name: "Western Europe",
    color: "#1e4d8c",
    battles: [
      { name: "Battle of Britain", year: 1940, description: "RAF defeats Luftwaffe, preventing German invasion of Britain" },
      { name: "D-Day (Normandy)", year: 1944, description: "Largest amphibious invasion, beginning liberation of Western Europe" },
      { name: "Battle of the Bulge", year: 1944, description: "Last major German offensive, repelled by Allies" },
      { name: "Market Garden", year: 1944, description: "Allied airborne operation, 'a bridge too far'" },
    ],
  },
  "eastern": {
    name: "Eastern Europe",
    color: "#6b4423",
    battles: [
      { name: "Operation Barbarossa", year: 1941, description: "German invasion of Soviet Union" },
      { name: "Battle of Moscow", year: 1941, description: "Soviet defense saves capital" },
      { name: "Battle of Stalingrad", year: 1942, description: "Turning point on Eastern Front" },
      { name: "Battle of Kursk", year: 1943, description: "Largest tank battle in history" },
      { name: "Battle of Leningrad", year: 1941, description: "1,500-day siege of Leningrad" },
    ],
  },
  "africa": {
    name: "North Africa",
    color: "#d97706",
    battles: [
      { name: "Operation Torch", year: 1942, description: "Allied invasion of North Africa" },
      { name: "El Alamein", year: 1942, description: "Turning point in North Africa" },
    ],
  },
  "pacific": {
    name: "Pacific Theater",
    color: "#059669",
    battles: [
      { name: "Pearl Harbor", year: 1941, description: "Japanese attack brings US into war" },
      { name: "Midway", year: 1942, description: "US defeats Japanese carrier fleet" },
      { name: "Guadalcanal", year: 1942, description: "First major Allied offensive in Pacific" },
      { name: "Iwo Jima", year: 1945, description: "Strategic island capture" },
      { name: "Okinawa", year: 1945, description: "Last major battle of Pacific War" },
    ],
  },
};

const operations = [
  { name: "Operation Overlord", theater: "europe", year: 1944, description: "D-Day invasion of Normandy" },
  { name: "Operation Torch", theater: "africa", year: 1942, description: "Allied invasion of North Africa" },
  { name: "Operation Husky", theater: "africa", year: 1943, description: "Invasion of Sicily" },
  { name: "Operation Barbarossa", theater: "eastern", year: 1941, description: "Invasion of Soviet Union" },
  { name: "Operation Market Garden", theater: "europe", year: 1944, description: "Airborne assault in Netherlands" },
  { name: "Operation Vengeance", theater: "pacific", year: 1943, description: "Mission to kill Admiral Yamamoto" },
];

const timelineYears = [1939, 1940, 1941, 1942, 1943, 1944, 1945];

export default function TheatersPage() {
  const [selectedYear, setSelectedYear] = useState(1942);
  const [selectedBattle, setSelectedBattle] = useState<{ name: string; description: string } | null>(null);
  const [selectedTheater, setSelectedTheater] = useState<string>("europe");
  const mapRef = useRef<HTMLDivElement>(null);

  const currentTheater = theaters[selectedTheater as keyof typeof theaters];
  
  const visibleBattles = currentTheater?.battles.filter((battle) => battle.year <= selectedYear) || [];

  // Map image URLs by year and theater from Wikimedia Commons
  const getMapImage = () => {
    if (selectedTheater === "europe") {
      if (selectedYear <= 1940) return "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Western_Europe_1940.png/800px-Western_Europe_1940.png";
      if (selectedYear <= 1942) return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Western_Europe_1942.png/800px-Western_Europe_1942.png";
      if (selectedYear <= 1944) return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Western_Europe_1944.png/800px-Western_Europe_1944.png";
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Western_Europe_1945.png/800px-Western_Europe_1945.png";
    }
    if (selectedTheater === "eastern") {
      if (selectedYear <= 1941) return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Eastern_Front_1941.png/800px-Eastern_Front_1941.png";
      if (selectedYear <= 1943) return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Eastern_Front_1943.png/800px-Eastern_Front_1943.png";
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Eastern_Front_1945.png/800px-Eastern_Front_1945.png";
    }
    if (selectedTheater === "africa") {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/North_Africa_1942.png/800px-North_Africa_1942.png";
    }
    if (selectedTheater === "pacific") {
      if (selectedYear <= 1942) return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Pacific_Theater_1942.png/800px-Pacific_Theater_1942.png";
      if (selectedYear <= 1944) return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Pacific_Theater_1944.png/800px-Pacific_Theater_1944.png";
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Pacific_Theater_1945.png/800px-Pacific_Theater_1945.png";
    }
    return null;
  };

  useEffect(() => {
    if (mapRef.current) {
      gsap.from(mapRef.current, {
        opacity: 0,
        scale: 0.98,
        duration: 0.5,
      });
    }
  }, [selectedYear, selectedTheater]);

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
          Theaters of War
        </h1>
        <p style={{
          color: "var(--text-secondary)",
          maxWidth: "700px",
          margin: "0 auto",
          fontSize: "1.1rem",
          lineHeight: 1.8,
        }}>
          Explore the global conflict through interactive maps. Watch territorial changes unfold as you move through the war years.
        </p>
      </section>

      {/* Theater Selector */}
      <section style={{
        background: "var(--bg-secondary)",
        padding: "1.5rem 2rem",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}>
        {Object.entries(theaters).map(([key, theater]) => (
          <button
            key={key}
            onClick={() => setSelectedTheater(key)}
            style={{
              background: selectedTheater === key ? theater.color : "transparent",
              color: selectedTheater === key ? "#fff" : "var(--text-secondary)",
              border: `2px solid ${theater.color}`,
              padding: "0.6rem 1.25rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              transition: "all 0.3s ease",
            }}
          >
            {theater.name}
          </button>
        ))}
      </section>

      {/* Timeline Slider */}
      <section style={{
        background: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(10px)",
        padding: "2rem",
        borderBottom: "1px solid var(--border-color)",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}>
            <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>1939</span>
            <div style={{
              fontSize: "3.5rem",
              fontWeight: 900,
              color: "var(--accent-gold)",
              fontFamily: "var(--font-mono)",
              textShadow: "0 0 30px var(--hover-glow)",
            }}>
              {selectedYear}
            </div>
            <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>1945</span>
          </div>
          
          <input
            type="range"
            min="1939"
            max="1945"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            style={{
              width: "100%",
              height: "8px",
              background: "var(--bg-tertiary)",
              borderRadius: "4px",
              appearance: "none",
              cursor: "pointer",
            }}
          />
          
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.75rem" }}>
            {timelineYears.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                style={{
                  background: selectedYear === year ? "var(--accent-gold)" : "transparent",
                  color: selectedYear === year ? "var(--bg-primary)" : "var(--text-secondary)",
                  border: "1px solid rgba(184, 134, 20, 0.4)",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                  transition: "all 0.3s ease",
                }}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
        <div
          ref={mapRef}
          className="map-container"
          style={{
            position: "relative",
            minHeight: "500px",
            background: "var(--bg-tertiary)",
            borderRadius: "12px",
            overflow: "hidden",
            border: "2px solid var(--border-color)",
          }}
        >
          {/* Map Image */}
          <img
            src={getMapImage() || "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/World_War_II_allied_axis_territories_1940.png/1280px-World_War_II_allied_axis_territories_1940.png"}
            alt={`${currentTheater?.name} ${selectedYear}`}
            style={{
              width: "100%",
              height: "500px",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            onError={(e) => {
              // Fallback to SVG map if image fails
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          
          {/* SVG Overlay Fallback Map */}
          <svg
            viewBox="0 0 100 70"
            style={{
              width: "100%",
              height: "500px",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <rect width="100" height="70" fill="#1a1a2e" />
            
            {/* Simplified continents */}
            <path d="M5,15 L25,12 L30,18 L28,25 L20,30 L15,28 L10,22 Z" fill="#2d4a3e" stroke="#b8860b" strokeWidth="0.2" />
            <path d="M22,45 L28,42 L32,50 L30,60 L24,65 L20,55 Z" fill="#2d4a3e" stroke="#b8860b" strokeWidth="0.2" />
            <path d="M42,18 L52,15 L55,20 L50,28 L45,30 L40,25 Z" fill="#3d5a80" stroke="#b8860b" strokeWidth="0.2" />
            <path d="M42,35 L55,32 L58,45 L52,60 L45,55 L40,45 Z" fill="#3d5a80" stroke="#b8860b" strokeWidth="0.2" />
            <path d="M55,15 L85,12 L90,25 L85,35 L70,38 L55,30 L52,22 Z" fill="#3d5a80" stroke="#b8860b" strokeWidth="0.2" />
            <path d="M82,28 L86,26 L88,30 L85,33 L82,30 Z" fill="#3d5a80" stroke="#b8860b" strokeWidth="0.2" />
            <path d="M75,55 L90,52 L95,60 L90,65 L78,62 Z" fill="#2d4a3e" stroke="#b8860b" strokeWidth="0.2" />
            <path d="M38,20 L42,19 L43,23 L40,25 L38,23 Z" fill="#3d5a80" stroke="#b8860b" strokeWidth="0.2" />
            
            {/* Territory overlays based on year and theater */}
            {selectedYear >= 1939 && selectedYear <= 1942 && (
              <ellipse cx="48" cy="24" rx="10" ry="7" fill="#8b1a1a" opacity="0.5">
                <animate attributeName="opacity" values="0.4;0.6;0.4" dur="3s" repeatCount="indefinite" />
              </ellipse>
            )}
            
            {selectedYear >= 1941 && (
              <ellipse cx="58" cy="28" rx="15" ry="10" fill="#6b4423" opacity="0.5">
                <animate attributeName="opacity" values="0.4;0.6;0.4" dur="4s" repeatCount="indefinite" />
              </ellipse>
            )}
            
            {selectedYear >= 1942 && (
              <ellipse cx="15" cy="25" rx="6" ry="4" fill="#1e4d8c" opacity="0.5">
                <animate attributeName="opacity" values="0.4;0.6;0.4" dur="2s" repeatCount="indefinite" />
              </ellipse>
            )}
          </svg>

          {/* Battle Markers */}
          {visibleBattles.map((battle, index) => {
            // Position markers based on theater
            let x = 50, y = 50;
            if (selectedTheater === "europe") {
              const positions = [
                { x: 18, y: 25 }, // Britain
                { x: 14, y: 32 }, // Normandy
                { x: 16, y: 30 }, // Bulge
                { x: 17, y: 29 }, // Market Garden
              ];
              const pos = positions[index] || { x: 50, y: 50 };
              x = pos.x;
              y = pos.y;
            } else if (selectedTheater === "eastern") {
              const positions = [
                { x: 50, y: 25 }, // Moscow
                { x: 52, y: 35 }, // Stalingrad
                { x: 48, y: 30 }, // Kursk
                { x: 45, y: 22 }, // Leningrad
              ];
              const pos = positions[index] || { x: 50, y: 50 };
              x = pos.x;
              y = pos.y;
            } else if (selectedTheater === "africa") {
              const positions = [
                { x: 12, y: 42 }, // Torch
                { x: 25, y: 45 }, // El Alamein
              ];
              const pos = positions[index] || { x: 50, y: 50 };
              x = pos.x;
              y = pos.y;
            } else if (selectedTheater === "pacific") {
              const positions = [
                { x: 5, y: 52 }, // Pearl Harbor
                { x: 0, y: 50 }, // Midway
                { x: 80, y: 60 }, // Guadalcanal
                { x: 82, y: 52 }, // Iwo Jima
                { x: 80, y: 55 }, // Okinawa
              ];
              const pos = positions[index] || { x: 50, y: 50 };
              x = pos.x;
              y = pos.y;
            }
            
            return (
              <div
                key={index}
                className="battle-marker"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  background: currentTheater?.color,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setSelectedBattle({ name: battle.name, description: battle.description })}
                title={battle.name}
              />
            );
          })}

          {/* Battle Info Popup */}
          {selectedBattle && (
            <div
              style={{
                position: "absolute",
                bottom: "2rem",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(13, 17, 23, 0.95)",
                backdropFilter: "blur(12px)",
                padding: "1.5rem",
                borderRadius: "8px",
                border: "1px solid var(--accent-gold)",
                maxWidth: "400px",
                textAlign: "center",
                zIndex: 100,
              }}
            >
              <button
                onClick={() => setSelectedBattle(null)}
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.75rem",
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
              <h3 style={{ color: "var(--accent-gold)", marginBottom: "0.5rem", fontFamily: "var(--font-display)" }}>
                {selectedBattle.name}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                {selectedBattle.description}
              </p>
            </div>
          )}

          {/* Legend */}
          <div style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            background: "rgba(13, 17, 23, 0.9)",
            backdropFilter: "blur(10px)",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid var(--border-color)",
          }}>
            <h4 style={{ color: "var(--accent-gold)", marginBottom: "0.75rem", fontSize: "0.85rem", fontFamily: "var(--font-mono)" }}>
              {currentTheater?.name} - {selectedYear}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: "12px", height: "12px", background: "#8b1a1a", borderRadius: "50%" }} />
                <span style={{ color: "var(--text-secondary)", fontSize: "0.75rem" }}>Axis Control</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: "12px", height: "12px", background: "#1e4d8c", borderRadius: "50%" }} />
                <span style={{ color: "var(--text-secondary)", fontSize: "0.75rem" }}>Allied Control</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: "12px", height: "12px", background: "#6b4423", borderRadius: "50%" }} />
                <span style={{ color: "var(--text-secondary)", fontSize: "0.75rem" }}>Soviet Control</span>
              </div>
            </div>
          </div>

          {/* Image Credit */}
          <div style={{
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
            fontSize: "0.6rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}>
            Maps: Wikimedia Commons
          </div>
        </div>
      </section>

      {/* Theater Details */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem" }}>
        <h2 style={{
          color: "var(--accent-gold)",
          textAlign: "center",
          marginBottom: "3rem",
          fontFamily: "var(--font-display)",
        }}>
          Major Theaters of World War II
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem" }}>
          {Object.entries(theaters).map(([key, theater]) => (
            <div key={key} className="card card-document hover-lift">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  background: theater.color,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ color: theater.color, fontSize: "1.3rem" }}>{theater.name}</h3>
                </div>
              </div>
              
              <div style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1rem" }}>
                <strong style={{ color: "var(--text-primary)" }}>Key Operations:</strong>
                <div style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {theater.battles.slice(0, 3).map((b, i) => (
                    <span key={i} style={{
                      background: "var(--bg-tertiary)",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                      fontFamily: "var(--font-mono)",
                    }}>
                      {b.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                Click on markers above to learn about key battles
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Operations */}
      <section style={{
        background: "var(--bg-secondary)",
        padding: "4rem 2rem",
        borderTop: "1px solid var(--border-color)",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{
            color: "var(--accent-gold)",
            textAlign: "center",
            marginBottom: "3rem",
            fontFamily: "var(--font-display)",
          }}>
            Major Operations
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {operations.map((op, i) => (
              <div
                key={i}
                className="card hover-lift"
                style={{
                  borderLeft: `4px solid ${
                    op.theater === "europe" ? "#1e4d8c" :
                    op.theater === "eastern" ? "#6b4423" :
                    op.theater === "africa" ? "#d97706" : "#059669"
                  }`,
                }}
              >
                <h3 style={{ color: "var(--accent-gold)", fontSize: "1.1rem", marginBottom: "0.5rem", fontFamily: "var(--font-display)" }}>
                  {op.name}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                  {op.description}
                </p>
                <span style={{
                  display: "inline-block",
                  marginTop: "0.75rem",
                  background: "rgba(184, 134, 20, 0.15)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--accent-gold)",
                }}>
                  {op.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        input[type="range"] {
          -webkit-appearance: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          background: var(--accent-gold);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(184, 134, 20, 0.5);
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: var(--accent-gold);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 10px rgba(184, 134, 20, 0.5);
        }
      `}</style>
    </div>
  );
}
