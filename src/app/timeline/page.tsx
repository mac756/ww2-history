"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  // 1922 - Rise of Fascism
  {
    year: 1922,
    date: "October 28, 1922",
    title: "March on Rome",
    description: "Mussolini's Blackshards march on Rome, demanding he be appointed Prime Minister. King Victor Emmanuel III invites Mussolini to form a government, marking the beginning of fascist rule in Italy.",
    category: "political",
    side: "axis",
  },
  // 1929 - Great Depression
  {
    year: 1929,
    date: "October 24, 1929",
    title: "Black Thursday",
    description: "The Wall Street Crash begins the Great Depression, triggering worldwide economic devastation. Unemployment soars, creating desperate conditions exploited by extremist movements.",
    category: "economic",
    side: "neutral",
  },
  // 1933 - Hitler's Rise
  {
    year: 1933,
    date: "January 30, 1933",
    title: "Hitler Becomes Chancellor",
    description: "Adolf Hitler is appointed Chancellor of Germany by President Paul von Hindenburg. Within months, he establishes a totalitarian Nazi dictatorship.",
    category: "political",
    side: "axis",
  },
  // 1934 - Night of Long Knives
  {
    year: 1934,
    date: "June 30, 1934",
    title: "Night of Long Knives",
    description: "Hitler purges the SA leadership and other potential rivals in a violent crackdown. Over 100 people are killed, securing Hitler's absolute control over the Nazi Party.",
    category: "political",
    side: "axis",
  },
  // 1935 - Italian Invasion of Ethiopia
  {
    year: 1935,
    date: "October 3, 1935",
    title: "Italian Invasion of Ethiopia",
    description: "Italy invades Ethiopia from Italian Somaliland and Eritrea. Despite Ethiopian resistance, the League of Nations fails to stop the aggression, demonstrating its weakness.",
    category: "military",
    side: "axis",
  },
  // 1936 - Spanish Civil War
  {
    year: 1936,
    date: "July 17, 1936",
    title: "Spanish Civil War Begins",
    description: "Military uprising in Spain triggers the Spanish Civil War. Nazi Germany and Fascist Italy support Franco's Nationalists, while the USSR supports the Republic. This conflict serves as a proxy war for WWII.",
    category: "military",
    side: "axis",
  },
  // 1936 - Berlin Olympics
  {
    year: 1936,
    date: "August 1, 1936",
    title: "Berlin Olympics",
    description: "Nazi Germany hosts the Summer Olympics in Berlin. Jesse Owens wins four gold medals, contradicting Nazi theories of racial supremacy.",
    category: "political",
    side: "neutral",
  },
  // 1936 - Axis Rome-Berlin Pact
  {
    year: 1936,
    date: "October 25, 1936",
    title: "Rome-Berlin Axis",
    description: "Italy and Germany form the Rome-Berlin Axis, a formal alliance marking the beginning of what will become the Axis Powers.",
    category: "political",
    side: "axis",
  },
  // 1937 - Guernica
  {
    year: 1937,
    date: "April 26, 1937",
    title: "Bombing of Guernica",
    description: "German and Italian air forces bomb the Spanish town of Guernica, destroying 70% of the town and killing hundreds. It becomes a symbol of civilian targeting in modern warfare.",
    category: "military",
    side: "axis",
  },
  // 1938 - Anschluss
  {
    year: 1938,
    date: "March 12, 1938",
    title: "Anschluss of Austria",
    description: "Germany annexes Austria (Anschluss) in violation of the Treaty of Versailles. Austrian Nazis install Arthur Seyss-Inquart as Chancellor, and German troops enter Austria.",
    category: "political",
    side: "axis",
  },
  // 1938 - Munich Agreement
  {
    year: 1938,
    date: "September 30, 1938",
    title: "Munich Agreement",
    description: "Britain and France appeas Hitler by signing the Munich Agreement, allowing Germany to annex the Sudetenland in Czechoslovakia. Chamberlain declares 'peace in our time.'",
    category: "political",
    side: "allied",
  },
  // 1939 - Kristallnacht
  {
    year: 1939,
    date: "November 9-10, 1939",
    title: "Kristallnacht",
    description: "Nazi persecution of Jews escalates in the 'Night of Broken Glass.' Synagogues are burned, Jewish businesses destroyed, and thousands arrested. This marks a turning point in Nazi persecution.",
    category: "political",
    side: "axis",
  },
  // 1939 - Non-aggression Pact
  {
    year: 1939,
    date: "August 23, 1939",
    title: "Molotov-Ribbentrop Pact",
    description: "Germany and Soviet Union sign the non-aggression pact, secretly dividing Eastern Europe into spheres of influence. This clears the way for the invasion of Poland.",
    category: "political",
    side: "axis",
  },
  // 1939 - Invasion of Poland
  {
    year: 1939,
    date: "September 1, 1939",
    title: "Invasion of Poland",
    description: "Germany invades Poland, beginning World War II. Using blitzkrieg tactics, German forces overwhelm Polish defenses. Britain and France declare war on September 3.",
    category: "military",
    side: "axis",
  },
  // 1940 - Winter War
  {
    year: 1940,
    date: "November 30, 1939",
    title: "Winter War Begins",
    description: "Soviet Union invades Finland, beginning the Winter War. Despite Finnish resistance, the USSR's superior numbers eventually force Finland to sue for peace in March 1940.",
    category: "military",
    side: "ussr",
  },
  // 1940 - Blitzkrieg Denmark/Norway
  {
    year: 1940,
    date: "April 9, 1940",
    title: "Operation Weserübung",
    description: "Germany invades Denmark and Norway using blitzkrieg tactics. Denmark falls in hours, while Norway holds out until June despite Allied assistance.",
    category: "military",
    side: "axis",
  },
  // 1940 - France Invasion
  {
    year: 1940,
    date: "May 10, 1940",
    title: "Invasion of France & Low Countries",
    description: "Germany launches blitzkrieg invasion of France and the Low Countries. Within weeks, Netherlands, Belgium, and Luxembourg fall. French forces retreat to Dunkirk.",
    category: "military",
    side: "axis",
  },
  // 1940 - Dunkirk
  {
    year: 1940,
    date: "May 26-June 4, 1940",
    title: "Operation Dynamo (Dunkirk)",
    description: "Allied forces are evacuated from Dunkirk, France. Over 338,000 soldiers are rescued across the English Channel in one of the largest evacuations in history.",
    category: "military",
    side: "allied",
  },
  // 1940 - Battle of Britain
  {
    year: 1940,
    date: "July 10, 1940",
    title: "Battle of Britain",
    description: "The Luftwaffe begins bombing Britain in preparation for invasion. RAF pilots heroically defend British skies in the first major military defeat of Hitler's forces.",
    category: "military",
    side: "allied",
  },
  // 1940 - Vichy France
  {
    year: 1940,
    date: "July 10, 1940",
    title: "Vichy France Established",
    description: "After France's surrender, Marshal Pétain establishes Vichy France as a Nazi puppet state in southern France. General de Gaulle escapes to London to lead the Free French.",
    category: "political",
    side: "axis",
  },
  // 1941 - Operation Barbarossa
  {
    year: 1941,
    date: "June 22, 1941",
    title: "Operation Barbarossa",
    description: "Germany invades the Soviet Union in the largest military operation in history. Three million German troops cross the border, beginning the Eastern Front.",
    category: "military",
    side: "axis",
  },
  // 1941 - Pearl Harbor
  {
    year: 1941,
    date: "December 7, 1941",
    title: "Attack on Pearl Harbor",
    description: "Japan launches a surprise attack on the US Pacific Fleet at Pearl Harbor, Hawaii. Over 2,400 Americans are killed. The US declares war on Japan the next day, entering WWII.",
    category: "military",
    side: "axis",
  },
  // 1942 - Battle of Midway
  {
    year: 1942,
    date: "June 4-7, 1942",
    title: "Battle of Midway",
    description: "US Navy defeats Japanese carrier fleet at Midway, turning the tide in the Pacific War. Four Japanese aircraft carriers are destroyed, limiting Japan's offensive capability.",
    category: "military",
    side: "allied",
  },
  // 1942 - El Alamein
  {
    year: 1942,
    date: "October 23, 1942",
    title: "Battle of El Alamein",
    description: "British 8th Army under Montgomery defeats Axis forces at El Alamein, Egypt. This marks the turning point in North Africa, ending Axis hopes of controlling the Mediterranean.",
    category: "military",
    side: "allied",
  },
  // 1942 - Operation Torch
  {
    year: 1942,
    date: "November 8, 1942",
    title: "Operation Torch",
    description: "Allied forces land in French North Africa (Morocco, Algeria, Tunisia). Vichy French forces initially resist but soon join the Allies under General Eisenhower.",
    category: "military",
    side: "allied",
  },
  // 1943 - Stalingrad
  {
    year: 1943,
    date: "February 2, 1943",
    title: "Battle of Stalingrad Ends",
    description: "German 6th Army surrenders at Stalingrad, ending one of the bloodiest battles in history. Over 850,000 Axis casualties. This marks the turning point on the Eastern Front.",
    category: "military",
    side: "ussr",
  },
  // 1943 - Operation Husky
  {
    year: 1943,
    date: "July 9, 1943",
    title: "Operation Husky (Sicily)",
    description: "Allied forces launch the invasion of Sicily, the first major amphibious operation in the Mediterranean. The island is secured by August 17, leading to Mussolini's downfall.",
    category: "military",
    side: "allied",
  },
  // 1943 - Battle of Kursk
  {
    year: 1943,
    date: "July 5-August 23, 1943",
    title: "Battle of Kursk",
    description: "Largest tank battle in history. Soviet forces repel the German offensive at Kursk, destroying the last major German offensive capability on the Eastern Front.",
    category: "military",
    side: "ussr",
  },
  // 1944 - Operation Overlord (D-Day)
  {
    year: 1944,
    date: "June 6, 1944",
    title: "Operation Overlord (D-Day)",
    description: "Allied forces launch the largest amphibious invasion in history on the beaches of Normandy, France. 156,000 troops land, beginning the liberation of Western Europe.",
    category: "military",
    side: "allied",
  },
  // 1944 - Operation Market Garden
  {
    year: 1944,
    date: "September 17, 1944",
    title: "Operation Market Garden",
    description: "Allied airborne operation to capture bridges in the Netherlands fails. The 'bridge too far' becomes a costly defeat, delaying the Allied advance into Germany.",
    category: "military",
    side: "allied",
  },
  // 1944 - Battle of the Bulge
  {
    year: 1944,
    date: "December 16, 1944",
    title: "Battle of the Bulge",
    description: "Germany launches a surprise offensive in the Ardennes, creating a 'bulge' in Allied lines. After severe fighting, Allies repel the attack by January 1945.",
    category: "military",
    side: "axis",
  },
  // 1945 - Yalta Conference
  {
    year: 1945,
    date: "February 4-11, 1945",
    title: "Yalta Conference",
    description: "Roosevelt, Churchill, and Stalin meet at Yalta to discuss post-war Europe. Agreement on Germany's division, UN formation, and Soviet entry into war against Japan.",
    category: "political",
    side: "allied",
  },
  // 1945 - Iwo Jima
  {
    year: 1945,
    date: "February 19, 1945",
    title: "Battle of Iwo Jima",
    description: "US Marines capture the island of Iwo Jima after 36 days of brutal fighting. The iconic flag-raising on Mount Suribachi becomes a symbol of American resolve.",
    category: "military",
    side: "allied",
  },
  // 1945 - V-E Day
  {
    year: 1945,
    date: "May 8, 1945",
    title: "V-E Day",
    description: "Germany surrenders unconditionally. Victory in Europe is declared. Eisenhower accepts the surrender in Reims. The war in Europe ends after nearly six years.",
    category: "political",
    side: "allied",
  },
  // 1945 - Okinawa
  {
    year: 1945,
    date: "April 1-June 21, 1945",
    title: "Battle of Okinawa",
    description: "US forces capture Okinawa after 82 days of fighting. The last major battle of the Pacific War results in over 200,000 casualties and convinces US planners to use atomic bombs.",
    category: "military",
    side: "allied",
  },
  // 1945 - Potsdam Conference
  {
    year: 1945,
    date: "July 17-August 2, 1945",
    title: "Potsdam Conference",
    description: "Truman, Churchill (later Attlee), and Stalin meet to discuss post-war Europe. The conference addresses Germany's future, war crimes trials, and the Soviet Union's role in Asia.",
    category: "political",
    side: "allied",
  },
  // 1945 - Hiroshima & Nagasaki
  {
    year: 1945,
    date: "August 6 & 9, 1945",
    title: "Atomic Bombings",
    description: "US drops atomic bombs on Hiroshima (August 6) and Nagasaki (August 9). Japan surrenders on August 15, becoming the only nation to suffer nuclear attack.",
    category: "military",
    side: "allied",
  },
  // 1945 - V-J Day
  {
    year: 1945,
    date: "September 2, 1945",
    title: "V-J Day",
    description: "Japan formally surrenders aboard the USS Missouri in Tokyo Bay. General MacArthur accepts the surrender. World War II officially ends.",
    category: "political",
    side: "allied",
  },
];

