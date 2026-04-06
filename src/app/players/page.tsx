"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MedalIcon, BuildingIcon, FlagIcon, SwordsIcon } from "@/components/Icons";

interface Player {
  name: string;
  title: string;
  nationality: string;
  period: string;
  imageColor: string;
  image: string;
  bio: string;
  achievements: string[];
}

// Historical portrait images from Wikimedia Commons
const playerImages: Record<string, string> = {
  "Dwight D. Eisenhower": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Portraits_of_Dwight_D._Eisenhower.jpg/800px-Portraits_of_Dwight_D._Eisenhower.jpg",
  "Winston Churchill": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Sir_Winston_Churchill_-_19086236948.jpg/800px-Sir_Winston_Churchill_-_19086236948.jpg",
  "Joseph Stalin": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Stalin_Full_Image.jpg/800px-Stalin_Full_Image.jpg",
  "Franklin D. Roosevelt": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/FDR_1944_Color_Portrait.jpg/800px-FDR_1944_Color_Portrait.jpg",
  "Harry S. Truman": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/President_Truman_photo.jpg/800px-President_Truman_photo.jpg",
  "Charles de Gaulle": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/De_Gaulle-OWI_%28cropped%29.jpg/800px-De_Gaulle-OWI_%28cropped%29.jpg",
  "Adolf Hitler": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Hitler_portrait_crop.jpg/800px-Hitler_portrait_crop.jpg",
  "Erwin Rommel": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Erwin_Rommel.jpg/800px-Erwin_Rommel.jpg",
  "Friedrich Paulus": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Bundesarchiv_Bild_183-B24516%2C_Friedrich_Paulus.jpg/800px-Bundesarchiv_Bild_183-B24516%2C_Friedrich_Paulus.jpg",
  "Hermann Göring": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/HermannGoring.jpg/800px-HermannGoring.jpg",
  "Heinz Guderian": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Bundesarchiv_Bild_183-W0407-300%2C_Henning_von_Tresckow.jpg/800px-Bundesarchiv_Bild_183-W0407-300%2C_Henning_von_Tresckow.jpg",
  "Hideki Tojo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Hideki_Tojo.jpg/800px-Hideki_Tojo.jpg",
  "Isoroku Yamamoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Admiral_Yamamoto.jpg/800px-Admiral_Yamamoto.jpg",
  "Georgy Zhukov": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Georgy_Zhukov.jpg/800px-Georgy_Zhukov.jpg",
  "Konstantin Rokossovsky": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Konstantin_Rokossovsky.jpg/800px-Konstantin_Rokossovsky.jpg",
};

