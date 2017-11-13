import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import inheritance from 'gulp-pug-inheritance';
import cached from 'gulp-cached';
import errorHandler from '../utils/errorHandler';
import paths from '../paths';
import changed from 'gulp-changed';
import filter from 'gulp-filter';

gulp.task('pug', () => {
  return gulp
    .src(`${paths.baseSrc}/**/*.pug`)
    .pipe(plumber({
      errorHandler
    }))
    .pipe(changed(paths.baseDist, {
      extension: '.html'
    }))
    .pipe(gulpif(global.watch, cached('pug')))
    .pipe(inheritance({
      basedir: paths.baseSrc,
      skip: 'node_modules'
    }))
    .pipe(filter((file) => {
      return !/(\/_|\\_)/.test(file.path) || !/^_/.test(file.relative);
    }))
    .pipe(pug({
      pretty: '  '
    }))
    .pipe(gulp.dest(paths.baseDist));
});