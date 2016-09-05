export default {
  baseSrc: './app',
  baseDist: './dist',

  src: {
    styles: './app/scss',
    components: './app/components',
    pngsprite: './app/png-sprite',
    svgsprite: './app/svg-sprite',
    images: './app/images',
    svg: './app/svg',
    scripts: './app/scripts',
    static: './app/data',
    layouts: './app/layouts',
    fonts: './app/fonts',
    pug: './app/pug'
  },

  dist: {
    components: './dist/components',
    styles: './dist/css',
    images: './dist/images',
    optimizedImg: './dist/images-optimized',
    scripts: './dist/js',
    static: './dist/data',
    optimizedData: './dist/data-optimized',
    fonts: './dist/fonts'
  },

  inline: {
    styles: '/css',
    images: '/images'
  }

};
