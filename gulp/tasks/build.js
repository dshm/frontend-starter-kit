import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', () => {
  runSequence(
      'clean',
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
      'components',
      'static',
      'favicon'
    ]
  );
});