const players: Record<string, Player[]> = {
  allied: [
    {
      name: "Dwight D. Eisenhower",
      title: "Supreme Commander Allied Expeditionary Force",
      nationality: "USA",
      period: "1943-1945",
      imageColor: "#1e4d8c",
      image: playerImages["Dwight D. Eisenhower"],
      bio: "Dwight D. Eisenhower was the Allied Supreme Commander in Europe, responsible for planning and executing Operation Overlord (D-Day). His diplomatic skills and military acumen made him the ideal leader for the diverse Allied coalition. After the war, he became the 34th President of the United States.",
      achievements: [
        "Planned and led Operation Overlord (D-Day)",
        "Coordinated Allied forces across multiple nations",
        "Accepted German surrender on behalf of the Allies",
        "Later became 34th US President",
      ],
    },
    {
      name: "Winston Churchill",
      title: "Prime Minister of United Kingdom",
      nationality: "UK",
      period: "1940-1945",
      imageColor: "#1e4d8c",
      image: playerImages["Winston Churchill"],
      bio: "Winston Churchill was one of the greatest wartime leaders in history. His defiant speeches and refusal to surrender inspired the British people during their darkest hours. Churchill maintained the Allied coalition and advocated for the opening of a second front in Europe.",
      achievements: [
        "Led Britain through the Battle of Britain",
        "Maintained Allied unity through difficult years",
        "Masterminded strategic partnerships with US and USSR",
        "Provided oratory inspiration that sustained British morale",
      ],
    },
    {
      name: "Joseph Stalin",
      title: "Premier of the Soviet Union",
      nationality: "USSR",
      period: "1941-1945",
      imageColor: "#6b4423",
      image: playerImages["Joseph Stalin"],
      bio: "Joseph Stalin was the Soviet leader who transformed the USSR into a war machine capable of defeating Nazi Germany. Despite his brutal regime, Stalin's leadership was crucial to the Eastern Front's outcome. The Soviet Union bore the brunt of fighting against Germany.",
      achievements: [
        "Directed Soviet war effort against Germany",
        "Led counteroffensives at Stalingrad and Kursk",
        "Managed massive industrial mobilization",
        "Established Soviet dominance in Eastern Europe",
      ],
    },
    {
      name: "Franklin D. Roosevelt",
      title: "32nd President of the United States",
      nationality: "USA",
      period: "1933-1945",
      imageColor: "#1e4d8c",
      image: playerImages["Franklin D. Roosevelt"],
      bio: "Franklin D. Roosevelt guided the United States through both the Great Depression and World War II. He designed the Lend-Lease program that supplied Allied nations and helped forge the Grand Alliance. His vision of a post-war peaceful world led to the United Nations.",
      achievements: [
        "Implemented Lend-Lease to support Allies",
        "Established the United Nations",
        "Led US through most of WWII",
        "Designed post-war world order",
      ],
    },
    {
      name: "Harry S. Truman",
      title: "33rd President of the United States",
      nationality: "USA",
      period: "1945",
      imageColor: "#1e4d8c",
      image: playerImages["Harry S. Truman"],
      bio: "Harry Truman became President upon Roosevelt's death in April 1945. He made the difficult decision to use atomic bombs against Japan, hastening the war's end. Truman also oversaw the final months of the European war and the beginning of the Cold War.",
      achievements: [
        "Authorized use of atomic weapons",
        "Oversaw final Allied victories in Europe",
        "Managed post-Roosevelt transition",
        "Established Cold War policies",
      ],
    },
    {
      name: "Charles de Gaulle",
      title: "Leader of Free French Forces",
      nationality: "France",
      period: "1940-1945",
      imageColor: "#1e4d8c",
      image: playerImages["Charles de Gaulle"],
      bio: "Charles de Gaulle was the leader of Free France after the fall of Vichy France. He refused to accept defeat and rallied French resistance from London. After liberation, he became head of the French Provisional Government.",
      achievements: [
        "Refused to accept French surrender",
        "Led Free French from exile in Britain",
        "Rallied French Resistance movements",
        "Liberated Paris in August 1944",
      ],
    },
  ],
  german: [
    {
      name: "Adolf Hitler",
      title: "Führer of Nazi Germany",
      nationality: "Germany",
      period: "1933-1945",
      imageColor: "#8b0000",
      image: playerImages["Adolf Hitler"],
      bio: "Adolf Hitler was the totalitarian leader of Nazi Germany and the primary instigator of World War II. His racist ideology led to the Holocaust, the genocide of six million Jews and millions of others. Hitler's military decisions often proved disastrous, leading to Germany's defeat.",
      achievements: [
        "Established Nazi totalitarian state",
        "Initiated Holocaust and genocide",
        "Launched aggressive war across Europe",
        "Committed suicide as Soviets entered Berlin",
      ],
    },
    {
      name: "Erwin Rommel",
      title: "Field Marshal (Desert Fox)",
      nationality: "Germany",
      period: "1941-1944",
      imageColor: "#8b0000",
      image: playerImages["Erwin Rommel"],
      bio: "Erwin Rommel was one of Germany's most celebrated commanders, known as the 'Desert Fox' for his leadership in North Africa. He was credited with nearly defeating the British 8th Army at El Alamein. Later, he was implicated in the July 20 plot against Hitler and forced to commit suicide.",
      achievements: [
        "Commanded Deutsches Afrika Korps",
        "Achieved major victories at Gazala and Mersa el Brega",
        "Nearly took Cairo before defeat at El Alamein",
        "Involved in anti-Hitler conspiracy",
      ],
    },
    {
      name: "Friedrich Paulus",
      title: "Field Marshal (Stalingrad)",
      nationality: "Germany",
      period: "1942-1943",
      imageColor: "#8b0000",
      image: playerImages["Friedrich Paulus"],
      bio: "Friedrich Paulus was the commander of the German 6th Army during the Battle of Stalingrad. His encirclement and eventual surrender marked the turning point of the war on the Eastern Front. He spent the rest of the war in Soviet captivity.",
      achievements: [
        "Led advance to Stalingrad",
        "Commanded 6th Army during catastrophic siege",
        "First German Field Marshal to surrender",
        "Later became critic of Nazi regime",
      ],
    },
    {
      name: "Hermann Göring",
      title: "Reichsmarschall (Luftwaffe Commander)",
      nationality: "Germany",
      period: "1933-1945",
      imageColor: "#8b0000",
      image: playerImages["Hermann Göring"],
      bio: "Hermann Göring was the commander of the Luftwaffe and Hitler's designated successor. However, his leadership of German air forces proved disastrous, particularly during the Battle of Britain and the failure to protect German cities from Allied bombing.",
      achievements: [
        "Built Luftwaffe from scratch",
        "Controlled German aviation industry",
        "Failed to achieve air superiority over Britain",
        "Captured by Allies and tried at Nuremberg",
      ],
    },
    {
      name: "Heinz Guderian",
      title: "Generaloberst (Panzer Commander)",
      nationality: "Germany",
      period: "1939-1945",
      imageColor: "#8b0000",
      image: playerImages["Heinz Guderian"],
      bio: "Heinz Guderian was one of the primary architects of blitzkrieg tactics. As a pioneer of tank warfare, he developed the concepts that allowed Germany to achieve stunning victories in 1939-1941. His analytical mind made him one of the few German generals to challenge Hitler.",
      achievements: [
        "Developed modern blitzkrieg tactics",
        "Commanded XIX Army in Poland and France",
        "Led Panzergruppe 2 in Barbarossa",
        "Served as Inspector General of Panzer forces",
      ],
    },
  ],
  japanese: [
    {
      name: "Hideki Tojo",
      title: "Prime Minister of Japan",
      nationality: "Japan",
      period: "1941-1944",
      imageColor: "#7c2d12",
      image: playerImages["Hideki Tojo"],
      bio: "Hideki Tojo was the Prime Minister of Japan during most of the war and a key architect of Japanese expansion. He authorized the attack on Pearl Harbor and oversaw Japan's military campaigns. After the war, he was tried and executed as a war criminal.",
      achievements: [
        "Authorized attack on Pearl Harbor",
        "Directed Japanese war effort in Asia",
        "Expanded Japanese empire across Pacific",
        "Executed as war criminal in 1948",
      ],
    },
    {
      name: "Isoroku Yamamoto",
      title: "Commander-in-Chief, Combined Fleet",
      nationality: "Japan",
      period: "1939-1943",
      imageColor: "#7c2d12",
      image: playerImages["Isoroku Yamamoto"],
      bio: "Admiral Isoroku Yamamoto was the mastermind behind the Pearl Harbor attack. However, he warned Japanese leaders that they could not win a prolonged war with the United States. He was killed in 1943 when US fighter's shot down his plane.",
      achievements: [
        "Planned Pearl Harbor attack",
        "Commanded Japanese Combined Fleet",
        "Warned of US industrial superiority",
        "Killed in Operation Vengeance",
      ],
    },
  ],
  soviet: [
    {
      name: "Georgy Zhukov",
      title: "Marshal of the Soviet Union",
      nationality: "USSR",
      period: "1941-1945",
      imageColor: "#6b4423",
      image: playerImages["Georgy Zhukov"],
      bio: "Georgy Zhukov was the most celebrated Soviet commander of WWII. He saved Moscow from German capture and led the counteroffensive at Stalingrad. His brutal but effective methods代价高昂 but successful, earning him the title Hero of the Soviet Union four times.",
      achievements: [
        "Defended Moscow in 1941",
        "Planned counterattack at Stalingrad",
        "Led operations at Kursk and Berlin",
        "Accepted Berlin surrender",
      ],
    },
    {
      name: "Konstantin Rokossovsky",
      title: "Marshal of the Soviet Union",
      nationality: "USSR",
      period: "1941-1945",
      imageColor: "#6b4423",
      image: playerImages["Konstantin Rokossovsky"],
      bio: "Konstantin Rokossovsky was one of the finest Soviet commanders. He survived interrogation and near-execution during Stalin's purges to lead armored corps at Kursk and command fronts during the liberation of Poland and the final assault on Berlin.",
      achievements: [
        "Survived Stalin's purges to lead armies",
        "Commanded Steppe Front at Kursk",
        "Led operations in Operation Bagration",
        "Commanded Polish People's Army",
      ],
    },
  ],
};

