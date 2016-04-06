import gulp from 'gulp';
import paths from '../paths';

gulp.task('static', () => {
  return gulp.src(`${paths.src.static}/**/*.{png,jpg,gif}`)
    .pipe(gulp.dest(paths.dist.static));
});
