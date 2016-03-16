import gulp from 'gulp';
import paths from '../paths';

gulp.task('images', () => {
  return gulp.src(`${paths.src.images}/**/*`)
    .pipe(gulp.dest(paths.dist.images));
});
