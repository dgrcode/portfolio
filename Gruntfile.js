module.exports = function (grunt) {

  // Load the plugins that provide the tasks
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'compact',
          cacheLocation: '.sass-cache'
        },
        files: {
          'css/styles.css' : 'css/styles.sass'
        }
      }
    },

    pug: {
      compile: {
        options: {
          pretty: true
        },
        files: {
          "index.html": "index.pug"
        }
      }
    },

    autoprefixer: {
      dist: {
        src: 'css/styles.css'
      }
    },

    watch: {
      options: {
        livereload: 3000
      },
      pug: {
        files: 'partials/*.pug',
        tasks: ['pug']
      },
      sass: {
        files: 'css/*.sass',
        tasks: ['sass']
      },
      html: {
            files: ['index.html','css/*.css', 'assets/svg/*.svg'],
            options: {
                livereload: true
            }
        }
    },
    
  });

  grunt.registerTask('default', ['sass', 'pug', 'autoprefixer:dist', 'watch']);
  grunt.registerTask('changes', ['watch']);
  
};