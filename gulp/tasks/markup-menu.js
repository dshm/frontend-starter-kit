import gulp from 'gulp';
import gutil from 'gulp-util';
import paths from '../paths';
import fs from 'fs';

gulp.task('markup-menu', () => {
  fs.readdir(paths.baseSrc, (err, files) => {
    const arr = [];
    const reg = /\.(html)$/i;
    for (let i = 0; i < files.length; i++) {
      if (reg.test(files[i])) arr.push(files[i]);
    }
    const file = fs.createWriteStream(`${paths.src.scripts}/vendor/files.json`);
    file.on('finish', () => {
      gutil.log(gutil.colors.green('file write finished successfully (markup-menu)'));
    });
    file.write(JSON.stringify(arr));
    file.end();
  });
});
