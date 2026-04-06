"use client";

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const TimelineIcon: React.FC<IconProps> = ({ className, size = 32, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

export const CausesIcon: React.FC<IconProps> = ({ className, size = 32, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/>
    <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/>
    <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/>
    <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/>
    <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
    <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/>
    <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>
  </svg>
);

export const MapIcon: React.FC<IconProps> = ({ className, size = 32, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/>
    <line x1="8" y1="2" x2="8" y2="18"/>
    <line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);

export const TechIcon: React.FC<IconProps> = ({ className, size = 32, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

export const PlayersIcon: React.FC<IconProps> = ({ className, size = 32, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="5"/>
    <path d="M20 21a8 8 0 1 0-16 0"/>
  </svg>
);

export const SourcesIcon: React.FC<IconProps> = ({ className, size = 32, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

export const MilitaryIcon: React.FC<IconProps> = ({ className, size = 32, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>
);

export const TankIcon: React.FC<IconProps> = ({ className, size = 32, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="10" width="20" height="8" rx="2"/>
    <path d="M12 10V6"/>
    <path d="M6 10V7"/>
    <path d="M18 10V7"/>
    <circle cx="6" cy="18" r="2"/>
    <circle cx="18" cy="18" r="2"/>
    <circle cx="12" cy="18" r="2"/>
  </svg>
);

export const PlaneIcon: React.FC<IconProps> = ({ className, size = 32, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V8"/>
    <path d="M5 12l7-8 7 8"/>
    <path d="M5 12h14"/>
  </svg>
);

export const ShipIcon: React.FC<IconProps> = ({ className, size = 32, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20l2-2h16l2 2"/>
    <path d="M4 18l2-8h12l2 8"/>
    <path d="M12 10V2"/>
    <path d="M8 10l4-4 4 4"/>
  </svg>
);

export const GunIcon: React.FC<IconProps> = ({ className, size = 32, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12h6l2-3h4l2 3h6"/>
    <path d="M6 12v4h12v-4"/>
    <path d="M18 16v2"/>
    <path d="M6 16v2"/>
  </svg>
);

export const FlagIcon: React.FC<IconProps> = ({ className, size = 32, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
    <line x1="4" y1="22" x2="4" y2="15"/>
  </svg>
);

export const ChevronDown: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6,9 12,15 18,9"/>
  </svg>
);

export const ChevronUp: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18,15 12,9 6,15"/>
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

export const ArrowRight: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12,5 19,12 12,19"/>
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

export const MedalIcon: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="17" r="5"/>
    <path d="M12 12V2"/>
    <path d="M8 6l4-4 4 4"/>
  </svg>
);

export const BuildingIcon: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <path d="M9 22v-4h6v4"/>
    <path d="M8 6h.01"/>
    <path d="M16 6h.01"/>
    <path d="M12 6h.01"/>
    <path d="M12 10h.01"/>
    <path d="M12 14h.01"/>
    <path d="M16 10h.01"/>
    <path d="M16 14h.01"/>
    <path d="M8 10h.01"/>
    <path d="M8 14h.01"/>
  </svg>
);

export const MoneyIcon: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

export const DocumentIcon: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>
);

export const PeaceIcon: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7"/>
    <path d="M12 22V12"/>
    <path d="M17 7l-5 5"/>
    <path d="M7 7l5 5"/>
    <circle cx="12" cy="12" r="10"/>
  </svg>
);

export const ExplosionIcon: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9"/>
  </svg>
);

export const AnchorIcon: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="3"/>
    <line x1="12" y1="22" x2="12" y2="8"/>
    <path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
  </svg>
);

export const SwordsIcon: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="14.5,17.5 3,6 3,3 6,3 17.5,14.5"/>
    <line x1="13" y1="19" x2="19" y2="13"/>
    <line x1="16" y1="16" x2="20" y2="20"/>
    <line x1="19" y1="21" x2="21" y2="19"/>
    <polyline points="14.5,6.5 18.5,3.5 21.5,6.5 17.5,10.5"/>
    <line x1="5" y1="14" x2="9" y2="18"/>
    <line x1="7" y1="17" x2="4" y2="20"/>
    <line x1="3" y1="19" x2="5" y2="21"/>
  </svg>
);

// Country flags as simple icons
export const USAFlag: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24">
    <rect width="24" height="24" fill="#bf0a30"/>
    <rect y="1.85" width="24" height="1.85" fill="#fff"/>
    <rect y="5.54" width="24" height="1.85" fill="#fff"/>
    <rect y="9.23" width="24" height="1.85" fill="#fff"/>
    <rect y="12.92" width="24" height="1.85" fill="#fff"/>
    <rect y="16.62" width="24" height="1.85" fill="#fff"/>
    <rect y="20.31" width="24" height="1.85" fill="#fff"/>
    <rect width="10" height="9.23" fill="#002868"/>
  </svg>
);

export const UKFlag: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24">
    <rect width="24" height="24" fill="#012169"/>
    <path d="M0,0 L24,24 M24,0 L0,24" stroke="#fff" strokeWidth="3"/>
    <path d="M0,0 L24,24 M24,0 L0,24" stroke="#C8102E" strokeWidth="1.5"/>
    <path d="M12,0 V24 M0,12 H24" stroke="#fff" strokeWidth="5"/>
    <path d="M12,0 V24 M0,12 H24" stroke="#C8102E" strokeWidth="3"/>
  </svg>
);

export const USSRFlag: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24">
    <rect width="24" height="8" fill="#CC0000"/>
    <rect y="8" width="24" height="8" fill="#FFCC00"/>
    <rect y="16" width="24" height="8" fill="#CC0000"/>
  </svg>
);

export const GermanyFlag: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24">
    <rect width="24" height="8" fill="#000"/>
    <rect y="8" width="24" height="8" fill="#DD0000"/>
    <rect y="16" width="24" height="8" fill="#FFCC00"/>
  </svg>
);

export const JapanFlag: React.FC<IconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24">
    <rect width="24" height="24" fill="#fff"/>
    <circle cx="12" cy="12" r="6" fill="#BC002D"/>
  </svg>
);

export default {
  TimelineIcon,
  CausesIcon,
  MapIcon,
  TechIcon,
  PlayersIcon,
  SourcesIcon,
  MilitaryIcon,
  TankIcon,
  PlaneIcon,
  ShipIcon,
  GunIcon,
  FlagIcon,
  ChevronDown,
  ChevronUp,
  CloseIcon,
  MenuIcon,
  ArrowRight,
  GlobeIcon,
  MedalIcon,
  BuildingIcon,
  MoneyIcon,
  DocumentIcon,
  PeaceIcon,
  ExplosionIcon,
  AnchorIcon,
  SwordsIcon,
  USAFlag,
  UKFlag,
  USSRFlag,
  GermanyFlag,
  JapanFlag,
};
