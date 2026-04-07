"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TechItem {
  name: string;
  country: string;
  type: string;
  specs: Record<string, string>;
  description: string;
  image: string;
  imageCredit: string;
}

const techData: Record<string, TechItem[]> = {
  aircraft: [
    {
      name: "P-51 Mustang",
      country: "USA",
      type: "Fighter",
      specs: {
        "Crew": "1",
        "Length": "32 ft 3 in",
        "Wingspan": "37 ft",
        "Max Speed": "437 mph",
        "Range": "1,650 mi",
        "Engine": "Packard V-1650",
      },
      description: "The P-51 Mustang was the best all-around fighter of the war. Its laminar flow wing and powerful engine gave it unmatched performance at high altitude. Escorting B-17s deep into Germany, it helped achieve air superiority over Europe.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/North_American_P-51_Mustang.jpg/800px-North_American_P-51_Mustang.jpg",
      imageCredit: "Wikimedia Commons",
    },
    {
      name: "B-17 Flying Fortress",
      country: "USA",
      type: "Heavy Bomber",
      specs: {
        "Crew": "10",
        "Length": "74 ft 4 in",
        "Wingspan": "103 ft 9 in",
        "Max Speed": "287 mph",
        "Range": "2,000 mi",
        "Bomb Load": "4,000-8,000 lb",
      },
      description: "The B-17 was America's primary heavy bomber in Europe. Its massive bomb load and defensive firepower devastated German industry. Flying in formation, 'Battle Hardened' B-17s could take incredible damage and still return home.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/B-17G_Color.jpg/800px-B-17G_Color.jpg",
      imageCredit: "U.S. Army Air Forces / Wikimedia Commons",
    },
    {
      name: "Spitfire",
      country: "UK",
      type: "Fighter",
      specs: {
        "Crew": "1",
        "Length": "29 ft 11 in",
        "Wingspan": "36 ft 10 in",
        "Max Speed": "354 mph",
        "Range": "1,390 mi",
        "Engine": "Rolls-Royce Merlin",
      },
      description: "The Spitfire became a symbol of British resistance. Its elliptical wing gave it unmatched maneuverability. Pilots like Johnnie Johnson and Douglas Bader became legends in the cockpit of this elegant fighter.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Merlin_Spitfire.jpg/800px-Merlin_Spitfire.jpg",
      imageCredit: "Wikimedia Commons",
    },
    {
      name: "Messerschmitt Bf 109",
      country: "Germany",
      type: "Fighter",
      specs: {
        "Crew": "1",
        "Length": "29 ft 6 in",
        "Wingspan": "32 ft 6 in",
        "Max Speed": "373 mph",
        "Range": "1,060 mi",
        "Engine": "Daimler-Benz DB 605",
      },
      description: "The backbone of the Luftwaffe, the Bf 109 fought in every theater where Germany operated. Over 33,000 were produced, more than any other aircraft in WWII. Ace pilots like Werner Mölders and Gerhard Barkhorn flew this formidable machine.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Messerschmitt_Bf_109_%28Werknummer_15713%29.jpg/800px-Messerschmitt_Bf_109_%28Werknummer_15713%29.jpg",
      imageCredit: "Wikimedia Commons",
    },
    {
      name: "F4U Corsair",
      country: "USA",
      type: "Fighter",
      specs: {
        "Crew": "1",
        "Length": "33 ft 8 in",
        "Wingspan": "41 ft",
        "Max Speed": "446 mph",
        "Range": "1,015 mi",
        "Engine": "Pratt & Whitney R-2800",
      },
      description: "The F4U Corsair achieved a 12:1 kill ratio in the Pacific, making it the most successful naval fighter. Its distinctive inverted gull wings allowed carrier operations despite its large propeller. Marine Corps 'Speed and Surprise' tactics proved devastating.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Vought_F4U-1_Corsair.jpg/800px-Vought_F4U-1_Corsair.jpg",
      imageCredit: "U.S. Navy / Wikimedia Commons",
    },
    {
      name: "B-29 Superfortress",
      country: "USA",
      type: "Strategic Bomber",
      specs: {
        "Crew": "10-12",
        "Length": "99 ft",
        "Wingspan": "141 ft 3 in",
        "Max Speed": "357 mph",
        "Range": "3,200 mi",
        "Bomb Load": "20,000 lb",
      },
      description: "The most advanced bomber of WWII, the B-29 featured a pressurized cabin and remote-controlled gun turrets. It delivered the atomic bombs that ended the war against Japan. The Enola Gay and Bockscar flew these revolutionary aircraft.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/B-29Superfortress.jpg/800px-B-29Superfortress.jpg",
      imageCredit: "U.S. Army Air Forces / Wikimedia Commons",
    },
  ],
  tanks: [
    {
      name: "M4 Sherman",
      country: "USA",
      type: "Medium Tank",
      specs: {
        "Crew": "5",
        "Weight": "33 tons",
        "Length": "19 ft 2 in",
        "Main Gun": "75mm Gun M3",
        "Max Speed": "30 mph",
        "Armor": "2.5 in max",
      },
      description: "The M4 Sherman was America's main battle tank, with nearly 50,000 produced. While outgunned by German Panthers and Tigers, it was reliable, easy to maintain, and overwhelming in numbers. Many were converted into tank destroyers and recovery vehicles.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/M4_Sherman_tank.jpg/800px-M4_Sherman_tank.jpg",
      imageCredit: "Wikimedia Commons",
    },
    {
      name: "Tiger I",
      country: "Germany",
      type: "Heavy Tank",
      specs: {
        "Crew": "5",
        "Weight": "56 tons",
        "Length": "20 ft",
        "Main Gun": "88mm KwK 36",
        "Max Speed": "24 mph",
        "Armor": "4 in max",
      },
      description: "The Tiger I struck fear into Allied tank crews with its devastating 88mm gun and thick armor. A single Tiger could destroy multiple Shermans. However, mechanical reliability issues and fuel shortages limited its effectiveness.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/PzKpfw_VI_Tiger_I_Ausf_E.jpg/800px-PzKpfw_VI_Tiger_I_Ausf_E.jpg",
      imageCredit: "Bundesarchiv / Wikimedia Commons",
    },
    {
      name: "T-34",
      country: "USSR",
      type: "Medium Tank",
      specs: {
        "Crew": "4",
        "Weight": "26 tons",
        "Length": "20 ft",
        "Main Gun": "76.2mm F-34",
        "Max Speed": "34 mph",
        "Armor": "2.4 in sloped",
      },
      description: "The T-34 was the war's best all-around tank. Its sloped armor and wide tracks made it superior to early German tanks. Soviet industry produced over 57,000 T-34s, more than all German tank production combined. It turned the tide on the Eastern Front.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/T-34_76_RKKA_in_Kiev_1943.jpg/800px-T-34_76_RKKA_in_Kiev_1943.jpg",
      imageCredit: "Wikimedia Commons",
    },
    {
      name: "M3 Stuart",
      country: "USA",
      type: "Light Tank",
      specs: {
        "Crew": "4",
        "Weight": "12 tons",
        "Length": "14 ft",
        "Main Gun": "37mm Gun M5",
        "Max Speed": "36 mph",
        "Armor": "1.3 in max",
      },
      description: "The M3 Stuart was America's first modern tank, named after Confederate cavalry generals. Fast and reliable, it fought in every theater. While its 37mm gun was inadequate against later German tanks, its speed and reconnaissance capabilities proved valuable.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/M3_Stuart_captured_by_Germans_in_North_Africa.jpg/800px-M3_Stuart_captured_by_Germans_in_North_Africa.jpg",
      imageCredit: "Bundesarchiv / Wikimedia Commons",
    },
    {
      name: "Panther",
      country: "Germany",
      type: "Medium Tank",
      specs: {
        "Crew": "5",
        "Weight": "45 tons",
        "Length": "22 ft",
        "Main Gun": "75mm KwK 42",
        "Max Speed": "31 mph",
        "Armor": "3.9 in max",
      },
      description: "The Panther combined the best features of the T-34 and Tiger. Its superior optics and 75mm gun could destroy any Allied tank at range. However, transmission problems and limited availability meant it could never fully replace the Tiger.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Panzerkampfwagen_V_Panther_20200606.jpg/800px-Panzerkampfwagen_V_Panther_20200606.jpg",
      imageCredit: "Wikimedia Commons",
    },
    {
      name: "Panzer IV",
      country: "Germany",
      type: "Medium Tank",
      specs: {
        "Crew": "5",
        "Weight": "25 tons",
        "Length": "19 ft",
        "Main Gun": "75mm KwK 40",
        "Max Speed": "26 mph",
        "Armor": "3.1 in max",
      },
      description: "The Panzer IV was the most produced German tank and the backbone of the Wehrmacht. Continuously upgraded throughout the war, it proved reliable and effective. Over 8,500 were built, more than any other German tank.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Panzer_IV_Ausf._H.jpg/800px-Panzer_IV_Ausf._H.jpg",
      imageCredit: "Bundesarchiv / Wikimedia Commons",
    },
  ],
  ships: [
    {
      name: "USS Missouri",
      country: "USA",
      type: "Battleship",
      specs: {
        "Crew": "2,700",
        "Displacement": "45,000 tons",
        "Length": "887 ft",
        "Main Battery": "9x 16-inch guns",
        "Max Speed": "33 knots",
        "Commissioned": "1944",
      },
      description: "The USS Missouri was the last battleship ever built and the site of Japan's formal surrender. Nicknamed 'Big Mo,' she served in both the Pacific and Korean War. She remains a museum ship in Pearl Harbor today.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/USS_Missouri_BB-63.jpg/800px-USS_Missouri_BB-63.jpg",
      imageCredit: "U.S. Navy / Wikimedia Commons",
    },
    {
      name: "Yamato",
      country: "Japan",
      type: "Battleship",
      specs: {
        "Crew": "2,400",
        "Displacement": "65,000 tons",
        "Length": "839 ft",
        "Main Battery": "9x 18.1-inch guns",
        "Max Speed": "27 knots",
        "Commissioned": "1940",
      },
      description: "The Yamato was the largest battleship ever built, with 18.1-inch guns that could fire shells 26 miles. Despite her power, she was sunk by U.S. carrier aircraft in 1945 before ever engaging another battleship.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Yamato_underway.jpg/800px-Yamato_underway.jpg",
      imageCredit: "Wikimedia Commons",
    },
    {
      name: "USS Enterprise",
      country: "USA",
      type: "Aircraft Carrier",
      specs: {
        "Crew": "3,000",
        "Displacement": "25,800 tons",
        "Length": "825 ft",
        "Aircraft": "90-100",
        "Max Speed": "32.5 knots",
        "Nickname": "Big E",
      },
      description: "The USS Enterprise was America's most decorated carrier. She fought in every major Pacific campaign from Pearl Harbor to Okinawa. Her aircraft and crew achieved a 10:1 kill ratio against Japanese forces.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/USS_Enterprise_CV-6.jpg/800px-USS_Enterprise_CV-6.jpg",
      imageCredit: "U.S. Navy / Wikimedia Commons",
    },
    {
      name: "U-Boat Type VII",
      country: "Germany",
      type: "Submarine",
      specs: {
        "Crew": "44-52",
        "Displacement": "753 tons",
        "Length": "221 ft",
        "Torpedoes": "14x torpedoes",
        "Max Speed": "17 knots",
        "Patrol Range": "6,500 mi",
      },
      description: "The Type VII U-boat was the workhorse of the German submarine fleet. Operating in wolf packs, they nearly strangled Britain. The 'Black Pit' of mid-1942 saw unprecedented sinkings before Allied countermeasures turned the tide.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Bundesarchiv_Bild_101II-MW-3630-24,_U-Boot_Type_VII_C.jpg/800px-Bundesarchiv_Bild_101II-MW-3630-24,_U-Boot_Type_VII_C.jpg",
      imageCredit: "Bundesarchiv / Wikimedia Commons",
    },
  ],
  infantry: [
    {
      name: "M1 Garand",
      country: "USA",
      type: "Semi-Automatic Rifle",
      specs: {
        "Caliber": ".30-06 Springfield",
        "Action": "Gas-operated",
        "Magazine": "8 rounds en bloc",
        "Effective Range": "1,500 ft",
        "Weight": "9.5 lb",
        "Rate of Fire": "40-50 rpm",
      },
      description: "The M1 Garand equipped American infantry throughout the war. Its reliable semi-automatic action gave GIs decisive firepower advantage over bolt-action wielding enemies. General Patton called it 'the greatest battle implement ever devised.'",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/M1_Garand.jpg/800px-M1_Garand.jpg",
      imageCredit: "Wikimedia Commons",
    },
    {
      name: "MG 42",
      country: "Germany",
      type: "Machine Gun",
      specs: {
        "Caliber": "7.92×57mm Mauser",
        "Action": "Recoil-operated",
        "Magazine": "50-round belt",
        "Effective Range": "2,000 ft",
        "Weight": "25 lb",
        "Rate of Fire": "1,200 rpm",
      },
      description: "The MG 42 had the highest rate of fire of any WWII weapon. Its distinctive 'buzz saw' sound became synonymous with German infantry resistance. Allied soldiers feared it more than any other German weapon.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/MG_42_Bundesarchiv_Bild_101-316-0269-24A.jpg/800px-MG_42_Bundesarchiv_Bild_101-316-0269-24A.jpg",
      imageCredit: "Bundesarchiv / Wikimedia Commons",
    },
    {
      name: "PPSh-41",
      country: "USSR",
      type: "Submachine Gun",
      specs: {
        "Caliber": "7.62×25mm Tokarev",
        "Action": "Blowback",
        "Magazine": "71-round drum or 35-round box",
        "Effective Range": "330 ft",
        "Weight": "9.5 lb",
        "Rate of Fire": "900 rpm",
      },
      description: "The PPSh-41 armed millions of Soviet soldiers. Its high rate of fire and generous magazine made it devastating in close combat. Captured PPShs were used by German Sturmfeuertrupps (storm assault groups).",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/PPSh-41.jpg/800px-PPSh-41.jpg",
      imageCredit: "Wikimedia Commons",
    },
    {
      name: "Kar 98k",
      country: "Germany",
      type: "Bolt-Action Rifle",
      specs: {
        "Caliber": "7.92×57mm Mauser",
        "Action": "Bolt-action",
        "Magazine": "5-round internal box",
        "Effective Range": "2,000 ft",
        "Weight": "7.9 lb",
        "Service": "1935-1945",
      },
      description: "The Kar 98k was the standard German infantry rifle. Its accuracy and reliability made it prized by soldiers on both sides. Captured examples were used by Allied troops and resistance fighters throughout Europe.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Kar_98k.jpg/800px-Kar_98k.jpg",
      imageCredit: "Wikimedia Commons",
    },
    {
      name: "Thompson",
      country: "USA",
      type: "Submachine Gun",
      specs: {
        "Caliber": ".45 ACP",
        "Action": "Blowback",
        "Magazine": "20 or 30-round box, 50-round drum",
        "Effective Range": "330 ft",
        "Weight": "10.5 lb",
        "Rate of Fire": "600 rpm",
      },
      description: "The Thompson was the classic American submachine gun, iconic of WWII and gangster films. Initially issued to paratroopers and officers, its stopping power made it valued in close-quarters combat in both Europe and the Pacific.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Thompson_M1928.jpg/800px-Thompson_M1928.jpg",
      imageCredit: "Wikimedia Commons",
    },
  ],
};

