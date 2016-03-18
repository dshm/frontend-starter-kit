import gulp from 'gulp';
import watch from 'gulp-watch';
import runSequence from 'run-sequence';
import { reload } from 'browser-sync';
import paths from '../paths';

gulp.task('watch', () => {
  global.watch = true;

  watch(`${paths.src.styles}/**/*.{scss,css}`, () => {
    runSequence('scss', reload.bind(null, `${paths.dist.styles}/index.css`));
  });

  watch(`${paths.src.pngsprite}/*`, () => {
    runSequence('png-sprite', reload);
  });

  watch(`${paths.src.svgsprite}/*`, () => {
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

  watch(`${paths.src.images}/*.*`, () => {
    runSequence('images', reload);
  });

  watch(`${paths.src.scripts}/*.js`, () => {
    runSequence('scripts:compile', reload);
  });

  watch(` ${paths.src.scripts}/vendor/*.js`, () => {
    runSequence('scripts:copy', reload);
  });
});
