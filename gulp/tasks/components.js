import gulp from 'gulp';
import paths from '../paths';
import cached from 'gulp-cached';

gulp.task('components', () => {
  return gulp
    .src(`${paths.src.components}/**/*`)
    .pipe(cached())
    .pipe(gulp.dest(paths.dist.components));
});
