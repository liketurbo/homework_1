import gulp from 'gulp';
import browserSync from 'browser-sync';

const browser = browserSync.create();
const htmlSrc = './src/**/*.html';
const cssSrc = './src/**/*.css';
const jsSrc = './src/**/*.js';

gulp.task('watch', ['browser'], () => {
  gulp.watch(htmlSrc, browser.reload);
  gulp.watch(cssSrc, browser.reload);
  gulp.watch(jsSrc, browser.reload);
});

gulp.task('browser', () => {
  browser.init({
    server: { baseDir: './src' },
  });
});
