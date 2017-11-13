import gulp from 'gulp';
import paths from '../paths'; 
import cached from 'gulp-cached';

gulp.task('fonts', () => {
  return gulp.src(`${paths.src.fonts}/**/*`)
    .pipe(cached())
    .pipe(gulp.dest(paths.dist.fonts));
});
