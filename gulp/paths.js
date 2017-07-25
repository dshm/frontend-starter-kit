import options from '../options';

const defaultDistPath = {
  components: './dist/components',
  styles: './dist/css',
  images: './dist/images',
  optimizedImg: './dist/images-optimized',
  scripts: './dist/js',
  static: './dist/data',
  optimizedData: './dist/data-optimized',
  fonts: './dist/fonts'
};

const openCartDistPath = {
  components: '../catalog/view/javascript/components',
  styles: '../catalog/view/theme/default/stylesheet',
  images: '../catalog/view/theme/default/images',
  optimizedImg: '../catalog/view/theme/default/images',
  scripts: '../catalog/view/javascript',
  static: '../image',
  optimizedData: '../image',
  fonts: '../catalog/view/theme/default/fonts'
};

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
    includes: './app/_includes',
    fonts: './app/fonts'
  },

  dist: options.distPath === "opencart" ? openCartDistPath : defaultDistPath,

  inline: {
    styles: '/css',
    images: '/images'
  }
};