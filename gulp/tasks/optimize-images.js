import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import runSequence from 'run-sequence';
import paths from '../paths';

gulp.task('optimize-images-folder', () => {
  return gulp
    .src(`${paths.dist.images}/**/*.{png,jpg,gif,svg}`)
    .pipe(imagemin({
      optimizationLevel: 5,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.dist.optimizedImg));
});

gulp.task('optimize-data-folder', () => {
  return gulp
    .src(`${paths.dist.static}/**/*.{png,jpg,gif,svg}`)
    .pipe(imagemin({
      optimizationLevel: 5,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.dist.optimizedData));
});


gulp.task('optimize-images', () => {
  runSequence(
    'optimize-images-folder',
    'optimize-data-folder'
  );
});
