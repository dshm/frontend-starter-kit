import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', () => {
  runSequence(
    [
      'png-sprite',
      'svg-sprite',
      'fonts',
      'markup',
      'php-files',
      'markup-menu',
      'scss',
      'scripts:compile',
      'scripts:copy',
      'images',
      'components',
      'static',
      'favicon'
    ],
    'livereload',
    'watch'
  );
});
