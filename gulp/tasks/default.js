import gulp from 'gulp';
import runSequence from 'run-sequence';
import options from '../../options';
 
gulp.task('default', () => {
  runSequence(
    [
      'png-sprite',
      'svg-sprite',
      'fonts',
      `${options.templateEngine}`,
      'php-files',
      'files-menu',
      'scss',
      'scripts:compile',
      'images',
      'components',
      'static',
      'API'
    ],
    'livereload',
    'watch'
  );
});
