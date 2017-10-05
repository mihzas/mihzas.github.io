var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
 return gulp.src('scss/*.scss')
   .pipe(plumber({
       errorHandler: notify.onError(function(error) {
       return {
       title: 'Styles',
       message: error.message
       };
     })}))
   .pipe(sass())
   .pipe(gulp.dest('css/'));
});

gulp.task('serve', gulp.series('sass'), function () {
 browserSync.init({
 server: "./app" // Базовая директория
 });
browserSync.watch('./app/ * */*.*').on('change',
browserSync.reload); // Отслеживаем изменения и передаем на клиент
});

gulp.task('watch', function(){
 gulp.watch('scss/*.scss', gulp.series('sass'));
});


gulp.task('default', gulp.series('sass', 'watch'));