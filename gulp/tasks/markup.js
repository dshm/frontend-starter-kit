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
import { markup } from '../../options.json';
import nunjucksRender from 'gulp-nunjucks-render';

const jadeOptions = {
  pretty: '  '
};

gulp.task('markup', () => {
  return gulp
    .src(
      gulpif(markup === 'jade', `${paths.baseSrc}/jade/**/!(_)*.jade`, `${paths.baseSrc}/*.html`)
    )
    .pipe(plumber({
      errorHandler
    }))
    .pipe(gulpif(global.watch, inheritance({
      basedir: paths.baseSrc
    })))
    .pipe(gulpif(
      markup === 'jade',
      jade({
        jadeOptions
      }),
      nunjucksRender({
        path: paths.src.layouts
      })
    ))
    .pipe(cached())
    .pipe(prettify({
      brace_style: 'expand',
      indent_size: 2,
      indent_char: ' ',
      indent_inner_html: true,
      preserve_newlines: true
    }))
    .pipe(gulpif(markup === 'jade', rename({
      dirname: '.'
    })))
    .pipe(gulp.dest(paths.baseDist))
});
