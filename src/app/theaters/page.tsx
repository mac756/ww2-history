"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { SwordsIcon, GlobeIcon, AnchorIcon, MapIcon, PlaneIcon, CloseIcon } from "@/components/Icons";

const theaters = {
  "europe": {
    name: "Western Europe",
    color: "#3b82f6",
    battles: [
      { name: "Battle of Britain", year: 1940, x: 18, y: 25, description: "RAF defeats Luftwaffe, preventing German invasion of Britain" },
      { name: "D-Day (Normandy)", year: 1944, x: 14, y: 32, description: "Largest amphibious invasion, beginning liberation of Western Europe" },
      { name: "Battle of the Bulge", year: 1944, x: 16, y: 30, description: "Last major German offensive, repelled by Allies" },
      { name: "Market Garden", year: 1944, x: 17, y: 29, description: "Allied airborne operation, 'a bridge too far'" },
    ],
  },
  "eastern": {
    name: "Eastern Europe",
    color: "#92400e",
    battles: [
      { name: "Operation Barbarossa", year: 1941, x: 45, y: 30, description: "German invasion of Soviet Union" },
      { name: "Battle of Moscow", year: 1941, x: 50, y: 28, description: "Soviet defense saves capital" },
      { name: "Battle of Stalingrad", year: 1942, x: 52, y: 38, description: "Turning point on Eastern Front" },
      { name: "Battle of Kursk", year: 1943, x: 48, y: 32, description: "Largest tank battle in history" },
      { name: "Battle of Leningrad", year: 1941, x: 42, y: 20, description: "1,500-day siege of Leningrad" },
    ],
  },
  "africa": {
    name: "North Africa",
    color: "#d97706",
    battles: [
      { name: "Operation Torch", year: 1942, x: 12, y: 42, description: "Allied invasion of North Africa" },
      { name: "El Alamein", year: 1942, x: 25, y: 45, description: "Turning point in North Africa" },
    ],
  },
  "pacific": {
    name: "Pacific Theater",
    color: "#059669",
    battles: [
      { name: "Pearl Harbor", year: 1941, x: 5, y: 52, description: "Japanese attack brings US into war" },
      { name: "Midway", year: 1942, x: 0, y: 50, description: "US defeats Japanese carrier fleet" },
      { name: "Guadalcanal", year: 1942, x: 80, y: 60, description: "First major Allied offensive in Pacific" },
      { name: "Iwo Jima", year: 1945, x: 82, y: 52, description: "Strategic island capture" },
      { name: "Okinawa", year: 1945, x: 80, y: 55, description: "Last major battle of Pacific War" },
    ],
  },
};

