/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        'darkblue': '#1B347A',
        'lightblue': '#24B0FF',
        'gray': '#F2F2F2',
        'bblue':'#81CFFB',
        'white': '#FFFFFF'
      },
      width: {
        '98': '98%',
      },
      height: {
        '15': '15%'
      },
      backgroundSize:{
        'for-gradient': '200% auto'
      },
      animation: {
        'slide-in-top': 'slide-in-top 1s ease-in-out',
        'background-gradient':'background-gradient 2s ease infinite', 
      },
      keyframes: {
        'slide-in-top':{
        '0%': { transform: 'translateY(-100%)', opacity: 0 },
        '100%': { transform: 'translateY(0)', opacity: 1 },
        },

        'background-gradient':{
          '0%':{ backgroundPosition: '0% 50%'},
          '50%':{ backgroundPosition: '100% 50%'},
          '100%':{ backgroundPosition: '0% 50%'},
        }
      }
    },

  },
  plugins: [],
}
