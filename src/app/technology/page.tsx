"use client";

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { TankIcon, PlaneIcon, ShipIcon, GunIcon, AnchorIcon, ChevronDown, ChevronUp } from "@/components/Icons";

interface TechItem {
  name: string;
  country: string;
  type: string;
  icon: any;
  specs: Record<string, string>;
  context: string;
  color: string;
  countryCode: string;
  image: string;
}

interface TechCategory {
  name: string;
  items: TechItem[];
}

const techImages: Record<string, string> = {
  // USA
  "M4 Sherman": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/M4_Sherman.jpg/800px-M4_Sherman.jpg",
  "M26 Pershing": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/M26_Pershing.jpg/800px-M26_Pershing.jpg",
  "P-51 Mustang": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/North_American_P-51D_Mustang.jpg/800px-North_American_P-51D_Mustang.jpg",
  "B-17 Flying Fortress": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/B-17_Flying_Fortress_in_flight.jpg/800px-B-17_Flying_Fortress_in_flight.jpg",
  "B-29 Superfortress": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/B-29_Superfortress_Bockscar.jpg/800px-B-29_Superfortress_Bockscar.jpg",
  "M1 Garand": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/M1_Garand_rifle.jpg/800px-M1_Garand_rifle.jpg",
  "USS Enterprise (CV-6)": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/USS_Enterprise_%28CV-6%29.jpg/800px-USS_Enterprise_%28CV-6%29.jpg",
  // Germany
  "Tiger I": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Panzerkampfwagen_VI_Ausf_E_Tiger_I.jpg/800px-Panzerkampfwagen_VI_Ausf_E_Tiger_I.jpg",
  "Panther": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Panzerkampfwagen_V_Ausf_D_Panther.jpg/800px-Panzerkampfwagen_V_Ausf_D_Panther.jpg",
  "Messerschmitt Bf 109": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Messerschmitt_Bf_109.jpg/800px-Messerschmitt_Bf_109.jpg",
  "Focke-Wulf Fw 190": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Fw190.jpg/800px-Fw190.jpg",
  "Bismarck": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Bismarck_battleship.jpg/800px-Bismarck_battleship.jpg",
  "MG42": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/MG42.jpg/800px-MG42.jpg",
  // UK
  "Churchill Tank": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Churchill_Mk_VII.jpg/800px-Churchill_Mk_VII.jpg",
  "Supermarine Spitfire": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Spitfire_1940.jpg/800px-Spitfire_1940.jpg",
  "Hawker Hurricane": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Hawker_Hurricane.jpg/800px-Hawker_Hurricane.jpg",
  // USSR
  "T-34": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/T-34_76_in_Kubinka.jpg/800px-T-34_76_in_Kubinka.jpg",
  "Ilyushin Il-2 Sturmovik": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Il-2_Sturmovik.jpg/800px-Il-2_Sturmovik.jpg",
  // Japan
  "Mitsubishi A6M Zero": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Mitsubishi_A6M3_Zero.jpg/800px-Mitsubishi_A6M3_Zero.jpg",
  "Yamato": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Yamatoanchor.jpg/800px-Yamatoanchor.jpg",
};

