import gulp from 'gulp';
import paths from '../paths';
import cached from 'gulp-cached';

gulp.task('API', () => {
  return gulp
    .src(`${paths.src.API}/*.json`)
    .pipe(cached())
    .pipe(gulp.dest(paths.dist.API));
});