import gulp from 'gulp';
import paths from '../paths';

gulp.task('fonts', () => {
  return gulp.src(`${paths.src.fonts}/**/*`)
    .pipe(gulp.dest(paths.dist.fonts));
});
