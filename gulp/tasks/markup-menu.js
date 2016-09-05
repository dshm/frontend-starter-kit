import gulp from 'gulp';
import gutil from 'gulp-util';
import paths from '../paths';
import { markup } from '../../options.json';
import fs from 'fs';

const options = {
  markup,
  reg: markup === 'html' ?  /\.(html)$/i : /\.(pug)$/i,
  path: markup === 'html' ?  paths.baseSrc : paths.src.pug,
  excludeReg: /^ajax/i
}

gulp.task('markup-menu', () => {
  fs.readdir(options.path, (err, files) => {
    const arr = [];
    const {
      reg,
      excludeReg
    } = options;
    for (let i = 0; i < files.length; i++) {
      if (excludeReg.test(files[i])) {
        continue;
      }
      if (reg.test(files[i])) {
        const fileName = files[i].replace(/\.(html|pug)$/i, '.html');
        arr.push(fileName);
      }
    }
    const file = fs.createWriteStream(`${paths.src.scripts}/vendor/files.json`);
    file.on('finish', () => {
      gutil.log(gutil.colors.green('file write finished successfully (markup-menu)'));
    });
    file.write(JSON.stringify(arr));
    file.end();
  });
});
