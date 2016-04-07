import gulp from 'gulp';
import gulpif from 'gulp-if';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import babel from 'babelify';
import errorHandler from '../utils/errorHandler';
import paths from '../paths';
import { env } from '../../options.json';

gulp.task('scripts:compile', () => {
  const bundler = browserify(`${paths.src.scripts}/index.js`, {
    debug: true,
    cache: {},
    packageCache: {}
  }).transform(babel);
  return bundler
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulpif(env.uglify, uglify()))
    .pipe(gulp.dest(paths.dist.scripts));
});

gulp.task('scripts:copy', () => {
  return gulp
    .src(`${paths.src.scripts}/vendor/**/*`)
    .pipe(plumber({
      errorHandler
    }))
    .pipe(uglify())
    .pipe(gulp.dest(`${paths.dist.scripts}/vendor`));
});
