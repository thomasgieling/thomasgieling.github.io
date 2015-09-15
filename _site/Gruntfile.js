module.exports = function(grunt) {
 
  var autoprefixer = require('autoprefixer-core');
  var mozjpeg = require('imagemin-mozjpeg');
  grunt.initConfig({
 
    pkg: grunt.file.readJSON('package.json'),
 
    sass: {
      dev: {
        files: {
          'app/css/style.css': 'app/sass/style.scss'
        }
      }
    },
 
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'app/css/style.min.css': 'app/css/style.css'
        }
      }
    },

    watch: {
      dev: {
        files: 'app/sass/**/*.scss',
        tasks: ['sass', 'postcss', 'cssmin', 'imagemin']
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
        src: 'app/img/sprite/*.png',
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
          cwd: 'app/img/source',            // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'app/img'          // Destination path prefix
        }]
      }
    },
    jekyll: {
      options: {
        src: '.',
        dest: '_site'
      }
  }

  });
 
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-jekyll');


  grunt.registerTask('default', ['watch']);
 
};