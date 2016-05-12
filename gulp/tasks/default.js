import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', () => {
  runSequence(
    [
      'png-sprite',
      'svg-sprite',
      'fonts',
      'markup',
      'markup-menu',
      'scss',
      'scripts:compile',
      'scripts:copy',
      'images',
      'static'
    ],
    'livereload',
    'watch'
  );
});
