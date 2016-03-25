import gulp from 'gulp';
import open from 'gulp-open';

gulp.task('open-browser', () => {
  const options = {
    uri: 'http://localhost:3000/',
    app: 'chrome'
  };
  gulp.src(__filename)
    .pipe(open(options));
});
