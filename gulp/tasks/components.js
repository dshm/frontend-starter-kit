import gulp from 'gulp';
import paths from '../paths';

gulp.task('components', () => {
  return gulp
    .src(`${paths.src.components}/**/*`)
    .pipe(gulp.dest(paths.dist.components));
});
