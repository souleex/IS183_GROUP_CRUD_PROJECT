//import gulp
var gulp = require('gulp');
//import nodemon
var nodemon = require('nodemon');

//initialize gulp with nodemon
gulp.task('default', function() {
    nodemon({
        //what script to run
        script: 'golfReservationApp.js',
        //what file-types to "listen" for
        ext: 'js',
        env: {
            PORT: 8100
        },
        //tell nodemon to ignore changes in node_modules folder
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('Restarting gulp');
    });
});