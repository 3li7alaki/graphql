/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-preset-env': {},
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    'postcss-preset-env': {
      'features': { 
        'nesting-rules': false
      }
    },
    'tailwindcss': {},
    'autoprefixer': {},
  },
};

export default config;
