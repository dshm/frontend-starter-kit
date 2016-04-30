import gutil from 'gulp-util';

export default (error) => {
  gutil.log([
    (`${error.name} in ${error.plugin}`).bold.red,
    '',
    error.message,
    ''
  ].join('\n'));

  if (gutil.env.beep) {
    gutil.beep();
  }
}
