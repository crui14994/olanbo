const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();   // 浏览器自动刷新
const del = require('del'); //删除模块
const ejs  = require('gulp-ejs');
const rename = require('gulp-rename')

// 编译less  压缩合并css
gulp.task('csscompress', () => {
    return gulp.src(['./views/**/*.less', './views/**/*.css'])
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer({ //根据设置浏览器版本自动处理浏览器前缀
            browsers: ['last 2 versions'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        // .pipe(plugins.concat('concat.min.css'))
        .pipe(gulp.dest('./dist/'));
})

//删除dist目录下文件
gulp.task('clean', function (cb) {
    return del(['dist/*'], cb);
})

// 压缩合并js
gulp.task('jscompress', () => {
    return gulp.src('./views/**/*.js') // 要压缩的js文件
        .pipe(plugins.babel()) //开起es6转es5
        // .pipe(plugins.uglify())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        // .pipe(plugins.concat('concat.min.js'))
        .pipe(gulp.dest('./dist/'));
});


// 压缩image
gulp.task('imagecompress', () =>
    gulp.src('views/**/*.{png,jpg,gif,ico,mp4}')
        // .pipe(plugins.imagemin())
        .pipe(gulp.dest('dist/'))
);



// 压缩html
gulp.task('htmlcompress',() =>
    gulp.src('views/**.ejs') // 要压缩的html文件
        .pipe(ejs())
        .pipe(rename({ extname: '.html' }))
        .pipe(plugins.minifyHtml())
        .pipe(gulp.dest('dist/'))
);


// 浏览器自动刷新  监听文件变化
gulp.task('reload', function () {
    browserSync.reload();
});
gulp.task('default', ['clean', 'htmlcompress','jscompress', 'csscompress', 'imagecompress' ], function () {
    browserSync.init({
        port: 2020,
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch('./views/js/**/*.js', ['jscompress', 'reload']);
    gulp.watch(['./views/css/**/*.less', './views/css/**/*.css'], ['csscompress', 'reload']);
    gulp.watch(['./views/images/**/*.*'], ['imagecompress', 'reload']);
    gulp.watch(['views/**/*.ejs'], ['htmlcompress', 'reload']);
});