const theaterImages: Record<string, string> = {
  "europe": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/800px-Into_the_Jaws_of_Death_23-0455M_edit.jpg",
  "eastern": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Stalingrad_German_surrender.jpg/800px-Stalingrad_German_surrender.jpg",
  "africa": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Bundesarchiv_Bild_101I-721-0043-23%2C_Nordafrika%2C_Panzer_III.jpg/800px-Bundesarchiv_Bild_101I-721-0043-23%2C_Nordafrika%2C_Panzer_III.jpg",
  "pacific": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Battle_of_Midway.jpg/800px-Battle_of_Midway.jpg",
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
  const mapRef = useRef<HTMLDivElement>(null);

  const currentTerritories = { axis: [], allied: [], ussr: [] };

  const visibleBattles = Object.values(theaters).flatMap((theater) =>
    theater.battles.filter((battle) => battle.year <= selectedYear)
  );

  useEffect(() => {
    if (mapRef.current) {
      gsap.from(mapRef.current, {
        opacity: 0,
        scale: 0.98,
        duration: 0.5,
      });
    }
  }, [selectedYear]);

  return (
    <div style={{ paddingTop: "70px" }}>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)",
        padding: "6rem 2rem 4rem",
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
            backgroundImage: "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 className="section-title" style={{ display: "block" }}>
            Theaters of War
          </h1>
          <p style={{
            color: "var(--cream)",
            maxWidth: "700px",
            margin: "0 auto",
            fontSize: "1.1rem",
          }}>
            Explore the global conflict through an interactive map. Watch territorial changes unfold as you move through the war years.
          </p>
        </div>
      </section>

      {/* Timeline Slider */}
      <section style={{
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
        padding: "2rem",
        borderBottom: "1px solid rgba(201, 162, 39, 0.2)",
      }}>
        <div style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}>
            <span style={{ color: "rgba(243, 229, 166, 0.7)" }}>1939</span>
            <div style={{
              fontSize: "3rem",
              fontWeight: 900,
              color: "var(--gold-amber)",
              fontFamily: "'Cinzel', serif",
            }}>
              {selectedYear}
            </div>
            <span style={{ color: "rgba(243, 229, 166, 0.7)" }}>1945</span>
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
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0.5rem",
          }}>
            {timelineYears.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                style={{
                  background: selectedYear === year ? "var(--gold-amber)" : "transparent",
                  color: selectedYear === year ? "var(--bg-primary)" : "rgba(243, 229, 166, 0.7)",
                  border: "1px solid rgba(201, 162, 39, 0.3)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                }}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "2rem",
      }}>
        <div
          ref={mapRef}
          className="map-container"
          style={{
            position: "relative",
            height: "600px",
            background: "var(--bg-tertiary)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {/* SVG World Map */}
          <svg
            viewBox="0 0 100 70"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            {/* Ocean Background */}
            <rect width="100" height="70" fill="#0d1117" />

            {/* Simplified World Map */}
            {/* North America */}
            <path
              d="M5,15 L25,12 L30,18 L28,25 L20,30 L15,28 L10,22 Z"
              fill="#1e3a5f"
              stroke="#c9a227"
              strokeWidth="0.2"
            />

            {/* South America */}
            <path
              d="M22,45 L28,42 L32,50 L30,60 L24,65 L20,55 Z"
              fill="#1e3a5f"
              stroke="#c9a227"
              strokeWidth="0.2"
            />

            {/* Europe */}
            <path
              d="M42,18 L52,15 L55,20 L50,28 L45,30 L40,25 Z"
              fill="#1e3a5f"
              stroke="#c9a227"
              strokeWidth="0.2"
            />

            {/* Africa */}
            <path
              d="M42,35 L55,32 L58,45 L52,60 L45,55 L40,45 Z"
              fill="#1e3a5f"
              stroke="#c9a227"
              strokeWidth="0.2"
            />

            {/* Asia */}
            <path
              d="M55,15 L85,12 L90,25 L85,35 L70,38 L55,30 L52,22 Z"
              fill="#1e3a5f"
              stroke="#c9a227"
              strokeWidth="0.2"
            />

            {/* Japan */}
            <path
              d="M82,28 L86,26 L88,30 L85,33 L82,30 Z"
              fill="#1e3a5f"
              stroke="#c9a227"
              strokeWidth="0.2"
            />

            {/* Australia */}
            <path
              d="M75,55 L90,52 L95,60 L90,65 L78,62 Z"
              fill="#1e3a5f"
              stroke="#c9a227"
              strokeWidth="0.2"
            />

            {/* British Isles */}
            <path
              d="M38,20 L42,19 L43,23 L40,25 L38,23 Z"
              fill="#1e3a5f"
              stroke="#c9a227"
              strokeWidth="0.2"
            />

            {/* Axis Territory Indicator */}
            {selectedYear >= 1939 && selectedYear <= 1942 && (
              <g opacity="0.6">
                <ellipse cx="48" cy="24" rx="8" ry="6" fill="#8b0000" opacity="0.7">
                  <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
                </ellipse>
              </g>
            )}

            {/* Soviet Territory */}
            {selectedYear >= 1941 && (
              <g opacity="0.6">
                <ellipse cx="55" cy="25" rx="15" ry="10" fill="#6b4423" opacity="0.7">
                  <animate attributeName="opacity" values="0.5;0.7;0.5" dur="4s" repeatCount="indefinite" />
                </ellipse>
              </g>
            )}

            {/* Allied Territory (US/UK) */}
            {selectedYear >= 1942 && (
              <g opacity="0.6">
                <ellipse cx="15" cy="25" rx="5" ry="4" fill="#1e4d8c" opacity="0.7">
                  <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" />
                </ellipse>
              </g>
            )}

            {/* Japanese Territory */}
            {selectedYear >= 1941 && selectedYear <= 1944 && (
              <g opacity="0.6">
                <ellipse cx="80" cy="30" rx="8" ry="5" fill="#8b0000" opacity="0.7">
                  <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2.5s" repeatCount="indefinite" />
                </ellipse>
              </g>
            )}

            {/* Front Lines */}
            {selectedYear >= 1941 && (
              <line
                x1="45"
                y1="20"
                x2="45"
                y2="35"
                stroke="#c9a227"
                strokeWidth="0.3"
                strokeDasharray="1,0.5"
              >
                <animate attributeName="x1" values="55;50;45;42;40" dur="2s" fill="freeze" />
              </line>
            )}
          </svg>

          {/* Battle Markers */}
          {visibleBattles.map((battle, index) => (
            <div
              key={index}
              className="battle-marker"
              style={{
                left: `${battle.x}%`,
                top: `${battle.y}%`,
                background: theaters.pacific.battles.some(b => b.name === battle.name)
                  ? (selectedYear >= 1943 ? "#059669" : "#8b0000")
                  : theaters.eastern.battles.some(b => b.name === battle.name)
                  ? "#6b4423"
                  : theaters.europe.battles.some(b => b.name === battle.name)
                  ? "#3b82f6"
                  : "#d97706",
                border: "2px solid #fff",
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => setSelectedBattle({ name: battle.name, description: battle.description })}
              title={battle.name}
            />
          ))}

          {/* Battle Info Popup */}
          {selectedBattle && (
            <div
              style={{
                position: "absolute",
                bottom: "2rem",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(10, 10, 15, 0.95)",
                backdropFilter: "blur(10px)",
                padding: "1.5rem",
                borderRadius: "8px",
                border: "1px solid var(--gold-amber)",
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
                  right: "0.5rem",
                  background: "none",
                  border: "none",
                  color: "rgba(243, 229, 166, 0.7)",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CloseIcon size={20} />
              </button>
              <h3 style={{ color: "var(--gold-amber)", marginBottom: "0.5rem" }}>
                {selectedBattle.name}
              </h3>
              <p style={{ color: "rgba(243, 229, 166, 0.8)", fontSize: "0.9rem" }}>
                {selectedBattle.description}
              </p>
            </div>
          )}

          {/* Legend */}
          <div style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            background: "rgba(10, 10, 15, 0.9)",
            backdropFilter: "blur(10px)",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid rgba(201, 162, 39, 0.3)",
          }}>
            <h4 style={{ color: "var(--gold-amber)", marginBottom: "0.75rem", fontSize: "0.9rem" }}>
              Legend
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: "12px", height: "12px", background: "#8b0000", borderRadius: "50%" }} />
                <span style={{ color: "rgba(243, 229, 166, 0.8)", fontSize: "0.8rem" }}>Axis Control</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: "12px", height: "12px", background: "#1e4d8c", borderRadius: "50%" }} />
                <span style={{ color: "rgba(243, 229, 166, 0.8)", fontSize: "0.8rem" }}>Allied Control</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: "12px", height: "12px", background: "#6b4423", borderRadius: "50%" }} />
                <span style={{ color: "rgba(243, 229, 166, 0.8)", fontSize: "0.8rem" }}>Soviet Control</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: "12px", height: "12px", background: "#d97706", borderRadius: "50%" }} />
                <span style={{ color: "rgba(243, 229, 166, 0.8)", fontSize: "0.8rem" }}>Contested</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Theater Details */}
      <section style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "4rem 2rem",
      }}>
        <h2 style={{
          color: "var(--gold-amber)",
          textAlign: "center",
          marginBottom: "3rem",
          fontFamily: "'Cinzel', serif",
        }}>
          Three Major Theaters
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem",
        }}>
          {/* Western Europe */}
          <div className="card">
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}>
              <div style={{
                width: "50px",
                height: "50px",
                background: "#3b82f6",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <GlobeIcon size={24} color="#fff" />
              </div>
              <div>
                <h3 style={{ color: "#3b82f6", fontSize: "1.3rem" }}>Western Europe</h3>
                <p style={{ color: "rgba(243, 229, 166, 0.7)", fontSize: "0.85rem" }}>1940-1945</p>
              </div>
            </div>
            <div style={{
              width: "100%",
              height: "150px",
              borderRadius: "8px",
              overflow: "hidden",
              marginBottom: "1rem",
            }}>
              <img 
                src={theaterImages["europe"]}
                alt="Western Europe Theater"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>
            <div style={{ color: "rgba(243, 229, 166, 0.8)", lineHeight: 1.8, marginBottom: "1rem" }}>
              <strong style={{ color: "var(--cream)" }}>Opponents:</strong> Germany vs USA, UK, France, Free French
            </div>
            <div style={{ color: "rgba(243, 229, 166, 0.8)", lineHeight: 1.8, marginBottom: "1rem" }}>
              <strong style={{ color: "var(--cream)" }}>Key Operations:</strong> Operation Overlord (D-Day), Operation Torch (North Africa)
            </div>
            <div style={{ color: "rgba(243, 229, 166, 0.8)", lineHeight: 1.8 }}>
              <strong style={{ color: "var(--cream)" }}>Major Battles:</strong> Battle of Britain, D-Day (Normandy), Battle of the Bulge
            </div>
          </div>

          {/* Eastern Europe */}
          <div className="card">
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}>
              <div style={{
                width: "50px",
                height: "50px",
                background: "#6b4423",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <SwordsIcon size={24} color="#fff" />
              </div>
              <div>
                <h3 style={{ color: "#6b4423", fontSize: "1.3rem" }}>Eastern Europe</h3>
                <p style={{ color: "rgba(243, 229, 166, 0.7)", fontSize: "0.85rem" }}>1941-1945</p>
              </div>
            </div>
            <div style={{
              width: "100%",
              height: "150px",
              borderRadius: "8px",
              overflow: "hidden",
              marginBottom: "1rem",
            }}>
              <img 
                src={theaterImages["eastern"]}
                alt="Eastern Europe Theater"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>
            <div style={{ color: "rgba(243, 229, 166, 0.8)", lineHeight: 1.8, marginBottom: "1rem" }}>
              <strong style={{ color: "var(--cream)" }}>Opponents:</strong> Germany vs USSR
            </div>
            <div style={{ color: "rgba(243, 229, 166, 0.8)", lineHeight: 1.8, marginBottom: "1rem" }}>
              <strong style={{ color: "var(--cream)" }}>Key Operations:</strong> Operation Barbarossa, Soviet counteroffensives
            </div>
            <div style={{ color: "rgba(243, 229, 166, 0.8)", lineHeight: 1.8 }}>
              <strong style={{ color: "var(--cream)" }}>Major Battles:</strong> Battle of Moscow, Stalingrad, Kursk, Leningrad Siege
            </div>
          </div>

          {/* Pacific */}
          <div className="card">
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}>
              <div style={{
                width: "50px",
                height: "50px",
                background: "#059669",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <AnchorIcon size={24} color="#fff" />
              </div>
              <div>
                <h3 style={{ color: "#059669", fontSize: "1.3rem" }}>Asia & Pacific</h3>
                <p style={{ color: "rgba(243, 229, 166, 0.7)", fontSize: "0.85rem" }}>1941-1945</p>
              </div>
            </div>
            <div style={{
              width: "100%",
              height: "150px",
              borderRadius: "8px",
              overflow: "hidden",
              marginBottom: "1rem",
            }}>
              <img 
                src={theaterImages["pacific"]}
                alt="Pacific Theater"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>
            <div style={{ color: "rgba(243, 229, 166, 0.8)", lineHeight: 1.8, marginBottom: "1rem" }}>
              <strong style={{ color: "var(--cream)" }}>Opponents:</strong> Japan vs USA, UK, China, Australia
            </div>
            <div style={{ color: "rgba(243, 229, 166, 0.8)", lineHeight: 1.8, marginBottom: "1rem" }}>
              <strong style={{ color: "var(--cream)" }}>Key Operations:</strong> Island hopping campaign, carrier warfare
            </div>
            <div style={{ color: "rgba(243, 229, 166, 0.8)", lineHeight: 1.8 }}>
              <strong style={{ color: "var(--cream)" }}>Major Battles:</strong> Pearl Harbor, Midway, Guadalcanal, Iwo Jima, Okinawa
            </div>
          </div>
        </div>
      </section>

      {/* Operations */}
      <section style={{
        background: "var(--bg-secondary)",
        padding: "4rem 2rem",
        borderTop: "1px solid rgba(201, 162, 39, 0.2)",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}>
          <h2 style={{
            color: "var(--gold-amber)",
            textAlign: "center",
            marginBottom: "3rem",
            fontFamily: "'Cinzel', serif",
          }}>
            Major Operations
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}>
            {operations.map((op, i) => (
              <div
                key={i}
                className="card"
                style={{
                  borderLeft: `4px solid ${
                    op.theater === "europe"
                      ? "#3b82f6"
                      : op.theater === "eastern"
                      ? "#6b4423"
                      : op.theater === "africa"
                      ? "#d97706"
                      : "#059669"
                  }`,
                }}
              >
                <h3 style={{
                  color: "var(--gold-amber)",
                  fontSize: "1.1rem",
                  marginBottom: "0.5rem",
                }}>
                  {op.name}
                </h3>
                <p style={{
                  color: "rgba(243, 229, 166, 0.8)",
                  fontSize: "0.85rem",
                }}>
                  {op.description}
                </p>
                <span style={{
                  display: "inline-block",
                  marginTop: "0.75rem",
                  background: "rgba(201, 162, 39, 0.2)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  color: "var(--gold-amber)",
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
          background: var(--gold-amber);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(201, 162, 39, 0.5);
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: var(--gold-amber);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 10px rgba(201, 162, 39, 0.5);
        }
      `}</style>
    </div>
  );
}
