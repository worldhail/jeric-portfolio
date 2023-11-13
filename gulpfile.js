const { src, dest } = require('gulp');
const pug = require('gulp-pug');

exports.views = () => {
    return src('./views/pages/*.pug')
      .pipe(pug())
      .pipe(dest('./dist'));
  };