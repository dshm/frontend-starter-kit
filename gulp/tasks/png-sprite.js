import gulp from 'gulp';
import plumber from 'gulp-plumber';
import errorHandler from '../utils/errorHandler';
import spritesmith from 'gulp.spritesmith';
import paths from '../paths';

gulp.task('png-sprite', () => {
  const pngSprite =  gulp.src(`${paths.baseSrc}/images/png-sprite/*`)
    .pipe(plumber({
      errorHandler
    }))
    .pipe(spritesmith({
      imgName: 'sprite.png',
      retinaImgName: 'sprite@2x.png',
      retinaImgPath: `${paths.inline.images}/sprite@2x.png`,
      imgPath: `${paths.inline.images}/sprite.png`,
      retinaSrcFilter: `${paths.src.images}/png-sprite/*@2x.png`,
      padding: 10,
      cssName: '_sprite-png.css'
    }));
  pngSprite.img.pipe(gulp.dest(paths.dist.images));
  pngSprite.css.pipe(gulp.dest(paths.src.sprites));
});
