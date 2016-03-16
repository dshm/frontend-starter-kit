import gulp from 'gulp';
import zip from 'gulp-zip';
import paths from '../paths';

gulp.task('zip', () => {
  return gulp.src([`${paths.baseDist}/**/*`, `!${paths.baseDist}/*.zip`])
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest(paths.baseDist));
});
