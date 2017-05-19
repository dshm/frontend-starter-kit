import gulp from 'gulp';
import inlineCss from 'gulp-inline-css';
import vinylPaths from 'vinyl-paths';
import del from 'del';
import runSequence from 'run-sequence';
import paths from '../paths';

gulp.task('clean-email', () => {
  return gulp
    .src(`${paths.baseDist}/email/`)
    .pipe(vinylPaths(del));
});

gulp.task('email-build', () => {
  return gulp.src(`${paths.baseDist}/**/*.html`)
    .pipe(inlineCss({
      applyStyleTags: true,
      applyLinkTags: true,
      removeStyleTags: true,
      removeLinkTags: true,
      removeHtmlSelectors: true,
      applyTableAttributes: true,
      applyWidthAttributes: true
    }))
    .pipe(gulp.dest(`${paths.baseDist}/email/`));
});

gulp.task('email', () => {
  runSequence(
    'clean-email',
    'email-build'
  );
});
