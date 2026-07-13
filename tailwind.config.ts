import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1426',
          '2': '#1A2332',
        },
        maroon: {
          DEFAULT: '#8B1538',
          '2': '#A91D42',
        },
        gold: {
          DEFAULT: '#D4AF37',
          soft: '#E8C547',
        },
        platinum: '#E5E4E2',
        cream: {
          DEFAULT: '#FEFCF3',
          '2': '#F8F6ED',
        },
        charcoal: '#2C2C2C',
        ink: '#1c2230',
        muted: '#6B7280',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down": "slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "float": "premiumFloat 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        premiumFloat: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "25%": { transform: "translateY(-10px) scale(1.02)" },
          "50%": { transform: "translateY(-5px) scale(1.01)" },
          "75%": { transform: "translateY(-15px) scale(1.03)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)" },
          "100%": { boxShadow: "0 0 40px rgba(212, 175, 55, 0.4)" },
        },
      },
      transitionDuration: {
        "400": "400ms",
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'premium': '0 25px 50px -12px rgba(11, 20, 38, 0.25), 0 0 0 1px rgba(212, 175, 55, 0.05)',
        'premium-lg': '0 35px 70px -12px rgba(11, 20, 38, 0.4), 0 0 0 1px rgba(212, 175, 55, 0.2)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
