# WW2 History - Project Specification

## 1. Concept & Vision

A comprehensive, visually stunning World War II educational resource that brings history to life through interactive elements, high-quality maps, 3D models, and immersive animations. The experience should feel like stepping into a wartime documentary — respectful, authoritative, and emotionally resonant. The goal is to educate while honoring those who lived through the conflict.

**Site URL:** https://mac756.github.io/ww2-history

**Team:** 
- Peter (Hermes CLI - director/coordinator)
- Paul (OpenCode - implementation)
- mac (business owner/stakeholder)

---

## 2. Design Language

### Aesthetic Direction
**Reference:** Vintage wartime documentary meets modern educational platform. Think Ken Burns documentary style with sepia tones, film grain, and reverent pacing. NOT a game or action site — a memorial and educational resource.

### Color Palette
```
Primary Background:     #1a1a1a (dark charcoal)
Secondary Background:   #2d2d2d (warm dark gray)
Card Background:        #3a3a3a (medium dark)
Vintage Cream:          #f5f0e6 (paper-like)
Military Olive:         #4a5d23 (sage olive green)
Gold Accent:            #c9a227 (antique gold)
Rust Red:               #8b3a3a (muted war red)
Sepia:                  #704214 (vintage sepia)
Text Primary:           #e8e4dc (warm white)
Text Secondary:         #a09a8c (muted tan)
Border:                 #4a4a4a (subtle gray)
```

### Typography
```
Headings:    Playfair Display (serif, elegant, documentary feel)
Body:        Lora (serif, readable, scholarly)
UI/Labels:   Inter (sans-serif, clean navigation)
Fallbacks:   Georgia, Times New Roman, serif
```

### Spatial System
- Base unit: 8px
- Section padding: 80px vertical, 40px horizontal
- Card padding: 24px
- Content max-width: 1200px
- Gap between cards: 24px

### Motion Philosophy
- **Page transitions:** Smooth fade + subtle slide (400ms ease-out)
- **Scroll animations:** Reveal on scroll, staggered timing (100ms between items)
- **Hover states:** Subtle lift (translateY -4px), soft shadow expansion
- **Parallax:** Subtle background parallax on hero sections (0.5 speed)
- **Statistics:** Count-up animation when in viewport
- **Timeline:** Draw-line animation as user scrolls

### Visual Assets
- **Maps:** High-quality historical/political maps from Wikimedia Commons and historical archives. Vintage/sepia styled.
- **Images:** Wartime photographs, propaganda posters (vintage styled)
- **Icons:** Lucide React or similar clean library
- **Decorative:** Film grain overlay, vignette effects, paper texture

---

## 3. Layout & Structure

### Navigation
- Fixed top navigation bar with:
  - Logo/Site name (left)
  - Nav links: Home, Timeline, Causes, Theaters, Technology, Major Players, Sources
  - Theme toggle (dark/light/vintage)
  - Reading progress bar (bottom of nav)

### Page Structure

#### Home Page
1. **Hero Section**
   - Full-width vintage wartime image with film grain overlay
   - Title: "World War II 1939-1945"
   - Subtitle: "A Comprehensive History"
   - Animated typewriter effect for key stats
   - CTA button: "Begin Your Journey"
   - Parallax background

2. **Stats Bar**
   - 70-85M Total Deaths
   - 6 Years of War
   - 30+ Countries Involved
   - 3 Major Theaters
   - Animated counters

3. **Explore Cards Grid**
   - 6 section cards with icons, hover effects
   - Each links to respective section

4. **War in Brief**
   - 4 key sections: Beginning, Scale, Turning Points, End
   - Vintage document styling

5. **Footer**
   - Sources attribution
   - Educational disclaimer

#### Timeline Page
- Vertical timeline 1922-1945
- Date markers with icons
- Event cards with expandable details
- "Draw line" animation on scroll
- Category color-coding (political, military, etc.)

#### Causes Page
- Treaty of Versailles effects
- Rise of fascism (Italy, Germany, Japan)
- Global economic depression
- Appeasement and failures of diplomacy
- Animated reveal sections

#### Theaters Page
- **European Theater** - map with key battles
- **Pacific Theater** - map with island hopping
- **North African Theater** - map with campaigns
- Interactive hover zoom on maps
- Key events listed per theater

#### Technology Page
- Country filter buttons (US, UK, Germany, USSR, Japan, Italy)
- Equipment cards with:
  - 3D model viewer (Three.js)
  - Specs (weight, speed, armament)
  - Production statistics
- Animated stats counters

#### Major Players Page
- Leaders (political)
  - Roosevelt, Churchill, Stalin, Hitler, Mussolini, Tojo
