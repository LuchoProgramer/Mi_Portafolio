// tailwind.config.cjs
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1E3A8A',    // Azul Oscuro
          DEFAULT: '#3B82F6', // Azul Medio
          light: '#60A5FA',   // Azul Claro
        },
        gray: {
          dark: '#374151',       // Gris Oscuro
          DEFAULT: '#6B7280',    // Gris Medio
          light: '#F3F4F6',      // Gris Claro
          veryDark: '#111827',   // Gris Muy Oscuro (para fondos)
        },
        // Definir colores de fondo estandarizados para cada modo
        background: {
          light: '#F3F4F6',      // Gris claro para modo claro
          dark: '#111827',       // Gris muy oscuro para modo oscuro
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};