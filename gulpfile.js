'use strict';
var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
var htmlmin=require('gulp-htmlmin');
var browserSync=require('broswer-sync').create();
gulp.task('less',function(){
	gulp.src(['src/less/*.less','!src/less/2.less'])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.stream());
});

gulp.task('js',function(){
	gulp.src('src/js/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.stream());
});

gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.stream());
})

gulp.task('html',function(){
	gulp.src('src/index.html')
	.pipe(htmlmin({
		collapseWhitespace:true,
		removeComments:true,
		collapseBolleanAttributes:true,
		removeAttributeQuotes:true,
		removeEmptyAttributes:true,
		removeScriptTypeAttributes:true,
		removeStyleLinkTypeAttribute:true,
	}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.stream());
})

gulp.task('serve',function(){
	browserSync.init({
		server:{
			baseDir:'./dist'
		},
		port:2017,
	});
	gulp.watch('src/less/*.less',['less']);
	gulp.watch('src/js/*.js',['js']);
	gulp.watch('src/images/*.jpg',['image']);
	gulp.watch('src/*.html',['html']);
})