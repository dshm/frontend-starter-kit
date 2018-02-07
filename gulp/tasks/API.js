import gulp from "gulp";
import cached from "gulp-cached";
import paths from "../paths";

gulp.task("API", () =>
  gulp
    .src(`${paths.src.API}/*.json`)
    .pipe(cached())
    .pipe(gulp.dest(paths.dist.API))
);
