"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const sources = {
  books: [
    {
      title: "The Second World War",
      author: "Antony Beevor",
      year: "2012",
      publisher: "Viking Press",
      description:
        "A comprehensive single-volume history of WWII covering all theaters and aspects of the conflict. Beevor draws on newly available Soviet and German archives to provide fresh insights into the war's major battles and campaigns.",
      pages: "880 pages",
      isbn: "978-0670920653",
    },
    {
      title: "The Rise and Fall of the Third Reich",
      author: "William L. Shirer",
      year: "1960",
      publisher: "Simon & Schuster",
      description:
        "A landmark history of Nazi Germany based on captured documents and testimony from the Nuremberg trials. Shirer, a journalist who witnessed Hitler's rise firsthand, provides an definitive account of the Nazi regime.",
      pages: "1,245 pages",
      isbn: "978-1451651683",
    },
    {
      title: "The Guns at Last Light",
      author: "Rick Atkinson",
      year: "2013",
      publisher: "Henry Holt & Co.",
      description:
        "The final volume of Atkinson's Liberation Trilogy covering the Battle of the Bulge and the crossing of the Rhine into Germany. Rich with personal accounts and military detail.",
      pages: "880 pages",
      isbn: "978-0805062909",
    },
    {
      title: "An Army at Dawn",
      author: "Rick Atkinson",
      year: "2002",
      publisher: "Henry Holt & Co.",
      description:
        "The first volume of the Liberation Trilogy covering the North African campaign from Operation Torch to the defeat of Axis forces in Tunisia.",
      pages: "672 pages",
      isbn: "978-0805082242",
    },
    {
      title: "The Day of Battle",
      author: "Rick Atkinson",
      year: "2007",
      publisher: "Henry Holt & Co.",
      description:
        "The second volume covering the Italian campaign from the invasion of Sicily through the battles at Salerno, Anzio, and Monte Cassino.",
      pages: "784 pages",
      isbn: "978-0805087247",
    },
    {
      title: "The Longest Day",
      author: " Cornelius Ryan",
      year: "1959",
      publisher: "Simon & Schuster",
      description:
        "The classic account of D-Day, June 6, 1944, told through the eyes of participants from all sides. Ryan interviewed over 1,000 survivors to create this definitive history.",
      pages: "350 pages",
      isbn: "978-0671667968",
    },
    {
      title: "Stalingrad",
      author: "Antony Beevor",
      year: "1998",
      publisher: "Viking Press",
      description:
        "A meticulously detailed account of the Battle of Stalingrad, drawing on new Soviet archives. Beevor reveals the full horror of the fighting and its impact on both soldiers and civilians.",
      pages: "432 pages",
      isbn: "978-0140270673",
    },
    {
      title: "D-Day",
      author: "Antony Beevor",
      year: "2009",
      publisher: "Viking Press",
      description:
        "Beevor's comprehensive history of the Normandy landings, drawing on new sources to provide the most complete account of Operation Overlord.",
      pages: "656 pages",
      isbn: "978-0670020789",
    },
    {
      title: "The War",
      author: "John Keegan",
      year: "1994",
      publisher: "Alfred A. Knopf",
      description:
        "Keegan provides a comprehensive military history of WWII, analyzing each theater and the strategies that shaped the conflict. Part of his acclaimed military history series.",
      pages: "512 pages",
      isbn: "978-0679765421",
    },
    {
      title: "Band of Brothers",
      author: "Stephen E. Ambrose",
      year: "1992",
      publisher: "Simon & Schuster",
      description:
        "The story of Easy Company, 506th Parachute Infantry Regiment, from training through the end of the war. Based on extensive interviews with surviving members.",
      pages: "336 pages",
      isbn: "978-1451664454",
    },
  ],
  official: [
    {
      title: "United States Army in World War II",
      author: "Various",
      year: "1947-1993",
      publisher: "Office of the Chief of Military History",
      description:
        "The official US Army history of WWII, known as the 'Green Books.' Over 100 volumes covering every aspect of American involvement in the war.",
      url: "https://www.history.army.mil/brochures/wwii/wwii.htm",
    },
    {
      title: "The War Reports of General George S. Patton",
      author: "George S. Patton",
      year: "1947",
      publisher: "J.B. Lippincott",
      description:
        "Patton's official reports from the North African and European campaigns, providing insight into his command style and military thinking.",
    },
    {
      title: "The Reports of General Dwight D. Eisenhower",
      author: "Dwight D. Eisenhower",
      year: "1948",
      publisher: "Johns Hopkins Press",
      description:
        "Eisenhower's official reports and dispatches from his tenure as Supreme Commander Allied Expeditionary Force.",
    },
  ],
  archives: [
    {
      title: "US National Archives WWII Collection",
      author: "NARA",
      year: "Ongoing",
      publisher: "National Archives and Records Administration",
      description:
        "Extensive collection of official documents, photographs, maps, and personal papers from US military operations in WWII.",
      url: "https://www.archives.gov/research/wwii",
    },
    {
      title: "Imperial War Museum Collections",
      author: "IWM",
      year: "Ongoing",
      publisher: "Imperial War Museum, London",
      description:
        "The world's largest collection of items relating to conflict involving Britain and the Commonwealth from WWI to the present.",
      url: "https://www.iwm.org.uk/collections",
    },
    {
      title: "USHMM Archives",
      author: "USHMM",
      year: "Ongoing",
      publisher: "United States Holocaust Memorial Museum",
      description:
        "Comprehensive collection of documents, photographs, and testimonies related to the Holocaust and WWII.",
      url: "https://www.ushmm.org/archives",
    },
  ],
  academic: [
    {
      title: "Journal of Military History",
      author: "Society for Military History",
      year: "Ongoing",
      publisher: "Taylor & Francis",
      description:
        "Peer-reviewed academic journal publishing research on all aspects of military history from ancient times to present.",
      url: "https://www.smh-hq.org/journal.html",
    },
    {
      title: "War in History",
      author: "Various",
      year: "Ongoing",
      publisher: "SAGE Publications",
      description:
        "Academic journal focusing on the history of warfare, including detailed studies of WWII campaigns and battles.",
      url: "https://journals.sagepub.com/home/wih",
    },
    {
      title: "World War II Quarterly",
      author: "Various",
      year: "Ongoing",
      publisher: "McDraconis Press",
      description:
        "Popular academic journal with detailed articles on all aspects of WWII, balancing military, political, and social history.",
    },
  ],
};

