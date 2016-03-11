import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', () => {
  runSequence(
    [
      'png-sprite',
      'markup',
      'scss',
      'scripts:compile',
      'static'
    ],
    'livereload',
    'watch'
  );
});