const techData: Record<string, TechCategory> = {
  usa: {
    name: "United States",
    items: [
      {
        name: "M4 Sherman",
        country: "USA",
        type: "Main Battle Tank",
        icon: TankIcon,
        specs: {
          "Weight": "33,000 kg",
          "Length": "5.84 m",
          "Crew": "5",
          "Armor": "76 mm",
          "Speed": "40 km/h",
          "Armament": "75mm gun",
        },
        context: "The M4 Sherman was the primary tank of the US Army during WWII, known for its reliability and ease of production. Over 49,000 were produced.",
        color: "#059669",
        countryCode: "USA",
        image: techImages["M4 Sherman"],
      },
      {
        name: "P-51 Mustang",
        country: "USA",
        type: "Fighter Aircraft",
        icon: PlaneIcon,
        specs: {
          "Crew": "1",
          "Wingspan": "11.28 m",
          "Speed": "703 km/h",
          "Range": "2,765 km",
          "Armament": "6x .50 cal MG",
        },
        context: "The P-51 Mustang is widely considered the best fighter aircraft of WWII. With drop tanks, Mustangs could escort bombers all the way to Berlin.",
        color: "#059669",
        countryCode: "USA",
        image: techImages["P-51 Mustang"],
      },
      {
        name: "B-29 Superfortress",
        country: "USA",
        type: "Strategic Bomber",
        icon: PlaneIcon,
        specs: {
          "Crew": "10-12",
          "Wingspan": "43.05 m",
          "Speed": "574 km/h",
          "Range": "6,230 km",
          "Bomb Load": "9,000 kg",
        },
        context: "The B-29 was the most advanced bomber of WWII, featuring pressurized crew compartments. It delivered the atomic bombs that ended the war against Japan.",
        color: "#059669",
        countryCode: "USA",
        image: techImages["B-29 Superfortress"],
      },
      {
        name: "M1 Garand",
        country: "USA",
        type: "Semi-Automatic Rifle",
        icon: GunIcon,
        specs: {
          "Caliber": ".30-06 Springfield",
          "Length": "1,100 mm",
          "Magazine": "8-round en-bloc",
          "Rate of Fire": "40-50 rpm",
        },
        context: "The M1 Garand was the standard service rifle of US infantry throughout WWII. General Patton called it 'the greatest battle implement ever devised.'",
        color: "#059669",
        countryCode: "USA",
        image: techImages["M1 Garand"],
      },
    ],
  },
  germany: {
    name: "Germany",
    items: [
      {
        name: "Tiger I",
        country: "Germany",
        type: "Heavy Tank",
        icon: TankIcon,
        specs: {
          "Weight": "56,900 kg",
          "Armor": "100 mm",
          "Speed": "38 km/h",
          "Armament": "88mm KwK 36 gun",
          "Engine": "V12 gasoline",
        },
        context: "The Tiger I was the most feared German tank, with its powerful 88mm gun and thick armor. However, its mechanical unreliability made it a logistics nightmare.",
        color: "#8b0000",
        countryCode: "GER",
        image: techImages["Tiger I"],
      },
      {
        name: "Panther",
        country: "Germany",
        type: "Medium Tank",
        icon: TankIcon,
        specs: {
          "Weight": "44,800 kg",
          "Armor": "80 mm (sloped)",
          "Speed": "46 km/h",
          "Armament": "75mm KwK 42 gun",
        },
        context: "The Panther was designed specifically to counter the Soviet T-34. Its sloped armor and excellent 75mm gun made it highly effective.",
        color: "#8b0000",
        countryCode: "GER",
        image: techImages["Panther"],
      },
      {
        name: "Messerschmitt Bf 109",
        country: "Germany",
        type: "Fighter Aircraft",
        icon: PlaneIcon,
        specs: {
          "Crew": "1",
          "Speed": "623 km/h",
          "Range": "850 km",
          "Armament": "2x 13mm MG, 1x 20mm MG",
        },
        context: "The Bf 109 was the standard German fighter throughout WWII, achieving more aerial victories than any other aircraft.",
        color: "#8b0000",
        countryCode: "GER",
        image: techImages["Messerschmitt Bf 109"],
      },
      {
        name: "MG42",
        country: "Germany",
        type: "General Purpose Machine Gun",
        icon: GunIcon,
        specs: {
          "Caliber": "7.92×57mm Mauser",
          "Rate of Fire": "1,200 rpm",
          "Effective Range": "800 m",
          "Weight": "11.5 kg",
        },
        context: "The MG42 was one of the most feared weapons of WWII, with its distinctive tearing cloth sound. Its incredible rate of fire provided devastating suppressive fire.",
        color: "#8b0000",
        countryCode: "GER",
        image: techImages["MG42"],
      },
    ],
  },
  uk: {
    name: "United Kingdom",
    items: [
      {
        name: "Churchill Tank",
        country: "UK",
        type: "Infantry Tank",
        icon: TankIcon,
        specs: {
          "Weight": "38,500 kg",
          "Armor": "102 mm",
          "Speed": "24 km/h",
          "Armament": "6-pounder gun",
        },
        context: "The Churchill tank was named after Prime Minister Winston Churchill. Its thick armor and ability to climb steep obstacles made it invaluable in Northwest Europe.",
        color: "#1e4d8c",
        countryCode: "UK",
        image: techImages["Churchill Tank"],
      },
      {
        name: "Supermarine Spitfire",
        country: "UK",
        type: "Fighter Aircraft",
        icon: PlaneIcon,
        specs: {
          "Crew": "1",
          "Wingspan": "11.23 m",
          "Speed": "595 km/h",
          "Range": "760 km",
          "Armament": "8x .303 cal MG",
        },
        context: "The Spitfire is perhaps the most famous fighter aircraft of all time. It played a crucial role in the Battle of Britain with its exceptional maneuverability.",
        color: "#1e4d8c",
        countryCode: "UK",
        image: techImages["Supermarine Spitfire"],
      },
    ],
  },
  ussr: {
    name: "Soviet Union",
    items: [
      {
        name: "T-34",
        country: "USSR",
        type: "Medium Tank",
        icon: TankIcon,
        specs: {
          "Weight": "26,500 kg",
          "Armor": "45-60 mm (sloped)",
          "Speed": "53 km/h",
          "Armament": "76.2mm F-34 gun",
        },
        context: "The T-34 was arguably the best tank of WWII, combining firepower, protection, and mobility. Its sloped armor influenced post-war tank development worldwide.",
        color: "#6b4423",
        countryCode: "USSR",
        image: techImages["T-34"],
      },
      {
        name: "Ilyushin Il-2 Sturmovik",
        country: "USSR",
        type: "Ground Attack Aircraft",
        icon: PlaneIcon,
        specs: {
          "Crew": "2",
          "Speed": "414 km/h",
          "Range": "660 km",
          "Armament": "2x 23mm cannons",
        },
        context: "The Il-2 was the most produced aircraft in history with over 36,000 built. Its armored hull made it resistant to small arms fire.",
        color: "#6b4423",
        countryCode: "USSR",
        image: techImages["Ilyushin Il-2 Sturmovik"],
      },
    ],
  },
  japan: {
    name: "Japan",
    items: [
      {
        name: "Mitsubishi A6M Zero",
        country: "Japan",
        type: "Carrier-Based Fighter",
        icon: PlaneIcon,
        specs: {
          "Crew": "1",
          "Speed": "565 km/h",
          "Range": "1,870 km",
          "Armament": "2x 20mm cannons",
        },
        context: "The Zero was the iconic Japanese fighter of WWII, dominating the Pacific in 1941-42. Its exceptional range and maneuverability made it superior to early Allied fighters.",
        color: "#7c2d12",
        countryCode: "JPN",
        image: techImages["Mitsubishi A6M Zero"],
      },
      {
        name: "Yamato",
        country: "Japan",
        type: "Battleship",
        icon: AnchorIcon,
        specs: {
          "Displacement": "71,659 tons",
          "Length": "263 m",
          "Main Armament": "9x 18.1-inch guns",
          "Armor": "410 mm belt",
        },
        context: "Yamato was the largest battleship ever built, with guns larger than any other. However, she was sunk by US carrier aircraft before firing her main batteries.",
        color: "#7c2d12",
        countryCode: "JPN",
        image: techImages["Yamato"],
      },
    ],
  },
};

