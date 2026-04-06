"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes: { value: "dark" | "light" | "sepia"; label: string; icon: string }[] = [
    { value: "dark", label: "Dark", icon: "🌙" },
    { value: "light", label: "Light", icon: "☀️" },
    { value: "sepia", label: "Sepia", icon: "📜" },
  ];

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginLeft: "1.5rem",
    }}>
      <div style={{
        display: "flex",
        background: "var(--bg-tertiary)",
        borderRadius: "8px",
        padding: "4px",
        border: "1px solid rgba(201, 162, 39, 0.2)",
      }}>
        {themes.map((t) => (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            title={t.label}
            style={{
              background: theme === t.value ? "var(--accent-gold)" : "transparent",
              color: theme === t.value ? "var(--bg-primary)" : "var(--text-secondary)",
              border: "none",
              borderRadius: "6px",
              padding: "6px 10px",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "all 0.3s ease",
              transform: theme === t.value ? "scale(1.1)" : "scale(1)",
              boxShadow: theme === t.value ? "0 2px 8px rgba(201, 162, 39, 0.4)" : "none",
            }}
          >
            {t.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
