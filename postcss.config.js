export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 750,
      minPixelValue: 0,
      exclude: /(node_module)/
    }
  },
};
