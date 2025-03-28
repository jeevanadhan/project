/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "neon-blue": "#00f7ff",
        "neon-pink": "#ff00ff",
        "neon-green": "#39ff14",
        "neon-purple": "#9D00FF",
        "neon-red": "#ff073a",
      },
      boxShadow: {
        "neon-blue": "0px 0px 10px rgba(0, 247, 255, 0.8)",
        "neon-red": "0px 0px 10px rgba(255, 7, 58, 0.8)",
        "neon-green": "0px 0px 10px rgba(57, 255, 20, 0.8)",
      },
      animation: {
        "glow": "glowEffect 1.5s infinite alternate",
      },
      keyframes: {
        glowEffect: {
          "0%": { textShadow: "0 0 5px rgba(255, 255, 255, 0.8)" },
          "100%": { textShadow: "0 0 15px rgba(255, 255, 255, 1)" },
        },
      },
    },
  },
  plugins: [],
};