- Commanders (military)
  - Eisenhower, Montgomery, Rommel, Patton, Zhukov, Yamamoto
- Cards with photos, key facts, quotes

#### Sources Page
- Bibliography organized by type
- Academic sources
- Archives (US National Archives, Imperial War Museum)
- Books cited
- Links to external resources

---

## 4. Features & Interactions

### Core Features
1. **Static Content Pages** - All content pre-rendered for fast load
2. **Theme System** - Dark mode, Light mode, Vintage sepia mode
3. **3D Model Viewer** - Three.js interactive models on Technology page
4. **Smooth Navigation** - Animated page transitions
5. **Scroll Animations** - Reveal effects, parallax, counters
6. **Interactive Maps** - High-res historical maps with hover zoom
7. **Responsive Design** - Mobile-first, works on all devices

### Interaction Details

**Navigation:**
- Hover: underline animation (left to right)
- Active: gold accent color
- Mobile: hamburger menu with slide-in drawer

**Cards:**
- Hover: lift + shadow + subtle 3D tilt
- Click: navigate to respective page

**Timeline:**
- Scroll: draw line animation connecting events
- Hover on event: expand for more details

**Maps:**
- Hover: subtle zoom effect
- Click: lightbox with full-size view

**Theme Toggle:**
- Click: smooth transition between themes (300ms)
- Persist preference in localStorage

**3D Models:**
- Drag to rotate
- Scroll to zoom
- Reset button

### Error Handling
- 404 page with vintage "lost in the fog of war" message
- Graceful degradation if Three.js fails
- Fallback images if external images fail

---

## 5. Component Inventory

### Navigation
- States: default, scrolled (smaller, shadow), mobile-open
- Theme toggle integrated
- Progress bar showing scroll position

### Hero Section
- Full-viewport height
- Background image with overlay (gradient + film grain)
- Animated title and subtitle
- Pulsing CTA button

### Stats Card
- Icon + number (animated counter) + label
- Hover: subtle glow

### Section Card
- Icon, title, description, arrow
- Hover: lift, 3D tilt, border glow
- Focus: outline for accessibility

### Timeline Item
- Date badge, event title, description
- Expandable details on click
- Category indicator (color-coded dot)

### Map Card
- Historical map image (vintage styled)
- Caption with source
- Hover: zoom cursor
- Click: opens lightbox

### Leader Card
- Photo (vintage styled)
- Name, role, country flag
- Key facts list
- Quote (if available)

### Equipment Card
- 3D model or image
- Name, type, country flag
- Specifications grid
- Production stats
- Hover: rotate icon if 3D

### Footer
- Minimal, centered
- Source links
- Disclaimer

---

## 6. Technical Approach

### Stack
- **Framework:** Next.js 16.2.2 (static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** GSAP (ScrollTrigger, animations)
- **3D:** Three.js (@types/three)
- **Deployment:** GitHub Pages (static export)

### Build & Deploy
```bash
bun run build    # Creates static export in /out
# Deploy /out folder to GitHub Pages
```

### Image Sources (ALL FREE/ATTRIBUTED)
- **Maps:** Wikimedia Commons (WW2 historical maps)
- **Photos:** Wikimedia Commons, US National Archives
- **3D Models:** Public domain/CC0 3D assets

### Key Implementation Notes
- Use `output: 'export'` in next.config.ts for GitHub Pages
- All images lazy-loaded with blur placeholders
- CSS custom properties for theming
- localStorage for theme preference persistence
- Intersection Observer for scroll animations
- GSAP ScrollTrigger for parallax and reveals

---

## 7. Content Guidelines

### Tone
- **Respectful** - Honor the gravity of war
- **Educational** - Inform, don't sensationalize
- **Balanced** - Cover all sides of the conflict
- **Scholarly** - Cite sources, avoid speculation

### What to Include
- Political and military dimensions
- Civilian experiences where appropriate
- Technological innovation
- Human cost (statistics, but not gratuitous)
- Key turning points and battles
- Major figures (allies and axis)
- Causes and consequences

### What to Avoid
- gratuitous violence or graphic imagery
- Glorification of any side
- Speculation or unverified claims
- Humor about war crimes
- Content unsuitable for educational context

---

## 8. Future Enhancements (Backlog)

- [ ] Add WW2 trivia/quiz section
- [ ] Timeline with clickable events showing more detail
- [ ] Oral history testimonials (audio)
- [ ] Document archive with primary sources
- [ ] Printable fact sheets
- [ ] Teacher resources / lesson plans
- [ ] Multi-language support
- [ ] PWA for offline access
- [ ] Desktop app (Tauri)
- [ ] Mobile app (Expo)

---

*Last Updated: April 6, 2026*
*Document Owner: Peter (Hermes CLI)*
