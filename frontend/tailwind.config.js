/** @type {import('tailwindcss').Config} */
export default {
  // El contenido le dice a Tailwind dónde buscar las clases a usar
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // VARIABLES DE COLOR - Aquí definimos la paleta de colores de nuestra app
      colors: {
        // Color primario: Usamos este color para elementos principales como botones, links, headers
        // Es el color que define la identidad de la marca
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",  // <- Color primario base
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        
        // Color secundario: Complementa el primario, usado en elementos secundarios
        secondary: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",  // <- Color secundario base
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },

        // Color de acento/éxito: Para acciones positivas, confirmaciones
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",  // <- Color de éxito base
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#145231",
          950: "#052e16",
        },

        // Color de advertencia: Para alertas, estados de precaución
        warning: {
          50: "#fefce8",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",  // <- Color de advertencia base
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },

        // Color de error/peligro: Para errores, acciones peligrosas, delete
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",  // <- Color de error base
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#4c0519",
        },

        // Color de información: Para mensajes informativos, tips
        info: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",  // <- Color de info base
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#051e3e",
        },
      },

      // TIPOGRAFÍA - Configuramos las fuentes
      fontFamily: {
        // Font sans para texto general
        sans: ['"Poppins"', 'system-ui', 'sans-serif'],
        // Puedes agregar más familias de fuentes según necesites
        // serif: ['Georgia', 'serif'],
      },

      // ESPACIADO PERSONALIZADO - Valores comúnmente usados
      spacing: {
        'xs': '0.25rem',  // 4px
        'sm': '0.5rem',   // 8px
        'md': '1rem',     // 16px
        'lg': '1.5rem',   // 24px
        'xl': '2rem',     // 32px
        '2xl': '3rem',    // 48px
      },

      // BORDER RADIUS - Esquinas redondeadas
      borderRadius: {
        'none': '0',
        'xs': '0.125rem',   // 2px
        'sm': '0.25rem',    // 4px
        'base': '0.375rem', // 6px
        'md': '0.5rem',     // 8px
        'lg': '0.75rem',    // 12px
        'xl': '1rem',       // 16px
        '2xl': '1.5rem',    // 24px
      },

      // SOMBRAS - Para dar profundidad
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'base': '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
}
