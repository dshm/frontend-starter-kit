import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import jade from 'gulp-jade';
import inheritance from 'gulp-jade-inheritance';
import cached from 'gulp-cached';
import rename from 'gulp-rename';
import prettify from 'gulp-html-prettify';
import errorHandler from '../utils/errorHandler';
import paths from '../paths';

const data = {
  timestamp: new Date()
};
 
gulp.task('markup', () => {
  return gulp.src(`${paths.baseSrc}/jade/*.jade`)
    .pipe(plumber({
      errorHandler
    }))
    .pipe(cached('jade'))
    .pipe(gulpif(global.watch, inheritance({
      basedir: paths.baseSrc
    })))
    .pipe(jade({
      data
    }))
    .pipe(prettify({
      brace_style: 'expand',
      indent_size: 2,
      indent_char: ' ',
      indent_inner_html: true,
      preserve_newlines: true
    }))
    .pipe(rename({
      dirname: '.'
    }))
    .pipe(gulp.dest(paths.baseDist))
});
