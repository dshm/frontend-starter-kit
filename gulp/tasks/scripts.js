import gulp from 'gulp';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import babel from 'babelify';
import errorHandler from '../utils/errorHandler';
import gutil from 'gulp-util';
import paths from '../paths';
import cached from 'gulp-cached';
import gulpif from 'gulp-if';

const env = gutil.env.env ? gutil.env.env : 'dev';
gulp.task('scripts:compile', () => {
  const bundler = browserify(`${paths.src.scripts}/index.js`, {
    debug: true,
    cache: {},
    packageCache: {}
  }).transform(babel);
  return bundler
    .bundle()
    .on('error', function onError(error) {
      gutil.log(error.message);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulpif(env!=='dev', uglify()))
    .pipe(gulp.dest(paths.dist.scripts));
});

gulp.task('scripts:copy', () => {
  return gulp
    .src(`${paths.src.scripts}/vendor/**/*`)
    .pipe(cached())
    .pipe(plumber({
      errorHandler
    }))
    .pipe(gulpif(env!=='dev', uglify()))
    .pipe(gulp.dest(`${paths.dist.scripts}/vendor`));
});
