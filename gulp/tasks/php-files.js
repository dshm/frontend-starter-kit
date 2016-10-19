import gulp from 'gulp';
import paths from '../paths';
import cached from 'gulp-cached';

gulp.task('php-files', () => {
  return gulp.src(`${paths.baseSrc}/*.php`)
    .pipe(cached())
    .pipe(gulp.dest(paths.baseDist));
});
