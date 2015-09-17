module.exports = function(grunt) {
 
  var gulp = require('gulp'),
      styleguide = require('sc5-styleguide');

  var autoprefixer = require('autoprefixer-core');
  var mozjpeg = require('imagemin-mozjpeg');
  grunt.initConfig({
 
    pkg: grunt.file.readJSON('package.json'),
 
    sass: {
      adidas: {
        files: {
          'app/css/foundation-adidas.css': 'app/sass/foundation-adidas.scss'
        }
      },
      reebok: {
        files: {
          'app/css/foundation-reebok.css': 'app/sass/foundation-reebok.scss'
        }
      }
    },
 
    gulp: {
      'styleguide-generate-adidas': function() {
        var outputPath = '../grunt-build/generated/adidas-styleguide';
        return gulp.src(['app/sass/foundation-adidas.scss', 'app/sass/components/adidas/*.scss', 'app/sass/components/shared/*.scss'])
          .pipe(styleguide.generate({
              title: 'adidas foundation styleguide',
              server: true,
              port:4000,
              rootPath: outputPath,
              customColors: 'app/sc5-custom/custom-colors-adidas.scss',
              appRoot: '/grunt-build/generated/adidas-styleguide',
              disableEncapsulation: true
            }))
          .pipe(gulp.dest(outputPath));
      },
      'styleguide-applystyles-adidas': function() {
        gulp.src('app/css/foundation-adidas.css')
          .pipe(styleguide.applyStyles())
          .pipe(gulp.dest('generated/adidas-styleguide'));
      },
      'styleguide-generate-reebok': function() {
        var outputPath = 'generated/reebok-styleguide';
        return gulp.src(['app/sass/foundation-reebok.scss', 'app/sass/components/reebok/*.scss', 'app/sass/components/shared/*.scss'])
          .pipe(styleguide.generate({
              title: 'Reebok foundation styleguide',
              server: true,
              rootPath: outputPath,
              customColors: 'app/sc5-custom/custom-colors-reebok.scss',
              disableEncapsulation: true
            }))
          .pipe(gulp.dest(outputPath));
      },
      'styleguide-applystyles-reebok': function() {
        gulp.src('app/css/foundation-reebok.css')
          .pipe(styleguide.applyStyles())
          .pipe(gulp.dest('generated/reebok-styleguide'));
      }
    },
    copy: {
      adidas: {
        files: [
          { src: ['app/css/foundation-adidas.css'], dest: 'generated/adidas-styleguide/styleguide.css'},
          { cwd: 'app/sass/fonts/adidas', src: '**/*', dest: 'generated/adidas-styleguide/fonts', expand:true},
          { cwd: 'app/sass/fonts/adidas', src: '**/*', dest: 'app/css/fonts', expand:true},
          { cwd: 'app/js', src: '**/*', dest: 'generated/adidas-styleguide/js', expand:true}
        ]
      },
      reebok: {
        files: [
          { src: ['app/css/foundation-reebok.css'], dest: 'generated/reebok-styleguide/styleguide.css'},
          { cwd: 'app/sass/fonts/reebok', src: '**/*', dest: 'generated/reebok-styleguide/fonts', expand:true},
          { cwd: 'app/sass/fonts/reebok', src: '**/*', dest: 'app/css/fonts', expand:true},
          { cwd: 'app/js', src: '**/*', dest: 'generated/reebok-styleguide/js', expand:true}
        ]
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'app/css/foundation-adidas.min.css': 'app/css/foundation-adidas.css',
          'app/css/foundation-reebok.min.css': 'app/css/foundation-reebok.css'
        }
      }
    },

    watch: {
      adidas: {
        files: 'app/**/*.scss',
        tasks: ['sass:adidas', 'gulp:styleguide-generate-adidas', 'gulp:styleguide-applystyles-adidas', 'postcss', 'copy:adidas', 'cssmin', 'imagemin']
      },
      reebok: {
        files: 'app/**/*.scss',
        tasks: ['sass:reebok', 'gulp:styleguide-generate-reebok', 'gulp:styleguide-applystyles-reebok', 'postcss', 'copy:reebok', 'cssmin', 'imagemin']
      }
    },
    postcss: {
      options: {
          map: true,
          processors: [
              require('autoprefixer-core')({
                  browsers: ['last 20 versions']
              })
          ]
      },
      dist: {
          src: 'app/css/*.css'
      }
    },
    sprite:{
      all: {
        src: 'app/sprite-images/*.png',
        dest: 'app/images/spritesheet.png',
        destCss: 'app/sass/components/_sprites.scss'
      }
    },
    imagemin: {                        // Another target
      dynamic: {
        options: {                       // Target options
          optimizationLevel: 7,
          svgoPlugins: [{ removeViewBox: false }],
          use: [mozjpeg({quality:80})]
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'app/images/',            // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'output/images'          // Destination path prefix
        }]
      }
    }

  });
 
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-gulp');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('adidas', ['gulp:styleguide-generate-adidas', 'gulp:styleguide-applystyles-adidas', 'postcss', 'copy:adidas', 'cssmin', 'watch:adidas']);
  grunt.registerTask('reebok', ['gulp:styleguide-generate-reebok', 'gulp:styleguide-applystyles-reebok', 'postcss', 'copy:reebok', 'cssmin', 'watch:reebok']);
 
};