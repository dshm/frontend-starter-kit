import gulp from 'gulp';
import plumber from 'gulp-plumber';
import errorHandler from '../utils/errorHandler';
import spritesmith from 'gulp.spritesmith';
import stripCssComments from 'gulp-strip-css-comments';
import paths from '../paths';
gulp.task('png-sprite', () => {
  const sprite = gulp.src(`${paths.src.pngsprite}/*.png`).pipe(plumber({
    errorHandler
  })).pipe(spritesmith({
    imgName: 'sprite.png',
    retinaImgName: 'sprite@2x.png',
    retinaImgPath: `${paths.inline.images}/sprite@2x.png`,
    imgPath: `${paths.inline.images}/sprite.png`,
    retinaSrcFilter: `${paths.src.pngsprite}/*@2x.png`,
    padding: 5,
    cssName: 'sprite-png.scss',
    cssTemplate: 'icon-sprite.css.hbs'
  }));
  sprite.img.pipe(gulp.dest(paths.dist.images));
  sprite.css.pipe(stripCssComments()).pipe(gulp.dest(paths.src.styles));
});
