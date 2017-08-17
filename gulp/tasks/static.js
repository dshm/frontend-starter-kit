import gulp from 'gulp';
import paths from '../paths';
import cached from 'gulp-cached';
import multiDest from 'gulp-multi-dest';
import util from 'gulp-util';

gulp.task('static', () => {
  return gulp
    .src(`${paths.src.static}/**/*.{png,jpg,gif,svg,mp4,webm}`)
    .pipe(cached())
    .pipe(util.env.oc ? multiDest([paths.dist.static, '../image/data']) : gulp.dest(paths.dist.static));
});