// Simple 3D Viewer Component
function ModelViewer({ item }: { item: TechItem }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xc9a227, 0.4);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);

    let geometry: THREE.BufferGeometry;
    const color = new THREE.Color(item.color);

    if (item.type.includes("Tank")) {
      const bodyGeo = new THREE.BoxGeometry(2, 0.6, 1.2);
      const turretGeo = new THREE.BoxGeometry(0.8, 0.4, 0.7);
      const barrelGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 16);

      const bodyMat = new THREE.MeshPhongMaterial({ color });
      const turretMat = new THREE.MeshPhongMaterial({ color: color.clone().multiplyScalar(0.8) });
      const barrelMat = new THREE.MeshPhongMaterial({ color: 0x333333 });

      const body = new THREE.Mesh(bodyGeo, bodyMat);
      const turret = new THREE.Mesh(turretGeo, turretMat);
      turret.position.y = 0.5;
      const barrel = new THREE.Mesh(barrelGeo, barrelMat);
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(0, 0.5, 0.6);

      const group = new THREE.Group();
      group.add(body);
      group.add(turret);
      group.add(barrel);
      meshRef.current = group as any;
      scene.add(group);
    } else if (item.type.includes("Fighter") || item.type.includes("Bomber") || item.type.includes("Aircraft") || item.type.includes("Sturmovik")) {
      const bodyGeo = new THREE.ConeGeometry(0.3, 2, 8);
      const wingGeo = new THREE.BoxGeometry(2.5, 0.05, 0.6);
      const tailGeo = new THREE.BoxGeometry(0.6, 0.05, 0.3);

      const bodyMat = new THREE.MeshPhongMaterial({ color });
      const wingMat = new THREE.MeshPhongMaterial({ color: color.clone().multiplyScalar(0.9) });

      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.rotation.x = Math.PI / 2;
      const wing = new THREE.Mesh(wingGeo, wingMat);
      wing.position.z = -0.3;
      const tail = new THREE.Mesh(tailGeo, wingMat);
      tail.position.z = -0.9;
      tail.position.y = 0.15;

      const group = new THREE.Group();
      group.add(body);
      group.add(wing);
      group.add(tail);
      meshRef.current = group as any;
      scene.add(group);
    } else if (item.type.includes("Battleship") || item.type.includes("Carrier")) {
      const hullGeo = new THREE.BoxGeometry(3, 0.5, 0.8);
      const deckGeo = new THREE.BoxGeometry(2.5, 0.15, 0.6);
      const towerGeo = new THREE.BoxGeometry(0.3, 0.5, 0.3);

      const hullMat = new THREE.MeshPhongMaterial({ color });
      const deckMat = new THREE.MeshPhongMaterial({ color: color.clone().multiplyScalar(0.7) });

      const hull = new THREE.Mesh(hullGeo, hullMat);
      const deck = new THREE.Mesh(deckGeo, deckMat);
      deck.position.y = 0.35;
      const tower = new THREE.Mesh(towerGeo, deckMat);
      tower.position.set(0.5, 0.6, 0);

      const group = new THREE.Group();
      group.add(hull);
      group.add(deck);
      group.add(tower);
      meshRef.current = group as any;
      scene.add(group);
    } else {
      const bodyGeo = new THREE.BoxGeometry(0.15, 0.15, 1.2);
      const stockGeo = new THREE.BoxGeometry(0.12, 0.12, 0.4);
      const barrelGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8);

      const bodyMat = new THREE.MeshPhongMaterial({ color });
      const barrelMat = new THREE.MeshPhongMaterial({ color: 0x333333 });

      const body = new THREE.Mesh(bodyGeo, bodyMat);
      const stock = new THREE.Mesh(stockGeo, bodyMat);
      stock.position.z = 0.7;
      const barrel = new THREE.Mesh(barrelGeo, barrelMat);
      barrel.rotation.x = Math.PI / 2;
      barrel.position.z = -0.8;

      const group = new THREE.Group();
      group.add(body);
      group.add(stock);
      group.add(barrel);
      meshRef.current = group as any;
      scene.add(group);
    }

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01;
        meshRef.current.rotation.x += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [item]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!meshRef.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    meshRef.current.rotation.y = x * 0.5;
    meshRef.current.rotation.x = y * 0.3;
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "200px",
        cursor: "grab",
      }}
      onMouseMove={handleMouseMove}
    />
  );
}

