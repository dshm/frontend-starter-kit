import gulp from 'gulp';
import gutil from 'gulp-util';
import webpackConfig from '../../webpack.config';
import webpack from 'webpack';
import { reload } from 'browser-sync';

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
