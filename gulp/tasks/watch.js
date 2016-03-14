import gulp from 'gulp';
import watch from 'gulp-watch';
import runSequence from 'run-sequence';
import { reload } from 'browser-sync';
import paths from '../paths';
import error from '../utils/errorHandler.js'

gulp.task('watch', () => {
  global.watch = true;

  watch(`${paths.src.styles}/**/*.{scss,css}`, () => {
    runSequence('scss', reload.bind(null, `${paths.dist.styles}/index.css`));
  });

  watch(`${paths.src.images}/png-sprite/*`, () => {
    runSequence('png-sprite', reload);
  });

  watch(`${paths.src.images}/svg-sprite/*`, () => {
    runSequence('svg-sprite', reload);
  });

  watch(`${paths.baseSrc}/jade/*.jade`, () => {
    runSequence('markup', reload);
  });

  watch(`${paths.baseSrc}/*.html`, () => {
    runSequence('markup', reload);
  });

  watch(`${paths.src.static}/**/*`, () => {
    runSequence('static', reload);
  });


  watch([`${paths.baseSrc}/{scripts}/**/*.js`, `!${paths.src.scripts}/vendor/*.js`], () => {
    runSequence('scripts:compile', reload);
  });
});
