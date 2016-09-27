import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import inheritance from 'gulp-jade-inheritance';
import cached from 'gulp-cached';
import rename from 'gulp-rename';
import prettify from 'gulp-html-prettify';
import errorHandler from '../utils/errorHandler';
import paths from '../paths';
import { markup } from '../../options.json';
import nunjucksRender from 'gulp-nunjucks-render';
import posthtml from 'gulp-posthtml';
import imgAutoSize from '../utils/image-auto-size';
import path from 'path';

const pugOptions = {
  pretty: '  '
};

gulp.task('markup', () => {
  return gulp
    .src(
      gulpif(markup === 'pug', `${paths.baseSrc}/pug/**/!(_)*.pug`, `${paths.baseSrc}/*.html`)
    )
    .pipe(plumber({
      errorHandler
    }))
    .pipe(gulpif(global.watch, inheritance({
      basedir: paths.baseSrc
    })))
    .pipe(gulpif(
      markup === 'pug',
      pug({
        pugOptions
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
    .pipe(gulpif(markup === 'pug', rename({
      dirname: '.'
    })))
    .pipe(posthtml([
      imgAutoSize({
        processEmptySize: true,
        root: paths.baseSrc
      })
    ]))
    .pipe(gulp.dest(paths.baseDist))
});
