/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#07070A',
        surface: '#0B0B11',
        card: '#101017',
        elevated: '#15151E',
        ink: '#F5F5F7',
        muted: '#8A8A95',
        line: '#1E1E28',
        violet: {
          DEFAULT: '#FF5A36',
          soft: '#FFA552',
          deep: '#D43A1F'
        },
        indigo: {
          DEFAULT: '#FF3D7A'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif']
      },
      maxWidth: {
        content: '1180px'
      },
      backgroundImage: {
        'violet-glow': 'radial-gradient(60% 60% at 50% 0%, rgba(255,90,54,0.22) 0%, rgba(255,61,122,0.08) 40%, rgba(7,7,10,0) 75%)',
        'warm-gradient': 'linear-gradient(135deg, #FF5A36 0%, #FF3D7A 100%)'
      }
    }
  },
  plugins: []
}