export default function TechnologyPage() {
  const [activeCountry, setActiveCountry] = useState("usa");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tech-section", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const currentData = techData[activeCountry];

  return (
    <div style={{ paddingTop: "70px" }} ref={containerRef}>
      {/* Hero */}
      <section
        className="tech-section"
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
            backgroundImage: "url('https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 className="section-title" style={{ display: "block" }}>
            Technology of War
          </h1>
          <p
            style={{
              color: "var(--cream)",
              maxWidth: "700px",
              margin: "0 auto",
              fontSize: "1.1rem",
              opacity: 0.9,
            }}
          >
            Explore the weapons, vehicles, and equipment that defined World War II. Interact with 3D models and discover the specifications of history's most advanced military technology.
          </p>
        </div>
      </section>

      {/* Country Selector */}
      <section
        className="tech-section"
        style={{
          background: "var(--bg-secondary)",
          padding: "2rem",
          borderBottom: "1px solid rgba(201, 162, 39, 0.2)",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {Object.entries(techData).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setActiveCountry(key)}
              style={{
                background: activeCountry === key ? "var(--gold-amber)" : "transparent",
                color: activeCountry === key ? "var(--bg-primary)" : "var(--cream)",
                border: "1px solid rgba(201, 162, 39, 0.3)",
                padding: "0.75rem 1.5rem",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: 600,
                transition: "all 0.3s ease",
                fontSize: "0.9rem",
              }}
            >
              {data.name}
            </button>
          ))}
        </div>
      </section>

      {/* Tech Grid */}
      <section
        className="tech-section"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "4rem 2rem",
        }}
      >
        <h2
          style={{
            color: "var(--gold-amber)",
            marginBottom: "2rem",
            fontFamily: "'Cinzel', serif",
          }}
        >
          {currentData.name} Equipment
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "2rem",
          }}
        >
          {currentData.items.map((item, index) => {
            const IconComponent = item.icon;
            const isExpanded = expandedItem === item.name;
            
            return (
              <div
                key={index}
                className="tech-card"
                style={{
                  cursor: "pointer",
                  borderColor: isExpanded ? "var(--gold-amber)" : "rgba(201, 162, 39, 0.2)",
                }}
              >
                <div
                  style={{
                    height: "200px",
                    background: "linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <ModelViewer item={item} />
                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      background: "rgba(0, 0, 0, 0.7)",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      color: "var(--gold-amber)",
                      fontWeight: 600,
                    }}
                  >
                    {item.countryCode}
                  </div>
                </div>

                <div style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "rgba(201, 162, 39, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <IconComponent size={20} color="var(--gold-amber)" />
                    </div>
                    <div>
                      <h3
                        style={{
                          color: "var(--gold-amber)",
                          fontSize: "1.2rem",
                          fontFamily: "'Cinzel', serif",
                        }}
                      >
                        {item.name}
                      </h3>
                      <p
                        style={{
                          color: "rgba(243, 229, 166, 0.7)",
                          fontSize: "0.8rem",
                        }}
                      >
                        {item.type}
                      </p>
                    </div>
                  </div>

                  {/* Historical Image */}
                  <div style={{
                    width: "100%",
                    height: "150px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    marginBottom: "1rem",
                    position: "relative",
                  }}>
                    <img 
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => setExpandedItem(isExpanded ? null : item.name)}
                    style={{
                      width: "100%",
                      background: "rgba(201, 162, 39, 0.1)",
                      border: "1px solid rgba(201, 162, 39, 0.3)",
                      borderRadius: "4px",
                      padding: "0.5rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      color: "var(--gold-amber)",
                      fontSize: "0.85rem",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {isExpanded ? (
                      <>Collapse <ChevronUp size={16} /></>
                    ) : (
                      <>View Specifications <ChevronDown size={16} /></>
                    )}
                  </button>

                  {isExpanded && (
                    <div style={{ marginTop: "1rem" }}>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "0.25rem",
                          marginBottom: "1rem",
                        }}
                      >
                        {Object.entries(item.specs).slice(0, 6).map(([key, value], i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "0.25rem 0",
                              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                              fontSize: "0.8rem",
                            }}
                          >
                            <span style={{ color: "rgba(243, 229, 166, 0.7)" }}>{key}</span>
                            <span style={{ color: "var(--gold-amber)", fontWeight: 500 }}>
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <p
                        style={{
                          color: "rgba(243, 229, 166, 0.8)",
                          fontSize: "0.85rem",
                          lineHeight: 1.7,
                          paddingTop: "1rem",
                          borderTop: "1px solid rgba(201, 162, 39, 0.2)",
                        }}
                      >
                        {item.context}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          background: "var(--bg-secondary)",
          padding: "4rem 2rem",
          borderTop: "1px solid rgba(201, 162, 39, 0.2)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              color: "var(--gold-amber)",
              textAlign: "center",
              marginBottom: "3rem",
              fontFamily: "'Cinzel', serif",
            }}
          >
            Production Statistics
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            {[
              { country: "USA", tanks: "88,140", aircraft: "300,000+", ships: "6,768" },
              { country: "Germany", tanks: "46,000+", aircraft: "140,000+", ships: "2,000+" },
              { country: "USSR", tanks: "84,000+", aircraft: "157,000+", ships: "1,000+" },
              { country: "UK", tanks: "28,000+", aircraft: "131,000+", ships: "6,000+" },
              { country: "Japan", tanks: "5,000+", aircraft: "76,000+", ships: "1,500+" },
            ].map((stat, i) => (
              <div
                key={i}
                className="stat-card"
              >
                <h3 style={{ color: "var(--gold-amber)", marginBottom: "1rem", fontSize: "1.1rem" }}>
                  {stat.country}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div>
                    <span style={{ color: "rgba(243, 229, 166, 0.7)", fontSize: "0.85rem" }}>Tanks</span>
                    <p style={{ color: "var(--cream)", fontWeight: 600 }}>{stat.tanks}</p>
                  </div>
                  <div>
                    <span style={{ color: "rgba(243, 229, 166, 0.7)", fontSize: "0.85rem" }}>Aircraft</span>
                    <p style={{ color: "var(--cream)", fontWeight: 600 }}>{stat.aircraft}</p>
                  </div>
                  <div>
                    <span style={{ color: "rgba(243, 229, 166, 0.7)", fontSize: "0.85rem" }}>Ships</span>
                    <p style={{ color: "var(--cream)", fontWeight: 600 }}>{stat.ships}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
