import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import gutil from 'gulp-util';
import paths from '../paths';
import fs from 'fs';

gulp.task('markup-menu', function(){
  fs.readdir(paths.baseSrc, (err, files) => {
    let arr = [];
    let reg = /\.(html)$/i;
    for (let i = 0; i < files.length; i++) {
      if (reg.test(files[i])) arr.push(files[i]);
    };
    let file = fs.createWriteStream(`${paths.src.scripts}/vendor/files.json`);
    file.on('finish', () => {
      gutil.log(gutil.colors.green('file write finished successfully (markup-menu)'));
    });
    file.write(JSON.stringify(arr));
    file.end();
  });
});
