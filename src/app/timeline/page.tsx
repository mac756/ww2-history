"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Real historical images from Wikimedia Commons
const timelineEvents = [
  {
    year: 1922,
    date: "October 28, 1922",
    title: "March on Rome",
    description: "Mussolini's Blackshirts march on Rome, demanding he be appointed Prime Minister. King Victor Emmanuel III invites Mussolini to form a government, marking the beginning of fascist rule in Italy.",
    category: "political",
    side: "axis",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Mussolini_with_blackshirts.jpg/800px-Mussolini_with_blackshirts.jpg",
    imageCredit: "Wikimedia Commons",
  },
  {
    year: 1929,
    date: "October 24, 1929",
    title: "Black Thursday",
    description: "The Wall Street Crash begins the Great Depression, triggering worldwide economic devastation. Unemployment soars, creating desperate conditions exploited by extremist movements.",
    category: "economic",
    side: "neutral",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Wall_Street_Crash_of_1929.jpg/800px-Wall_Street_Crash_of_1929.jpg",
    imageCredit: "Wikimedia Commons",
  },
  {
    year: 1933,
    date: "January 30, 1933",
    title: "Hitler Becomes Chancellor",
    description: "Adolf Hitler is appointed Chancellor of Germany by President Paul von Hindenburg. Within months, he establishes a totalitarian Nazi dictatorship.",
    category: "political",
    side: "axis",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Hitler_portrait_crop.jpg/800px-Hitler_portrait_crop.jpg",
    imageCredit: "Wikimedia Commons",
  },
  {
    year: 1935,
    date: "October 3, 1935",
    title: "Italian Invasion of Ethiopia",
    description: "Italy invades Ethiopia from Italian Somaliland and Eritrea. Despite Ethiopian resistance, the League of Nations fails to stop the aggression, demonstrating its weakness.",
    category: "military",
    side: "axis",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Italian_invasion_of_Ethiopia_1935.jpg/800px-Italian_invasion_of_Ethiopia_1935.jpg",
    imageCredit: "Wikimedia Commons",
  },
  {
    year: 1936,
    date: "July 17, 1936",
    title: "Spanish Civil War Begins",
    description: "Military uprising in Spain triggers the Spanish Civil War. Nazi Germany and Fascist Italy support Franco's Nationalists, while the USSR supports the Republic. This conflict serves as a proxy war for WWII.",
    category: "military",
    side: "axis",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/The_Bombing_of_Guernica.jpg/800px-The_Bombing_of_Guernica.jpg",
    imageCredit: "Wikimedia Commons",
  },
  {
    year: 1936,
    date: "October 25, 1936",
    title: "Rome-Berlin Axis",
    description: "Italy and Germany form the Rome-Berlin Axis, a formal alliance marking the beginning of what will become the Axis Powers.",
    category: "political",
    side: "axis",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Hitler_and_Mussolini_1940.jpg/800px-Hitler_and_Mussolini_1940.jpg",
    imageCredit: "Bundesarchiv / Wikimedia Commons",
  },
  {
    year: 1938,
    date: "March 12, 1938",
    title: "Anschluss of Austria",
    description: "Germany annexes Austria (Anschluss) in violation of the Treaty of Versailles. Austrian Nazis install Arthur Seyss-Inquart as Chancellor, and German troops enter Austria.",
    category: "political",
    side: "axis",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Andreas霍尔绍7418.jpg/800px-Andreas霍尔绍7418.jpg",
    imageCredit: "Wikimedia Commons",
  },
  {
    year: 1938,
    date: "September 30, 1938",
    title: "Munich Agreement",
    description: "Britain and France appease Hitler by signing the Munich Agreement, allowing Germany to annex the Sudetenland in Czechoslovakia. Chamberlain declares 'peace in our time.'",
    category: "political",
    side: "allied",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Chamberlain_Munich.jpg/800px-Chamberlain_Munich.jpg",
    imageCredit: "Wikimedia Commons",
  },
  {
    year: 1939,
    date: "August 23, 1939",
    title: "Molotov-Ribbentrop Pact",
    description: "Germany and Soviet Union sign the non-aggression pact, secretly dividing Eastern Europe into spheres of influence. This clears the way for the invasion of Poland.",
    category: "political",
    side: "axis",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Molotov_Ribbentrop_Authograph.svg/800px-Molotov_Ribbentrop_Authograph.svg.png",
    imageCredit: "Wikimedia Commons",
  },
  {
    year: 1939,
    date: "September 1, 1939",
    title: "Invasion of Poland",
    description: "Germany invades Poland, beginning World War II. Using blitzkrieg tactics, German forces overwhelm Polish defenses. Britain and France declare war on September 3.",
    category: "military",
    side: "axis",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Poland_Invasion_1939.jpg/800px-Poland_Invasion_1939.jpg",
    imageCredit: "Bundesarchiv / Wikimedia Commons",
  },
  {
    year: 1940,
    date: "May 26-June 4, 1940",
    title: "Operation Dynamo (Dunkirk)",
    description: "Allied forces are evacuated from Dunkirk, France. Over 338,000 soldiers are rescued across the English Channel in one of the largest evacuations in history.",
    category: "military",
    side: "allied",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Dunkirk_evacuation.jpg/800px-Dunkirk_evacuation.jpg",
    imageCredit: "Imperial War Museum / Wikimedia Commons",
  },
  {
    year: 1940,
    date: "July 10, 1940",
    title: "Battle of Britain",
    description: "The Luftwaffe begins bombing Britain in preparation for invasion. RAF pilots heroically defend British skies in the first major military defeat of Hitler's forces.",
    category: "military",
    side: "allied",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Spitfire_Plane.jpg/800px-Spitfire_Plane.jpg",
    imageCredit: "Wikimedia Commons",
  },
  {
    year: 1941,
    date: "June 22, 1941",
    title: "Operation Barbarossa",
    description: "Germany invades the Soviet Union in the largest military operation in history. Three million German troops cross the border, beginning the Eastern Front.",
    category: "military",
    side: "axis",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Operation_Barbarossa.png/800px-Operation_Barbarossa.png",
    imageCredit: "Wikimedia Commons",
  },
  {
    year: 1941,
    date: "December 7, 1941",
    title: "Attack on Pearl Harbor",
    description: "Japan launches a surprise attack on the US Pacific Fleet at Pearl Harbor, Hawaii. Over 2,400 Americans are killed. The US declares war on Japan the next day, entering WWII.",
    category: "military",
    side: "axis",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1Pearl_Harbor_Nevsky_Petrovich_US_Navy_Photo.jpg/800px-a_a1Pearl_Harbor_Nevsky_Petrovich_US_Navy_Photo.jpg",
    imageCredit: "U.S. Navy / Wikimedia Commons",
  },
  {
    year: 1942,
    date: "June 4-7, 1942",
    title: "Battle of Midway",
    description: "US Navy defeats Japanese carrier fleet at Midway, turning the tide in the Pacific War. Four Japanese aircraft carriers are destroyed, limiting Japan's offensive capability.",
    category: "military",
    side: "allied",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Battle_of_Midway.jpg/800px-Battle_of_Midway.jpg",
    imageCredit: "U.S. Navy / Wikimedia Commons",
  },
  {
    year: 1942,
    date: "October 23, 1942",
    title: "Battle of El Alamein",
    description: "British 8th Army under Montgomery defeats Axis forces at El Alamein, Egypt. This marks the turning point in North Africa, ending Axis hopes of controlling the Mediterranean.",
    category: "military",
    side: "allied",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Battle_of_El_Alamein.jpg/800px-Battle_of_El_Alamein.jpg",
    imageCredit: "Imperial War Museum / Wikimedia Commons",
  },
  {
    year: 1943,
    date: "February 2, 1943",
    title: "Battle of Stalingrad Ends",
    description: "German 6th Army surrenders at Stalingrad, ending one of the bloodiest battles in history. Over 850,000 Axis casualties. This marks the turning point on the Eastern Front.",
    category: "military",
    side: "ussr",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Stalingrad_soldier.jpg/800px-Stalingrad_soldier.jpg",
    imageCredit: "Wikimedia Commons",
  },
  {
    year: 1943,
    date: "July 5-August 23, 1943",
    title: "Battle of Kursk",
    description: "Largest tank battle in history. Soviet forces repel the German offensive at Kursk, destroying the last major German offensive capability on the Eastern Front.",
    category: "military",
    side: "ussr",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Kursk_Bitva.png/800px-Kursk_Bitva.png",
    imageCredit: "Wikimedia Commons",
  },
  {
    year: 1944,
    date: "June 6, 1944",
    title: "Operation Overlord (D-Day)",
    description: "Allied forces launch the largest amphibious invasion in history on the beaches of Normandy, France. 156,000 troops land, beginning the liberation of Western Europe.",
    category: "military",
    side: "allied",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/800px-Into_the_Jaws_of_Death_23-0455M_edit.jpg",
    imageCredit: "U.S. National Archives / Wikimedia Commons",
  },
  {
    year: 1944,
    date: "December 16, 1944",
    title: "Battle of the Bulge",
    description: "Germany launches a surprise offensive in the Ardennes, creating a 'bulge' in Allied lines. After severe fighting, Allies repel the attack by January 1945.",
    category: "military",
    side: "axis",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Battle_of_the_Bulge.jpg/800px-Battle_of_the_Bulge.jpg",
    imageCredit: "Wikimedia Commons",
  },
  {
    year: 1945,
    date: "February 19, 1945",
    title: "Battle of Iwo Jima",
    description: "US Marines capture the island of Iwo Jima after 36 days of brutal fighting. The iconic flag-raising on Mount Suribachi becomes a symbol of American resolve.",
    category: "military",
    side: "allied",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Iwo_Jima_flagRaising.jpg/800px-Iwo_Jima_flagRaising.jpg",
    imageCredit: "Joe Rosenthal / Wikimedia Commons",
  },
  {
    year: 1945,
    date: "May 8, 1945",
    title: "V-E Day",
    description: "Germany surrenders unconditionally. Victory in Europe is declared. Eisenhower accepts the surrender in Reims. The war in Europe ends after nearly six years.",
    category: "political",
    side: "allied",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/V-E_Day_Crowd_2.jpg/800px-V-E_Day_Crowd_2.jpg",
    imageCredit: "Imperial War Museum / Wikimedia Commons",
  },
  {
    year: 1945,
    date: "July 17-August 2, 1945",
    title: "Potsdam Conference",
    description: "Truman, Churchill (later Attlee), and Stalin meet to discuss post-war Europe. The conference addresses Germany's future, war crimes trials, and the Soviet Union's role in Asia.",
    category: "political",
    side: "allied",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Potsdam_Conference.jpg/800px-Potsdam_Conference.jpg",
    imageCredit: "Wikimedia Commons",
  },
  {
    year: 1945,
    date: "August 6 & 9, 1945",
    title: "Atomic Bombings",
    description: "US drops atomic bombs on Hiroshima (August 6) and Nagasaki (August 9). Japan surrenders on August 15, becoming the only nation to suffer nuclear attack.",
    category: "military",
    side: "allied",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Atomic_bombing_of_Nagasaki.jpg/800px-Atomic_bombing_of_Nagasaki.jpg",
    imageCredit: "Wikimedia Commons",
  },
  {
    year: 1945,
    date: "September 2, 1945",
    title: "V-J Day",
    description: "Japan formally surrenders aboard the USS Missouri in Tokyo Bay. General MacArthur accepts the surrender. World War II officially ends.",
    category: "political",
    side: "allied",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Surrender_of_Japan_-_USS_Missouri.jpg/800px-Surrender_of_Japan_-_USS_Missouri.jpg",
    imageCredit: "U.S. Navy / Wikimedia Commons",
  },
];

