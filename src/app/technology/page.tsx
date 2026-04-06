"use client";

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface TechItem {
  name: string;
  country: string;
  type: string;
  icon: string;
  specs: Record<string, string>;
  context: string;
  color: string;
  countryCode: string;
}

interface TechCategory {
  name: string;
  items: TechItem[];
}

const techData: Record<string, TechCategory> = {
  usa: {
    name: "United States",
    items: [
      {
        name: "M4 Sherman",
        country: "USA",
        type: "Main Battle Tank",
        icon: "🔩",
        specs: {
          "Weight": "33,000 kg",
          "Length": "5.84 m",
          "Width": "2.64 m",
          "Crew": "5",
          "Armor": "76 mm",
          "Speed": "40 km/h",
          "Range": "193 km",
          "Armament": "75mm gun, 2x .30 cal MG",
          "Engine": "Continental R975 9-cylinder",
          "Power": "350 hp",
        },
        context: "The M4 Sherman was the primary tank of the US Army during WWII, known for its reliability and ease of production. Over 49,000 were produced, making it one of the most produced tanks of the era. Despite being outgunned by German Panthers and Tigers, the Sherman's numerical superiority and reliability contributed significantly to Allied victories.",
        color: "#059669",
        countryCode: "🇺🇸",
      },
      {
        name: "M26 Pershing",
        country: "USA",
        type: "Heavy Tank",
        icon: "🔩",
        specs: {
          "Weight": "41,900 kg",
          "Length": "6.65 m",
          "Width": "3.05 m",
          "Crew": "5",
          "Armor": "102 mm",
          "Speed": "35 km/h",
          "Range": "161 km",
          "Armament": "90mm gun, 2x .30 cal MG",
          "Engine": "Ford GAA V8",
          "Power": "500 hp",
        },
        context: "The M26 Pershing was the US response to German Tiger tanks, featuring a powerful 90mm gun and thicker armor. It saw limited combat in WWII but proved more than a match for Panther and Tiger tanks. Only about 200 were deployed to Europe before V-E Day.",
        color: "#059669",
        countryCode: "🇺🇸",
      },
      {
        name: "P-51 Mustang",
        country: "USA",
        type: "Fighter Aircraft",
        icon: "✈️",
        specs: {
          "Crew": "1",
          "Length": "9.83 m",
          "Wingspan": "11.28 m",
          "Speed": "703 km/h",
          "Range": "2,765 km",
          "Ceiling": "12,700 m",
          "Armament": "6x .50 cal MG",
          "Engine": "Packard V-1650",
          "Power": "1,490 hp",
          "First Flight": "1942",
        },
        context: "The P-51 Mustang is widely considered the best fighter aircraft of WWII. Its laminar flow wing design and supercharger gave it excellent performance at high altitude. With drop tanks, Mustangs could escort bombers all the way to Berlin, achieving air superiority over Germany.",
        color: "#059669",
        countryCode: "🇺🇸",
      },
      {
        name: "B-17 Flying Fortress",
        country: "USA",
        type: "Heavy Bomber",
        icon: "✈️",
        specs: {
          "Crew": "10",
          "Length": "22.66 m",
          "Wingspan": "31.62 m",
          "Speed": "462 km/h",
          "Range": "2,980 km",
          "Ceiling": "10,850 m",
          "Armament": "13x .50 cal MG",
          "Bomb Load": "7,985 kg",
          "Engine": "4x Wright R-1820",
          "Power": "4,800 hp total",
        },
        context: "The B-17 was the backbone of USAAF daylight bombing campaigns over Europe. Its heavy defensive armament and sturdy construction allowed it to absorb significant damage. The 'Flying Fortress' designation came from its numerous machine guns protecting against fighter attacks.",
        color: "#059669",
        countryCode: "🇺🇸",
      },
      {
        name: "B-29 Superfortress",
        country: "USA",
        type: "Strategic Bomber",
        icon: "✈️",
        specs: {
          "Crew": "10-12",
          "Length": "30.18 m",
          "Wingspan": "43.05 m",
          "Speed": "574 km/h",
          "Range": "6,230 km",
          "Ceiling": "9,600 m",
          "Armament": "4x .50 cal MG",
          "Bomb Load": "9,000 kg",
          "Engine": "4x Wright R-1820",
          "Power": "8,800 hp total",
        },
        context: "The B-29 was the most advanced bomber of WWII, featuring pressurized crew compartments and a sophisticated fire control system. It delivered the atomic bombs that ended the war against Japan and represented the dawn of nuclear warfare.",
        color: "#059669",
        countryCode: "🇺🇸",
      },
      {
        name: "USS Enterprise (CV-6)",
        country: "USA",
        type: "Aircraft Carrier",
        icon: "⚓",
        specs: {
          "Displacement": "25,600 tons",
          "Length": "251 m",
          "Beam": "33 m",
          "Speed": "32.5 knots",
          "Range": "12,000 nm",
          "Crew": "2,258",
          "Aircraft": "90-100",
          "Armament": "8x 5-inch guns",
          "Commissioned": "1938",
        },
        context: "USS Enterprise was the most celebrated US warship of WWII, earning 20 battle stars. She fought in every major Pacific campaign from Pearl Harbor to Okinawa, becoming the most decorated ship in US Navy history.",
        color: "#059669",
        countryCode: "🇺🇸",
      },
      {
        name: "Iowa-class Battleship",
        country: "USA",
        type: "Battleship",
        icon: "⚓",
        specs: {
          "Displacement": "45,000 tons",
          "Length": "270 m",
          "Beam": "33 m",
          "Speed": "33 knots",
          "Range": "14,900 nm",
          "Crew": "2,700",
          "Main Armament": "9x 16-inch guns",
          "Secondary": "20x 5-inch guns",
          "Commissioned": "1943",
        },
        context: "Iowa-class battleships were the largest and most powerful ever built by the US. They provided fire support for amphibious landings and served as flagships for carrier task forces. Four ships were built: Iowa, New Jersey, Missouri, and Wisconsin.",
        color: "#059669",
        countryCode: "🇺🇸",
      },
      {
        name: "M1 Garand",
        country: "USA",
        type: "Semi-Automatic Rifle",
        icon: "🔫",
        specs: {
          "Caliber": ".30-06 Springfield",
          "Action": "Gas-operated",
          "Length": "1,100 mm",
          "Weight": "4.3 kg",
          "Magazine": "8-round en-bloc",
          "Effective Range": "460 m",
          "Rate of Fire": "40-50 rpm",
          "Muzzle Velocity": "865 m/s",
        },
        context: "The M1 Garand was the standard service rifle of US infantry throughout WWII. Its semi-automatic action gave American soldiers a significant advantage over enemies armed with bolt-action rifles. General Patton called it 'the greatest battle implement ever devised.'",
        color: "#059669",
        countryCode: "🇺🇸",
      },
      {
        name: "Thompson Submachine Gun",
        country: "USA",
        type: "Submachine Gun",
        icon: "🔫",
        specs: {
          "Caliber": ".45 ACP",
          "Action": "Blowback",
          "Length": "850 mm",
          "Weight": "4.9 kg",
          "Magazine": "20 or 30-round box",
          "Effective Range": "50 m",
          "Rate of Fire": "600-700 rpm",
          "Muzzle Velocity": "280 m/s",
        },
        context: "The Thompson was the classic American submachine gun of WWII, recognizable by its drum magazine and pistol grip. Used by US forces and Allied nations, it became a symbol of the American soldier. It was famously used by gangsters in the Prohibition era.",
        color: "#059669",
        countryCode: "🇺🇸",
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
        icon: "🔩",
        specs: {
          "Weight": "38,500 kg",
          "Length": "7.44 m",
          "Width": "3.25 m",
          "Crew": "5",
          "Armor": "102 mm",
          "Speed": "24 km/h",
          "Range": "90 km",
          "Armament": "6-pounder gun, MG",
          "Engine": "V12 gasoline",
          "Power": "350 hp",
        },
        context: "The Churchill tank was named after Prime Minister Winston Churchill. Its thick armor and ability to climb steep obstacles made it invaluable in the rugged terrain of Northwest Europe. The Churchill saw action from North Africa to the Normandy beaches.",
        color: "#1e4d8c",
        countryCode: "🇬🇧",
      },
      {
        name: "Matilda II",
        country: "UK",
        type: "Infantry Tank",
        icon: "🔩",
        specs: {
          "Weight": "26,900 kg",
          "Length": "5.61 m",
          "Width": "2.74 m",
          "Crew": "4",
          "Armor": "78 mm",
          "Speed": "26 km/h",
          "Range": "160 km",
          "Armament": "2-pounder gun, MG",
          "Engine": "Diesel V8",
          "Power": "190 hp",
        },
        context: "The Matilda II was the backbone of British tank forces in North Africa, earning the nickname 'Queen of the Desert.' Its heavy armor for its time made it nearly immune to Italian anti-tank guns. It remained in service throughout the war.",
        color: "#1e4d8c",
        countryCode: "🇬🇧",
      },
      {
        name: "Supermarine Spitfire",
        country: "UK",
        type: "Fighter Aircraft",
        icon: "✈️",
        specs: {
          "Crew": "1",
          "Length": "9.12 m",
          "Wingspan": "11.23 m",
          "Speed": "595 km/h",
          "Range": "760 km",
          "Ceiling": "11,300 m",
          "Armament": "8x .303 cal MG",
          "Engine": "Rolls-Royce Merlin",
          "Power": "1,470 hp",
          "First Flight": "1936",
        },
        context: "The Spitfire is perhaps the most famous fighter aircraft of all time. It played a crucial role in the Battle of Britain, where RAF pilots used it to defend against the Luftwaffe. Its elliptical wings gave it exceptional maneuverability.",
        color: "#1e4d8c",
        countryCode: "🇬🇧",
      },
      {
        name: "Hawker Hurricane",
        country: "UK",
        type: "Fighter/Bomber",
        icon: "✈️",
        specs: {
          "Crew": "1",
          "Length": "9.84 m",
          "Wingspan": "12.19 m",
          "Speed": "547 km/h",
          "Range": "980 km",
          "Ceiling": "10,000 m",
          "Armament": "8x .303 cal MG",
          "Engine": "Merlin XX",
          "Power": "1,280 hp",
        },
        context: "While the Spitfire gets more fame, the Hurricane destroyed more enemy aircraft during the Battle of Britain. Its rugged construction and steady handling made it a reliable workhorse throughout the war.",
        color: "#1e4d8c",
        countryCode: "🇬🇧",
      },
      {
        name: "HMS Belfast",
        country: "UK",
        type: "Cruiser",
        icon: "⚓",
        specs: {
          "Displacement": "11,550 tons",
          "Length": "187 m",
          "Beam": "21 m",
          "Speed": "32 knots",
          "Range": "8,000 nm",
          "Crew": "850",
          "Armament": "12x 6-inch guns",
          "Aircraft": "4x seaplanes",
          "Commissioned": "1939",
        },
        context: "HMS Belfast is now a museum ship in London. She was the most powerful light cruiser ever built for the Royal Navy and played a key role in the Battle of North Cape, where she helped sink the German cruiser Scharnhorst.",
        color: "#1e4d8c",
        countryCode: "🇬🇧",
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
        icon: "🔩",
        specs: {
          "Weight": "56,900 kg",
          "Length": "8.45 m",
          "Width": "3.55 m",
          "Crew": "5",
          "Armor": "100 mm",
          "Speed": "38 km/h",
          "Range": "100 km",
          "Armament": "88mm KwK 36 gun",
          "Engine": "V12 gasoline",
          "Power": "700 hp",
        },
        context: "The Tiger I was the most feared German tank, with its powerful 88mm gun and thick armor. However, its mechanical unreliability and fuel consumption made it a logistics nightmare. Allied forces often avoided engaging Tigers directly.",
        color: "#8b0000",
        countryCode: "🇩🇪",
      },
      {
        name: "Panther",
        country: "Germany",
        type: "Medium Tank",
        icon: "🔩",
        specs: {
          "Weight": "44,800 kg",
          "Length": "6.87 m",
          "Width": "3.27 m",
          "Crew": "5",
          "Armor": "80 mm",
          "Speed": "46 km/h",
          "Range": "177 km",
          "Armament": "75mm KwK 42 gun",
          "Engine": "V12 diesel",
          "Power": "700 hp",
        },
        context: "The Panther was designed specifically to counter the Soviet T-34. Its斜面 armor and excellent 75mm gun made it highly effective. However, early models suffered from transmission failures until improvements were made in 1944.",
        color: "#8b0000",
        countryCode: "🇩🇪",
      },
      {
        name: "Panzerkampfwagen IV",
        country: "Germany",
        type: "Medium Tank",
        icon: "🔩",
        specs: {
          "Weight": "25,000 kg",
          "Length": "5.92 m",
          "Width": "2.88 m",
          "Crew": "5",
          "Armor": "80 mm",
          "Speed": "38 km/h",
          "Range": "200 km",
          "Armament": "75mm KwK 40 gun",
          "Engine": "V12 gasoline",
          "Power": "300 hp",
        },
        context: "The Pzkw IV was the most produced German tank and the backbone of Panzer divisions. It continuously upgraded throughout the war, surviving to be used by several nations after 1945.",
        color: "#8b0000",
        countryCode: "🇩🇪",
      },
      {
        name: "Messerschmitt Bf 109",
        country: "Germany",
        type: "Fighter Aircraft",
        icon: "✈️",
        specs: {
          "Crew": "1",
          "Length": "8.86 m",
          "Wingspan": "9.87 m",
          "Speed": "623 km/h",
          "Range": "850 km",
          "Ceiling": "12,000 m",
          "Armament": "2x 13mm MG, 1x 20mm MG",
          "Engine": "Daimler-Benz DB 605",
          "Power": "1,476 hp",
        },
        context: "The Bf 109 was the standard German fighter throughout WWII, achieving more aerial victories than any other aircraft. Despite being surpassed by later Allied designs, it remained competitive due to skilled pilots and effective tactics.",
        color: "#8b0000",
        countryCode: "🇩🇪",
      },
      {
        name: "Focke-Wulf Fw 190",
        country: "Germany",
        type: "Fighter/Bomber",
        icon: "✈️",
        specs: {
          "Crew": "1",
          "Length": "10.51 m",
          "Wingspan": "10.51 m",
          "Speed": "650 km/h",
          "Range": "800 km",
          "Ceiling": "11,400 m",
          "Armament": "4x 20mm MG",
          "Engine": "BMW 801 radial",
          "Power": "1,700 hp",
        },
        context: "The Fw 190 was Germany's best fighter by late 1943, outperforming the Bf 109 at most altitudes. Its radial engine made it more robust than the Merlin-powered Allied fighters it faced.",
        color: "#8b0000",
        countryCode: "🇩🇪",
      },
      {
        name: "Junkers Ju 87 (Stuka)",
        country: "Germany",
        type: "Dive Bomber",
        icon: "✈️",
        specs: {
          "Crew": "2",
          "Length": "11.1 m",
          "Wingspan": "13.8 m",
          "Speed": "410 km/h",
          "Range": "600 km",
          "Ceiling": "7,300 m",
          "Armament": "3,700 kg bombs",
          "Engine": "Jumo 211",
          "Power": "1,200 hp",
        },
        context: "The Stuka was the symbol of blitzkrieg, with its distinctive inverted gull wings and Jericho Trumpet siren. Its precision dive-bombing capability made it devastating against ground targets, though vulnerable to fighters.",
        color: "#8b0000",
        countryCode: "🇩🇪",
      },
      {
        name: "Bismarck",
        country: "Germany",
        type: "Battleship",
        icon: "⚓",
        specs: {
          "Displacement": "50,300 tons",
          "Length": "251 m",
          "Beam": "36 m",
          "Speed": "30 knots",
          "Range": "16,000 nm",
          "Crew": "2,200",
          "Main Armament": "8x 15-inch guns",
          "Armor": "320 mm belt",
          "Commissioned": "1940",
        },
        context: "Bismarck was the most famous German battleship, sinking HMS Hood in a legendary engagement before being hunted down by the Royal Navy. Her brief career demonstrated the futility of surface raiders against overwhelming Allied naval power.",
        color: "#8b0000",
        countryCode: "🇩🇪",
      },
      {
        name: "Type IX U-boat",
        country: "Germany",
        type: "Submarine",
        icon: "⚓",
        specs: {
          "Displacement": "1,120 tons",
          "Length": "76.8 m",
          "Beam": "6.8 m",
          "Speed": "18 knots",
          "Range": "23,700 nm",
          "Crew": "55",
          "Torpedoes": "24",
          "Deck Gun": "10.5 cm",
          "Commissioned": "1939",
        },
        context: "Type IX U-boats were ocean-going submarines that ravaged Allied shipping in the Atlantic. They sank millions of tons of shipping until the Allies developed effective convoy systems and anti-submarine weapons.",
        color: "#8b0000",
        countryCode: "🇩🇪",
      },
      {
        name: "MG42",
        country: "Germany",
        type: "General Purpose Machine Gun",
        icon: "🔫",
        specs: {
          "Caliber": "7.92×57mm Mauser",
          "Action": "Recoil-operated",
          "Length": "1,220 mm",
          "Weight": "11.5 kg",
          "Magazine": "50-round belt",
          "Effective Range": "800 m",
          "Rate of Fire": "1,200 rpm",
          "Muzzle Velocity": "755 m/s",
        },
        context: "The MG42 was one of the most feared weapons of WWII, with its distinctive tearing cloth sound. Its incredible rate of fire of 1,200 rounds per minute provided devastating suppressive fire. The design was later used in the postwar MG3.",
        color: "#8b0000",
        countryCode: "🇩🇪",
      },
      {
        name: "Walther P38",
        country: "Germany",
        type: "Pistol",
        icon: "🔫",
        specs: {
          "Caliber": "9×19mm Parabellum",
          "Action": "Recoil-operated",
          "Length": "216 mm",
          "Weight": "0.9 kg",
          "Magazine": "8-round double-stack",
          "Effective Range": "50 m",
          "Muzzle Velocity": "351 m/s",
        },
        context: "The Walther P38 was the standard service pistol of German military and police forces. It featured a double-action trigger and external hammer, making it more practical than the P08 Luger it replaced.",
        color: "#8b0000",
        countryCode: "🇩🇪",
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
        icon: "🔩",
        specs: {
          "Weight": "26,500 kg",
          "Length": "5.92 m",
          "Width": "3.00 m",
          "Crew": "4",
          "Armor": "45-60 mm (sloped)",
          "Speed": "53 km/h",
          "Range": "300 km",
          "Armament": "76.2mm F-34 gun",
          "Engine": "V-2-34 V12 diesel",
          "Power": "500 hp",
        },
        context: "The T-34 was arguably the best tank of WWII, combining firepower, protection, and mobility. Its sloped armor and wide tracks made it highly effective. The T-34's design influenced post-war tank development worldwide.",
        color: "#6b4423",
        countryCode: "🇷🇺",
      },
      {
        name: "KV-1",
        country: "USSR",
        type: "Heavy Tank",
        icon: "🔩",
        specs: {
          "Weight": "47,000 kg",
          "Length": "6.75 m",
          "Width": "3.25 m",
          "Crew": "5",
          "Armor": "75-90 mm",
          "Speed": "34 km/h",
          "Range": "140 km",
          "Armament": "76.2mm gun",
          "Engine": "V-2K V12 diesel",
          "Power": "600 hp",
        },
        context: "The KV-1 was a breakthrough heavy tank that shocked German forces in 1941. Its thick armor made it nearly immune to early anti-tank weapons. The design evolved into the IS heavy tank series.",
        color: "#6b4423",
        countryCode: "🇷🇺",
      },
      {
        name: "Ilyushin Il-2 Sturmovik",
        country: "USSR",
        type: "Ground Attack Aircraft",
        icon: "✈️",
        specs: {
          "Crew": "2",
          "Length": "11.6 m",
          "Wingspan": "14.6 m",
          "Speed": "414 km/h",
          "Range": "660 km",
          "Ceiling": "5,500 m",
          "Armament": "2x 23mm cannons, rockets",
          "Armor": "Protective plating",
        },
        context: "The Il-2 was the most produced aircraft in history with over 36,000 built. Its armored hull made it resistant to small arms fire, allowing it to operate at low altitude to attack ground targets. It earned the nickname 'Flying Tank.'",
        color: "#6b4423",
        countryCode: "🇷🇺",
      },
      {
        name: "Lavochkin La-5",
        country: "USSR",
        type: "Fighter Aircraft",
        icon: "✈️",
        specs: {
          "Crew": "1",
          "Length": "8.67 m",
          "Wingspan": "9.8 m",
          "Speed": "580 km/h",
          "Range": "900 km",
          "Ceiling": "10,000 m",
          "Armament": "2x 20mm cannons",
          "Engine": "Shvetsov ASh-82",
          "Power": "1,850 hp",
        },
        context: "The La-5 was a rugged and effective fighter that gave the VVS parity with the Luftwaffe on the Eastern Front. Its radial engine provided excellent low-altitude performance, ideal for the close-quarters fighting typical of the Eastern Front.",
        color: "#6b4423",
        countryCode: "🇷🇺",
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
        icon: "✈️",
        specs: {
          "Crew": "1",
          "Length": "9.06 m",
          "Wingspan": "12.0 m",
          "Speed": "565 km/h",
          "Range": "1,870 km",
          "Ceiling": "10,000 m",
          "Armament": "2x 20mm cannons, 2x bombs",
          "Engine": "Mitsubishi Zuisei 14-cylinder",
          "Power": "950 hp",
        },
        context: "The Zero was the iconic Japanese fighter of WWII, dominating the Pacific in 1941-42. Its exceptional range, maneuverability, and climb rate made it superior to early Allied fighters. However, it lacked armor protection.",
        color: "#7c2d12",
        countryCode: "🇯🇵",
      },
      {
        name: "Kamikaze Aircraft",
        country: "Japan",
        type: "Special Attack Aircraft",
        icon: "✈️",
        specs: {
          "Type": "Conventional aircraft modified",
          "Examples": "Yokosuka MXY7 Ohka, aircraft loaded with bombs",
          "Method": "Deliberate crash into enemy ships",
          "Philosophy": "One-way mission for maximum damage",
          "Effectiveness": "Psychological terror, occasional ship damage",
          "Response": "Accelerated Japanese defeat",
        },
        context: "Kamikaze (divine wind) attacks represented Japan's desperate final strategy in 1944-45. Volunteer pilots flew bomb-laden aircraft into Allied ships. While causing significant damage, they could not reverse Japan's inevitable defeat.",
        color: "#7c2d12",
        countryCode: "🇯🇵",
      },
      {
        name: "Yamato",
        country: "Japan",
        type: "Battleship",
        icon: "⚓",
        specs: {
          "Displacement": "71,659 tons",
          "Length": "263 m",
          "Beam": "38.9 m",
          "Speed": "27 knots",
          "Range": "7,200 nm",
          "Crew": "2,767",
          "Main Armament": "9x 18.1-inch guns",
          "Armor": "410 mm belt",
          "Sunk": "April 7, 1945",
        },
        context: "Yamato was the largest battleship ever built, with guns larger than any other. However, she was sunk by US carrier aircraft before firing her main batteries in anger, demonstrating the dominance of air power at sea.",
        color: "#7c2d12",
        countryCode: "🇯🇵",
      },
    ],
  },
  italy: {
    name: "Italy",
    items: [
      {
        name: "Fiat M13/40",
        country: "Italy",
        type: "Medium Tank",
        icon: "🔩",
        specs: {
          "Weight": "14,000 kg",
          "Length": "4.92 m",
          "Width": "2.20 m",
          "Crew": "4",
          "Armor": "30-47 mm",
          "Speed": "32 km/h",
          "Range": "200 km",
          "Armament": "47mm gun, 3x MG",
          "Engine": "Vickers 9-cylinder",
          "Power": "145 hp",
        },
        context: "The M13/40 was Italy's main battle tank in North Africa. While outgunned and outarmored by British Matilda tanks, Italian forces used superior tactics and numbers to achieve early victories. The design was progressively improved.",
        color: "#059669",
        countryCode: "🇮🇹",
      },
      {
        name: "Roma (Battleship)",
        country: "Italy",
        type: "Battleship",
        icon: "⚓",
        specs: {
          "Displacement": "46,215 tons",
          "Length": "224 m",
          "Beam": "32 m",
          "Speed": "30 knots",
          "Range": "10,000 nm",
          "Crew": "1,920",
          "Main Armament": "9x 15-inch guns",
          "Armor": "350 mm belt",
          "Sunk": "September 9, 1943",
        },
        context: "Roma was one of Italy's most modern battleships, built in response to French and British naval power. She was sunk by German air attack after Italy surrendered, demonstrating the precarious position of Italian forces.",
        color: "#059669",
        countryCode: "🇮🇹",
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

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xc9a227, 0.4);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);

    // Create simple 3D representation based on type
    let geometry: THREE.BufferGeometry;
    const color = new THREE.Color(item.color);

    if (item.type.includes("Tank") || item.type.includes("Tank")) {
      // Tank shape - box with turret
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
    } else if (item.type.includes("Fighter") || item.type.includes("Bomber") || item.type.includes("Aircraft")) {
      // Plane shape
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
    } else if (item.type.includes("Carrier") || item.type.includes("Battleship") || item.type.includes("Cruiser") || item.type.includes("Submarine")) {
      // Ship shape
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
    } else if (item.type.includes("Rifle") || item.type.includes("Submachine") || item.type.includes("Machine Gun") || item.type.includes("Pistol")) {
      // Weapon shape
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
    } else {
      // Generic shape
      const geometry = new THREE.IcosahedronGeometry(1, 0);
      const material = new THREE.MeshPhongMaterial({ color });
      const mesh = new THREE.Mesh(geometry, material);
      meshRef.current = mesh;
      scene.add(mesh);
    }

    // Animation
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

    // Handle resize
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

  // Mouse interaction for rotation
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
        }}
      >
        <h1 className="section-title" style={{ display: "block" }}>
          Technology of War
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            maxWidth: "700px",
            margin: "0 auto",
            fontSize: "1.1rem",
          }}
        >
          Explore the weapons, vehicles, and equipment that defined World War II. Interact with 3D models and discover the specifications of history's most advanced military technology.
        </p>
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
                background: activeCountry === key ? "var(--accent-gold)" : "transparent",
                color: activeCountry === key ? "var(--bg-primary)" : "var(--text-secondary)",
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
            color: "var(--accent-gold)",
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
          {currentData.items.map((item, index) => (
            <div
              key={index}
              className="tech-card"
              onClick={() => setExpandedItem(expandedItem === item.name ? null : item.name)}
              style={{
                cursor: "pointer",
                borderColor:
                  expandedItem === item.name ? "var(--accent-gold)" : "rgba(201, 162, 39, 0.2)",
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
                    color: "var(--text-secondary)",
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
                  <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                  <div>
                    <h3
                      style={{
                        color: "var(--accent-gold)",
                        fontSize: "1.2rem",
                        fontFamily: "'Cinzel', serif",
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.8rem",
                      }}
                    >
                      {item.type}
                    </p>
                  </div>
                </div>

                {expandedItem === item.name && (
                  <div style={{ marginTop: "1rem" }}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0.25rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {Object.entries(item.specs).slice(0, 8).map(([key, value], i) => (
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
                          <span style={{ color: "var(--text-secondary)" }}>{key}</span>
                          <span style={{ color: "var(--accent-gold)", fontWeight: 500 }}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p
                      style={{
                        color: "var(--text-secondary)",
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

                <div
                  style={{
                    marginTop: expandedItem === item.name ? "1rem" : 0,
                    color: "var(--accent-gold)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  {expandedItem === item.name ? "Click to collapse" : "Click for details"}
                </div>
              </div>
            </div>
          ))}
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
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              color: "var(--accent-gold)",
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
                style={{
                  background: "var(--bg-tertiary)",
                  padding: "1.5rem",
                  borderRadius: "8px",
                }}
              >
                <h3
                  style={{
                    color: "var(--accent-gold)",
                    marginBottom: "1rem",
                    fontSize: "1.1rem",
                  }}
                >
                  {stat.country}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      Tanks
                    </span>
                    <p style={{ color: "var(--text-primary)", fontWeight: 600 }}>{stat.tanks}</p>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      Aircraft
                    </span>
                    <p style={{ color: "var(--text-primary)", fontWeight: 600 }}>{stat.aircraft}</p>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      Ships
                    </span>
                    <p style={{ color: "var(--text-primary)", fontWeight: 600 }}>{stat.ships}</p>
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