const getCategoryColor = (category: string, side: string) => {
  if (side === "allied") return "var(--allies-blue)";
  if (side === "axis") return "var(--axis-red)";
  if (side === "ussr") return "var(--ussr-brown)";
  return "var(--accent-gold)";
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "military": return "⚔";
    case "political": return "🏛";
    case "economic": return "💰";
    default: return "📌";
  }
};

export default function TimelinePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".timeline-item").forEach((item: any, i) => {
        gsap.from(item, {
          opacity: 0,
          x: i % 2 === 0 ? -50 : 50,
          duration: 0.6,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
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
        background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)",
        padding: "6rem 2rem",
        textAlign: "center",
      }}>
        <h1 className="section-title" style={{ display: "block" }}>
          Timeline of World War II
        </h1>
        <p style={{
          color: "var(--text-secondary)",
          maxWidth: "700px",
          margin: "0 auto",
          fontSize: "1.1rem",
        }}>
          From the rise of fascism in Italy to the atomic bombings of Japan — explore the key events that shaped the most devastating conflict in human history.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <p style={{ color: "var(--accent-gold)", fontSize: "0.9rem", letterSpacing: "0.2em" }}>
            1922 - 1945
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
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "1.2rem" }}>{getCategoryIcon(event.category)}</span>
                  <span className="timeline-date">{event.year}</span>
                </div>
                <p style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.85rem",
                  marginBottom: "0.5rem",
                }}>
                  {event.date}
                </p>
                <h3 className="timeline-title" style={{ color: getCategoryColor(event.category, event.side) }}>
                  {event.title}
                </h3>
                <p className="timeline-desc">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Year Markers */}
      <section style={{
        background: "var(--bg-secondary)",
        padding: "4rem 2rem",
        borderTop: "1px solid rgba(201, 162, 39, 0.2)",
      }}>
        <h2 style={{
          color: "var(--accent-gold)",
          textAlign: "center",
          marginBottom: "2rem",
          fontFamily: "'Cinzel', serif",
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
            { year: "1943-1944", label: "Turning Points", color: "var(--allies-blue)" },
            { year: "1944-1945", label: "Victory", color: "var(--allies-blue)" },
          ].map((period, i) => (
            <div key={i} style={{
              background: "var(--bg-tertiary)",
              padding: "1.5rem",
              borderRadius: "8px",
              textAlign: "center",
              borderLeft: `4px solid ${period.color}`,
            }}>
              <div style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: period.color,
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
    </div>
  );
}
