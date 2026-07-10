/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  corePlugins: {
    container: false
  },
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "2rem"
      },
      screens: {
        xl: "1280px",
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        brand: {
          blue: "#0057B7",
          blueDark: "#003F87",
          blueLight: "#EAF3FF",
          green: "#7CBF00",
          greenLight: "#EEF8DD"
        },
        ink: {
          primary: "#111827",
          secondary: "#4B5563",
          muted: "#6B7280"
        },
        surface: {
          white: "#FFFFFF",
          soft: "#F6F9FC",
          border: "#DCE7F2"
        },
        state: {
          warning: "#F59E0B",
          error: "#DC2626",
          success: "#16A34A"
        }
      },
      fontFamily: {
        sans: ["\"IBM Plex Sans\"", "\"Helvetica Neue\"", "Arial", "sans-serif"],
        display: ["\"IBM Plex Sans\"", "\"Helvetica Neue\"", "Arial", "sans-serif"]
      },
      fontSize: {
        "display-xl": ["54px", { lineHeight: "1.25", letterSpacing: "-0.1px", fontWeight: "300" }],
        "display-xl-mobile": ["38px", { lineHeight: "1.25", letterSpacing: "-0.1px", fontWeight: "300" }],
        "display-xl-strong": ["54px", { lineHeight: "1.18", letterSpacing: "-0.018em", fontWeight: "600" }],
        "display-xl-strong-mobile": ["38px", { lineHeight: "1.18", letterSpacing: "-0.012em", fontWeight: "600" }],
        "display-lg": ["44px", { lineHeight: "1.25", letterSpacing: "0.1px", fontWeight: "300" }],
        "display-md": ["35px", { lineHeight: "1.25", letterSpacing: "0", fontWeight: "300" }],
        "display-md-mobile": ["28px", { lineHeight: "1.25", letterSpacing: "0", fontWeight: "300" }],
        "heading-xl": ["28px", { lineHeight: "1.25", letterSpacing: "0.1px", fontWeight: "300" }],
        "heading-xl-mobile": ["24px", { lineHeight: "1.25", letterSpacing: "0.1px", fontWeight: "300" }],
        "heading-lg": ["22px", { lineHeight: "1.25", letterSpacing: "0.1px", fontWeight: "300" }],
        "heading-md": ["18px", { lineHeight: "1", letterSpacing: "0", fontWeight: "600" }],
        "body-md": ["18px", { lineHeight: "1.5", letterSpacing: "0.1px", fontWeight: "400" }],
        "body-strong": ["18px", { lineHeight: "1.25", letterSpacing: "0.4px", fontWeight: "500" }],
        "nav-main": ["18px", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "500" }],
        "nav-main-caps": ["13px", { lineHeight: "1.25", letterSpacing: "0.07em", fontWeight: "500" }],
        "nav-utility-caps": ["11.5px", { lineHeight: "1.5", letterSpacing: "0.06em", fontWeight: "500" }],
        "body-sm": ["16px", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],
        "tagline-md": ["15px", { lineHeight: "1.625", letterSpacing: "0", fontWeight: "400" }],
        "stats-lg": ["52px", { lineHeight: "1", letterSpacing: "-0.2px", fontWeight: "700" }],
        "stats-lg-mobile": ["44px", { lineHeight: "1", letterSpacing: "-0.1px", fontWeight: "700" }],
        "caption-md": ["14px", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],
        "caption-sm": ["12px", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "500" }],
        "button-lg": ["18px", { lineHeight: "1.25", letterSpacing: "0.45px", fontWeight: "700" }],
        "button-md": ["14px", { lineHeight: "1.25", letterSpacing: "0.32px", fontWeight: "700" }],
        "button-caps": ["13px", { lineHeight: "1.25", letterSpacing: "0.07em", fontWeight: "700" }]
      },
      borderRadius: {
        control: "6px",
        card: "8px",
        media: "12px",
        panel: "16px"
      },
      boxShadow: {
        card: "0 12px 30px rgba(17, 24, 39, 0.06)",
        soft: "0 8px 24px rgba(0, 87, 183, 0.08)"
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem"
      }
    }
  },
  plugins: []
};
