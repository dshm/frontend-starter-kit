import browserSync from 'browser-sync';
import gulp from 'gulp';
import gutil from 'gulp-util';
import paths from '../paths';

gulp.task('livereload', () => {
  browserSync.init({
    files: [`${paths.baseDist}/**/*`],
    open: 'local',
    reloadOnRestart: true,
    port: gutil.env.port || 3000,
    server: {
      baseDir: `${paths.baseDist}`,
      index: "index.html",
      directory: false
    },
    tunnel: !!gutil.env.tunnel
  })
});
