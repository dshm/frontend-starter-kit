import gulp from 'gulp';
import { log } from 'gulp-util';
import ftp from 'vinyl-ftp';
import paths from '../paths';
import ftpopts from '../ftpopts';
import runSequence from 'run-sequence'

const {
  host,
  user,
  password,
  port,
  parallel
} = ftpopts;

const {
  styles,
  scripts,
  components,
  fonts,
  images,
  data,
  markup
} = ftpopts.paths;

const conn = ftp.create({
  host,
  user,
  password,
  port,
  parallel,
  log
});

const options = {
  buffer: false
};

gulp.task('ftp:styles', () => {
  return gulp
    .src(`${paths.dist.styles}/**/*`, options)
    .pipe(conn.dest(styles))
});

gulp.task('ftp:components', () => {
  return gulp
    .src(`${paths.dist.components}/**/*`, options)
    .pipe(conn.dest(components))
});

gulp.task('ftp:scripts', () => {
  return gulp
    .src(`${paths.dist.scripts}/**/*`, options)
    .pipe(conn.dest(scripts))
});

gulp.task('ftp:fonts', () => {
  return gulp
    .src(`${paths.dist.fonts}/**/*`, options)
    .pipe(conn.dest(fonts))
});

gulp.task('ftp:images', () => {
  return gulp
    .src(`${paths.dist.images}/**/*`, options)
    .pipe(conn.dest(images))
});

gulp.task('ftp:static', () => {
  return gulp
    .src(`${paths.dist.static}/**/*`, options)
    .pipe(conn.dest(data))
});

gulp.task('ftp:markup', () => {
  return gulp
    .src(`${paths.baseDist}/*.html`, options)
    .pipe(conn.dest(markup))
});

gulp.task('ftp', () => {
  runSequence(
    'ftp:styles',
    'ftp:components',
    'ftp:scripts',
    'ftp:fonts',
    'ftp:images',
    'ftp:static',
    'ftp:markup'
  )
});
