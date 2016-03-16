export default {
  baseSrc: './app',
  baseDist: './dist',

  src: {
    styles: './app/scss',
    spritecss: './app/scss/sprites',
    pngsprite: './app/png-sprite',
    svgsprite: './app/png-sprite',
    images: './app/images',
    svg: './app/svg',
    scripts: './app/scripts',
    static: './app/data'
  },

  dist: {
    styles: './dist/css',
    images: './dist/images',
    scripts: './dist/js',
    static: './dist/data'
  },

  inline: {
    styles: '/css',
    images: '/images'
  }

};
