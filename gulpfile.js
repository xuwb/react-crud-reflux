var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

// babel
// (src.*)Ϊ�ļ���֮ǰ������·��
var matchRex = /(src.*)\/.*\.(\w+)/;
var babel = require('gulp-babel');
var babelTask = (e) => {
    // e.path
    // E:\��ͨ����\��Ŀ\reactjs\react-crud-reflux\src\dataRow.jsx
    var match = e.path.replace(/\\/g, '/').match( matchRex ),
        file = match[0],   // src/dataRow.jsx
        filePath = match[1],
        extendName = match[2];
    
    // # ES2015ת�����
    // $ npm install --save-dev babel-preset-es2015

    // # reactת�����
    // $ npm install --save-dev babel-preset-react
    if(extendName == 'jsx' || extendName == 'es6')
    {
        gulp.src( file )
        .pipe( babel( { presets: ['es2015', 'react'] } ).on('error', (e) => {
            console.error('error', e.message);
        }) )
        .pipe(gulp.dest( filePath ));
    }

    gulp.src('src/**/*.js')
        .pipe(rename(function(path) {
            path.extname = ".min.js";
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));

};
// watch
gulp.task('watch', function() {
    // babel & jsx
    gulp.watch(['src/**/*.js', 'src/**/*.jsx', 'src/**/*.es6']).on('change', (event) => {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...[babel]');
        babelTask(event);
    });
});