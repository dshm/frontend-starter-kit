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

  watch(`${paths.src.pngsprite}/*.png`, () => {
    runSequence('png-sprite', reload);
  });

  watch(`${paths.src.svgsprite}/*`, () => {
    runSequence('svg-sprite', reload);
  });

  watch(`${paths.baseSrc}/pug/**/*.pug`, () => {
    runSequence('markup', 'markup-menu', reload);
  });

  watch([`${paths.baseSrc}/*.html`, `${paths.src.layouts}/**/*.html`], () => {
    runSequence('markup', 'markup-menu', reload);
  });

  watch([`${paths.baseSrc}/*.php`], () => {
    runSequence('php-files', reload);
  });

  watch(`${paths.src.static}/**/*.{png,jpg,gif,svg,mp4,webm}`, () => {
    runSequence('static', reload);
  });

  watch(`${paths.src.components}/**/*`, () => {
    runSequence('components', reload);
  });

  watch(`${paths.src.fonts}/**/*`, () => {
    runSequence('fonts', reload);
  });

  watch(`${paths.src.images}/**/*.{png,jpg,gif,svg}`, () => {
    runSequence('images', reload);
  });

  watch(`${paths.src.scripts}/**/*.js`, () => {
    runSequence('scripts:compile');
  });
});
