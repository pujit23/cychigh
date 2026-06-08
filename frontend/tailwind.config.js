/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            brand: {
                bg: "var(--bg-black)",
                panel: "var(--bg-dark)",
                card: "var(--bg-card)",
                gold: "var(--accent-gold)",
                goldHover: "var(--accent-gold-hover)",
                'gold-hover': "var(--accent-gold-hover)",
                red: "var(--accent-red)",
                'red-hover': "var(--accent-red-hover)",
                text: "var(--text-main)",
                muted: "var(--text-muted)",
            }
        },
        fontFamily: {
            bebas: ['"Bebas Neue"', 'sans-serif'],
            dsans: ['"DM Sans"', 'sans-serif'],
            dmono: ['"DM Mono"', 'monospace'],
        },
        backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        }
      },
    },
    plugins: [],
}
