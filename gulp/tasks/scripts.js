import gulp from 'gulp';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import errorHandler from '../utils/errorHandler';
import gutil from 'gulp-util';
import paths from '../paths';
import cached from 'gulp-cached';
import gulpif from 'gulp-if';
import webpackConfig from '../../webpack.config';
import webpack from 'webpack';
import { reload } from 'browser-sync';
import { env } from '../../options';

gulp.task('scripts:compile', () => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError("webpack", err);
    }
    gutil.log("[webpack]", stats.toString({
      chunks: false,
      colors: true,
      errorDetails: true
    }));
    reload();
  });
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
