/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable class-based dark mode (spec: strict dark-mode aesthetic)
  darkMode: ["class"],

  // Scan every JS/JSX file in /src for class names
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    // Include shadcn/ui component paths once added
    "./src/components/**/*.{js,jsx}",
  ],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // ---------------------------------------------------------------------------
      // SPEC: "deep obsidian #0A0A0A background" — all brand tokens defined here
      // shadcn/ui CSS variable convention: hsl values without the hsl() wrapper
      // ---------------------------------------------------------------------------
      colors: {
        // Brand palette
        obsidian: "#0A0A0A",
        "obsidian-surface": "#111111",
        "obsidian-border": "#1A1A1A",

        // shadcn/ui semantic tokens (CSS variable-driven)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      fontFamily: {
        // Spec: modern typography — Inter as primary, monospace for code
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },

      // Spec: "Visual-First Asset Delivery" — enforce aspect ratios to prevent CLS
      aspectRatio: {
        video: "16 / 9",
        diagram: "4 / 3",
        card: "16 / 9",
      },

      keyframes: {
        // Subtle micro-animations (spec: avoid heavy animation libraries)
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "skeleton-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },

      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        "skeleton-pulse": "skeleton-pulse 1.5s ease-in-out infinite",
        "slide-in-right": "slide-in-right 0.3s ease-out both",
      },
    },
  },

  plugins: [
    // shadcn/ui requires tailwindcss-animate
    require("tailwindcss-animate"),
  ],
};
