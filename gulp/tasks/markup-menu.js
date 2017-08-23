import gulp from 'gulp';
import paths from '../paths';
import { templateEngine, env } from '../../options.json';
import fs from 'fs';

const options = {
  templateEngine,
  reg: templateEngine === 'html' ?  /\.(html)$/i : /\.(pug)$/i,
  path: paths.baseSrc,
  excludeReg: /^(ajax|_)/i
}

gulp.task('files-menu', () => {
  fs.readdir(options.path, (err, files) => {
    const arr = [];
    const { reg, excludeReg } = options;
    for (let i = 0; i < files.length; i++) {
      if (excludeReg.test(files[i])) {
        continue;
      }
      if (reg.test(files[i])) {
        const fileName = files[i].replace(/\.(html|pug)$/i, '.html');
        arr.push(fileName);
      }
    }
    const file = fs.createWriteStream(`${paths.src.scripts}/files.js`);
    arr.unshift(env);
    file.write(`export default ${JSON.stringify(arr)}`);
    file.end();
  });
});