const getCountryColor = (country: string) => {
  switch (country) {
    case "USA": return "#1e4d8c";
    case "UK": return "#1e4d8c";
    case "Germany": return "#8b1a1a";
    case "USSR": return "#6b4423";
    case "Japan": return "#7c2d12";
    default: return "var(--accent-gold)";
  }
};

export default function TechnologyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tech-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const TechCard = ({ item, category }: { item: TechItem; category: string }) => (
    <div 
      className="tech-card hover-lift"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-color)",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "all 0.4s ease",
      }}
    >
      {/* Image */}
      <div 
        className="image-zoom"
        style={{ cursor: "pointer", position: "relative", overflow: "hidden" }}
        onClick={() => setLightboxImage(item.image)}
      >
        <img
          src={item.image}
          alt={item.name}
          className="tech-card-image"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            display: "block",
            filter: "sepia(0.1) contrast(1.05)",
            transition: "filter 0.4s ease",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        
        {/* Country Badge */}
        <div style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          background: getCountryColor(item.country),
          color: "#fff",
          padding: "0.3rem 0.6rem",
          borderRadius: "4px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          {item.country}
        </div>
        
        {/* Type Badge */}
        <div style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          background: "rgba(0,0,0,0.7)",
          color: "var(--accent-gold)",
          padding: "0.3rem 0.6rem",
          borderRadius: "4px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}>
          {item.type}
        </div>
      </div>
      
      {/* Content */}
      <div style={{ padding: "1.5rem" }}>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.3rem",
          color: "var(--accent-gold)",
          marginBottom: "1rem",
        }}>
          {item.name}
        </h3>
        
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "0.9rem",
          lineHeight: 1.7,
          marginBottom: "1.25rem",
        }}>
          {item.description}
        </p>
        
        {/* Specs Table */}
        <div style={{
          background: "var(--bg-tertiary)",
          borderRadius: "6px",
          padding: "1rem",
          marginBottom: "0.75rem",
        }}>
          {Object.entries(item.specs).slice(0, 4).map(([key, value], i) => (
            <div key={i} className="spec-item" style={{ padding: "0.4rem 0" }}>
              <span className="spec-label" style={{ fontSize: "0.8rem" }}>{key}</span>
              <span className="spec-value" style={{ fontSize: "0.8rem" }}>{value}</span>
            </div>
          ))}
        </div>
        
        <p style={{
          fontSize: "0.6rem",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
        }}>
          {item.imageCredit}
        </p>
      </div>
    </div>
  );

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
          Technology & Weapons
        </h1>
        <p style={{
          color: "var(--text-secondary)",
          maxWidth: "700px",
          margin: "0 auto",
          fontSize: "1.1rem",
          lineHeight: 1.8,
        }}>
          The weapons, vehicles, and innovations that defined modern warfare — from fighter aircraft to battleships, tanks to infantry arms.
        </p>
      </section>

      {/* Categories */}
      <div ref={containerRef}>
        {/* Aircraft */}
        <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
            <div style={{ width: "8px", height: "40px", background: "#1e4d8c", borderRadius: "4px" }} />
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--accent-gold)" }}>
              Aircraft
            </h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2rem" }}>
            {techData.aircraft.map((item, i) => (
              <TechCard key={i} item={item} category="aircraft" />
            ))}
          </div>
        </section>

        {/* Tanks */}
        <section style={{ background: "var(--bg-secondary)", padding: "5rem 2rem", borderTop: "1px solid var(--border-color)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
              <div style={{ width: "8px", height: "40px", background: "#6b4423", borderRadius: "4px" }} />
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--accent-gold)" }}>
                Tanks
              </h2>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2rem" }}>
              {techData.tanks.map((item, i) => (
                <TechCard key={i} item={item} category="tanks" />
              ))}
            </div>
          </div>
        </section>

        {/* Ships */}
        <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "5rem 2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
            <div style={{ width: "8px", height: "40px", background: "#059669", borderRadius: "4px" }} />
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--accent-gold)" }}>
              Naval Vessels
            </h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2rem" }}>
            {techData.ships.map((item, i) => (
              <TechCard key={i} item={item} category="ships" />
            ))}
          </div>
        </section>

        {/* Infantry Weapons */}
        <section style={{ background: "var(--bg-secondary)", padding: "5rem 2rem", borderTop: "1px solid var(--border-color)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
              <div style={{ width: "8px", height: "40px", background: "#8b1a1a", borderRadius: "4px" }} />
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--accent-gold)" }}>
                Infantry Weapons
              </h2>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2rem" }}>
              {techData.infantry.map((item, i) => (
                <TechCard key={i} item={item} category="infantry" />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="lightbox-overlay active" onClick={() => setLightboxImage(null)}>
          <span className="lightbox-close" onClick={() => setLightboxImage(null)}>×</span>
          <img 
            src={lightboxImage} 
            alt="Full size" 
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "80%", maxHeight: "80vh" }}
          />
        </div>
      )}
    </div>
  );
}
