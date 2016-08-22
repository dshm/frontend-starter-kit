import gulp from 'gulp';
import paths from '../paths';
import cached from 'gulp-cached';

gulp.task('favicon', () => {
  return gulp
    .src(`${paths.baseSrc}/favicon*.{png,jpg,gif,svg,ico}`)
    .pipe(cached())
    .pipe(gulp.dest(paths.baseDist));
});
