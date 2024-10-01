import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      base: {
        colors: {
          contextual: {
            light: {
              brand: {
                default: '#FF6F1E',
                active: '#F15700',
                light: '#FFF5EF',
                clarity: 'rgba(255, 111, 30, 0.20)',
                inverse: '#ffffff'
              },
              primary: {
                default: '#1B84FF',
                active: '#056EE9',
                light: '#EFF6FF',
                clarity: 'rgba(27, 132, 255, 0.20)',
                inverse: '#ffffff'
              },
              success: {
                default: '#17C653',
                active: '#04B440',
                light: '#EAFFF1',
                clarity: 'rgba(23, 198, 83, 0.20)',
                inverse: '#ffffff'
              },
              info: {
                default: '#7239EA',
                active: '#5014D0',
                light: '#F8F5FF',
                clarity: 'rgba(114, 57, 234, 0.20)',
                inverse: '#ffffff'
              },
              danger: {
                default: '#F8285A',
                active: '#D81A48',
                light: '#FFEEF3',
                clarity: 'rgba(248, 40, 90, 0.20)',
                inverse: '#ffffff'
              },
              warning: {
                default: '#F6B100',
                active: '#DFA000',
                light: '#FFF8DD',
                clarity: 'rgba(246, 177, 0, 0.20)',
                inverse: '#ffffff'
              },
              dark: {
                default: '#1E2129',
                active: '#111318',
                light: '#F9F9F9',
                clarity: 'rgba(30, 33, 41, 0.20)',
                inverse: '#ffffff'
              },
              light: {
                default: '#ffffff',
                active: '#FCFCFC',
                light: '#ffffff',
                clarity: 'rgba(255, 255, 255, 0.20)',
                inverse: '#4B5675'
              },
              secondary: {
                default: '#F9F9F9',
                active: '#F9F9F9',
                light: '#F9F9F9',
                clarity: 'rgba(249, 249, 249, 0.20)',
                inverse: '#4B5675'
              }
            },
            dark: {
              brand: {
                default: '#D74E00',
                active: '#F35700',
                light: '#272320',
                clarity: 'rgba(215, 78, 0, 0.20)',
                inverse: '#ffffff',
              },
              primary: {
                default: '#006AE6',
                active: '#107EFF',
                light: '#172331',
                clarity: 'rgba(0, 106, 230, 0.20)',
                inverse: '#ffffff'
              },
              success: {
                default: '#00A261',
                active: '#01BF73',
                light: '#1F2623',
                clarity: 'rgba(0, 162, 97, 0.20);',
                inverse: '#ffffff'
              },
              info: {
                default: '#883FFF',
                active: '#9E63FF',
                light: '#272134',
                clarity: 'rgba(136, 63, 255, 0.20)',
                inverse: '#ffffff'
              },
              danger: {
                default: '#E42855',
                active: '#FF3767',
                light: '#302024',
                clarity: 'rgba(228, 40, 85, 0.20)',
                inverse: '#ffffff'
              },
              warning: {
                default: '#C59A00',
                active: '#D9AA00',
                light: '#242320',
                clarity: 'rgba(197, 154, 0, 0.20)',
                inverse: '#ffffff'
              },
              dark: {
                default: '#272A34',
                active: '#2D2F39',
                light: '#1E2027',
                clarity: 'rgba(39, 42, 52, 0.20)',
                inverse: '#ffffff'
              },
              light: {
                default: '#1F212A',
                active: '#1F212A',
                light: '#1F212A',
                clarity: 'rgba(31, 33, 42, 0.20)',
                inverse: '#9A9CAE'
              },
              secondary: {
                default: '#363843',
                active: '#464852',
                light: '#363843',
                clarity: 'rgba(54, 56, 67, 0.20)',
                inverse: '#9A9CAE'
              },
            }
          }
        }
      }
    }
  },
  plugins: [],
};
export default config;
