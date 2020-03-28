var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Turns the sass into css and sends to the browser
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Moves needed js files into src and sends to browser
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

// Server setup and watchers to see if anything has updated
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./src"  
    });

    gulp.watch(['src/scss/*.scss']).on('change', gulp.series('sass',browserSync.reload));

    gulp.watch("src/*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('js','serve'));