export default function SourcesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".source-section").forEach((section: any, i) => {
        gsap.from(section, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ paddingTop: "70px" }}>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)",
          padding: "6rem 2rem 4rem",
          textAlign: "center",
        }}
      >
        <h1 className="section-title" style={{ display: "block" }}>
          Sources & Bibliography
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            maxWidth: "700px",
            margin: "0 auto",
            fontSize: "1.1rem",
          }}
        >
          A comprehensive collection of academic sources, official histories, and archival materials used in documenting World War II history.
        </p>
      </section>

      {/* Introduction */}
      <section
        className="source-section"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "4rem 2rem",
        }}
      >
        <div className="card">
          <h2
            style={{
              color: "var(--accent-gold)",
              marginBottom: "1.5rem",
              fontFamily: "'Cinzel', serif",
            }}
          >
            About Our Sources
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.9,
              marginBottom: "1rem",
            }}
          >
            This educational resource draws upon a wide range of sources, including award-winning historical works, official military histories, archival collections, and peer-reviewed academic journals. We prioritize primary sources and works by established historians who have access to original documents and testimonies.
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.9,
            }}
          >
            All sources have been selected for their accuracy, scholarly merit, and contribution to our understanding of this complex conflict. We encourage readers to explore these sources for a deeper understanding of World War II.
          </p>
        </div>
      </section>

      {/* Books */}
      <section
        className="source-section"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem",
        }}
      >
        <h2
          style={{
            color: "var(--accent-gold)",
            fontSize: "2rem",
            marginBottom: "2rem",
            fontFamily: "'Cinzel', serif",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span style={{ fontSize: "2.5rem" }}>📚</span> Books & Monographs
        </h2>

        <div
          style={{
            display: "grid",
            gap: "1.5rem",
          }}
        >
          {sources.books.map((book, i) => (
            <div key={i} className="source-item">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div style={{ flex: 1, minWidth: "300px" }}>
                  <h3 className="source-title">{book.title}</h3>
                  <p className="source-author">
                    {book.author} ({book.year}) — {book.publisher}. {book.pages}
                  </p>
                  {book.isbn && (
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.8rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      ISBN: {book.isbn}
                    </p>
                  )}
                  <p className="source-desc">{book.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Histories */}
      <section
        className="source-section"
        style={{
          background: "var(--bg-secondary)",
          padding: "4rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              color: "var(--accent-gold)",
              fontSize: "2rem",
              marginBottom: "2rem",
              fontFamily: "'Cinzel', serif",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span style={{ fontSize: "2.5rem" }}>📋</span> Official Military Histories
          </h2>

          <div
            style={{
              display: "grid",
              gap: "1.5rem",
            }}
          >
            {sources.official.map((source, i) => (
              <div key={i} className="source-item">
                <h3 className="source-title">{source.title}</h3>
                <p className="source-author">
                  {source.author} — {source.publisher}, {source.year}
                </p>
                <p className="source-desc">{source.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archives */}
      <section
        className="source-section"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem",
        }}
      >
        <h2
          style={{
            color: "var(--accent-gold)",
            fontSize: "2rem",
            marginBottom: "2rem",
            fontFamily: "'Cinzel', serif",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span style={{ fontSize: "2.5rem" }}>🏛</span> Archives & Museums
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {sources.archives.map((archive, i) => (
            <div key={i} className="card">
              <h3
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "1.1rem",
                  marginBottom: "0.5rem",
                }}
              >
                {archive.title}
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.9rem",
                  marginBottom: "0.5rem",
                }}
              >
                {archive.author} — {archive.publisher}
              </p>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                  marginBottom: "1rem",
                }}
              >
                {archive.description}
              </p>
              {archive.url && (
                <a
                  href={archive.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--accent-gold)",
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  Visit Archive →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Academic Journals */}
      <section
        className="source-section"
        style={{
          background: "var(--bg-secondary)",
          padding: "4rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              color: "var(--accent-gold)",
              fontSize: "2rem",
              marginBottom: "2rem",
              fontFamily: "'Cinzel', serif",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span style={{ fontSize: "2.5rem" }}>📰</span> Academic Journals
          </h2>

          <div
            style={{
              display: "grid",
              gap: "1.5rem",
            }}
          >
            {sources.academic.map((journal, i) => (
              <div key={i} className="source-item">
                <h3 className="source-title">{journal.title}</h3>
                <p className="source-author">
                  {journal.author} — {journal.publisher}
                  {journal.year !== "Ongoing" && `, ${journal.year}`}
                </p>
                <p className="source-desc">{journal.description}</p>
                {journal.url && (
                  <a
                    href={journal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--accent-gold)",
                      fontSize: "0.85rem",
                      textDecoration: "none",
                      display: "inline-block",
                      marginTop: "0.5rem",
                    }}
                  >
                    Visit Journal →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Citation Guide */}
      <section
        className="source-section"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "4rem 2rem",
        }}
      >
        <div className="card">
          <h2
            style={{
              color: "var(--accent-gold)",
              marginBottom: "1.5rem",
              fontFamily: "'Cinzel', serif",
            }}
          >
            Citation Guidelines
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.9,
              marginBottom: "1rem",
            }}
          >
            When citing this resource in academic work, please use the following format:
          </p>
          <div
            style={{
              background: "var(--bg-tertiary)",
              padding: "1rem 1.5rem",
              borderRadius: "6px",
              fontFamily: "monospace",
              fontSize: "0.9rem",
              color: "var(--text-primary)",
            }}
          >
            <p style={{ marginBottom: "0.5rem" }}>
              &quot;World War II History Educational Resource.&quot; WW2 History.
            </p>
            <p style={{ marginBottom: "0.5rem" }}>
              https://mac756.github.io/ww2-history/
            </p>
            <p>Accessed [Date].</p>
          </div>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              marginTop: "1.5rem",
              lineHeight: 1.8,
            }}
          >
            For specific sections, include the section title in your citation. For example, when citing information from the Timeline section, note the specific event and date range covered.
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <section
        style={{
          background: "var(--bg-tertiary)",
          padding: "3rem 2rem",
          textAlign: "center",
          borderTop: "1px solid rgba(201, 162, 39, 0.2)",
        }}
      >
        <p
          style={{
            color: "var(--text-secondary)",
            maxWidth: "700px",
            margin: "0 auto",
            fontSize: "0.9rem",
            lineHeight: 1.8,
          }}
        >
          This educational resource is provided for informational purposes only. History is an ongoing field of study, and new research may revise our understanding of these events. We strive for accuracy but acknowledge that interpretations may vary among historians.
        </p>
        <p
          style={{
            color: "var(--accent-gold)",
            marginTop: "1.5rem",
            fontSize: "0.85rem",
          }}
        >
          Never Forget — Lest We Repeat
        </p>
      </section>
    </div>
  );
}
