var gulp = require('gulp');

// babel
var matchRex = /(src.*)\/.*\.*/;  // (src.*)为文件名之前的完整路径
var babel = require('gulp-babel');
var babelTask = (e) => {
	// e.path
	// E:\软通动力\项目\reactjs\react-crud-reflux\src\dataRow.jsx
    var match = e.path.replace(/\\/g, '/').match( matchRex ),
        file = match[0];   // src/dataRow.jsx
	
	
	// # ES2015转码规则
	// $ npm install --save-dev babel-preset-es2015

	// # react转码规则
	// $ npm install --save-dev babel-preset-react
    gulp.src( file )
        .pipe( babel( { presets: ['es2015', 'react'] } ).on('error', (e) => {
            console.error('error', e.message);
        }) )
        .pipe(gulp.dest( match[1] ));
};
// watch
gulp.task('watch', function() {
    // babel & jsx
    gulp.watch(['src/**/*.jsx', 'src/**/*.es6']).on('change', (event) => {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...[babel]');
        babelTask(event);
    });
});