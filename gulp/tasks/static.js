import gulp from 'gulp';
import paths from '../paths';
import cached from 'gulp-cached';

gulp.task('static', () => {
  return gulp
    .src([`${paths.src.static}/**/*.{png,jpg,gif,svg}`, paths.src.components])
    .pipe(cached())
    .pipe(gulp.dest(paths.dist.static));
});
