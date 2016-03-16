import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import errorHandler from '../utils/errorHandler';
import svgsprite from 'gulp-svg-sprite';
import paths from '../paths';

const config = {
  shape: {
    spacing: {
      padding: 0,
      box: 'border'
    }
  },
  mode: {
    symbol: {
      dest: '.',
      sprite: 'sprite.svg'
    }
  }
};

gulp.task('svg-sprite', () => {
  return gulp
    .src(`${paths.src.svgsprite}/*.svg`)
    .pipe(plumber({
      errorHandler
    }))
    .pipe(gulpif('*.svg', svgsprite(config)))
    .pipe(gulp.dest(paths.dist.images));
});
