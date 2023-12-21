/** @type {import('tailwindcss').Config} */
export default {
  // separator: '_',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    daisyui: {
      themes: ["light"],
    },
    colors: {
      'Red': '#C90E7E',
      'orange': '#FF8A00',
      'Yellow': '#FFD700',
      'Purple': '#7E57FF',
      'Blue': '#4BCEFA',
      'Green': '#00925D',
      'C72': '#727272',
      'white': '#dadada',
      'BGwhite': '#F9F9FB',
      'White3': '#F3F3F3',
      'C14': '#141414',
      'C88': '#888888',
      'C4C': '#4c4c4c',
      'CC4': '#c4c4c4',
      'C4d': '#4D4D4D',
      'black': '#000',
      'blackbg': '#0f0f0f',
      'C15': '#151515',
      'C22': '#222222',
      'Cff': '#ffffff',

    }
  },
  plugins: [require('daisyui')],
}