export default function PlayersPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".player-card").forEach((card: any, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const categories = [
    { key: "allied", label: "Allied Supreme Commanders", color: "#1e4d8c", icon: MedalIcon },
    { key: "german", label: "German Military Leaders", color: "#8b0000", icon: SwordsIcon },
    { key: "japanese", label: "Japanese Commanders", color: "#7c2d12", icon: FlagIcon },
    { key: "soviet", label: "Soviet Commanders", color: "#6b4423", icon: BuildingIcon },
  ];

  return (
    <div style={{ paddingTop: "70px" }}>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)",
          padding: "6rem 2rem 4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 className="section-title" style={{ display: "block" }}>
            Major Players
          </h1>
          <p
            style={{
              color: "var(--cream)",
              maxWidth: "700px",
              margin: "0 auto",
              fontSize: "1.1rem",
            }}
          >
            Discover the commanders, leaders, and strategists who shaped the outcome of World War II. From supreme commanders to battlefield generals.
          </p>
        </div>
      </section>

      {/* Player Categories */}
      <section
        ref={containerRef}
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "4rem 2rem",
        }}
      >
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <div key={category.key} style={{ marginBottom: "5rem" }}>
              <h2
                style={{
                  color: category.color,
                  fontSize: "1.8rem",
                  marginBottom: "2rem",
                  fontFamily: "'Cinzel', serif",
                  paddingBottom: "0.5rem",
                  borderBottom: `2px solid ${category.color}`,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <IconComponent size={28} color={category.color} />
                {category.label}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                  gap: "2rem",
                }}
              >
                {players[category.key].map((player, index) => (
                  <div key={index} className="player-card">
                    <div
                      style={{
                        height: "280px",
                        background: `linear-gradient(135deg, ${player.imageColor}33, ${player.imageColor}11)`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                      }}>
                        <img 
                          src={player.image}
                          alt={player.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "top",
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(to bottom, transparent 40%, var(--bg-secondary))`,
                        }} />
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          top: "1rem",
                          right: "1rem",
                          background: "rgba(0, 0, 0, 0.7)",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "4px",
                          fontSize: "0.8rem",
                          color: "var(--cream)",
                          fontWeight: 600,
                        }}
                      >
                        {player.nationality}
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: "0.5rem",
                          background: "rgba(0, 0, 0, 0.7)",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "4px",
                          fontSize: "0.8rem",
                          color: category.color,
                          fontWeight: 600,
                        }}
                      >
                        {player.period}
                      </div>
                    </div>

                    <div className="player-info">
                      <h3 className="player-name">{player.name}</h3>
                      <p className="player-title">{player.title}</p>
                      <p className="player-bio" style={{ marginBottom: "1rem" }}>
                        {player.bio}
                      </p>
                      <div
                        style={{
                          background: "var(--bg-tertiary)",
                          padding: "1rem",
                          borderRadius: "6px",
                        }}
                      >
                        <h4
                          style={{
                            color: "var(--gold-amber)",
                            fontSize: "0.9rem",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Key Achievements
                        </h4>
                        <ul
                          style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                          }}
                        >
                          {player.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              style={{
                                color: "rgba(243, 229, 166, 0.8)",
                                fontSize: "0.85rem",
                                padding: "0.25rem 0",
                                paddingLeft: "1rem",
                                position: "relative",
                              }}
                            >
                              <span
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  color: category.color,
                                }}
                              >
                                ▸
                              </span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Quote Section */}
      <section
        style={{
          background: "var(--bg-secondary)",
          padding: "4rem 2rem",
          borderTop: "1px solid rgba(201, 162, 39, 0.2)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              fontSize: "1.5rem",
              fontStyle: "italic",
              color: "var(--cream)",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            }}
          >
            "In war, there are no winners, only survivors."
          </p>
          <p
            style={{
              color: "var(--gold-amber)",
              fontWeight: 600,
            }}
          >
            — Unknown Soldier
          </p>
        </div>
      </section>
    </div>
  );
}
