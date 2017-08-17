import gulp from 'gulp';
import {
  log
} from 'gulp-util';
import ftp from 'vinyl-ftp';
import paths from '../paths';
import ftpopts from '../ftpopts';
import runSequence from 'run-sequence'
import options from '../../options';

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
  root
} = ftpopts.paths;

const conn = ftp.create({
  host,
  user,
  password,
  port,
  parallel,
  log
});

const optionGulp = {
  buffer: false
};

gulp.task('ftp:styles', () => {
  return gulp
    .src(`${paths.dist.styles}/**/*`, optionGulp)
    .pipe(conn.dest(styles))
});

gulp.task('ftp:components', () => {
  return gulp
    .src(`${paths.dist.components}/**/*`, optionGulp)
    .pipe(conn.dest(components))
});

gulp.task('ftp:scripts', () => {
  return gulp
    .src(`${paths.dist.scripts}/**/*`, optionGulp)
    .pipe(conn.dest(scripts))
});

gulp.task('ftp:fonts', () => {
  return gulp
    .src(`${paths.dist.fonts}/**/*`, optionGulp)
    .pipe(conn.dest(fonts))
});

gulp.task('ftp:images', () => {
  return gulp
    .src(`${paths.dist.images}/**/*`, optionGulp)
    .pipe(conn.dest(images))
});

gulp.task('ftp:static', () => {
  return gulp
    .src(`${paths.dist.static}/**/*`, optionGulp)
    .pipe(conn.dest(data))
});

gulp.task('ftp:markup', () => {
  return gulp
    .src(`${paths.baseDist}/*.html`, optionGulp)
    .pipe(conn.dest(root))
});

gulp.task('ftp:oc', () => {
  return gulp
    .src([
      '../**/*',
      '!../front/node_modules',
      '!../front/node_modules/**',
      '!../front/app',
      '!../front/app/**',
      '!../front/gulp',
      '!../front/gulp/**',
      '!../front/dist/*.html',
      '!../front/*.{json,js,md,hbs}',
      '!../front/LICENSE',
      '!../config.php',
      '!../**/.htaccess',
      '!../**/*.sql',
      '!../**/config.php',
      '!../**/cache/**'
    ], optionGulp)
    .pipe(conn.dest(root))
});

gulp.task('ftp:front', () => {
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