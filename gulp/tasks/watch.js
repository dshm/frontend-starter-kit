import gulp from 'gulp';
import watch from 'gulp-watch';
import runSequence from 'run-sequence';
import {
  reload
} from 'browser-sync';
import paths from '../paths';
import error from '../utils/errorHandler.js'

gulp.task('watch', () => {
  global.watch = true;

  watch(`${paths.baseSrc}/sass/**/*.{sass,css}`, () => {
    runSequence('sass', reload.bind(null, `${paths.dist.styles}/app.min.css`));
  });

  watch(`${paths.baseSrc}/jade/*.jade`, () => {
    runSequence('markup', reload);
  });

  watch(`${paths.src.static}/**/*`, () => {
    runSequence('static', reload);
  });


  watch([`${paths.baseSrc}/{scripts,blocks}/**/*.js`, `!${paths.src.scripts}/vendor/*.js`], () => {
    runSequence('scripts:compile', reload);
  });
});
