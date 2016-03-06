import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', () => {
  runSequence([
      'markup',
      'sass',
      'scripts:compile',
      'static'
    ],
    'livereload',
    'watch'
  );
});
