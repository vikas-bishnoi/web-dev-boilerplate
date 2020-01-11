const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sss        = require('gulp-sass');

// // Compile Sass & Inject Into Browser
function sass(done) {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sss())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
};

// Move JS Files to src/js
function js(done) {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
    done();   
}

// Watch Sass & Serve
// gulp.task('serve', ['sass'], function serve() {

//     browserSync.init({
//         server: "./src"  
//     });

//     gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
//     gulp.watch("src/*.html").on('change', browserSync.reload);
// };

function serve(done) {
    browserSync.init({
        server: "./src"  
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], sass);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    done();
};

// Move Fonts to src/fonts
function fonts() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'))
};

// Move Font Awesome CSS to src/css
function fa(done) {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'))
};

// function  new(done)
// {
//     //  
//     done(); 
// }
// 
gulp.task('js', js);
// gulp.task('sass', sass);
gulp.task('serve', serve);
gulp.task('fa', fa );
gulp.task('fonts', fonts );

gulp.task('default', gulp.series(fa, fonts, js, serve));

