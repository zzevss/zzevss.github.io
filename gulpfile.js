// для ускорения компиляции скриптов необходимо поисправлять все оошибки которые находит jshint (показывает в консоли при работе gulp)
// или временно отключить jshint в тех тасках которые используються в данный момент
// #todo давайте jshint и debug включать когда что-то разрабатываем что-то, а в репо скидывать отключая их

var gulp = require('gulp'),
    less = require('gulp-less'),
    clean = require('gulp-clean'),
    cleanCSS = require('gulp-clean-css')
	;

gulp.task('less', function () {
    return gulp.src(
            [
                'less/styles.less'

            ]
        )
        .pipe(less({compress: true}))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('default', ['clean'], function () {
    var tasks = [
		 'js:buld',
		 'less'
	];
    tasks.forEach(function (val) {
        gulp.start(val);
    });
});
gulp.task('clean', function () {
    return gulp.src(['dist/css/*', 'dist/js/*'])
        .pipe(clean());
});

// компиляция скриптов занимает много времени поэтому тут работа над скриптами разбита на отдельные task
// следить за изменениями во всех файлах less и в скриптах (те которые в корне js/ , в папках common-scripts, helpers)
gulp.task('watch', function () {
    var less = gulp.watch('less/*.less', ['less'])
        js = gulp.watch(['js/**/*.js', 'js/*.js'], ['js:buld']);
});
  

/////////////////////////////////////////////////////////////////
// вот реализация сборки JS файлов
/////////////////////////////////////////////////////////////////
gulp.task('js:buld', function() {
	var incJs = [
		'js/models/*.js',
        'js/views/*.js',
        'js/collections/*.js',
        'js/routers/*.js',
        'js/app.js',
	];
	gulp.src(incJs)
		.pipe(gulp.dest('dist/js/'))
	;
});