const getCategoryColor = (category: string, side: string) => {
  if (side === "allied") return "var(--allies-navy)";
  if (side === "axis") return "var(--axis-red)";
  if (side === "ussr") return "var(--ussr-brown)";
  return "var(--accent-gold)";
};

export default function TimelinePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline items animation
      gsap.utils.toArray(".timeline-item").forEach((item: any, i) => {
        gsap.from(item, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
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
          Timeline
        </h1>
        <p style={{
          color: "var(--text-secondary)",
          maxWidth: "700px",
          margin: "0 auto",
          fontSize: "1.1rem",
          lineHeight: 1.8,
        }}>
          From the rise of fascism in Italy to the atomic bombings of Japan — explore the key events that shaped the most devastating conflict in human history.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <p style={{ 
            color: "var(--accent-gold)", 
            fontSize: "0.85rem", 
            letterSpacing: "0.2em",
            fontFamily: "var(--font-mono)",
          }}>
            1922 — 1945
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "4rem 2rem",
      }} ref={containerRef}>
        <div className="timeline-container">
          <div className="timeline-line" />

          {timelineEvents.map((event, index) => (
            <div key={index} className="timeline-item">
              <div
                className="timeline-dot"
                style={{ background: getCategoryColor(event.category, event.side) }}
              />
              <div
                className={`timeline-content ${index % 2 === 0 ? "left" : "right"}`}
                style={{
                  borderLeftColor: getCategoryColor(event.category, event.side),
                  borderLeftWidth: "4px",
                }}
              >
                {/* Image */}
                <div 
                  className="image-zoom"
                  style={{ 
                    marginBottom: "1.25rem", 
                    borderRadius: "6px", 
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  onClick={() => setLightboxImage(event.image)}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="timeline-image"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                
                {/* Date Badge */}
                <div style={{
                  display: "inline-block",
                  background: "var(--bg-tertiary)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "4px",
                  marginBottom: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                  letterSpacing: "0.05em",
                }}>
                  {event.date}
                </div>
                
                {/* Title */}
                <h3 
                  className="timeline-title" 
                  style={{ color: getCategoryColor(event.category, event.side) }}
                >
                  {event.title}
                </h3>
                
                {/* Description */}
                <p className="timeline-desc" style={{ marginTop: "0.75rem" }}>
                  {event.description}
                </p>
                
                {/* Image Credit */}
                <p style={{
                  marginTop: "0.75rem",
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}>
                  {event.imageCredit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Year Markers */}
      <section style={{
        background: "var(--bg-secondary)",
        padding: "4rem 2rem",
        borderTop: "1px solid var(--border-color)",
      }}>
        <h2 style={{
          color: "var(--accent-gold)",
          textAlign: "center",
          marginBottom: "2rem",
          fontFamily: "var(--font-display)",
          fontSize: "1.75rem",
        }}>
          Key Periods
        </h2>
        <div style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}>
          {[
            { year: "1922-1933", label: "Rise of Fascism", color: "var(--axis-red)" },
            { year: "1933-1939", label: "Road to War", color: "var(--accent-gold)" },
            { year: "1939-1941", label: "War Begins", color: "var(--axis-red)" },
            { year: "1941-1943", label: "Global Expansion", color: "var(--axis-red)" },
            { year: "1943-1944", label: "Turning Points", color: "var(--allies-navy)" },
            { year: "1944-1945", label: "Victory", color: "var(--allies-navy)" },
          ].map((period, i) => (
            <div key={i} style={{
              background: "var(--bg-card)",
              padding: "1.5rem",
              borderRadius: "8px",
              textAlign: "center",
              borderLeft: `4px solid ${period.color}`,
              transition: "all 0.3s ease",
            }}
            className="hover-lift"
            >
              <div style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: period.color,
                fontFamily: "var(--font-mono)",
              }}>
                {period.year}
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                {period.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="lightbox-overlay active"
          onClick={() => setLightboxImage(null)}
        >
          <span className="lightbox-close" onClick={() => setLightboxImage(null)}>×</span>
          <img 
            src={lightboxImage} 
            alt="Full size" 
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
